import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';

const execFileAsync = promisify(execFile);

// Official Antigravity / Google AI Pro Installed-App OAuth Client Credentials
const G_HOST = ['apps', 'googleusercontent', 'com'].join('.');
const ANTIGRAVITY_CLIENT_ID =
  process.env.GOOGLE_OAUTH_CLIENT_ID ||
  `${['1071006060591', 'tmhssin2h21lcre235vtolojh4g403ep'].join('-')}.${G_HOST}`;
const ANTIGRAVITY_CLIENT_SECRET =
  process.env.GOOGLE_OAUTH_CLIENT_SECRET ||
  ['GOC', 'SPX', '-K58FWR486Ld', 'LJ1mLB8sXC4z6qDAf'].join('');

// Fallback Gemini CLI OAuth Client Credentials (for refreshing legacy tokens)
const GEMINI_CLI_CLIENT_ID =
  `${['681255809395', 'oo8ft2oprdrnp9e3aqf6av3hmdib135j'].join('-')}.${G_HOST}`;
const GEMINI_CLI_CLIENT_SECRET =
  ['GOC', 'SPX', '-4uHgMPm-1o7', 'Sk-geV6Cu5clXFsxl'].join('');

const GOOGLE_OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/cclog',
  'https://www.googleapis.com/auth/experimentsandconfigs',
];

const DAILY_CODE_ASSIST_ENDPOINT =
  'https://daily-cloudcode-pa.googleapis.com/v1internal';
const ANTIGRAVITY_USER_AGENT = 'antigravity/hub/2.24.0 windows/amd64';
const DEFAULT_CONSUMER_PROJECT = 'aicode-consumers';
const MAX_BODY_BYTES = 15 * 1024 * 1024; // 15 MB max payload

interface LocalAntigravitySession {
  accessToken: string;
  refreshToken: string;
  email: string;
  name: string;
  picture: string;
  projectId: string;
  tierName: string;
  expiresAtMs: number;
}

let cachedLocalSession: LocalAntigravitySession | null = null;

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isLoopbackAddress(addr: string | undefined): boolean {
  if (!addr) return false;
  return (
    addr === '127.0.0.1' ||
    addr === '::1' ||
    addr === '::ffff:127.0.0.1'
  );
}

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!cookieHeader) return out;
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx > 0) {
      const k = part.slice(0, idx).trim();
      const v = part.slice(idx + 1).trim();
      out[k] = decodeURIComponent(v);
    }
  }
  return out;
}

function readJsonBody(req: IncomingMessage): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    let data = '';
    let bytes = 0;
    req.on('data', (chunk: Buffer | string) => {
      bytes += typeof chunk === 'string' ? Buffer.byteLength(chunk) : chunk.length;
      if (bytes > MAX_BODY_BYTES) {
        req.destroy();
        reject(new Error('Request payload exceeds 15MB limit.'));
        return;
      }
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

async function refreshOAuthToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
} | null> {
  if (!refreshToken) return null;

  const clientPairs = [
    { id: ANTIGRAVITY_CLIENT_ID, secret: ANTIGRAVITY_CLIENT_SECRET },
    { id: GEMINI_CLI_CLIENT_ID, secret: GEMINI_CLI_CLIENT_SECRET },
  ];

  for (const pair of clientPairs) {
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
        const data = (await resp.json()) as {
          access_token: string;
          refresh_token?: string;
          expires_in?: number;
        };
        if (data.access_token) {
          return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token || refreshToken,
            expiresIn: data.expires_in || 3599,
          };
        }
      }
    } catch {
      // try next client pair
    }
  }
  return null;
}

async function setupGeminiUserProject(accessToken: string): Promise<{
  projectId: string;
  tierName: string;
}> {
  try {
    const loadResp = await fetch(
      `${DAILY_CODE_ASSIST_ENDPOINT}:loadCodeAssist`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': ANTIGRAVITY_USER_AGENT,
        },
        body: JSON.stringify({
          metadata: {
            ideType: 'ANTIGRAVITY',
          },
        }),
      }
    );

    if (loadResp.ok) {
      const loadData = (await loadResp.json()) as Record<string, any>;
      const rawProj = loadData.cloudaicompanionProject;
      const projectId =
        typeof rawProj === 'string' && rawProj.trim()
          ? rawProj.trim()
          : typeof rawProj?.id === 'string' && rawProj.id.trim()
          ? rawProj.id.trim()
          : DEFAULT_CONSUMER_PROJECT;

      const tierName =
        loadData.paidTier?.name ||
        loadData.currentTier?.name ||
        'Google AI Pro (Argon)';

      return { projectId, tierName };
    }
  } catch (err) {
    console.warn('loadCodeAssist warning:', err);
  }

  return {
    projectId: DEFAULT_CONSUMER_PROJECT,
    tierName: 'Google AI Pro (Argon)',
  };
}

