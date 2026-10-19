import {
  AIConfig,
  LanguageCode,
  SmartTermDecision,
} from '../types';
import { DEFAULT_CORPORATE_RULES, LANGUAGES } from '../data/presets';

export function analyzeSmartTerms(rawText: string): SmartTermDecision[] {
  if (!rawText.trim()) return DEFAULT_CORPORATE_RULES;
  const detected: SmartTermDecision[] = [];
  const lower = rawText.toLowerCase();

  for (const rule of DEFAULT_CORPORATE_RULES) {
    if (
      rule.term
        .split('/')
        .some((part) => lower.includes(part.trim().toLowerCase()))
    ) {
      detected.push(rule);
    }
  }

  const acronymRegex = /\b[A-Z]{2,6}\b/g;
  const matches = rawText.match(acronymRegex) || [];
  const seen = new Set(detected.map((d) => d.term.toLowerCase()));

  for (const acr of matches) {
    if (!seen.has(acr.toLowerCase()) && acr.length >= 3) {
      seen.add(acr.toLowerCase());
      detected.push({
        term: acr,
        action: 'keep_english',
        reason: 'Corporate acronym / portal code',
        exampleOutput: acr,
      });
    }
  }

  return detected.length > 0 ? detected : DEFAULT_CORPORATE_RULES;
}

export function buildOneBoxSystemPrompt(
  targetLanguages: LanguageCode[],
  smartTerms: SmartTermDecision[],
  vernacularStyle: AIConfig['vernacularStyle']
): string {
  const langDescriptions = LANGUAGES.filter((l) =>
    targetLanguages.includes(l.code)
  )
    .map(
      (l) =>
        `- "${l.code}": ${l.name} (${l.nativeName} in ${l.scriptName} script)`
    )
    .join('\n');

  const keepEnglishList = smartTerms
    .filter((t) => t.action === 'keep_english')
    .map((t) => `"${t.term}"`)
    .join(', ');

  const translitList = smartTerms
    .filter((t) => t.action === 'transliterate')
    .map((t) => `"${t.term}" (e.g. ${t.exampleOutput})`)
    .join(', ');

  const styleInstruction =
    vernacularStyle === 'everyday_office'
      ? 'Use EVERYDAY SPOKEN OFFICE VERNACULAR (Bolchal). Never use archaic textbook/Sanskritized words. When Indian corporate employees naturally use English office words in conversation ("Policy", "Account", "Audit", "Reimbursement", "Location", "Microfinance", "Gold Loan", "Portal", "Link", "Manager"), transliterate those words into the native script.'
      : vernacularStyle === 'strict_transliteration'
      ? 'Use HEAVY TRANSLITERATION: keep almost all corporate nouns as English words written in the native Indic script, only translating verbs and grammar.'
      : 'Use warm, clear, modern semi-formal corporate language while keeping technical portals and acronyms intact.';

  return `You are India's #1 Corporate Internal Communications & Vernacular Localization Expert.

YOUR TASK:
1. If an image is attached, extract the complete English text from the image in the EXACT same visual reading order, line breaks, headings, numbering, and structure.
2. Translate/localize the English content into each of these ${targetLanguages.length} Indian languages in ONE GO:
${langDescriptions}

CRITICAL FORMAT & VERNACULAR RULES:
- PRESERVE EXACT FORMAT: Each language output MUST be a single plain-text string that keeps the EXACT SAME line breaks, paragraph spacing, bullet points, numbering, and pipe separators (|) as the source text or uploaded image.
- ${styleInstruction}
- KEEP EXACT ENGLISH (do not translate): ${keepEnglishList || '"OPEN", "HR Genie", "DPDP Act, 2023", "EMI", "FOIR", "CIBIL"'}
- TRANSLITERATE INTO NATIVE SCRIPT (do not use stiff dictionary translations): ${translitList || '"Policy" -> पॉलिसी, "Account" -> अकाउंट, "Reimbursement" -> रीइम्बर्समेंट, "Audit" -> ऑडिट, "Locations" -> लोकेशंस'}

Return ONLY valid JSON matching this exact structure (no markdown fences):
{
  "extractedEnglish": "Complete English text in the exact layout/format",
  "translations": {
    "hi-IN": "Complete Hindi plain text in the exact same format and line breaks...",
    "mr-IN": "Complete Marathi plain text in the exact same format and line breaks..."
  }
}`;
}

