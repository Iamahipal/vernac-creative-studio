import type { IncomingMessage, ServerResponse } from 'node:http';

export default async function handler(
  _req: IncomingMessage,
  res: ServerResponse
) {
  const hasServerRefreshToken = Boolean(
    process.env.GOOGLE_REFRESH_TOKEN?.trim()
  );
  const hasServerApiKey = Boolean(process.env.GEMINI_API_KEY?.trim());

  if (hasServerRefreshToken || hasServerApiKey) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        available: true,
        accessToken: '__SERVER_MANAGED__',
        refreshToken: '',
        email: process.env.GOOGLE_ACCOUNT_EMAIL || 'Server Connected',
        name: 'Argon Cloud',
        picture: '',
        projectId: 'aicode-consumers',
        tierName: 'Google AI Pro (Argon)',
      })
    );
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ available: false }));
}