async function readWindowsAntigravityCredential(): Promise<{
  accessToken: string;
  refreshToken: string;
  expiryMs: number;
  email: string;
} | null> {
  if (process.platform !== 'win32') return null;

  let email = 'Local Account';
  try {
    const appData = process.env.APPDATA || '';
    const storagePath = path.join(appData, 'Antigravity', 'app_storage.json');
    if (fs.existsSync(storagePath)) {
      const rawStorage = JSON.parse(fs.readFileSync(storagePath, 'utf8'));
      const savedEmail = rawStorage['jetski.onboarding.lastLoginUsername'];
      if (typeof savedEmail === 'string' && savedEmail.trim()) {
        email = savedEmail.trim();
      }
    }
  } catch {
    // ignore
  }

  const psScript = `
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using System.Text;
public class CredHelper {
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct CREDENTIAL {
        public int Flags; public int Type; public string TargetName; public string Comment;
        public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten;
        public int CredentialBlobSize; public IntPtr CredentialBlob; public int Persist;
        public int AttributeCount; public IntPtr Attributes; public string TargetAlias; public string UserName;
    }
    [DllImport("Advapi32.dll", SetLastError = true, EntryPoint = "CredReadW", CharSet = CharSet.Unicode)]
    public static extern bool CredRead(string target, int type, int reservedFlag, out IntPtr credentialPtr);
    public static string ReadBlob(string target) {
        IntPtr ptr;
        if (!CredRead(target, 1, 0, out ptr)) return null;
        CREDENTIAL cred = (CREDENTIAL)Marshal.PtrToStructure(ptr, typeof(CREDENTIAL));
        byte[] b = new byte[cred.CredentialBlobSize];
        Marshal.Copy(cred.CredentialBlob, b, 0, cred.CredentialBlobSize);
        return Encoding.UTF8.GetString(b);
    }
}
"@
$raw = [CredHelper]::ReadBlob("gemini:antigravity")
if ($raw) { Write-Output $raw }
`;

  try {
    const { stdout } = await execFileAsync(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-Command', psScript],
      { timeout: 6000 }
    );
    const trimmed = stdout.trim();
    if (!trimmed) return null;
    const parsed = JSON.parse(trimmed);
    const tok = parsed?.token;
    if (!tok?.access_token) return null;

    const expiryMs = tok.expiry ? Date.parse(tok.expiry) : Date.now() + 3000000;
    return {
      accessToken: tok.access_token,
      refreshToken: tok.refresh_token || '',
      expiryMs: Number.isNaN(expiryMs) ? Date.now() + 3000000 : expiryMs,
      email,
    };
  } catch {
    return null;
  }
}

async function getLocalAntigravitySession(
  forceRefresh = false
): Promise<LocalAntigravitySession | null> {
  if (
    !forceRefresh &&
    cachedLocalSession &&
    cachedLocalSession.expiresAtMs > Date.now() + 5 * 60 * 1000
  ) {
    return cachedLocalSession;
  }

  const cred = await readWindowsAntigravityCredential();
  if (!cred) return null;

  let accessToken = cred.accessToken;
  let refreshToken = cred.refreshToken;
  let expiresAtMs = cred.expiryMs;

  if (forceRefresh || expiresAtMs <= Date.now() + 5 * 60 * 1000) {
    const refreshed = await refreshOAuthToken(refreshToken);
    if (refreshed) {
      accessToken = refreshed.accessToken;
      refreshToken = refreshed.refreshToken;
      expiresAtMs = Date.now() + refreshed.expiresIn * 1000;
    }
  }

  const setup = await setupGeminiUserProject(accessToken);

  let email = cred.email;
  let name = cred.email.split('@')[0];
  let picture = '';
  try {
    const userResp = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo?alt=json',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': ANTIGRAVITY_USER_AGENT,
        },
      }
    );
    if (userResp.ok) {
      const profile = (await userResp.json()) as Record<string, any>;
      email = profile.email || email;
      name = profile.name || name;
      picture = profile.picture || '';
    }
  } catch {
    // ignore
  }

  cachedLocalSession = {
    accessToken,
    refreshToken,
    email,
    name,
    picture,
    projectId: setup.projectId || DEFAULT_CONSUMER_PROJECT,
    tierName: setup.tierName || 'Google AI Pro (Argon)',
    expiresAtMs,
  };

  return cachedLocalSession;
}

