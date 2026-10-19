# VernacStudio — Corporate Creative & Policy Vernacular Translator

A fast, 2-panel studio for translating and transliterating English office emails, policy updates, and creative posters into **8 Indian Vernacular Languages** in one go while preserving the exact source layout, line breaks, and structure:
- **Hindi** (`hi-IN` — हिन्दी)
- **Marathi** (`mr-IN` — मराठी)
- **Gujarati** (`gu-IN` — ગુજરાતી)
- **Bengali** (`bn-IN` — বাংলা)
- **Tamil** (`ta-IN` — தமிழ்)
- **Telugu** (`te-IN` — తెలుగు)
- **Malayalam** (`ml-IN` — മലയാളം)
- **Kannada** (`kn-IN` — ಕನ್ನಡ)

## Key Features
- **2-Box Plain Text Workflow**:
  - **Box 1 (Left)**: Paste English text or upload/paste (`Ctrl+V`) a creative image.
  - **Box 2 (Right)**: Plain-text vernacular output in the exact same format, line breaks, bullet points, and pipe (`|`) structure — view all 8 languages stacked in one box or switch between individual language tabs.
- **Smart Translate + Transliterate Rules**:
  - Keeps corporate portals & acronyms in English (`OPEN`, `HR Genie`, `EMI`, `FOIR`, `CIBIL`, `DPDP Act, 2023`).
  - Transliterates everyday spoken office English words into native script (`Policy → पॉलिसी`, `Account → अकाउंट`, `Reimbursement → रीइम्बर्समेंट`, `Audit → ऑडिट`).
- **Google AI Pro (Argon 4) & Sarvam AI Support**:
  - Local development auto-detects your signed-in Google AI Pro / Antigravity session on `127.0.0.1` without exposing OAuth tokens to the browser.
  - Supports **Gemini API Key** and **Sarvam AI (`mayura:v1`)** in Settings.

## Local Development

```bash
npm install
npm run dev
```

## Deploying to Vercel

1. Push this repository to GitHub (`.gitignore` excludes `node_modules/`, `dist/`, and `.env*`).
2. Import the project in **Vercel** (`vercel.json` and `/api/*` serverless routes are pre-configured).
3. *(Optional)* In Vercel **Project Settings → Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google AI Studio API key (or `GOOGLE_REFRESH_TOKEN` for server-managed OAuth) so your hosted Vercel app works immediately without requiring browser keys.
