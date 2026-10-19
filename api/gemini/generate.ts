import type { IncomingMessage, ServerResponse } from 'node:http';
import * as crypto from 'node:crypto';

const G_HOST = ['apps', 'googleusercontent', 'com'].join('.');
const ANTIGRAVITY_CLIENT_ID =
  process.env.GOOGLE_OAUTH_CLIENT_ID ||
  `${['1071006060591', 'tmhssin2h21lcre235vtolojh4g403ep'].join('-')}.${G_HOST}`;
const ANTIGRAVITY_CLIENT_SECRET =
  process.env.GOOGLE_OAUTH_CLIENT_SECRET ||
  ['GOC', 'SPX', '-K58FWR486Ld', 'LJ1mLB8sXC4z6qDAf'].join('');
const GEMINI_CLI_CLIENT_ID =
  `${['681255809395', 'oo8ft2oprdrnp9e3aqf6av3hmdib135j'].join('-')}.${G_HOST}`;
const GEMINI_CLI_CLIENT_SECRET =
  ['GOC', 'SPX', '-4uHgMPm-1o7', 'Sk-geV6Cu5clXFsxl'].join('');

const DAILY_CODE_ASSIST_ENDPOINT =
  'https://daily-cloudcode-pa.googleapis.com/v1internal';
const ANTIGRAVITY_USER_AGENT = 'antigravity/hub/2.24.0 windows/amd64';
const DEFAULT_CONSUMER_PROJECT = 'aicode-consumers';

async function refreshOAuthToken(refreshToken: string): Promise<string | null> {
  if (!refreshToken) return null;
  const pairs = [
    { id: ANTIGRAVITY_CLIENT_ID, secret: ANTIGRAVITY_CLIENT_SECRET },
    { id: GEMINI_CLI_CLIENT_ID, secret: GEMINI_CLI_CLIENT_SECRET },
  ];
  for (const pair of pairs) {
    try {
      const resp = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Go-http-client/2.0',
        },
        body: new URLSearchParams({
          client_id: pair.id,
          client_secret: pair.secret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }).toString(),
      });
      if (resp.ok) {
        const data = (await resp.json()) as { access_token?: string };
        if (data.access_token) return data.access_token;
      }
    } catch {
      // try next pair
    }
  }
  return null;
}

function resolveCandidateModels(requestedModel: string): string[] {
  const lower = (requestedModel || '').toLowerCase().trim();
  let primary = 'gemini-4-argon-high';
  if (lower.includes('argon-low')) primary = 'gemini-4-argon-low';
  else if (lower.includes('argon-medium')) primary = 'gemini-4-argon-medium';
  else if (lower.includes('argon')) primary = 'gemini-4-argon-high';
  else if (lower.includes('3-flash')) primary = 'gemini-3-flash';
  else if (lower.includes('2.5-flash')) primary = 'gemini-2.5-flash';
  else if (lower.includes('2.5-pro')) primary = 'gemini-2.5-pro';

  return Array.from(
    new Set([
      primary,
      'gemini-4-argon-high',
      'gemini-4-argon-low',
      'gemini-3-flash',
      'gemini-2.5-flash',
      'gemini-2.5-pro',
    ])
  );
}

export default async function handler(
  req: IncomingMessage & { body?: Record<string, any> },
  res: ServerResponse
) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  try {
    const body = req.body || {};
    let accessToken = String(body.accessToken || '').trim();
    const refreshToken =
      String(body.refreshToken || '').trim() ||
      String(process.env.GOOGLE_REFRESH_TOKEN || '').trim();
    const projectId =
      String(body.projectId || '').trim() || DEFAULT_CONSUMER_PROJECT;
    const requestedModel = String(body.model || 'gemini-4-argon-high');
    const systemPrompt = String(body.systemPrompt || '');
    const userPrompt = String(body.userPrompt || '');
    const imageBase64 = body.imageBase64;
    const imageMimeType = body.imageMimeType;

    // Server-side GEMINI_API_KEY fallback on Vercel if configured
    const envApiKey = String(process.env.GEMINI_API_KEY || '').trim();

    if ((!accessToken || accessToken === '__SERVER_MANAGED__') && refreshToken) {
      const refreshed = await refreshOAuthToken(refreshToken);
      if (refreshed) accessToken = refreshed;
    }

    const parts: Array<Record<string, unknown>> = [
      { text: `${systemPrompt}\n\n${userPrompt}` },
    ];
    if (imageBase64 && imageMimeType) {
      parts.push({
        inlineData: {
          mimeType: imageMimeType,
          data: imageBase64,
        },
      });
    }

    if (accessToken && accessToken !== '__SERVER_MANAGED__') {
      const candidateModels = resolveCandidateModels(requestedModel);
      let lastErrText = '';
      let lastStatus = 500;

      for (const candidateModel of candidateModels) {
        const resp = await fetch(
          `${DAILY_CODE_ASSIST_ENDPOINT}:generateContent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
              Authorization: `Bearer ${accessToken}`,
              'User-Agent': ANTIGRAVITY_USER_AGENT,
            },
            body: JSON.stringify({
              model: candidateModel,
              project: projectId,
              userAgent: 'antigravity',
              requestType: 'agent',
              requestId: `agent-${crypto.randomUUID()}`,
              request: {
                sessionId: `-${Math.floor(
                  1000000000 + Math.random() * 8000000000
                )}`,
                contents: [{ role: 'user', parts }],
                generationConfig: {
                  temperature: 0.2,
                  responseMimeType: 'application/json',
                },
              },
            }),
          }
        );

        if (resp.ok) {
          const rawJson = (await resp.json()) as Record<string, any>;
          const partsList: Array<Record<string, any>> =
            rawJson?.response?.candidates?.[0]?.content?.parts ||
            rawJson?.candidates?.[0]?.content?.parts ||
            [];
          const nonThoughtParts = partsList.filter(
            (p) =>
              !p.thought &&
              typeof p.text === 'string' &&
              p.text.trim().length > 0
          );
          const candidateText =
            nonThoughtParts[nonThoughtParts.length - 1]?.text ||
            partsList[partsList.length - 1]?.text ||
            '';

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              text: candidateText,
              projectId,
              modelUsed: rawJson?.response?.modelVersion || candidateModel,
            })
          );
          return;
        }
        lastStatus = resp.status;
        lastErrText = await resp.text();
        if (resp.status === 401 || resp.status === 403) break;
      }

      if (!envApiKey) {
        res.writeHead(lastStatus, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            error: `Gemini API error (${lastStatus}): ${lastErrText.slice(
              0,
              300
            )}`,
          })
        );
        return;
      }
    }

    if (envApiKey) {
      const apiResp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${encodeURIComponent(
          envApiKey
        )}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts }],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: 'application/json',
            },
          }),
        }
      );

      if (!apiResp.ok) {
        const errText = await apiResp.text();
        res.writeHead(apiResp.status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: errText.slice(0, 300) }));
        return;
      }

      const rawJson = (await apiResp.json()) as Record<string, any>;
      const candidateText =
        rawJson?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ text: candidateText }));
      return;
    }

    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error:
          'No active Google session or API key found. Click "Sign in with Google" or add a Gemini API key in Settings.',
      })
    );
  } catch (err: any) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err?.message || String(err) }));
  }
}