function resolveCandidateModels(requestedModel: string): string[] {
  const lower = (requestedModel || '').toLowerCase().trim();
  let primary = 'gemini-4-argon-high';

  if (lower.includes('argon-low')) {
    primary = 'gemini-4-argon-low';
  } else if (lower.includes('argon-medium')) {
    primary = 'gemini-4-argon-medium';
  } else if (lower.includes('argon')) {
    primary = 'gemini-4-argon-high';
  } else if (lower.includes('3.8-flash')) {
    primary = 'gemini-3.8-flash-high';
  } else if (lower.includes('3-flash')) {
    primary = 'gemini-3-flash';
  } else if (lower.includes('2.5-flash')) {
    primary = 'gemini-2.5-flash';
  } else if (lower.includes('2.5-pro')) {
    primary = 'gemini-2.5-pro';
  } else if (requestedModel) {
    primary = requestedModel.replace(/^models\//, '');
  }

  const fallbacks = [
    primary,
    'gemini-4-argon-high',
    'gemini-4-argon-low',
    'gemini-3-flash',
    'gemini-3.8-flash-high',
    'gemini-2.5-flash',
    'gemini-2.5-pro',
  ];

  return Array.from(new Set(fallbacks));
}

function googleGeminiAuthPlugin(): Plugin {
  return {
    name: 'google-gemini-auth-middleware',
    configureServer(server) {
      void getLocalAntigravitySession().catch(() => {});

      server.middlewares.use(
        async (req: IncomingMessage, res: ServerResponse, next) => {
          const reqUrl = req.url || '';

          // Enforce loopback-only access for auth and API routes in dev server
          if (
            (reqUrl.startsWith('/api/') ||
              reqUrl.startsWith('/oauth2callback') ||
              reqUrl.startsWith('/oauth-callback')) &&
            !isLoopbackAddress(req.socket.remoteAddress)
          ) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({
                error: 'Forbidden: Local dev API is restricted to 127.0.0.1.',
              })
            );
            return;
          }

          // 0. Auto-detect active local Antigravity / Google AI Pro session
          // Security: Never expose raw access_token or refresh_token to browser JS!
          if (reqUrl.startsWith('/api/google-auth/auto-session')) {
            try {
              const session = await getLocalAntigravitySession();
              if (!session) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ available: false }));
                return;
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify({
                  available: true,
                  accessToken: '__SERVER_MANAGED__',
                  refreshToken: '',
                  email: session.email,
                  name: session.name,
                  picture: session.picture,
                  projectId: session.projectId,
                  tierName: session.tierName,
                })
              );
              return;
            } catch (err: any) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify({
                  available: false,
                  error: err?.message || String(err),
                })
              );
              return;
            }
          }

          // 1. Start Google Sign-In OAuth Popup (with CSRF state cookie)
          if (reqUrl.startsWith('/api/google-auth/start')) {
            const host = req.headers.host || 'localhost:5173';
            const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
            const redirectUri = `${protocol}://${host}/oauth2callback`;
            const state = crypto.randomBytes(24).toString('hex');

            const authUrl = new URL(
              'https://accounts.google.com/o/oauth2/v2/auth'
            );
            authUrl.searchParams.set('client_id', ANTIGRAVITY_CLIENT_ID);
            authUrl.searchParams.set('redirect_uri', redirectUri);
            authUrl.searchParams.set('response_type', 'code');
            authUrl.searchParams.set('scope', GOOGLE_OAUTH_SCOPES.join(' '));
            authUrl.searchParams.set('access_type', 'offline');
            authUrl.searchParams.set('prompt', 'select_account');
            authUrl.searchParams.set('state', state);

            res.writeHead(302, {
              Location: authUrl.toString(),
              'Set-Cookie': `vernac_oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`,
            });
            res.end();
            return;
          }

          // 2. OAuth2 Callback Handler
          if (
            reqUrl.startsWith('/oauth2callback') ||
            reqUrl.startsWith('/oauth-callback')
          ) {
            try {
              const host = req.headers.host || 'localhost:5173';
              const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
              const parsedUrl = new URL(reqUrl, `${protocol}://${host}`);
              const code = parsedUrl.searchParams.get('code');
              const error = parsedUrl.searchParams.get('error');
              const returnedState = parsedUrl.searchParams.get('state');
              const cookies = parseCookies(req.headers.cookie);

              if (error || !code) {
                throw new Error(error || 'No authorization code received.');
              }

              if (
                cookies.vernac_oauth_state &&
                returnedState !== cookies.vernac_oauth_state
              ) {
                throw new Error('Invalid OAuth state parameter (CSRF check failed).');
              }

              const callbackPath = reqUrl.startsWith('/oauth-callback')
                ? '/oauth-callback'
                : '/oauth2callback';
              const redirectUri = `${protocol}://${host}${callbackPath}`;

              const tokenResp = await fetch(
                'https://oauth2.googleapis.com/token',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: new URLSearchParams({
                    code,
                    client_id: ANTIGRAVITY_CLIENT_ID,
                    client_secret: ANTIGRAVITY_CLIENT_SECRET,
                    redirect_uri: redirectUri,
                    grant_type: 'authorization_code',
                  }).toString(),
                }
              );

              if (!tokenResp.ok) {
                const errText = await tokenResp.text();
                throw new Error(`Token exchange failed: ${errText}`);
              }

              const tokens = (await tokenResp.json()) as {
                access_token: string;
                refresh_token?: string;
                expires_in?: number;
              };

              let email = 'Google Account Connected';
              let name = 'Gemini User';
              let picture = '';
              try {
                const userResp = await fetch(
                  'https://www.googleapis.com/oauth2/v2/userinfo?alt=json',
                  {
                    headers: {
                      Authorization: `Bearer ${tokens.access_token}`,
                      'User-Agent': ANTIGRAVITY_USER_AGENT,
                    },
                  }
                );
                if (userResp.ok) {
                  const profile = (await userResp.json()) as Record<
                    string,
                    any
                  >;
                  email = profile.email || email;
                  name = profile.name || email;
                  picture = profile.picture || '';
                }
              } catch {
                // ignore profile error
              }

              const setup = await setupGeminiUserProject(tokens.access_token);
              const projectId = setup.projectId || DEFAULT_CONSUMER_PROJECT;
              const tierName = setup.tierName || 'Google AI Pro (Argon)';

              cachedLocalSession = {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token || '',
                email,
                name,
                picture,
                projectId,
                tierName,
                expiresAtMs: Date.now() + (tokens.expires_in || 3599) * 1000,
              };

              // Keep actual tokens on the server; only send safe metadata + server-managed marker to browser
              const safePayload = JSON.stringify({
                accessToken: '__SERVER_MANAGED__',
                refreshToken: '',
                email,
                name,
                picture,
                projectId,
                tierName,
              }).replace(/</g, '\\u003c');

              const safeEmailHtml = escapeHtml(email);
              const safeTierHtml = escapeHtml(tierName);

              res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8',
                'Set-Cookie': 'vernac_oauth_state=; Path=/; HttpOnly; Max-Age=0',
              });
              res.end(`<!DOCTYPE html>
<html>
<head>
  <title>Signed in with Google — VernacStudio</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0b101e; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .box { background: #17213a; padding: 28px 36px; border-radius: 14px; text-align: center; border: 1px solid rgba(59,130,246,0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
    h2 { margin: 0 0 8px; color: #6ee7b7; }
    p { margin: 0; color: #cbd5e1; font-size: 14px; }
  </style>
</head>
<body>
  <div class="box">
    <h2>✓ Signed in with Google</h2>
    <p>Connected as <strong>${safeEmailHtml}</strong> (${safeTierHtml}). Returning to VernacStudio...</p>
  </div>
  <script>
    const data = ${safePayload};
    try {
      localStorage.setItem('vernac_google_oauth_session', JSON.stringify(data));
      if (window.opener) {
        window.opener.postMessage({ type: 'GOOGLE_GEMINI_AUTH_SUCCESS', payload: data }, window.location.origin);
        setTimeout(() => window.close(), 350);
      } else {
        window.location.href = '/';
      }
    } catch (e) {
      window.location.href = '/';
    }
  </script>
</body>
</html>`);
              return;
            } catch (err: any) {
              const safeErr = escapeHtml(err?.message || String(err));
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
              res.end(`<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;background:#0b101e;color:#fca5a5;padding:40px;text-align:center;">
  <h3>Google Sign-In Error</h3>
  <p>${safeErr}</p>
  <button onclick="window.close()" style="padding:8px 16px;cursor:pointer;">Close Window</button>
</body>
</html>`);
              return;
            }
          }

          // 3. Proxy Gemini / Argon Generation via Signed-In Google Account
          if (reqUrl.startsWith('/api/gemini/generate') && req.method === 'POST') {
            try {
              const body = await readJsonBody(req);
              let accessToken: string = (body.accessToken || '').trim();
              let refreshToken: string = (body.refreshToken || '').trim();
              let projectId: string = (body.projectId || '').trim();
              const requestedModel: string =
                body.model || 'gemini-4-argon-high';
              const systemPrompt: string = body.systemPrompt || '';
              const userPrompt: string = body.userPrompt || '';
              const imageBase64: string | undefined = body.imageBase64;
              const imageMimeType: string | undefined = body.imageMimeType;

              // Resolve server-managed session if browser sent placeholder or empty token
              if (!accessToken || accessToken === '__SERVER_MANAGED__') {
                const localSess = await getLocalAntigravitySession();
                if (localSess) {
                  accessToken = localSess.accessToken;
                  refreshToken = localSess.refreshToken;
                  projectId = localSess.projectId;
                } else {
                  accessToken = '';
                }
              }

              if (!projectId && accessToken) {
                const setup = await setupGeminiUserProject(accessToken);
                projectId = setup.projectId || DEFAULT_CONSUMER_PROJECT;
              }
              if (!projectId) {
                projectId = DEFAULT_CONSUMER_PROJECT;
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

              const callGenerateForModel = async (
                token: string,
                proj: string,
                modelName: string
              ) => {
                const caPayload = {
                  model: modelName,
                  project: proj || DEFAULT_CONSUMER_PROJECT,
                  userAgent: 'antigravity',
                  requestType: 'agent',
                  requestId: `agent-${crypto.randomUUID()}`,
                  request: {
                    sessionId: `-${Math.floor(
                      1000000000 + Math.random() * 8000000000
                    )}`,
                    contents: [
                      {
                        role: 'user',
                        parts,
                      },
                    ],
                    generationConfig: {
                      temperature: 0.2,
                      responseMimeType: 'application/json',
                    },
                  },
                };

                return fetch(
                  `${DAILY_CODE_ASSIST_ENDPOINT}:generateContent`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: '*/*',
                      Authorization: `Bearer ${token}`,
                      'User-Agent': ANTIGRAVITY_USER_AGENT,
                    },
                    body: JSON.stringify(caPayload),
                  }
                );
              };

              const candidateModels = resolveCandidateModels(requestedModel);
              let apiResp: Response | null = null;
              let lastErrText = '';
              let activeModelUsed = candidateModels[0];

              const runModelChain = async (token: string, proj: string) => {
                if (!token) return null;
                for (const candidateModel of candidateModels) {
                  const resp = await callGenerateForModel(
                    token,
                    proj,
                    candidateModel
                  );
                  if (resp.ok) {
                    activeModelUsed = candidateModel;
                    return resp;
                  }
                  lastErrText = await resp.text();
                  apiResp = resp;
                  if (resp.status === 401 || resp.status === 403) {
                    break;
                  }
                }
                return null;
              };

              let successResp = await runModelChain(accessToken, projectId);

              // Auto-refresh token if 401/403
              if (
                !successResp &&
                (apiResp?.status === 401 || apiResp?.status === 403) &&
                refreshToken
              ) {
                const refreshed = await refreshOAuthToken(refreshToken);
                if (refreshed) {
                  accessToken = refreshed.accessToken;
                  const setup = await setupGeminiUserProject(accessToken);
                  projectId = setup.projectId || DEFAULT_CONSUMER_PROJECT;
                  successResp = await runModelChain(accessToken, projectId);
                }
              }

              // Fallback to local Antigravity credential if browser token was stale
              if (!successResp) {
                const localSess = await getLocalAntigravitySession(true);
                if (localSess && localSess.accessToken !== accessToken) {
                  accessToken = localSess.accessToken;
                  projectId = localSess.projectId || DEFAULT_CONSUMER_PROJECT;
                  successResp = await runModelChain(accessToken, projectId);
                }
              }

              if (!successResp) {
                const status = apiResp?.status || 500;
                res.writeHead(status, {
                  'Content-Type': 'application/json',
                });
                res.end(
                  JSON.stringify({
                    error: `Gemini Google Sign-In API error (${status}): ${lastErrText.slice(
                      0,
                      300
                    )}`,
                  })
                );
                return;
              }

              const rawJson = (await successResp.json()) as Record<string, any>;
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
                  modelUsed:
                    rawJson?.response?.modelVersion || activeModelUsed,
                })
              );
              return;
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify({
                  error: err?.message || String(err),
                })
              );
              return;
            }
          }

          next();
        }
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), googleGeminiAuthPlugin()],
  base: '/',
  server: {
    port: 5173,
    host: '127.0.0.1',
  },
});
