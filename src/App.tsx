import React, { useEffect, useRef, useState } from 'react';
import {
  Check,
  Copy,
  Globe,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Plus,
  Settings,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  AIConfig,
  LanguageCode,
  SmartTermDecision,
  TermAction,
} from './types';
import {
  DEFAULT_CORPORATE_RULES,
  LANGUAGES,
  PRESET_CREATIVES,
} from './data/presets';
import {
  analyzeSmartTerms,
  formatCombinedPlainText,
  runOneBoxLocalization,
} from './services/translationEngine';

const ALL_LANG_CODES: LanguageCode[] = LANGUAGES.map((l) => l.code);

function GoogleGIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function buildInitialTranslationsFromPreset(): Partial<
  Record<LanguageCode, string>
> {
  const preset = PRESET_CREATIVES[0];
  const out: Partial<Record<LanguageCode, string>> = {};
  for (const lang of LANGUAGES) {
    out[lang.code] = preset.blocks
      .map((b) => b.translations[lang.code]?.text || '')
      .filter(Boolean)
      .join('\n\n');
  }
  return out;
}

export function App() {
  const [sourceText, setSourceText] = useState<string>(
    PRESET_CREATIVES[0].rawSourceText
  );
  const [translations, setTranslations] = useState<
    Partial<Record<LanguageCode, string>>
  >(buildInitialTranslationsFromPreset);

  // 'ALL' shows all languages stacked in one box; or a single LanguageCode shows that language in the box
  const [activeTab, setActiveTab] = useState<'ALL' | LanguageCode>('ALL');
  const [selectedLanguages, setSelectedLanguages] =
    useState<LanguageCode[]>(ALL_LANG_CODES);

  const [smartTerms, setSmartTerms] = useState<SmartTermDecision[]>(
    DEFAULT_CORPORATE_RULES
  );
  const [showRulesBar, setShowRulesBar] = useState<boolean>(false);
  const [newTermText, setNewTermText] = useState('');
  const [newTermAction, setNewTermAction] =
    useState<TermAction>('transliterate');
  const [newTermExample, setNewTermExample] = useState('');

  const [uploadedImageBase64, setUploadedImageBase64] = useState<
    string | undefined
  >();
  const [uploadedImageMime, setUploadedImageMime] = useState<
    string | undefined
  >();
  const [uploadedImageName, setUploadedImageName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const settingsDialogRef = useRef<HTMLDialogElement | null>(null);

  const [isRunningAI, setIsRunningAI] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [aiConfig, setAiConfig] = useState<AIConfig>(() => {
    const saved = localStorage.getItem('vernac_studio_ai_config_v2');
    const savedOAuth = localStorage.getItem('vernac_google_oauth_session');
    let oauthData: Record<string, string> = {};
    if (savedOAuth) {
      try {
        oauthData = JSON.parse(savedOAuth);
      } catch {
        // ignore
      }
    }
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          googleOAuthToken:
            oauthData.accessToken || parsed.googleOAuthToken || '',
          googleRefreshToken:
            oauthData.refreshToken || parsed.googleRefreshToken || '',
          googleUserEmail: oauthData.email || parsed.googleUserEmail || '',
          googleUserName: oauthData.name || parsed.googleUserName || '',
          googleUserPicture:
            oauthData.picture || parsed.googleUserPicture || '',
          googleProjectId:
            oauthData.projectId || parsed.googleProjectId || 'aicode-consumers',
          googleTierName:
            oauthData.tierName ||
            parsed.googleTierName ||
            'Google AI Pro (Argon)',
        };
      } catch {
        // fallback below
      }
    }
    return {
      providerMode: 'gemini',
      geminiApiKey: '',
      googleOAuthToken: oauthData.accessToken || '',
      googleRefreshToken: oauthData.refreshToken || '',
      googleOAuthClientId: '',
      googleUserEmail: oauthData.email || '',
      googleUserName: oauthData.name || '',
      googleUserPicture: oauthData.picture || '',
      googleProjectId: oauthData.projectId || 'aicode-consumers',
      googleTierName: oauthData.tierName || 'Google AI Pro (Argon)',
      geminiModel: 'argon-gemini-2.5-pro',
      sarvamApiKey: '',
      sarvamModel: 'mayura:v1',
      sarvamTone: 'modern-colloquial',
      vernacularStyle: 'everyday_office',
    };
  });

  useEffect(() => {
    localStorage.setItem('vernac_studio_ai_config_v2', JSON.stringify(aiConfig));
  }, [aiConfig]);

  // Auto-sync active Google AI Pro / Antigravity session & listen for 1-Click OAuth Popup
  useEffect(() => {
    fetch('/api/google-auth/auto-session')
      .then((r) => r.json())
      .then((data) => {
        if (data?.available && data?.accessToken) {
          setAiConfig((prev) => ({
            ...prev,
            providerMode: 'gemini',
            googleOAuthToken: data.accessToken,
            googleRefreshToken: data.refreshToken || prev.googleRefreshToken,
            googleUserEmail: data.email || prev.googleUserEmail,
            googleUserName: data.name || prev.googleUserName,
            googleUserPicture: data.picture || prev.googleUserPicture,
            googleProjectId: data.projectId || 'aicode-consumers',
            googleTierName: data.tierName || 'Google AI Pro (Argon)',
          }));
        }
      })
      .catch(() => {});

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === 'GOOGLE_GEMINI_AUTH_SUCCESS') {
        const payload = event.data.payload;
        setAiConfig((prev) => ({
          ...prev,
          providerMode: 'gemini',
          geminiModel: 'argon-gemini-2.5-pro',
          googleOAuthToken: payload.accessToken || '__SERVER_MANAGED__',
          googleRefreshToken: payload.refreshToken || '',
          googleUserEmail: payload.email || 'Google Account Connected',
          googleUserName: payload.name || '',
          googleUserPicture: payload.picture || '',
          googleProjectId: payload.projectId || 'aicode-consumers',
          googleTierName: payload.tierName || 'Google AI Pro (Argon)',
        }));
        setIsSigningIn(false);
        setErrorMessage(null);
        setStatusMessage(
          `Signed in as ${payload.email} (${
            payload.tierName || 'Google AI Pro'
          })`
        );
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Mandatory fallback for browsers without native <dialog closedby> support
  useEffect(() => {
    const dialog = settingsDialogRef.current;
    if (!dialog) return;

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      };
      dialog.addEventListener('click', handleBackdropClick);
      return () => dialog.removeEventListener('click', handleBackdropClick);
    }
  }, []);

  // Support pasting an image directly with Ctrl+V anywhere in the window
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            loadImageFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const loadImageFile = (file: File) => {
    const allowedMimes = [
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/gif',
    ];
    if (file.type && !allowedMimes.includes(file.type)) {
      setErrorMessage('Please upload a PNG, JPG, WEBP, or GIF image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Image file size must be under 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const base64 = result.split(',')[1];
      setUploadedImageBase64(base64);
      setUploadedImageMime(file.type || 'image/png');
      setUploadedImageName(file.name || 'Pasted Creative Image');
      // Clear old text so the uploaded image is translated cleanly without mixing old preset text
      setSourceText('');
      setStatusMessage(
        `Image "${file.name || 'Creative'}" attached — click "Translate in One Go" to extract & translate!`
      );
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    loadImageFile(file);
    e.target.value = '';
  };

  const handleClearSource = () => {
    setSourceText('');
    setUploadedImageBase64(undefined);
    setUploadedImageMime(undefined);
    setUploadedImageName('');
    setTranslations({});
    setErrorMessage(null);
    setStatusMessage(null);
  };

  const handleOneClickGoogleSignIn = () => {
    setErrorMessage(null);
    setIsSigningIn(true);
    const width = 520;
    const height = 640;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(
      '/api/google-auth/start',
      'google_gemini_signin',
      `width=${width},height=${height},left=${left},top=${top},noopener=no`
    );
    if (!popup) {
      window.location.href = '/api/google-auth/start';
    } else {
      const timer = setInterval(() => {
        if (popup.closed) {
          clearInterval(timer);
          setIsSigningIn(false);
        }
      }, 600);
    }
  };

  const handleGoogleSignOut = () => {
    localStorage.removeItem('vernac_google_oauth_session');
    setAiConfig((prev) => ({
      ...prev,
      googleOAuthToken: '',
      googleRefreshToken: '',
      googleUserEmail: '',
      googleUserName: '',
      googleUserPicture: '',
      googleProjectId: '',
    }));
    setStatusMessage('Signed out of Google account.');
  };

  const handleRunTranslate = async () => {
    if (!sourceText.trim() && !uploadedImageBase64) {
      setErrorMessage(
        'Please paste English text or upload/paste a creative image first.'
      );
      return;
    }

    setErrorMessage(null);
    setStatusMessage(null);
    setIsRunningAI(true);

    try {
      const activeRules = sourceText.trim()
        ? analyzeSmartTerms(sourceText)
        : smartTerms;

      const result = await runOneBoxLocalization({
        rawText: sourceText,
        imageBase64: uploadedImageBase64,
        imageMimeType: uploadedImageMime,
        targetLanguages: selectedLanguages,
        smartTerms: activeRules,
        config: aiConfig,
        onTokenRefresh: (newToken) => {
          setAiConfig((prev) => ({
            ...prev,
            googleOAuthToken: newToken,
          }));
        },
      });

      if (result.extractedEnglish && !sourceText.trim()) {
        setSourceText(result.extractedEnglish);
      }

      setTranslations((prev) => ({
        ...prev,
        ...result.translations,
      }));

      setStatusMessage(
        `Translated into ${selectedLanguages.length} vernacular language${
          selectedLanguages.length > 1 ? 's' : ''
        } in exact format!`
      );
    } catch (err: any) {
      setErrorMessage(err?.message || 'Translation failed.');
    } finally {
      setIsRunningAI(false);
    }
  };

  const displayedOutputText =
    activeTab === 'ALL'
      ? formatCombinedPlainText(translations, selectedLanguages)
      : translations[activeTab] || '';

  const handleOutputChange = (newVal: string) => {
    if (activeTab !== 'ALL') {
      setTranslations((prev) => ({
        ...prev,
        [activeTab]: newVal,
      }));
    }
  };

  const handleCopyOutput = () => {
    if (!displayedOutputText.trim()) return;
    navigator.clipboard.writeText(displayedOutputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const toggleTargetLanguage = (code: LanguageCode) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(code)) {
        if (prev.length === 1) return prev;
        return prev.filter((c) => c !== code);
      }
      return [...prev, code];
    });
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTermText.trim()) return;
    setSmartTerms((prev) => [
      {
        term: newTermText.trim(),
        action: newTermAction,
        reason: 'Custom word rule',
        exampleOutput:
          newTermExample.trim() ||
          (newTermAction === 'keep_english'
            ? newTermText.trim()
            : `${newTermText.trim()} (phonetic)`),
      },
      ...prev,
    ]);
    setNewTermText('');
    setNewTermExample('');
  };

  const isGoogleConnected = Boolean(aiConfig.googleOAuthToken.trim());

  return (
    <div className="simple-shell">
      {/* Minimal Top Bar */}
      <header className="simple-topbar">
        <div className="brand-group">
          <div className="brand-logo">
            <Globe size={17} />
            <span>VernacStudio</span>
          </div>
          <span className="brand-tagline">
            Paste Text or Upload Creative → Plain Text Vernacular in One Box
          </span>
        </div>

        <div className="topbar-controls">
          {/* Vernacular Style Selector */}
          <select
            className="top-select"
            value={aiConfig.vernacularStyle}
            onChange={(e) =>
              setAiConfig((prev) => ({
                ...prev,
                vernacularStyle: e.target
                  .value as AIConfig['vernacularStyle'],
              }))
            }
            aria-label="Vernacular Style"
          >
            <option value="everyday_office">
              Style: Everyday Spoken + Transliteration
            </option>
            <option value="strict_transliteration">
              Style: Heavy English Transliteration
            </option>
            <option value="semi_formal">Style: Clean Corporate Vernacular</option>
          </select>

          {/* Model Selector */}
          <select
            className="top-select model-select"
            value={
              aiConfig.providerMode === 'sarvam'
                ? 'sarvam-mayura'
                : aiConfig.geminiModel
            }
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'sarvam-mayura') {
                setAiConfig((prev) => ({ ...prev, providerMode: 'sarvam' }));
              } else {
                setAiConfig((prev) => ({
                  ...prev,
                  providerMode: 'gemini',
                  geminiModel: val,
                }));
              }
            }}
            aria-label="AI Model"
          >
            <option value="argon-gemini-2.5-pro">
              ✦ Argon 4 High (Google AI Pro)
            </option>
            <option value="gemini-4-argon-low">
              ✦ Argon 4 Low (Fast Reasoning)
            </option>
            <option value="gemini-3-flash">⚡ Gemini 3 Flash (Ultra Fast)</option>
            <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
            <option value="sarvam-mayura">Sarvam AI (Mayura v1)</option>
          </select>

          {/* Google Account Badge */}
          {isGoogleConnected ? (
            <button
              type="button"
              className="account-badge"
              onClick={() => settingsDialogRef.current?.showModal()}
              title="Signed in with Google — Click for settings"
            >
              <span className="online-dot" />
              <span className="account-email">
                {aiConfig.googleUserEmail
                  ? aiConfig.googleUserEmail.split('@')[0]
                  : 'Google Connected'}
              </span>
              <span className="account-tier">Argon+</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-google"
              onClick={handleOneClickGoogleSignIn}
              disabled={isSigningIn}
            >
              <GoogleGIcon />
              <span>{isSigningIn ? 'Signing in...' : 'Sign in with Google'}</span>
            </button>
          )}

          <button
            type="button"
            className="btn-icon"
            onClick={() => settingsDialogRef.current?.showModal()}
            title="AI & Account Settings"
          >
            <Settings size={16} />
          </button>
        </div>
      </header>

      {/* Status / Error Banner */}
      {(statusMessage || errorMessage) && (
        <div className={`toast-strip ${errorMessage ? 'error' : 'ok'}`}>
          <span>{errorMessage || statusMessage}</span>
          <button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              setStatusMessage(null);
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main 2-Box Workspace */}
      <main className="two-box-grid">
        {/* BOX 1: SOURCE (ENGLISH TEXT OR CREATIVE IMAGE) */}
        <section className="box-panel">
          <div className="box-header">
            <div className="box-title">
              <span className="step-num">1</span>
              <div>
                <h2>Source Creative / Email</h2>
                <p>Paste English text or upload/paste a creative image (Ctrl+V)</p>
              </div>
            </div>

            <div className="box-actions">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={14} />
                <span>Upload Image</span>
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleClearSource}
                title="Clear image and text"
              >
                <Trash2 size={14} />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Attached Creative Image Preview Card */}
          {uploadedImageBase64 && (
            <div className="attached-image-bar">
              <img
                src={`data:${uploadedImageMime};base64,${uploadedImageBase64}`}
                alt="Uploaded creative"
                className="attached-thumb"
              />
              <div className="attached-meta">
                <div className="attached-title">
                  <ImageIcon size={14} />
                  <strong>{uploadedImageName || 'Creative Image Attached'}</strong>
                </div>
                <p>
                  AI will extract text from this image and output the exact same format in vernacular.
                </p>
              </div>
              <button
                type="button"
                className="btn-remove-img"
                onClick={() => {
                  setUploadedImageBase64(undefined);
                  setUploadedImageMime(undefined);
                  setUploadedImageName('');
                }}
              >
                <X size={15} />
              </button>
            </div>
          )}

          {/* Source Plain Textarea */}
          <textarea
            className="plain-textarea source-textarea"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder={
              uploadedImageBase64
                ? 'Image attached! Click "Translate in One Go" below to extract & translate, or add optional notes here...'
                : 'Paste your English office email, policy update, or poster copy here...\n\n(Or press Ctrl+V / click "Upload Image" to translate directly from a poster image)'
            }
          />

          {/* Compact Word Rules Bar + Translate Button Footer */}
          <div className="source-footer">
            <div className="rules-toggle-row">
              <button
                type="button"
                className="btn-link-subtle"
                onClick={() => setShowRulesBar(!showRulesBar)}
              >
                <span>
                  Smart Transliteration Rules ({smartTerms.length} active: Policy → पॉलिसी, Account → अकाउंट, OPEN, HR Genie)
                </span>
                <span>{showRulesBar ? '▲ Hide' : '▼ Edit'}</span>
              </button>

              <div className="lang-filter-pills">
                <button
                  type="button"
                  className="btn-link-subtle"
                  onClick={() =>
                    setSelectedLanguages(
                      selectedLanguages.length === ALL_LANG_CODES.length
                        ? ['hi-IN']
                        : ALL_LANG_CODES
                    )
                  }
                >
                  {selectedLanguages.length === ALL_LANG_CODES.length
                    ? 'All 8 Selected'
                    : `${selectedLanguages.length} Selected (Select All 8)`}
                </button>
              </div>
            </div>

            {showRulesBar && (
              <div className="rules-drawer">
                <form className="rules-add-form" onSubmit={handleAddRule}>
                  <input
                    type="text"
                    className="clean-input"
                    placeholder="Word (e.g. Reimbursement, CIBIL)"
                    value={newTermText}
                    onChange={(e) => setNewTermText(e.target.value)}
                  />
                  <select
                    className="clean-input"
                    value={newTermAction}
                    onChange={(e) =>
                      setNewTermAction(e.target.value as TermAction)
                    }
                  >
                    <option value="transliterate">
                      Transliterate (Indic Script)
                    </option>
                    <option value="keep_english">Keep in English</option>
                  </select>
                  <input
                    type="text"
                    className="clean-input"
                    placeholder="Example (e.g. रीइम्बर्समेंट)"
                    value={newTermExample}
                    onChange={(e) => setNewTermExample(e.target.value)}
                  />
                  <button type="submit" className="btn-secondary">
                    <Plus size={14} /> Add
                  </button>
                </form>
                <div className="rules-chip-list">
                  {smartTerms.map((term, idx) => (
                    <span key={`${term.term}-${idx}`} className="rule-chip">
                      <strong>{term.term}</strong> → {term.exampleOutput}
                      <button
                        type="button"
                        onClick={() =>
                          setSmartTerms((prev) =>
                            prev.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              className="btn-translate-go"
              onClick={handleRunTranslate}
              disabled={isRunningAI}
            >
              {isRunningAI ? (
                <>
                  <Loader2 size={18} className="spin" />
                  <span>
                    Translating into {selectedLanguages.length} Languages in One Go...
                  </span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>
                    Translate in One Go ({selectedLanguages.length} Languages)
                  </span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* BOX 2: PLAIN TEXT OUTPUT IN ONE BOX */}
        <section className="box-panel">
          <div className="box-header">
            <div className="box-title">
              <span className="step-num">2</span>
              <div>
                <h2>Plain Text Vernacular Output</h2>
                <p>Same format & line breaks in one box — ready to copy & paste</p>
              </div>
            </div>

            <div className="box-actions">
              <button
                type="button"
                className="btn-copy-hero"
                onClick={handleCopyOutput}
                disabled={!displayedOutputText.trim()}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>
                  {copied
                    ? 'Copied to Clipboard!'
                    : activeTab === 'ALL'
                    ? 'Copy All Languages'
                    : `Copy ${
                        LANGUAGES.find((l) => l.code === activeTab)?.name ||
                        'Text'
                      }`}
                </span>
              </button>
            </div>
          </div>

          {/* Language View Tabs (All in One Box + 8 Individual Languages) */}
          <div className="lang-tabs-strip">
            <button
              type="button"
              className={`lang-tab ${activeTab === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveTab('ALL')}
            >
              <span>All {selectedLanguages.length} in One Box</span>
            </button>

            {LANGUAGES.map((lang) => {
              const isSelected = selectedLanguages.includes(lang.code);
              const hasContent = Boolean(translations[lang.code]?.trim());
              return (
                <div
                  key={lang.code}
                  className={`lang-tab-group ${
                    activeTab === lang.code ? 'active' : ''
                  } ${!isSelected ? 'dimmed' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleTargetLanguage(lang.code)}
                    title={`Include ${lang.name} in translation`}
                    className="lang-check"
                  />
                  <button
                    type="button"
                    className="lang-tab-btn"
                    onClick={() => setActiveTab(lang.code)}
                  >
                    <span className="native">{lang.nativeName}</span>
                    <span className="en">{lang.name}</span>
                    {hasContent && <span className="ready-dot" />}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Single Full-Height Plain Text Output Box */}
          <textarea
            className="plain-textarea output-textarea"
            value={displayedOutputText}
            onChange={(e) => handleOutputChange(e.target.value)}
            readOnly={activeTab === 'ALL'}
            placeholder="Your translated vernacular text will appear here in one box in the exact same format..."
          />
        </section>
      </main>

      {/* Settings & Google Account Dialog */}
      <dialog
        ref={settingsDialogRef}
        closedby="any"
        aria-labelledby="settingsTitle"
        className="clean-dialog"
      >
        <div className="dialog-content">
          <div className="dialog-top">
            <div>
              <h2 id="settingsTitle">Google Account (Argon+) & AI Settings</h2>
              <p>
                Connected to your Google AI Pro / Argon model for 1-click localization.
              </p>
            </div>
            <button
              type="button"
              className="btn-icon"
              onClick={() => settingsDialogRef.current?.close()}
            >
              <X size={18} />
            </button>
          </div>

          <div className="google-hero-card">
            <div className="google-hero-info">
              <div className="google-hero-title">
                <GoogleGIcon />
                <strong>Google Gemini Account (Argon 4 / Google AI Pro)</strong>
              </div>
              <p>
                Uses your signed-in Google account directly — no API keys required.
              </p>
              {isGoogleConnected && (
                <div className="connected-status-line">
                  ✓ Signed in as <strong>{aiConfig.googleUserEmail}</strong> (
                  {aiConfig.googleTierName || 'Google AI Pro'})
                </div>
              )}
            </div>

            <div>
              {isGoogleConnected ? (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleGoogleSignOut}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-google"
                  onClick={handleOneClickGoogleSignIn}
                  disabled={isSigningIn}
                >
                  <GoogleGIcon />
                  <span>
                    {isSigningIn ? 'Opening Google...' : 'Sign in with Google'}
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="settings-grid-2">
            <div>
              <label className="clean-label">
                Optional: Gemini API Key (Fallback)
              </label>
              <input
                type="password"
                className="clean-input"
                placeholder="AIzaSy... (Leave blank when signed in)"
                value={aiConfig.geminiApiKey}
                onChange={(e) =>
                  setAiConfig((prev) => ({
                    ...prev,
                    geminiApiKey: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="clean-label">
                Optional: Sarvam AI Key (Mayura v1)
              </label>
              <input
                type="password"
                className="clean-input"
                placeholder="Sarvam API key..."
                value={aiConfig.sarvamApiKey}
                onChange={(e) =>
                  setAiConfig((prev) => ({
                    ...prev,
                    sarvamApiKey: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="dialog-footer">
            <button
              type="button"
              className="btn-copy-hero"
              onClick={() => settingsDialogRef.current?.close()}
            >
              Done
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
export default App;
