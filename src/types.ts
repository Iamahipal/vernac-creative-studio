export type LanguageCode =
  | 'hi-IN'
  | 'mr-IN'
  | 'gu-IN'
  | 'bn-IN'
  | 'ta-IN'
  | 'te-IN'
  | 'ml-IN'
  | 'kn-IN';

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  scriptName: string;
  region: string;
  fontFamily: string;
  accentColor: string;
}

export type TermAction = 'keep_english' | 'transliterate' | 'everyday_translate';

export interface SmartTermDecision {
  term: string;
  action: TermAction;
  reason: string;
  exampleOutput: string;
}

export type BlockRole =
  | 'badge'
  | 'headline'
  | 'subhead'
  | 'section_header'
  | 'bullet_card'
  | 'table_row'
  | 'callout'
  | 'cta_footer';

export interface VernacularCell {
  text: string;
  romanPhonetic?: string;
  transliteratedTerms?: string[];
  backTranslation?: string;
}

export interface CreativeBlock {
  id: string;
  role: BlockRole;
  sectionLabel: string;
  englishText: string;
  translations: Record<LanguageCode, VernacularCell>;
}

export interface CreativeProject {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  themeColor: 'navy' | 'orange' | 'royal' | 'indigo';
  rawSourceText: string;
  smartTerms: SmartTermDecision[];
  blocks: CreativeBlock[];
}

export type AIProviderMode = 'gemini' | 'sarvam' | 'hybrid';

export interface AIConfig {
  providerMode: AIProviderMode;
  geminiApiKey: string;
  googleOAuthToken: string;
  googleRefreshToken?: string;
  googleOAuthClientId: string;
  googleUserEmail: string;
  googleUserName?: string;
  googleUserPicture?: string;
  googleProjectId?: string;
  googleTierName?: string;
  geminiModel: string;
  sarvamApiKey: string;
  sarvamModel: 'mayura:v1' | 'sarvam-translate:v1';
  sarvamTone: 'modern-colloquial' | 'code-mixed' | 'formal';
  vernacularStyle: 'everyday_office' | 'strict_transliteration' | 'semi_formal';
}