export async function runOneBoxLocalization(params: {
  rawText: string;
  imageBase64?: string;
  imageMimeType?: string;
  targetLanguages: LanguageCode[];
  smartTerms: SmartTermDecision[];
  config: AIConfig;
  onTokenRefresh?: (newToken: string) => void;
}): Promise<{
  extractedEnglish: string;
  translations: Partial<Record<LanguageCode, string>>;
}> {
  const {
    rawText,
    imageBase64,
    imageMimeType,
    targetLanguages,
    smartTerms,
    config,
    onTokenRefresh,
  } = params;

  // Sarvam AI path if selected
  if (config.providerMode === 'sarvam') {
    if (!config.sarvamApiKey.trim()) {
      throw new Error('Please enter your Sarvam AI API key in Settings.');
    }
    const translations: Partial<Record<LanguageCode, string>> = {};
    for (const lang of targetLanguages) {
      const resp = await fetch('https://api.sarvam.ai/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': config.sarvamApiKey.trim(),
        },
        body: JSON.stringify({
          input: rawText,
          source_language_code: 'en-IN',
          target_language_code: lang,
          model: config.sarvamModel,
          mode:
            config.sarvamModel === 'mayura:v1' ? config.sarvamTone : undefined,
          enable_preprocessing: true,
        }),
      });
      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Sarvam API error (${resp.status}): ${errText}`);
      }
      const data = await resp.json();
      translations[lang] = data.translated_text || '';
    }
    return { extractedEnglish: rawText, translations };
  }

  const systemPrompt = buildOneBoxSystemPrompt(
    targetLanguages,
    smartTerms,
    config.vernacularStyle
  );

  const userPrompt =
    imageBase64 && !rawText.trim()
      ? `Extract all text from this creative image in its exact layout/structure, and localize it into ${targetLanguages.join(
          ', '
        )} in the exact same format.`
      : imageBase64 && rawText.trim()
      ? `Extract and localize the content from the attached creative image (and/or reference text below) into ${targetLanguages.join(
          ', '
        )} in the exact same format:\n\n"""\n${rawText}\n"""`
      : `Localize this English text into ${targetLanguages.join(
          ', '
        )} in the exact same format, line breaks, and structure:\n\n"""\n${rawText}\n"""`;

  const hasApiKey = Boolean(config.geminiApiKey.trim());

  // Path 1: Google Sign-In / Local Antigravity Argon Proxy (Default)
  if (!hasApiKey || Boolean(config.googleOAuthToken.trim())) {
    const resp = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: config.googleOAuthToken.trim(),
        refreshToken: config.googleRefreshToken || '',
        projectId: config.googleProjectId || '',
        model: config.geminiModel || 'argon-gemini-2.5-pro',
        systemPrompt,
        userPrompt,
        imageBase64,
        imageMimeType,
      }),
    });

    const data = await resp.json();
    if (!resp.ok || data.error) {
      throw new Error(
        data.error || `Gemini request failed (${resp.status})`
      );
    }

    if (data.newAccessToken && onTokenRefresh) {
      onTokenRefresh(data.newAccessToken);
    }

    return parseOneBoxResponse(data.text || '', rawText);
  }

  // Path 2: Direct Gemini API Key
  const rawModel = config.geminiModel.trim() || 'gemini-2.5-flash';
  const modelId =
    rawModel.toLowerCase().includes('argon') ||
    rawModel.toLowerCase().includes('pro')
      ? 'gemini-2.5-pro'
      : rawModel.replace(/^models\//, '');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    modelId
  )}:generateContent?key=${encodeURIComponent(config.geminiApiKey.trim())}`;

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

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const candidateText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return parseOneBoxResponse(candidateText, rawText);
}

function parseOneBoxResponse(
  rawJsonText: string,
  fallbackEnglish: string
): {
  extractedEnglish: string;
  translations: Partial<Record<LanguageCode, string>>;
} {
  const cleaned = String(rawJsonText || '')
    .replace(/^```json\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  // Support new flat schema {"extractedEnglish": "...", "translations": {"hi-IN": "..."}}
  if (parsed?.translations && typeof parsed.translations === 'object') {
    const out: Partial<Record<LanguageCode, string>> = {};
    for (const lang of LANGUAGES) {
      const val = parsed.translations[lang.code];
      if (typeof val === 'string') {
        out[lang.code] = val.trim();
      } else if (val && typeof val.text === 'string') {
        out[lang.code] = val.text.trim();
      }
    }
    return {
      extractedEnglish:
        typeof parsed.extractedEnglish === 'string' &&
        parsed.extractedEnglish.trim()
          ? parsed.extractedEnglish.trim()
          : fallbackEnglish,
      translations: out,
    };
  }

  // Fallback if model returned blocks[] array
  if (Array.isArray(parsed?.blocks)) {
    const out: Partial<Record<LanguageCode, string>> = {};
    const engLines: string[] = [];
    for (const b of parsed.blocks) {
      if (b.englishText) engLines.push(b.englishText);
    }
    for (const lang of LANGUAGES) {
      const lines = parsed.blocks
        .map((b: any) => {
          const cell = b.translations?.[lang.code];
          return typeof cell === 'string' ? cell : cell?.text || '';
        })
        .filter(Boolean);
      if (lines.length > 0) {
        out[lang.code] = lines.join('\n\n');
      }
    }
    return {
      extractedEnglish: engLines.join('\n\n') || fallbackEnglish,
      translations: out,
    };
  }

  throw new Error('Unexpected response format from AI model.');
}

export function formatCombinedPlainText(
  translations: Partial<Record<LanguageCode, string>>,
  selectedLanguages: LanguageCode[]
): string {
  const sections: string[] = [];
  for (const lang of LANGUAGES) {
    if (!selectedLanguages.includes(lang.code)) continue;
    const text = translations[lang.code]?.trim();
    if (!text) continue;
    sections.push(
      `=== ${lang.name.toUpperCase()} (${lang.nativeName}) ===\n${text}`
    );
  }
  return sections.join('\n\n\n');
}
