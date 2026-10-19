import { CreativeProject, LanguageMeta, SmartTermDecision } from '../types';

export const LANGUAGES: LanguageMeta[] = [
  {
    code: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    scriptName: 'Devanagari',
    region: 'North & Central India',
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    accentColor: '#3B82F6',
  },
  {
    code: 'mr-IN',
    name: 'Marathi',
    nativeName: 'मराठी',
    scriptName: 'Devanagari',
    region: 'Maharashtra',
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    accentColor: '#F97316',
  },
  {
    code: 'gu-IN',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    scriptName: 'Gujarati',
    region: 'Gujarat',
    fontFamily: "'Noto Sans Gujarati', sans-serif",
    accentColor: '#10B981',
  },
  {
    code: 'bn-IN',
    name: 'Bengali',
    nativeName: 'বাংলা',
    scriptName: 'Bengali',
    region: 'West Bengal & East',
    fontFamily: "'Noto Sans Bengali', sans-serif",
    accentColor: '#EC4899',
  },
  {
    code: 'ta-IN',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    scriptName: 'Tamil',
    region: 'Tamil Nadu',
    fontFamily: "'Noto Sans Tamil', sans-serif",
    accentColor: '#8B5CF6',
  },
  {
    code: 'te-IN',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    scriptName: 'Telugu',
    region: 'AP & Telangana',
    fontFamily: "'Noto Sans Telugu', sans-serif",
    accentColor: '#06B6D4',
  },
  {
    code: 'ml-IN',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    scriptName: 'Malayalam',
    region: 'Kerala',
    fontFamily: "'Noto Sans Malayalam', sans-serif",
    accentColor: '#EAB308',
  },
  {
    code: 'kn-IN',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    scriptName: 'Kannada',
    region: 'Karnataka',
    fontFamily: "'Noto Sans Kannada', sans-serif",
    accentColor: '#14B8A6',
  },
];

export const DEFAULT_CORPORATE_RULES: SmartTermDecision[] = [
  {
    term: 'OPEN / HR Genie / HR Partner',
    action: 'keep_english',
    reason: 'Internal portal & HR helpdesk brand names—translating "OPEN" as "खोलें / उघडा" breaks employee navigation.',
    exampleOutput: 'OPEN / HR Genie / HR Partner',
  },
  {
    term: 'EMI / Loan / Credit Card',
    action: 'transliterate',
    reason: 'Everyday financial terms used in spoken regional languages; literal dictionary words ("समान मासिक किस्त / ऋण पत्र") sound unnatural.',
    exampleOutput: 'EMI (ईएमआई) / लोन / क्रेडिट कार्ड',
  },
  {
    term: 'DPDP Act, 2023 / FOIR / FTEs / FTCs',
    action: 'keep_english',
    reason: 'Statutory laws and official HR/Finance acronyms must remain exact for policy compliance.',
    exampleOutput: 'DPDP Act, 2023 | FOIR | FTEs | FTCs',
  },
  {
    term: 'Crèche / Megapolis / Tier 1 & 2 / Tier 3 & 4',
    action: 'transliterate',
    reason: 'Policy category names & city tiers are best transliterated into native script (or paired with simple everyday words like डे-केयर).',
    exampleOutput: 'क्रेश (डे-केयर) | मेगापोलिस | टियर 1 और 2',
  },
  {
    term: 'Delinquency / Lawful Processing / Threshold',
    action: 'everyday_translate',
    reason: 'Explain heavy legal/banking nouns in simple everyday spoken words so every field & office employee grasps the rule immediately.',
    exampleOutput: 'समय पर पेमेंट न होना (देरी) / तय लिमिट (सीमा)',
  },
];

export const PRESET_CREATIVES: CreativeProject[] = [
  {
    id: 'missed-payments',
    title: 'Financial Well-Being: Missed Payments & Delinquency',
    category: 'Employee Financial Discipline',
    themeColor: 'orange',
    imageUrl: './examples/missed-payments.png',
    rawSourceText: `FINANCIAL WELL-BEING
MISSED PAYMENTS TODAY. BIGGER CHALLENGES TOMORROW.
Why timely repayments matter.
WHAT IS DELINQUENCY?
Delayed repayment of an EMI, loan or credit card bill beyond its due date.
TRACK YOUR DUE DATES: Know when EMIs and bills are due.
PAY ON TIME: Build a strong repayment track record.
STAY CONSISTENT: Support your financial well-being.
IN PRACTICE: EMI DUE 5 SEP -> PAID ON 25 SEP | 20 DAYS LATE
MAKE TIMELY REPAYMENTS NON-NEGOTIABLE.`,
    smartTerms: [
      {
        term: 'EMI / Loan / Credit Card Bill',
        action: 'transliterate',
        reason: 'Employees across all 8 languages say "EMI", "Loan", and "Credit Card Bill" in daily speech.',
        exampleOutput: 'EMI, लोन या क्रेडिट कार्ड बिल',
      },
      {
        term: 'Delinquency',
        action: 'everyday_translate',
        reason: 'Keep English term in brackets or explain simply as "ड्यू डेट के बाद पेमेंट में देरी" instead of archaic banking jargon.',
        exampleOutput: 'डिलिंक्वेंसी (पेमेंट में देरी) क्या है?',
      },
      {
        term: 'Due Date / Track Record',
        action: 'transliterate',
        reason: 'Colloquial office usage blends "ड्यू डेट / तय तारीख" and "ट्रैक रिकॉर्ड" naturally.',
        exampleOutput: 'ड्यू डेट (तय तारीख) / ट्रैक रिकॉर्ड',
      },
    ],
    blocks: [
      {
        id: 'mp-1',
        role: 'badge',
        sectionLabel: 'Top Category Tag',
        englishText: 'FINANCIAL WELL-BEING',
        layoutHint: 'Top-left eyebrow tag (keep concise, 2–3 words)',
        translations: {
          'hi-IN': { text: 'आर्थिक खुशहाली (Financial Well-Being)', romanPhonetic: 'Aarthik Khushhaali', backTranslation: 'Financial well-being / security' },
          'mr-IN': { text: 'आर्थिक सुरक्षितता (Financial Well-Being)', romanPhonetic: 'Aarthik Surakshitata', backTranslation: 'Financial security & well-being' },
          'gu-IN': { text: 'આર્થિક સુખાકારી (Financial Well-Being)', romanPhonetic: 'Aarthik Sukhakari', backTranslation: 'Financial well-being' },
          'bn-IN': { text: 'আর্থিক সুরক্ষা ও স্বচ্ছলতা', romanPhonetic: 'Aarthik Surokkha o Swachhalata', backTranslation: 'Financial protection & well-being' },
          'ta-IN': { text: 'நிதி நலன் (Financial Well-Being)', romanPhonetic: 'Nithi Nalan', backTranslation: 'Financial well-being' },
          'te-IN': { text: 'ఆర్థిక శ్రేయస్సు (Financial Well-Being)', romanPhonetic: 'Aarthika Shreyassu', backTranslation: 'Financial well-being' },
          'ml-IN': { text: 'സാമ്പത്തിക ഭദ്രത (Financial Well-Being)', romanPhonetic: 'Saampathika Bhadratha', backTranslation: 'Financial security / well-being' },
          'kn-IN': { text: 'ಆರ್ಥಿಕ ಕ್ಷೇಮ (Financial Well-Being)', romanPhonetic: 'Aarthika Kshema', backTranslation: 'Financial well-being' },
        },
      },
      {
        id: 'mp-2',
        role: 'headline',
        sectionLabel: 'Hero Headline',
        englishText: 'MISSED PAYMENTS TODAY. BIGGER CHALLENGES TOMORROW.',
        layoutHint: 'Main bold 3-line poster headline — high impact',
        translations: {
          'hi-IN': { text: 'आज पेमेंट में चूक। कल बड़ी मुश्किलें।', romanPhonetic: 'Aaj payment mein chook. Kal badi mushkilein.', backTranslation: 'Missed payment today. Bigger problems tomorrow.', transliteratedTerms: ['पेमेंट'] },
          'mr-IN': { text: 'आज पेमेंट चुकले, तर उद्या मोठ्या अडचणी.', romanPhonetic: 'Aaj payment chukle, tar udya mothya adchani.', backTranslation: 'If payment is missed today, bigger difficulties tomorrow.', transliteratedTerms: ['पेमेंट'] },
          'gu-IN': { text: 'આજે પેમેન્ટ ચૂક્યા, તો આવતીકાલે મોટી મુશ્કેલી.', romanPhonetic: 'Aaje payment chukya, to aavtikale moti mushkeli.', backTranslation: 'Missed payment today means bigger trouble tomorrow.', transliteratedTerms: ['પેમેન્ટ'] },
          'bn-IN': { text: 'আজ পেমেন্ট মিস মানে আগামীকাল আরও বড় সমস্যা।', romanPhonetic: 'Aaj payment miss maane aagamikaal aaro boro shomoshya.', backTranslation: 'Missing payment today means a bigger problem tomorrow.', transliteratedTerms: ['পেমেন্ট', 'মিস'] },
          'ta-IN': { text: 'இன்று பேமெண்ட் தவறினால், நாளை பெரிய சவால்கள்.', romanPhonetic: 'Indru payment thavarinaal, naalai periya savaalgal.', backTranslation: 'If payment is missed today, bigger challenges tomorrow.', transliteratedTerms: ['பேமெண்ட்'] },
          'te-IN': { text: 'ఈరోజు పేమెంట్ మిస్ అయితే, రేపు మరిన్ని పెద్ద సవాళ్లు.', romanPhonetic: 'Eeroju payment miss ayithe, repu marinni pedda savaallu.', backTranslation: 'If payment is missed today, bigger challenges tomorrow.', transliteratedTerms: ['పేమెంట్', 'మిస్'] },
          'ml-IN': { text: 'ഇന്ന് പേയ്‌മെന്റ് മുടങ്ങിയാൽ, നാളെ വലിയ വെല്ലുവിളികൾ.', romanPhonetic: 'Innu payment mudangiyaal, naale valiya velluvilikal.', backTranslation: 'If payment is missed today, big challenges tomorrow.', transliteratedTerms: ['പേയ്‌മെന്റ്'] },
          'kn-IN': { text: 'ಇಂದು ಪೇಮೆಂಟ್ ತಪ್ಪಿದರೆ, ನಾಳೆ ದೊಡ್ಡ ಸವಾಲುಗಳು.', romanPhonetic: 'Indu payment tappidare, naale dodda savaalugalu.', backTranslation: 'If payment is missed today, bigger challenges tomorrow.', transliteratedTerms: ['ಪೇಮೆಂಟ್'] },
        },
      },
      {
        id: 'mp-3',
        role: 'subhead',
        sectionLabel: 'Sub-headline',
        englishText: 'Why timely repayments matter.',
        layoutHint: 'Single line under main headline',
        translations: {
          'hi-IN': { text: 'समय पर रीपेमेंट (भुगतान) करना क्यों ज़रूरी है।', romanPhonetic: 'Samay par repayment karna kyon zaroori hai.', backTranslation: 'Why doing repayment on time is important.', transliteratedTerms: ['रीपेमेंट'] },
          'mr-IN': { text: 'वेळेवर रीपेमेंट (परतफेड) करणे का महत्त्वाचे आहे.', romanPhonetic: 'Velevar repayment karne ka mahattvache aahe.', backTranslation: 'Why timely repayment is important.', transliteratedTerms: ['रीपेमेंट'] },
          'gu-IN': { text: 'સમયસર રીપેમેન્ટ (ચૂકવણી) કેમ જરૂરી છે.', romanPhonetic: 'Samaysar repayment kem jaroori chhe.', backTranslation: 'Why timely repayment is necessary.', transliteratedTerms: ['રીપેમેન્ટ'] },
          'bn-IN': { text: 'সময়মতো রিপেমেন্ট (পরিশোধ) করা কেন জরুরি।', romanPhonetic: 'Shomoymoto repayment kora keno joruri.', backTranslation: 'Why paying back on time is important.', transliteratedTerms: ['রিপেমেন্ট'] },
          'ta-IN': { text: 'சரியான நேரத்தில் ரீபேமெண்ட் (தவணை) செலுத்துவது ஏன் முக்கியம்.', romanPhonetic: 'Sariyaana nerathil repayment seluthuvadhu yen mukkiyam.', backTranslation: 'Why paying repayment on time is important.', transliteratedTerms: ['ரீபேமெண்ட்'] },
          'te-IN': { text: 'సమయానికి రీపేమెంట్ (చెల్లింపు) చేయడం ఎందుకు ముఖ్యం.', romanPhonetic: 'Samayaaniki repayment cheyadam enduku mukhyam.', backTranslation: 'Why making repayment on time is important.', transliteratedTerms: ['రీపేమెంట్'] },
          'ml-IN': { text: 'കൃത്യസമയത്ത് റീപേയ്‌മെന്റ് നടത്തുന്നത് എന്തുകൊണ്ട് പ്രധാനമാണ്.', romanPhonetic: 'Krithyasamayathu repayment nadathunnathu enthukondu pradhaanamaanu.', backTranslation: 'Why making timely repayment matters.', transliteratedTerms: ['റീപേയ്‌മെന്റ്'] },
          'kn-IN': { text: 'ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ರೀಪೇಮೆಂಟ್ (ಮರುಪಾವತಿ) ಮಾಡುವುದು ಏಕೆ ಮುಖ್ಯ.', romanPhonetic: 'Samayakke sariyaagi repayment maaduvudu eke mukhya.', backTranslation: 'Why timely repayment is important.', transliteratedTerms: ['ರೀಪೇಮೆಂಟ್'] },
        },
      },
      {
        id: 'mp-4',
        role: 'definition',
        sectionLabel: 'Definition Box',
        englishText: 'WHAT IS DELINQUENCY? Delayed repayment of an EMI, loan or credit card bill beyond its due date.',
        layoutHint: 'Bordered highlight box explaining Delinquency in everyday words',
        translations: {
          'hi-IN': { text: 'डिलिंक्वेंसी (पेमेंट में देरी) क्या है? किसी EMI, लोन या क्रेडिट कार्ड बिल का उसकी ड्यू डेट (तय तारीख) के बाद देर से भुगतान करना।', romanPhonetic: 'Delinquency kya hai? Kisi EMI, loan ya credit card bill ka uski due date ke baad der se bhugtan karna.', backTranslation: 'What is Delinquency? Paying an EMI, loan, or credit card bill late after its due date.', transliteratedTerms: ['डिलिंक्वेंसी', 'EMI', 'लोन', 'क्रेडिट कार्ड बिल', 'ड्यू डेट'] },
          'mr-IN': { text: 'डिलिंक्वेंसी (थकबाकी/उशीर) म्हणजे काय? EMI, लोन किंवा क्रेडिट कार्ड बिलाचे ड्यू डेटनंतर (मुदतीनंतर) उशिरा पेमेंट करणे.', romanPhonetic: 'Delinquency mhanje kay? EMI, loan kinva credit card bilache due date nantar ushira payment karne.', backTranslation: 'What is delinquency? Paying an EMI, loan, or credit card bill late after the due date.', transliteratedTerms: ['डिलिंक्वेंसी', 'EMI', 'लोन', 'क्रेडिट कार्ड', 'ड्यू डेट'] },
          'gu-IN': { text: 'ડિલિંક્વન્સી (પેમેન્ટમાં વિલંબ) શું છે? EMI, લોન કે ક્રેડિટ કાર્ડ બિલનું ડ્યુ ડેટ (મુદત) પછી મોડું પેમેન્ટ કરવું.', romanPhonetic: 'Delinquency shu chhe? EMI, loan ke credit card bill nu due date pachhi modu payment karvu.', backTranslation: 'What is delinquency? Late payment of EMI, loan, or credit card bill after due date.', transliteratedTerms: ['ડિલિંક્વન્સી', 'EMI', 'લોન', 'ક્રેડિટ કાર્ડ બિલ', 'ડ્યુ ડેટ'] },
          'bn-IN': { text: 'ডিলিঙ্কোয়েন্সি (পেমেন্টে দেরি) কী? ডিউ ডেট পেরিয়ে যাওয়ার পর EMI, লোন বা ক্রেডিট কার্ড বিলের দেরিতে পেমেন্ট করা।', romanPhonetic: 'Delinquency ki? Due date periye jaowar por EMI, loan ba credit card bill-er derite payment kora.', backTranslation: 'What is delinquency? Delayed payment of EMI, loan, or credit card bill after due date passes.', transliteratedTerms: ['ডিলিঙ্কোয়েন্সি', 'ডিউ ডেট', 'EMI', 'লোন', 'ক্রেডিট কার্ড বিল'] },
          'ta-IN': { text: 'டெலின்குவன்சி (தவணை தாமதம்) என்றால் என்ன? EMI, லோன் அல்லது கிரெடிட் கார்டு பில்லை அதன் டியூ டேட் (கடைசி தேதி) முடிந்த பிறகு தாமதமாகச் செலுத்துவது.', romanPhonetic: 'Delinquency endraal enna? EMI, loan alladhu credit card bill-ai adhan due date mudindha piragu thaamadhamaaga seluthuvadhu.', backTranslation: 'What is delinquency? Paying EMI, loan, or credit card bill late after its due date.', transliteratedTerms: ['டெலின்குவன்சி', 'EMI', 'லோன்', 'கிரெடிட் கார்டு பில்', 'டியூ டேட்'] },
          'te-IN': { text: 'డిలింక్వెన్సీ (పేమెంట్ ఆలస్యం) అంటే ఏమిటి? EMI, లోన్ లేదా క్రెడిట్ కార్డ్ బిల్లును డ్యూ డేట్ (గడువు తేదీ) దాటిన తర్వాత ఆలస్యంగా చెల్లించడం.', romanPhonetic: 'Delinquency ante emiti? EMI, loan leda credit card billunu due date daatina tarvata aalasyanga chellinchadam.', backTranslation: 'What is delinquency? Paying EMI, loan, or credit card bill late after the due date.', transliteratedTerms: ['డిలింక్వెన్సీ', 'EMI', 'లోన్', 'క్రెడిట్ కార్డ్', 'డ్యూ డేట్'] },
          'ml-IN': { text: 'ഡിലിങ്ക്വൻസി (പേയ്‌മെന്റ് വീഴ്ച) என்றால் എന്ത്? EMI, ലോൺ അല്ലെങ്കിൽ ക്രെഡിറ്റ് കാർഡ് ബിൽ ഡ്യൂ ഡേറ്റ് (നിശ്ചിത തീയതി) കഴിഞ്ഞ് വൈകി അടയ്ക്കുന്നത്.', romanPhonetic: 'Delinquency ennaal enthu? EMI, loan allengil credit card bill due date kazhinju vaiki adakkunnathu.', backTranslation: 'What is delinquency? Paying EMI, loan, or credit card bill late after the due date.', transliteratedTerms: ['ഡിലിങ്ക്വൻസി', 'EMI', 'ലോൺ', 'ക്രെഡിറ്റ് കാർഡ് ബിൽ', 'ഡ്യൂ ഡേറ്റ്'] },
          'kn-IN': { text: 'ಡಿಲಿಂಕ್ವೆನ್ಸಿ (ಪಾವತಿ ವಿಳಂಬ) ಎಂದರೇನು? EMI, ಲೋನ್ ಅಥವಾ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಬಿಲ್ ಅನ್ನು ಡ್ಯೂ ಡೇಟ್ (ನಿಗದಿತ ದಿನಾಂಕ) ಮುಗಿದ ನಂತರ ತಡವಾಗಿ ಪಾವತಿಸುವುದು.', romanPhonetic: 'Delinquency endarenu? EMI, loan athava credit card bill annu due date mugida nantara tadavaagi paavatisuvudu.', backTranslation: 'What is delinquency? Paying EMI, loan, or credit card bill late after the due date.', transliteratedTerms: ['ಡಿಲಿಂಕ್ವೆನ್ಸಿ', 'EMI', 'ಲೋನ್', 'ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಬಿಲ್', 'ಡ್ಯೂ ಡೇಟ್'] },
        },
      },
      {
        id: 'mp-5',
        role: 'card_body',
        sectionLabel: 'Action Points (3 Steps)',
        englishText: '1. TRACK YOUR DUE DATES: Know when EMIs and bills are due.\n2. PAY ON TIME: Build a strong repayment track record.\n3. STAY CONSISTENT: Support your financial well-being.',
        layoutHint: '3 icon checklist rows on bottom-left',
        translations: {
          'hi-IN': { text: '1. अपनी ड्यू डेट्स याद रखें: जानें कि आपकी EMI और बिल कब ड्यू हैं।\n2. समय पर पेमेंट करें: अपना मज़बूत रीपेमेंट ट्रैक रिकॉर्ड बनाएं।\n3. नियम बनाए रखें: अपनी आर्थिक सुरक्षा को मज़बूत रखें।', romanPhonetic: '1. Apni due dates yaad rakhein... 2. Samay par payment karein... 3. Niyam banaye rakhein...', backTranslation: '1. Track your due dates. 2. Pay on time to build a strong track record. 3. Stay consistent.', transliteratedTerms: ['ड्यू डेट्स', 'EMI', 'पेमेंट', 'ट्रैक रिकॉर्ड'] },
          'mr-IN': { text: '1. तुमच्या ड्यू डेट्सवर लक्ष ठेवा: EMI आणि बिले कधी भरायची आहेत याची नोंद ठेवा.\n2. वेळेवर पेमेंट करा: तुमचा मजबूत रीपेमेंट ट्रॅक रेकॉर्ड तयार करा.\n3. सातत्य ठेवा: तुमचे आर्थिक आरोग्य सुरक्षित ठेवा.', romanPhonetic: '1. Tumchya due dates var laksh theva... 2. Velevar payment kara... 3. Satatya theva...', backTranslation: '1. Watch your due dates. 2. Pay on time. 3. Maintain consistency.', transliteratedTerms: ['ड्यू डेट्स', 'EMI', 'पेमेंट', 'ट्रॅक रेकॉर्ड'] },
          'gu-IN': { text: '1. તમારી ડ્યુ ડેટ્સ ધ્યાનમાં રાખો: EMI અને બિલ ક્યારે ભરવાના છે તે જાણો.\n2. સમયસર પેમેન્ટ કરો: મજબૂત રીપેમેન્ટ ટ્રેક રેકોર્ડ બનાવો.\n3. નિયમિત રહો: તમારી આર્થિક સુરક્ષા જાળવી રાખો.', romanPhonetic: '1. Tamari due dates dhyanma rakho... 2. Samaysar payment karo... 3. Niyamit raho...', backTranslation: '1. Keep track of due dates. 2. Pay on time. 3. Stay regular.', transliteratedTerms: ['ડ્યુ ડેટ્સ', 'EMI', 'પેમેન્ટ', 'ટ્રેક રેકોર્ડ'] },
          'bn-IN': { text: '1. ডিউ ডেট খেয়াল রাখুন: EMI এবং বিল কবে দিতে হবে তা জেনে রাখুন।\n2. সময়মতো পেমেন্ট করুন: নিজের একটি মজবুত রিপেমেন্ট ট্র্যাক রেকর্ড তৈরি করুন।\n3. ধারাবাহিকতা বজায় রাখুন: আপনার আর্থিক স্বচ্ছলতা সুরক্ষিত রাখুন।', romanPhonetic: '1. Due date kheyal rakhun... 2. Shomoymoto payment korun... 3. Dharabahikota bojay rakhun...', backTranslation: '1. Keep track of due dates. 2. Pay on time. 3. Maintain consistency.', transliteratedTerms: ['ডিউ ডেট', 'EMI', 'পেমেন্ট', 'ট্র্যাক রেকর্ড'] },
          'ta-IN': { text: '1. டியூ டேட்களைக் கண்காணியுங்கள்: EMI மற்றும் பில்கள் எப்போது கட்ட வேண்டும் என்பதை அறிந்து கொள்ளுங்கள்.\n2. சரியான நேரத்தில் செலுத்துங்கள்: வலுவான ரீபேமெண்ட் டிராக் ரெக்கார்டை உருவாக்குங்கள்.\n3. தொடர்ந்து கடைப்பிடியுங்கள்: உங்கள் நிதி நலனைப் பாதுகாத்துக் கொள்ளுங்கள்.', romanPhonetic: '1. Due date-galai kankaniyungal... 2. Sariyaana nerathil seluthungal... 3. Thodarndhu kadaipidiyungal...', backTranslation: '1. Track due dates. 2. Pay on time. 3. Follow consistently.', transliteratedTerms: ['டியூ டேட்', 'EMI', 'ரீபேமெண்ட்', 'டிராக் ரெக்கார்ட்'] },
          'te-IN': { text: '1. మీ డ్యూ డేట్లను గుర్తుంచుకోండి: EMIలు మరియు బిల్లులు ఎప్పుడు చెల్లించాలో తెలుసుకోండి.\n2. సమయానికి పేమెంట్ చేయండి: మంచి రీపేమెంట్ ట్రాక్ రికార్డ్‌ను నిర్మించుకోండి.\n3. క్రమం తప్పక పాటించండి: మీ ఆర్థిక భద్రతను కాపాడుకోండి.', romanPhonetic: '1. Mee due datelanu gurthunchukondi... 2. Samayaaniki payment cheyandi... 3. Kramam tappaka paatinchandi...', backTranslation: '1. Remember your due dates. 2. Pay on time. 3. Follow regularly.', transliteratedTerms: ['డ్యూ డేట్', 'EMI', 'పేమెంట్', 'ట్రాక్ రికార్డ్'] },
          'ml-IN': { text: '1. ഡ്യൂ ഡേറ്റുകൾ ശ്രദ്ധിക്കുക: EMI-കളും ബില്ലുകളും എന്നാണ് അടയ്ക്കേണ്ടതെന്ന് അറിഞ്ഞിരിക്കുക.\n2. കൃത്യസമയത്ത് അടയ്ക്കുക: മികച്ച റീപേയ്‌മെന്റ് ട്രാക്ക് റെക്കോർഡ് ഉണ്ടാക്കുക.\n3. സ്ഥിരത പാലിക്കുക: നിങ്ങളുടെ സാമ്പത്തിക ഭദ്രത ഉറപ്പാക്കുക.', romanPhonetic: '1. Due date-ukal shradhikkuka... 2. Krithyasamayathu adakkuka... 3. Sthiratha paalikkuka...', backTranslation: '1. Watch due dates. 2. Pay on time. 3. Maintain consistency.', transliteratedTerms: ['ഡ്യൂ ഡേറ്റ്', 'EMI', 'റീപേയ്‌മെന്റ്', 'ട്രാക്ക് റെക്കോർഡ്'] },
          'kn-IN': { text: '1. ನಿಮ್ಮ ಡ್ಯೂ ಡೇಟ್‌ಗಳನ್ನು ಗಮನಿಸಿ: EMI ಮತ್ತು ಬಿಲ್‌ಗಳನ್ನು ಯಾವಾಗ ಪಾವತಿಸಬೇಕು ಎಂದು ತಿಳಿದಿರಿ.\n2. ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಪಾವತಿಸಿ: ಉತ್ತಮ ರೀಪೇಮೆಂಟ್ ಟ್ರ್ಯಾಕ್ ರೆಕಾರ್ಡ್ ನಿರ್ಮಿಸಿ.\n3. ಸ್ಥಿರತೆ ಕಾಪಾಡಿಕೊಳ್ಳಿ: ನಿಮ್ಮ ಆರ್ಥಿಕ ಕ್ಷೇಮವನ್ನು ಭದ್ರಪಡಿಸಿ.', romanPhonetic: '1. Nimma due date-galannu gamanisi... 2. Samayakke sariyaagi paavatisi... 3. Sthirate kaapaadikolli...', backTranslation: '1. Track your due dates. 2. Pay on time. 3. Maintain consistency.', transliteratedTerms: ['ಡ್ಯೂ ಡೇಟ್', 'EMI', 'ರೀಪೇಮೆಂಟ್', 'ಟ್ರ್ಯಾಕ್ ರೆಕಾರ್ಡ್'] },
        },
      },
      {
        id: 'mp-6',
        role: 'metric',
        sectionLabel: 'Example Box (In Practice)',
        englishText: 'IN PRACTICE: EMI DUE 5 SEP → PAID ON 25 SEP | 20 DAYS LATE',
        layoutHint: 'Right-side visual comparison card',
        translations: {
          'hi-IN': { text: 'उदाहरण के लिए: EMI ड्यू: 5 सितंबर → पेमेंट किया: 25 सितंबर | 20 दिन लेट (देरी)', romanPhonetic: 'Udaharan ke liye: EMI Due 5 Sep -> Payment kiya 25 Sep | 20 din late', backTranslation: 'For example: EMI due 5 Sep -> Paid 25 Sep | 20 days late', transliteratedTerms: ['EMI ड्यू', 'पेमेंट', 'लेट'] },
          'mr-IN': { text: 'उदाहरणार्थ: EMI ड्यू: 5 सप्टेंबर → पेमेंट केले: 25 सप्टेंबर | 20 दिवस उशीर (लेट)', romanPhonetic: 'Udaharanarth: EMI Due 5 Sep -> Payment kele 25 Sep | 20 divas ushir', backTranslation: 'Example: EMI due 5 Sep -> Paid 25 Sep | 20 days late', transliteratedTerms: ['EMI ड्यू', 'पेमेंट', 'लेट'] },
          'gu-IN': { text: 'ઉદાહરણ તરીકે: EMI ડ્યુ: 5 સપ્ટેમ્બર → પેમેન્ટ કર્યું: 25 સપ્ટેમ્બર | 20 દિવસ મોડું (લેટ)', romanPhonetic: 'Udaharan tarike: EMI Due 5 Sep -> Payment karyu 25 Sep | 20 divas modu', backTranslation: 'Example: EMI due 5 Sep -> Paid 25 Sep | 20 days late', transliteratedTerms: ['EMI ડ્યુ', 'પેમેન્ટ', 'લેટ'] },
          'bn-IN': { text: 'উদাহরণস্বরূপ: EMI ডিউ: ৫ সেপ্টেম্বর → পেমেন্ট হয়েছে: ২৫ সেপ্টেম্বর | ২০ দিন লেট (দেরি)', romanPhonetic: 'Udahoron-sworup: EMI Due 5 Sep -> Payment hoyeche 25 Sep | 20 din late', backTranslation: 'Example: EMI due 5 Sep -> Paid 25 Sep | 20 days late', transliteratedTerms: ['EMI ডিউ', 'পেমেন্ট', 'লেট'] },
          'ta-IN': { text: 'உதாரணத்திற்கு: EMI டியூ தேதி: 5 செப்டம்பர் → செலுத்தியது: 25 செப்டம்பர் | 20 நாட்கள் தாமதம் (Late)', romanPhonetic: 'Udhaaranathirku: EMI Due 5 Sep -> Seluthiyadhu 25 Sep | 20 naatkal thaamadham', backTranslation: 'Example: EMI due 5 Sep -> Paid 25 Sep | 20 days late', transliteratedTerms: ['EMI டியூ'] },
          'te-IN': { text: 'ఉదాహరణకు: EMI డ్యూ: 5 సెప్టెంబర్ → చెల్లించింది: 25 సెప్టెంబర్ | 20 రోజులు ఆలస్యం (లేట్)', romanPhonetic: 'Udaharanaku: EMI Due 5 Sep -> Chellinchindi 25 Sep | 20 rojulu aalasyam', backTranslation: 'Example: EMI due 5 Sep -> Paid 25 Sep | 20 days late', transliteratedTerms: ['EMI డ్యూ', 'లేట్'] },
          'ml-IN': { text: 'ഉദാഹരണത്തിന്: EMI ഡ്യൂ: 5 സെപ്റ്റംബർ → അടച്ചത്: 25 സെപ്റ്റംബർ | 20 ദിവസം വൈകി (Late)', romanPhonetic: 'Udaharanathinu: EMI Due 5 Sep -> Adachathu 25 Sep | 20 divasam vaiki', backTranslation: 'Example: EMI due 5 Sep -> Paid 25 Sep | 20 days late', transliteratedTerms: ['EMI ഡ്യൂ'] },
          'kn-IN': { text: 'ಉದಾಹರಣೆಗೆ: EMI ಡ್ಯೂ: 5 ಸೆಪ್ಟೆಂಬರ್ → ಪಾವತಿಸಿದ್ದು: 25 ಸೆಪ್ಟೆಂಬರ್ | 20 ದಿನ ತಡ (ಲೇಟ್)', romanPhonetic: 'Udaharanege: EMI Due 5 Sep -> Paavatisiddu 25 Sep | 20 dina tada', backTranslation: 'Example: EMI due 5 Sep -> Paid 25 Sep | 20 days late', transliteratedTerms: ['EMI ಡ್ಯೂ', 'ಲೇಟ್'] },
        },
      },
      {
        id: 'mp-7',
        role: 'footer',
        sectionLabel: 'Bottom Banner CTA',
        englishText: 'MAKE TIMELY REPAYMENTS NON-NEGOTIABLE.',
        layoutHint: 'Full-width bottom orange bar in bold caps',
        translations: {
          'hi-IN': { text: 'समय पर पेमेंट को अपनी सबसे पहली प्राथमिकता बनाएं — इसमें कोई समझौता न करें।', romanPhonetic: 'Samay par payment ko apni sabse pehli prathmikta banayein — ismein koi samjhauta na karein.', backTranslation: 'Make timely payment your top priority without compromise.', transliteratedTerms: ['पेमेंट'] },
          'mr-IN': { text: 'वेळेवर रीपेमेंट करण्याबाबत कोणतीही तडजोड करू नका.', romanPhonetic: 'Velevar repayment karnyababat kontihi tadjod karu naka.', backTranslation: 'Make no compromise on timely repayments.', transliteratedTerms: ['रीपेमेंट'] },
          'gu-IN': { text: 'સમયસર પેમેન્ટ કરવાના નિયમમાં ક્યારેય બાંધછોડ ન કરો.', romanPhonetic: 'Samaysar payment karvana niyam-ma kyarey bandhchhod na karo.', backTranslation: 'Never compromise on timely payments.', transliteratedTerms: ['પેમેન્ટ'] },
          'bn-IN': { text: 'সময়মতো পেমেন্ট করার বিষয়ে কোনো আপস করবেন না।', romanPhonetic: 'Shomoymoto payment korar bishoye kono aaposh korben na.', backTranslation: 'Never compromise on paying on time.', transliteratedTerms: ['পেমেন্ট'] },
          'ta-IN': { text: 'சரியான நேரத்தில் தவணை செலுத்துவதில் எந்த சமரசமும் வேண்டாம்.', romanPhonetic: 'Sariyaana nerathil thavanai seluthuvadhil endha samarasamum vendaam.', backTranslation: 'No compromise on paying instalments on time.' },
          'te-IN': { text: 'సమయానికి రీపేమెంట్ చేయడంలో ఎలాంటి రాజీ పడకండి.', romanPhonetic: 'Samayaaniki repayment cheyadamlō elaanti raaji padakandi.', backTranslation: 'Do not compromise on making timely repayments.', transliteratedTerms: ['రీపేమెంట్'] },
          'ml-IN': { text: 'കൃത്യസമയത്ത് റീപേയ്‌മെന്റ് നടത്തുന്നതിൽ ഒരു വിട്ടുവീഴ്ചയുംരുത്.', romanPhonetic: 'Krithyasamayathu repayment nadathunnathil oru vittuveezhchayum aruthu.', backTranslation: 'Make no compromise on timely repayments.', transliteratedTerms: ['റീപേയ്‌മെന്റ്'] },
          'kn-IN': { text: 'ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ರೀಪೇಮೆಂಟ್ ಮಾಡುವುದರಲ್ಲಿ ಯಾವುದೇ ರಾಜಿ ಬೇಡ.', romanPhonetic: 'Samayakke sariyaagi repayment maaduvudaralli yaavude raaji beda.', backTranslation: 'No compromise on making timely repayments.', transliteratedTerms: ['ರೀಪೇಮೆಂಟ್'] },
        },
      },
    ],
  },
  {
    id: 'dpdp-act',
    title: 'DPDP Act, 2023: Protect Personal Data',
    category: 'Compliance & Data Privacy',
    themeColor: 'navy',
    imageUrl: './examples/dpdp-act.png',
    rawSourceText: `PROTECT PERSONAL DATA. UNDERSTAND THE LAW.
Digital Personal Data Protection (DPDP) Act, 2023
The framework for how digital personal data is collected, processed, stored and protected.
Why the DPDP Act matters:
1. INDIVIDUAL RIGHTS: Rights over personal data.
2. ORGANISATIONAL DUTIES: Clear responsibilities for organisations.
3. REGULATORY OVERSIGHT: Accountability through the Data Protection Board of India.
4. CUSTOMER CONTROL: Access, correction and erasure rights.
5. LAWFUL PROCESSING: Valid consent or permitted legitimate uses.
WHAT THIS MEANS FOR US: Everyone handling customer information has a role in safeguarding privacy and maintaining trust.
Protect the data. Protect the customer. Protect the trust.`,
    smartTerms: [
      {
        term: 'Digital Personal Data Protection (DPDP) Act, 2023',
        action: 'keep_english',
        reason: 'Official Act title—keep DPDP Act, 2023 intact alongside native script transliteration.',
        exampleOutput: 'डिजिटल पर्सनल डेटा प्रोटेक्शन (DPDP) एक्ट, 2023',
      },
      {
        term: 'Personal Data / Customer / Privacy',
        action: 'transliterate',
        reason: 'In office communication, "पर्सनल डेटा (निजी जानकारी)" and "कस्टमर" are clearer than textbook Sanskrit.',
        exampleOutput: 'पर्सनल डेटा / कस्टमर / प्राइवेसी',
      },
      {
        term: 'Data Protection Board of India',
        action: 'keep_english',
        reason: 'Statutory regulatory body name.',
        exampleOutput: 'Data Protection Board of India',
      },
    ],
    blocks: [
      {
        id: 'dp-1',
        role: 'headline',
        sectionLabel: 'Hero Headline',
        englishText: 'PROTECT PERSONAL DATA. UNDERSTAND THE LAW.',
        layoutHint: '2-line hero headline (White + Orange accent)',
        translations: {
          'hi-IN': { text: 'पर्सनल डेटा सुरक्षित रखें। कानून को समझें।', romanPhonetic: 'Personal data surakshit rakhein. Kanoon ko samjhein.', backTranslation: 'Keep personal data safe. Understand the law.', transliteratedTerms: ['पर्सनल डेटा'] },
          'mr-IN': { text: 'पर्सनल डेटा सुरक्षित ठेवा. कायदा समजून घ्या.', romanPhonetic: 'Personal data surakshit theva. Kayda samjun ghya.', backTranslation: 'Keep personal data safe. Understand the law.', transliteratedTerms: ['पर्सनल डेटा'] },
          'gu-IN': { text: 'પર્સનલ ડેટા સુરક્ષિત રાખો. કાયદાને સમજો.', romanPhonetic: 'Personal data surakshit rakho. Kaydane samjo.', backTranslation: 'Keep personal data safe. Understand the law.', transliteratedTerms: ['પર્સનલ ડેટા'] },
          'bn-IN': { text: 'পার্সোনাল ডেটা সুরক্ষিত রাখুন। আইনটি বুঝুন।', romanPhonetic: 'Personal data surokkhito rakhun. Ainti bujhun.', backTranslation: 'Keep personal data safe. Understand the law.', transliteratedTerms: ['পার্সোনাল ডেটা'] },
          'ta-IN': { text: 'பர்சனல் டேட்டாவைப் பாதுகாப்போம். சட்டத்தைப் புரிந்துகொள்வோம்.', romanPhonetic: 'Personal data-vai paadhukaappom. Sattathai purindhukolvom.', backTranslation: 'Let us protect personal data. Let us understand the law.', transliteratedTerms: ['பர்சனல் டேட்டா'] },
          'te-IN': { text: 'పర్సనల్ డేటాను సురక్షితంగా ఉంచండి. చట్టాన్ని అర్థం చేసుకోండి.', romanPhonetic: 'Personal data-nu surakshitanga unchandi. Chattanni artham chesukondi.', backTranslation: 'Keep personal data safe. Understand the law.', transliteratedTerms: ['పర్సనల్ డేటా'] },
          'ml-IN': { text: 'വ്യക്തിഗത ഡാറ്റ സംരക്ഷിക്കുക. നിയമം മനസ്സിലാക്കുക.', romanPhonetic: 'Vyakthigatha data samrakshikkuka. Niyamam manassilaakkuka.', backTranslation: 'Protect personal data. Understand the law.', transliteratedTerms: ['ഡാറ്റ'] },
          'kn-IN': { text: 'ಪರ್ಸನಲ್ ಡೇಟಾ ಸುರಕ್ಷಿತವಾಗಿರಿಸಿ. ಕಾನೂನನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.', romanPhonetic: 'Personal data surakshitavaagirisi. Kaanoonannu arthamaadikolli.', backTranslation: 'Keep personal data safe. Understand the law.', transliteratedTerms: ['ಪರ್ಸನಲ್ ಡೇಟಾ'] },
        },
      },
      {
        id: 'dp-2',
        role: 'subhead',
        sectionLabel: 'Act Title & Subtitle',
        englishText: 'Digital Personal Data Protection (DPDP) Act, 2023 — The framework for how digital personal data is collected, processed, stored and protected.',
        layoutHint: 'Subtitle block below main headline',
        translations: {
          'hi-IN': { text: 'डिजिटल पर्सनल डेटा प्रोटेक्शन (DPDP) एक्ट, 2023 — यह कानून तय करता है कि डिजिटल पर्सनल डेटा कैसे कलेक्ट, प्रोसेस, स्टोर और सुरक्षित किया जाए।', romanPhonetic: 'Digital Personal Data Protection (DPDP) Act, 2023 — Yeh kanoon tay karta hai ki digital personal data kaise collect, process, store aur surakshit kiya jaye.', backTranslation: 'DPDP Act, 2023 — Defines how digital personal data is collected, processed, stored, and protected.', transliteratedTerms: ['डिजिटल पर्सनल डेटा प्रोटेक्शन', 'DPDP एक्ट', 'कलेक्ट', 'प्रोसेस', 'स्टोर'] },
          'mr-IN': { text: 'डिजिटल पर्सनल डेटा प्रोटेक्शन (DPDP) कायदा, 2023 — डिजिटल पर्सनल डेटा कसा गोळा (Collect), प्रोसेस, स्टोअर आणि सुरक्षित केला जावा याची नियमावली.', romanPhonetic: 'Digital Personal Data Protection (DPDP) Kayda, 2023 — Digital personal data kasa collect, process, store aani surakshit kela java yachi niyamavali.', backTranslation: 'DPDP Act 2023 — Framework for how digital personal data is collected, processed, stored, and protected.', transliteratedTerms: ['डिजिटल पर्सनल डेटा', 'DPDP', 'प्रोसेस', 'स्टोअर'] },
          'gu-IN': { text: 'ડિજિટલ પર્સનલ ડેટા પ્રોટેક્શન (DPDP) એક્ટ, 2023 — ડિજિટલ પર્સનલ ડેટા કેવી રીતે કલેક્ટ, પ્રોસેસ, સ્ટોર અને સુરક્ષિત કરવો તેનું માળખું.', romanPhonetic: 'Digital Personal Data Protection (DPDP) Act, 2023 — Digital personal data kevi rite collect, process, store ane surakshit karvo tenu maalkhu.', backTranslation: 'DPDP Act 2023 — Framework for collecting, processing, storing, and protecting digital personal data.', transliteratedTerms: ['ડિજિટલ પર્સનલ ડેટા', 'DPDP એક્ટ', 'કલેક્ટ', 'પ્રોસેસ', 'સ્ટોર'] },
          'bn-IN': { text: 'ডিজিটাল পার্সোনাল ডেটা প্রোটেকশন (DPDP) অ্যাক্ট, ২০২৩ — ডিজিটাল পার্সোনাল ডেটা কীভাবে সংগ্রহ, প্রসেস, স্টোর এবং সুরক্ষিত করা হবে তার নিয়মাবলী।', romanPhonetic: 'Digital Personal Data Protection (DPDP) Act, 2023 — Digital personal data kibhabe shongroho, process, store ebong surokkhito kora hobe tar niyomaboli.', backTranslation: 'DPDP Act 2023 — Framework for how digital personal data is collected, processed, stored, and protected.', transliteratedTerms: ['ডিজিটাল পার্সোনাল ডেটা', 'DPDP অ্যাক্ট', 'প্রসেস', 'স্টোর'] },
          'ta-IN': { text: 'டிஜிட்டல் பர்சனல் டேட்டா பாதுகாப்பு (DPDP) சட்டம், 2023 — டிஜிட்டல் தனிப்பட்ட டேட்டா எவ்வாறு சேகரிக்கப்படுகிறது, பிராசஸ் செய்யப்படுகிறது, சேமிக்கப்படுகிறது மற்றும் பாதுகாக்கப்படுகிறது என்பதற்கான விதிமுறைகள்.', romanPhonetic: 'Digital Personal Data Paadhukaappu (DPDP) Sattam, 2023...', backTranslation: 'DPDP Act 2023 — Rules for how digital personal data is collected, processed, stored, and protected.', transliteratedTerms: ['டிஜிட்டல் பர்சனல் டேட்டா', 'DPDP', 'பிராசஸ்'] },
          'te-IN': { text: 'డిజిటల్ పర్సనల్ డేటా ప్రొటెక్షన్ (DPDP) చట్టం, 2023 — డిజిటల్ పర్సనల్ డేటా ఎలా సేకరించాలి, ప్రాసెస్ చేయాలి, స్టోర్ చేయాలి మరియు సురక్షితంగా ఉంచాలో తెలిపే విధానం.', romanPhonetic: 'Digital Personal Data Protection (DPDP) Chattam, 2023...', backTranslation: 'DPDP Act 2023 — Framework for collecting, processing, storing, and protecting digital personal data.', transliteratedTerms: ['డిజిటల్ పర్సనల్ డేటా', 'DPDP', 'ప్రాసెస్', 'స్టోర్'] },
          'ml-IN': { text: 'ഡിജിറ്റൽ പേഴ്സണൽ ഡാറ്റ പ്രൊട്ടക്ഷൻ (DPDP) ആക്ട്, 2023 — ഡിജിറ്റൽ വ്യക്തിഗത ഡാറ്റ എങ്ങനെ ശേഖരിക്കണം, പ്രോസസ്സ് ചെയ്യണം, സൂക്ഷിക്കണം, സംരക്ഷിക്കണം എന്നതിന്റെ ചട്ടക്കൂട്.', romanPhonetic: 'Digital Personal Data Protection (DPDP) Act, 2023...', backTranslation: 'DPDP Act 2023 — Framework for collecting, processing, storing, and protecting digital personal data.', transliteratedTerms: ['ഡിജിറ്റൽ പേഴ്സണൽ ഡാറ്റ', 'DPDP ആക്ട്', 'പ്രോസസ്സ്'] },
          'kn-IN': { text: 'ಡಿಜಿಟಲ್ ಪರ್ಸನಲ್ ಡೇಟಾ ಪ್ರೊಟೆಕ್ಷನ್ (DPDP) ಕಾಯ್ದೆ, 2023 — ಡಿಜಿಟಲ್ ಪರ್ಸನಲ್ ಡೇಟಾವನ್ನು ಹೇಗೆ ಸಂಗ್ರಹಿಸಬೇಕು, ಪ್ರೊಸೆಸ್ ಮಾಡಬೇಕು, ಸ್ಟೋರ್ ಮಾಡಬೇಕು ಮತ್ತು ರಕ್ಷಿಸಬೇಕು ಎಂಬುದರ ಚೌಕಟ್ಟು.', romanPhonetic: 'Digital Personal Data Protection (DPDP) Kaayde, 2023...', backTranslation: 'DPDP Act 2023 — Framework for collecting, processing, storing, and protecting digital personal data.', transliteratedTerms: ['ಡಿಜಿಟಲ್ ಪರ್ಸನಲ್ ಡೇಟಾ', 'DPDP', 'ಪ್ರೊಸೆಸ್', 'ಸ್ಟೋರ್'] },
        },
      },
      {
        id: 'dp-3',
        role: 'card_body',
        sectionLabel: '5 Pillar Cards',
        englishText: '1. INDIVIDUAL RIGHTS: Rights over personal data.\n2. ORGANISATIONAL DUTIES: Clear responsibilities for organisations.\n3. REGULATORY OVERSIGHT: Accountability through the Data Protection Board of India.\n4. CUSTOMER CONTROL: Access, correction and erasure rights.\n5. LAWFUL PROCESSING: Valid consent or permitted legitimate uses.',
        layoutHint: '5 horizontal cards in the middle band',
        translations: {
          'hi-IN': { text: '1. व्यक्ति के अधिकार: अपने पर्सनल डेटा पर पूरा अधिकार।\n2. कंपनी की ज़िम्मेदारियां: संगठनों के लिए स्पष्ट नियम और कर्तव्य।\n3. रेगुलेटरी निगरानी: Data Protection Board of India के ज़रिए जवाबदेही।\n4. कस्टमर का कंट्रोल: डेटा देखने, सुधारने और डिलीट करवाने का अधिकार।\n5. कानूनी प्रोसेसिंग: केवल वैध सहमति (Consent) या कानूनी उपयोग के लिए ही डेटा का इस्तेमाल।', romanPhonetic: '1. Vyakti ke adhikar... 2. Company ki zimmedariyan... 3. Regulatory nigrani... 4. Customer ka control... 5. Kanooni processing...', backTranslation: '1. Individual rights. 2. Company duties. 3. Regulatory oversight via Data Protection Board of India. 4. Customer control to access, fix, delete. 5. Lawful processing with valid consent.', transliteratedTerms: ['पर्सनल डेटा', 'रेगुलेटरी', 'कस्टमर', 'कंट्रोल', 'डिलीट', 'प्रोसेसिंग', 'Consent'] },
          'mr-IN': { text: '1. वैयक्तिक हक्क: स्वतःच्या पर्सनल डेटावर अधिकार.\n2. संस्थेची कर्तव्ये: कंपन्यांसाठी स्पष्ट जबाबदाऱ्या.\n3. रेग्युलेटरी देखरेख: Data Protection Board of India द्वारे उत्तरदायित्व.\n4. कस्टमर कंट्रोल: डेटा पाहण्याचा, दुरुस्त करण्याचा आणि डिलीट करण्याचा अधिकार.\n5. कायदेशीर प्रोसेसिंग: वैध संमती (Consent) किंवा कायदेशीर कारणासाठीच वापर.', romanPhonetic: '1. Vaiyaktik hakka... 2. Sansthechi kartavye... 3. Regulatory dekhrekh... 4. Customer control... 5. Kaydeshir processing...', backTranslation: '1. Individual rights. 2. Organisational duties. 3. Regulatory oversight. 4. Customer control. 5. Lawful processing.', transliteratedTerms: ['पर्सनल डेटा', 'रेग्युलेटरी', 'कस्टमर कंट्रोल', 'डिलीट', 'प्रोसेसिंग'] },
          'gu-IN': { text: '1. વ્યક્તિગત અધિકારો: પોતાના પર્સનલ ડેટા પર અધિકાર.\n2. સંસ્થાની ફરજો: કંપનીઓ માટે સ્પષ્ટ જવાબદારીઓ.\n3. રેગ્યુલેટરી દેખરેખ: Data Protection Board of India દ્વારા જવાબદારી.\n4. કસ્ટમર કંટ્રોલ: ડેટા જાણવાનો, સુધારવાનો અને ડિલીટ કરવાનો અધિકાર.\n5. કાયદેસર પ્રોસેસિંગ: માન્ય સંમતિ (Consent) અથવા કાયદેસર ઉપયોગ પૂરતું જ.', romanPhonetic: '1. Vyaktigat adhikaro... 2. Sansthani farajo... 3. Regulatory dekhrekh... 4. Customer control... 5. Kaydesar processing...', backTranslation: '1. Individual rights. 2. Organisational duties. 3. Regulatory oversight. 4. Customer control. 5. Lawful processing.', transliteratedTerms: ['પર્સનલ ડેટા', 'રેગ્યુલેટરી', 'કસ્ટમર કંટ્રોલ', 'ડિલીટ', 'પ્રોસેસિંગ'] },
          'bn-IN': { text: '1. ব্যক্তিগত অধিকার: নিজের পার্সোনাল ডেটার ওপর অধিকার।\n2. সংস্থার দায়িত্ব: প্রতিষ্ঠানের জন্য স্পষ্ট দায়িত্ব ও নিয়ম।\n3. রেগুলেটরি নজরদারি: Data Protection Board of India-র মাধ্যমে জবাবদিহি।\n4. কাস্টমার কন্ট্রোল: ডেটা দেখা, সংশোধন ও ডিলিট করার অধিকার।\n5. বৈধ প্রসেসিং: সঠিক সম্মতি (Consent) বা অনুমোদিত বৈধ কাজে ব্যবহার।', romanPhonetic: '1. Byaktigoto odhikar... 2. Shongsthar dayitwo... 3. Regulatory nojordari... 4. Customer control... 5. Boidho processing...', backTranslation: '1. Individual rights. 2. Organisational duties. 3. Regulatory oversight. 4. Customer control. 5. Lawful processing.', transliteratedTerms: ['পার্সোনাল ডেটা', 'রেগুলেটরি', 'কাস্টমার কন্ট্রোল', 'ডিলিট', 'প্রসেসিং'] },
          'ta-IN': { text: '1. தனிநபர் உரிமைகள்: பர்சனல் டேட்டா மீதான உரிமைகள்.\n2. நிறுவனக் கடமைகள்: நிறுவனங்களுக்கான தெளிவான பொறுப்புகள்.\n3. ஒழுங்குமுறை கண்காணிப்பு: Data Protection Board of India மூலம் பொறுப்புக்கூறல்.\n4. கஸ்டமர் கட்டுப்பாடு: டேட்டாவை அணுக, திருத்த மற்றும் நீக்க (Delete) உரிமை.\n5. சட்டப்பூர்வ பிராசஸிங்: முறையான ஒப்புதல் (Consent) அல்லது சட்டப்பூர்வ பயன்பாடு மட்டுமே.', romanPhonetic: '1. Thaninabar urimaigal... 2. Niruvana kadamaigal... 3. Ozhungumurai kankaanippu... 4. Customer kattuppaadu... 5. Sattapoorva processing...', backTranslation: '1. Individual rights. 2. Organisational duties. 3. Regulatory oversight. 4. Customer control. 5. Lawful processing.', transliteratedTerms: ['பர்சனல் டேட்டா', 'கஸ்டமர்', 'பிராசஸிங்'] },
          'te-IN': { text: '1. వ్యక్తిగత హక్కులు: పర్సనల్ డేటాపై హక్కులు.\n2. సంస్థ బాధ్యతలు: సంస్థలకు స్పష్టమైన బాధ్యతలు.\n3. రెగ్యులేటరీ పర్యవేక్షణ: Data Protection Board of India ద్వారా జవాబుదారీతనం.\n4. కస్టమర్ కంట్రోల్: డేటాను చూసే, సరిచేసే మరియు డిలీట్ చేసే హక్కులు.\n5. చట్టబద్ధమైన ప్రాసెసింగ్: సరైన సమ్మతి (Consent) లేదా అనుమతించబడిన చట్టబద్ధ ఉపయోగాలు.', romanPhonetic: '1. Vyaktigata hakkulu... 2. Samstha baadhyatalu... 3. Regulatory paryavekshana... 4. Customer control... 5. Chattabaddhamaina processing...', backTranslation: '1. Individual rights. 2. Organisational duties. 3. Regulatory oversight. 4. Customer control. 5. Lawful processing.', transliteratedTerms: ['పర్సనల్ డేటా', 'రెగ్యులేటరీ', 'కస్టమర్ కంట్రోల్', 'డిలీట్', 'ప్రాసెసింగ్'] },
          'ml-IN': { text: '1. വ്യക്തിഗത അവകാശങ്ങൾ: പേഴ്സണൽ ഡാറ്റയിലുള്ള അവകാശങ്ങൾ.\n2. സ്ഥാപനത്തിന്റെ ചുമതലകൾ: സ്ഥാപനങ്ങൾക്ക് വ്യക്തമായ ഉത്തരവാദിത്തങ്ങൾ.\n3. റെഗുലേറ്ററി മേൽനോട്ടം: Data Protection Board of India വഴിയുള്ള ഉത്തരവാദിത്തം.\n4. കസ്റ്റമർ കൺട്രോൾ: ഡാറ്റ പരിശോധിക്കാനും തിരുത്താനും ഡിലീറ്റ് ചെയ്യാനുമുള്ള അവകാശം.\n5. നിയമപരമായ പ്രോസസ്സിംഗ്: സാധുവായ സമ്മതം (Consent) അല്ലെങ്കിൽ നിയമപരമായ ആവശ്യങ്ങൾക്ക് മാത്രം.', romanPhonetic: '1. Vyakthigatha avakaashangal... 2. Sthaapanathinte chumathalakal... 3. Regulatory melnottam... 4. Customer control... 5. Niyamaparamaaya processing...', backTranslation: '1. Individual rights. 2. Organisational duties. 3. Regulatory oversight. 4. Customer control. 5. Lawful processing.', transliteratedTerms: ['പേഴ്സണൽ ഡാറ്റ', 'റെഗുലേറ്ററി', 'കസ്റ്റമർ കൺട്രോൾ', 'ഡിലീറ്റ്', 'പ്രോസസ്സിംഗ്'] },
          'kn-IN': { text: '1. ವೈಯಕ್ತಿಕ ಹಕ್ಕುಗಳು: ಪರ್ಸನಲ್ ಡೇಟಾ ಮೇಲಿನ ಹಕ್ಕುಗಳು.\n2. ಸಂಸ್ಥೆಯ ಜವಾಬ್ದಾರಿಗಳು: ಸಂಸ್ಥೆಗಳಿಗೆ ಸ್ಪಷ್ಟ ಜವಾಬ್ದಾರಿಗಳು.\n3. ರೆಗ್ಯುಲೇಟರಿ ಮೇಲ್ವಿಚಾರಣೆ: Data Protection Board of India ಮೂಲಕ ಉತ್ತರದಾಯಿತ್ವ.\n4. ಕಸ್ಟಮರ್ ಕಂಟ್ರೋಲ್: ಡೇಟಾ ನೋಡುವ, ತಿದ್ದುವ ಮತ್ತು ಡಿಲೀಟ್ ಮಾಡುವ ಹಕ್ಕು.\n5. ಕಾನೂನುಬದ್ಧ ಪ್ರೊಸೆಸ್ಸಿಂಗ್: ಮಾನ್ಯ ಒಪ್ಪಿಗೆ (Consent) ಅಥವಾ ಅನುಮತಿಸಲಾದ ಕಾನೂನುಬದ್ಧ ಬಳಕೆ.', romanPhonetic: '1. Vaiyaktika hakkugalu... 2. Samstheya javaabdaarigalu... 3. Regulatory melvichaarane... 4. Customer control... 5. Kaanoonubaddha processing...', backTranslation: '1. Individual rights. 2. Organisational duties. 3. Regulatory oversight. 4. Customer control. 5. Lawful processing.', transliteratedTerms: ['ಪರ್ಸನಲ್ ಡೇಟಾ', 'ರೆಗ್ಯುಲೇಟರಿ', 'ಕಸ್ಟಮರ್ ಕಂಟ್ರೋಲ್', 'ಡಿಲೀಟ್', 'ಪ್ರೊಸೆಸ್ಸಿಂಗ್'] },
        },
      },
      {
        id: 'dp-4',
        role: 'footer',
        sectionLabel: 'Bottom Banner & Slogan',
        englishText: 'WHAT THIS MEANS FOR US: Everyone handling customer information has a role in safeguarding privacy and maintaining trust. | Protect the data. Protect the customer. Protect the trust.',
        layoutHint: 'Bottom dark footer left + right slogan',
        translations: {
          'hi-IN': { text: 'हमारे लिए इसका क्या मतलब है: कस्टमर की जानकारी संभालने वाले हर कर्मचारी की यह ज़िम्मेदारी है कि वह प्राइवेसी की रक्षा करे और भरोसा बनाए रखे। | डेटा सुरक्षित रखें। कस्टमर सुरक्षित रखें। भरोसा बनाए रखें।', romanPhonetic: 'Hamare liye iska kya matlab hai: Customer ki jaankari sambhalne wale har karmchari ki yeh zimmedari hai...', backTranslation: 'What this means for us: Every employee handling customer info has a duty to protect privacy and trust. Protect data, customer, trust.', transliteratedTerms: ['कस्टमर', 'प्राइवेसी', 'डेटा'] },
          'mr-IN': { text: 'याचा आपल्यासाठी काय अर्थ आहे: कस्टमरची माहिती हाताळणाऱ्या प्रत्येक कर्मचाऱ्याची गोपनीयता (Privacy) जपण्यात आणि विश्वास टिकवण्यात महत्त्वाची भूमिका आहे. | डेटा सुरक्षित ठेवा. कस्टमर सुरक्षित ठेवा. विश्वास जपा.', romanPhonetic: 'Yacha aaplyasathi kay arth aahe...', backTranslation: 'What this means for us: Everyone handling customer info plays a role in protecting privacy and trust.', transliteratedTerms: ['कस्टमर', 'Privacy', 'डेटा'] },
          'gu-IN': { text: 'આપણાં માટે આનો અર્થ શું છે: કસ્ટમરની માહિતી સંભાળતા દરેક કર્મચારીની પ્રાઈવસી જાળવવામાં અને વિશ્વાસ ટકાવી રાખવામાં ભૂમિકા છે. | ડેટા સુરક્ષિત રાખો. કસ્ટમર સુરક્ષિત રાખો. વિશ્વાસ જાળવી રાખો.', romanPhonetic: 'Aapna mate aano arth shu chhe...', backTranslation: 'What this means for us: Everyone handling customer info has a role in keeping privacy and trust.', transliteratedTerms: ['કસ્ટમર', 'પ્રાઈવસી', 'ડેટા'] },
          'bn-IN': { text: 'আমাদের জন্য এর অর্থ কী: কাস্টমারের তথ্য নিয়ে কাজ করা প্রত্যেক কর্মীরই প্রাইভেসি রক্ষা এবং ভরসা বজায় রাখার দায়িত্ব রয়েছে। | ডেটা সুরক্ষিত রাখুন। কাস্টমারকে সুরক্ষিত রাখুন। ভরসা অটুট রাখুন।', romanPhonetic: 'Aamader jonno er ortho ki...', backTranslation: 'What this means for us: Everyone handling customer data has a duty to protect privacy and trust.', transliteratedTerms: ['কাস্টমার', 'প্রাইভেসি', 'ডেটা'] },
          'ta-IN': { text: 'நமக்கு இதன் பொருள் என்ன: கஸ்டமர் தகவல்களைக் கையாளும் ஒவ்வொருவருக்கும் பிரைவசியைப் பாதுகாப்பதிலும் நம்பிக்கையை நிலைநிறுத்துவதிலும் பங்கு உள்ளது. | டேட்டாவைப் பாதுகாப்போம். கஸ்டமரைப் பாதுகாப்போம். நம்பிக்கையைப் பாதுகாப்போம்.', romanPhonetic: 'Namakku idhan porul enna...', backTranslation: 'What this means for us: Everyone handling customer data has a role in protecting privacy and trust.', transliteratedTerms: ['கஸ்டமர்', 'பிரைவசி', 'டேட்டா'] },
          'te-IN': { text: 'మనకు దీని అర్థం ఏమిటి: కస్టమర్ సమాచారాన్ని నిర్వహించే ప్రతి ఒక్కరికీ ప్రైవసీని కాపాడటంలో మరియు నమ్మకాన్ని నిలబెట్టడంలో బాధ్యత ఉంది. | డేటాను రక్షించండి. కస్టమర్‌ను రక్షించండి. నమ్మకాన్ని నిలబెట్టండి.', romanPhonetic: 'Manaku deeni artham emiti...', backTranslation: 'What this means for us: Everyone handling customer info has a duty to protect privacy and trust.', transliteratedTerms: ['కస్టమర్', 'ప్రైవసీ', 'డేటా'] },
          'ml-IN': { text: 'ഇത് നമുക്ക് നൽകുന്ന സന്ദേശം: കസ്റ്റമർ വിവരങ്ങൾ കൈകാര്യം ചെയ്യുന്ന ഓരോരുത്തർക്കും പ്രൈവസി സംരക്ഷിക്കുന്നതിലും വിശ്വാസം നിലനിർത്തുന്നതിലും പങ്കുണ്ട്. | ഡാറ്റ സംരക്ഷിക്കുക. കസ്റ്റമറെ സംരക്ഷിക്കുക. വിശ്വാസം കാത്തുസൂക്ഷിക്കുക.', romanPhonetic: 'Ithu namukku nalkunna sandesham...', backTranslation: 'What this means for us: Everyone handling customer info has a role in safeguarding privacy and trust.', transliteratedTerms: ['കസ്റ്റമർ', 'പ്രൈവസി', 'ഡാറ്റ'] },
          'kn-IN': { text: 'ನಮಗೆ ಇದರ ಅರ್ಥವೇನು: ಕಸ್ಟಮರ್ ಮಾಹಿತಿಯನ್ನು ನಿರ್ವಹಿಸುವ ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಪ್ರೈವೆಸಿ ಕಾಪಾಡುವಲ್ಲಿ ಮತ್ತು ವಿಶ್ವಾಸ ಉಳಿಸಿಕೊಳ್ಳುವಲ್ಲಿ ಪಾತ್ರವಿದೆ. | ಡೇಟಾ ರಕ್ಷಿಸಿ. ಕಸ್ಟಮರ್ ರಕ್ಷಿಸಿ. ವಿಶ್ವಾಸ ಉಳಿಸಿ.', romanPhonetic: 'Namage idara arthavenu...', backTranslation: 'What this means for us: Everyone handling customer info has a role in safeguarding privacy and trust.', transliteratedTerms: ['ಕಸ್ಟಮರ್', 'ಪ್ರೈವೆಸಿ', 'ಡೇಟಾ'] },
        },
      },
    ],
  },
  {
    id: 'foir-policy',
    title: 'Financial Prudence Policy: Revised FOIR Thresholds',
    category: 'HR & Risk Policy Update',
    themeColor: 'royal',
    imageUrl: './examples/foir-policy.png',
    rawSourceText: `FINANCIAL PRUDENCE POLICY
Effective: 01 July 2026
Applies to full-time employees (FTEs) and fixed-term contract employees (FTCs).
REVISED FOIR THRESHOLDS
FOIR = Fixed Obligation to Income Ratio
FTEs: Grade-based thresholds
FTCs: 55% Standard FOIR threshold
STRUCTURED DELINQUENCY ACTIONS: Separate action frameworks for FTEs and FTCs.
HIGH FOIR: POTENTIAL IMPACT: May affect movement, authority, absorption and employment outcomes. Authority capping may apply to FTEs in identified sensitive roles.
Scan to read the full policy on OPEN.
Queries? HR Genie or your HR Partner.`,
    smartTerms: [
      {
        term: 'FOIR / FTEs / FTCs',
        action: 'keep_english',
        reason: 'Official Bajaj Finance HR & Risk acronyms—must stay in English caps.',
        exampleOutput: 'FOIR | FTEs | FTCs',
      },
      {
        term: 'OPEN / HR Genie / HR Partner',
        action: 'keep_english',
        reason: 'Internal employee portal (OPEN) and HR support channels must never be translated.',
        exampleOutput: 'OPEN | HR Genie | HR Partner',
      },
      {
        term: 'Grade-based thresholds / Authority capping',
        action: 'everyday_translate',
        reason: 'Use clear office vernacular ("ग्रेड के अनुसार तय लिमिट", "अधिकारों पर सीमा") while retaining "ग्रेड / लिमिट".',
        exampleOutput: 'ग्रेड के अनुसार तय लिमिट (Thresholds)',
      },
    ],
    blocks: [
      {
        id: 'fp-1',
        role: 'headline',
        sectionLabel: 'Left Banner Title & Date',
        englishText: 'FINANCIAL PRUDENCE POLICY | Effective: 01 July 2026',
        layoutHint: 'Left column title + pill badge',
        translations: {
          'hi-IN': { text: 'फाइनेंशियल प्रूडेंस पॉलिसी (आर्थिक अनुशासन नीति) | लागू: 01 जुलाई 2026 से', romanPhonetic: 'Financial Prudence Policy | Laagu: 01 July 2026 se', backTranslation: 'Financial Prudence Policy | Effective: from 01 July 2026', transliteratedTerms: ['फाइनेंशियल प्रूडेंस पॉलिसी'] },
          'mr-IN': { text: 'फायनान्शियल प्रूडन्स पॉलिसी (आर्थिक शिस्त धोरण) | लागू: 01 जुलै 2026 पासून', romanPhonetic: 'Financial Prudence Policy | Laagu: 01 July 2026 pasun', backTranslation: 'Financial Prudence Policy | Effective from 01 July 2026', transliteratedTerms: ['फायनान्शियल प्रूडन्स पॉलिसी'] },
          'gu-IN': { text: 'ફાઇનાન્શિયલ પ્રુડન્સ પોલિસી (આર્થિક શિસ્ત નીતિ) | અમલ: 01 જુલાઈ 2026થી', romanPhonetic: 'Financial Prudence Policy | Amal: 01 July 2026 thi', backTranslation: 'Financial Prudence Policy | Effective from 01 July 2026', transliteratedTerms: ['ફાઇનાન્શિયલ પ્રુડન્સ પોલિસી'] },
          'bn-IN': { text: 'ফাইন্যান্সিয়াল প্রুডেন্স পলিসি (আর্থিক শৃঙ্খলা নীতি) | কার্যকর: ০১ জুলাই ২০২৬ থেকে', romanPhonetic: 'Financial Prudence Policy | Karjokor: 01 July 2026 theke', backTranslation: 'Financial Prudence Policy | Effective from 01 July 2026', transliteratedTerms: ['ফাইন্যান্সিয়াল প্রুডেন্স পলিসি'] },
          'ta-IN': { text: 'ஃபைனான்சியல் புரூடென்ஸ் பாலிசி (நிதி ஒழுக்கக் கொள்கை) | அமல்: 01 ஜூலை 2026 முதல்', romanPhonetic: 'Financial Prudence Policy | Amal: 01 July 2026 mudhal', backTranslation: 'Financial Prudence Policy | Effective from 01 July 2026', transliteratedTerms: ['ஃபைனான்சியல் புரூடென்ஸ் பாலிசி'] },
          'te-IN': { text: 'ఫైనాన్షియల్ ప్రూడెన్స్ పాలసీ (ఆర్థిక క్రమశిక్షణ విధానం) | అమలు: 01 జూలై 2026 నుండి', romanPhonetic: 'Financial Prudence Policy | Amalu: 01 July 2026 nundi', backTranslation: 'Financial Prudence Policy | Effective from 01 July 2026', transliteratedTerms: ['ఫైనాన్షియల్ ప్రూడెన్స్ పాలసీ'] },
          'ml-IN': { text: 'ഫിനാൻഷ്യൽ പ്രൂഡൻസ് പോളിസി (സാമ്പത്തിക അച്ചടക്ക നയം) | പ്രാബല്യത്തിൽ: 01 ജൂലൈ 2026 മുതൽ', romanPhonetic: 'Financial Prudence Policy | Praabalyathil: 01 July 2026 muthal', backTranslation: 'Financial Prudence Policy | Effective from 01 July 2026', transliteratedTerms: ['ഫിനാൻഷ്യൽ പ്രൂഡൻസ് പോളിസി'] },
          'kn-IN': { text: 'ಫೈನಾನ್ಶಿಯಲ್ ಪ್ರೂಡೆನ್ಸ್ ಪಾಲಿಸಿ (ಆರ್ಥಿಕ ಶಿಸ್ತು ನೀತಿ) | ಜಾರಿ: 01 ಜುಲೈ 2026 ರಿಂದ', romanPhonetic: 'Financial Prudence Policy | Jaari: 01 July 2026 rinda', backTranslation: 'Financial Prudence Policy | Effective from 01 July 2026', transliteratedTerms: ['ಫೈನಾನ್ಶಿಯಲ್ ಪ್ರೂಡೆನ್ಸ್ ಪಾಲಿಸಿ'] },
        },
      },
      {
        id: 'fp-2',
        role: 'subhead',
        sectionLabel: 'Eligibility Header',
        englishText: 'Applies to full-time employees (FTEs) and fixed-term contract employees (FTCs).',
        layoutHint: 'Top right header text',
        translations: {
          'hi-IN': { text: 'यह पॉलिसी सभी फुल-टाइम कर्मचारियों (FTEs) और फिक्स्ड-टर्म कॉन्ट्रैक्ट कर्मचारियों (FTCs) पर लागू है।', romanPhonetic: 'Yeh policy sabhi full-time karmchariyon (FTEs) aur fixed-term contract karmchariyon (FTCs) par laagu hai.', backTranslation: 'This policy applies to all full-time (FTEs) and fixed-term contract (FTCs) employees.', transliteratedTerms: ['पॉलिसी', 'फुल-टाइम', 'FTEs', 'फिक्स्ड-टर्म कॉन्ट्रैक्ट', 'FTCs'] },
          'mr-IN': { text: 'सर्व फुल-टाइम कर्मचारी (FTEs) आणि फिक्स्ड-टर्म कॉन्ट्रॅक्ट कर्मचारी (FTCs) यांना लागू.', romanPhonetic: 'Sarva full-time karmchari (FTEs) aani fixed-term contract karmchari (FTCs) yanna laagu.', backTranslation: 'Applicable to all full-time (FTEs) and fixed-term contract (FTCs) employees.', transliteratedTerms: ['फुल-टाइम', 'FTEs', 'फिक्स्ड-टर्म कॉन्ट्रॅक्ट', 'FTCs'] },
          'gu-IN': { text: 'તમામ ફુલ-ટાઇમ કર્મચારીઓ (FTEs) અને ફિક્સ્ડ-ટર્મ કોન્ટ્રાક્ટ કર્મચારીઓ (FTCs) ને લાગુ પડે છે.', romanPhonetic: 'Tamam full-time karmchario (FTEs) ane fixed-term contract karmchario (FTCs) ne laagu pade chhe.', backTranslation: 'Applies to all full-time (FTEs) and fixed-term contract (FTCs) employees.', transliteratedTerms: ['ફુલ-ટાઇમ', 'FTEs', 'ફિક્સ્ડ-ટર્મ કોન્ટ્રાક્ટ', 'FTCs'] },
          'bn-IN': { text: 'সকল ফুল-টাইম কর্মী (FTEs) এবং ফিক্সড-টার্ম কন্ট্রাক্ট কর্মীদের (FTCs) জন্য প্রযোজ্য।', romanPhonetic: 'Shokol full-time kormi (FTEs) ebong fixed-term contract kormider (FTCs) jonno projojjo.', backTranslation: 'Applicable to all full-time (FTEs) and fixed-term contract (FTCs) employees.', transliteratedTerms: ['ফুল-টাইম', 'FTEs', 'ফিক্সড-টার্ম কন্ট্রাক্ট', 'FTCs'] },
          'ta-IN': { text: 'முழுநேர ஊழியர்கள் (FTEs) மற்றும் குறிப்பிட்ட கால ஒப்பந்த ஊழியர்கள் (FTCs) அனைவருக்கும் பொருந்தும்.', romanPhonetic: 'Muzhunera oozhiyargal (FTEs) matrum kurippitta kaala oppandha oozhiyargal (FTCs) anaivarukkum porundhum.', backTranslation: 'Applies to all full-time (FTEs) and fixed-term contract (FTCs) employees.', transliteratedTerms: ['FTEs', 'FTCs'] },
          'te-IN': { text: 'ఫుల్-టైమ్ ఉద్యోగులు (FTEs) మరియు ఫిక్స్‌డ్-టర్మ్ కాంట్రాక్ట్ ఉద్యోగులు (FTCs) అందరికీ వర్తిస్తుంది.', romanPhonetic: 'Full-time udyogulu (FTEs) mariyu fixed-term contract udyogulu (FTCs) andariki vartistundi.', backTranslation: 'Applies to all full-time (FTEs) and fixed-term contract (FTCs) employees.', transliteratedTerms: ['ఫుల్-టైమ్', 'FTEs', 'ఫిక్స్‌డ్-టర్మ్ కాంట్రాక్ట్', 'FTCs'] },
          'ml-IN': { text: 'മുഴുവൻ സമയ ജീവനക്കാർക്കും (FTEs) നിശ്ചിത கால കരാർ ജീവനക്കാർക്കും (FTCs) ബാധകമാണ്.', romanPhonetic: 'Muzhuvan samaya jeevanakkarkkum (FTEs) nischitha kaala karaar jeevanakkarkkum (FTCs) baadhakamaanu.', backTranslation: 'Applies to full-time (FTEs) and fixed-term contract (FTCs) employees.', transliteratedTerms: ['FTEs', 'FTCs'] },
          'kn-IN': { text: 'ಪೂರ್ಣಾವಧಿ ಉದ್ಯೋಗಿಗಳು (FTEs) ಮತ್ತು ನಿಗದಿತ ಅವಧಿಯ ಗುತ್ತಿಗೆ ಉದ್ಯೋಗಿಗಳಿಗೆ (FTCs) ಅನ್ವಯಿಸುತ್ತದೆ.', romanPhonetic: 'Poornaavadhi udyogigalu (FTEs) mattu nigadita avadhiya guttige udyogigalige (FTCs) anvayisuttade.', backTranslation: 'Applies to full-time (FTEs) and fixed-term contract (FTCs) employees.', transliteratedTerms: ['FTEs', 'FTCs'] },
        },
      },
      {
        id: 'fp-3',
        role: 'metric',
        sectionLabel: 'Revised FOIR Thresholds Cards',
        englishText: 'REVISED FOIR THRESHOLDS (FOIR = Fixed Obligation to Income Ratio) | FTEs: Grade-based thresholds | FTCs: 55% Standard FOIR threshold',
        layoutHint: 'Two side-by-side highlight cards for FTEs and FTCs',
        translations: {
          'hi-IN': { text: 'संशोधित FOIR लिमिट (FOIR = Fixed Obligation to Income Ratio) | FTEs: ग्रेड के अनुसार तय लिमिट | FTCs: 55% स्टैंडर्ड FOIR लिमिट', romanPhonetic: 'Sanshodhit FOIR Limit | FTEs: Grade ke anusar tay limit | FTCs: 55% Standard FOIR limit', backTranslation: 'Revised FOIR Limits | FTEs: Grade-based limits | FTCs: 55% Standard FOIR limit', transliteratedTerms: ['FOIR', 'लिमिट', 'FTEs', 'ग्रेड', 'FTCs', 'स्टैंडर्ड'] },
          'mr-IN': { text: 'सुधारित FOIR मर्यादा (FOIR = Fixed Obligation to Income Ratio) | FTEs: ग्रेडनुसार ठरवलेली मर्यादा | FTCs: 55% स्टँडर्ड FOIR मर्यादा', romanPhonetic: 'Sudharit FOIR Maryada | FTEs: Grade nusar tharavleli maryada | FTCs: 55% Standard FOIR maryada', backTranslation: 'Revised FOIR thresholds | FTEs: Grade-based thresholds | FTCs: 55% Standard FOIR threshold', transliteratedTerms: ['FOIR', 'FTEs', 'ग्रेड', 'FTCs', 'स्टँडर्ड'] },
          'gu-IN': { text: 'સુધારેલી FOIR લિમિટ (FOIR = Fixed Obligation to Income Ratio) | FTEs: ગ્રેડ મુજબ નક્કી કરેલી લિમિટ | FTCs: 55% સ્ટાન્ડર્ડ FOIR લિમિટ', romanPhonetic: 'Sudhareli FOIR Limit | FTEs: Grade mujab nakki kareli limit | FTCs: 55% Standard FOIR limit', backTranslation: 'Revised FOIR limits | FTEs: Grade-wise limit | FTCs: 55% Standard FOIR limit', transliteratedTerms: ['FOIR', 'લિમિટ', 'FTEs', 'ગ્રેડ', 'FTCs', 'સ્ટાન્ડર્ડ'] },
          'bn-IN': { text: 'সংশোধিত FOIR লিমিট (FOIR = Fixed Obligation to Income Ratio) | FTEs: গ্রেড অনুযায়ী নির্ধারিত লিমিট | FTCs: 55% স্ট্যান্ডার্ড FOIR লিমিট', romanPhonetic: 'Shongshodhito FOIR Limit | FTEs: Grade onujayi nirdharito limit | FTCs: 55% Standard FOIR limit', backTranslation: 'Revised FOIR limits | FTEs: Grade-based limit | FTCs: 55% Standard FOIR limit', transliteratedTerms: ['FOIR', 'লিমিট', 'FTEs', 'গ্রেড', 'FTCs', 'স্ট্যান্ডার্ড'] },
          'ta-IN': { text: 'திருத்தப்பட்ட FOIR வரம்புகள் (FOIR = Fixed Obligation to Income Ratio) | FTEs: கிரேடு (Grade) அடிப்படையிலான வரம்புகள் | FTCs: 55% நிலையான FOIR வரம்பு', romanPhonetic: 'Thiruthappatta FOIR varambugal | FTEs: Grade adippadaiyilaana varambugal | FTCs: 55% nilaiyaana FOIR varambu', backTranslation: 'Revised FOIR limits | FTEs: Grade-based limits | FTCs: 55% Standard FOIR limit', transliteratedTerms: ['FOIR', 'FTEs', 'கிரேடு', 'FTCs'] },
          'te-IN': { text: 'సవరించిన FOIR పరిమితులు (FOIR = Fixed Obligation to Income Ratio) | FTEs: గ్రేడ్ ఆధారిత పరిమితులు | FTCs: 55% స్టాండర్డ్ FOIR పరిమితి', romanPhonetic: 'Savarinchina FOIR parimitulu | FTEs: Grade aadharita parimitulu | FTCs: 55% Standard FOIR parimiti', backTranslation: 'Revised FOIR limits | FTEs: Grade-based limits | FTCs: 55% Standard FOIR limit', transliteratedTerms: ['FOIR', 'FTEs', 'గ్రేడ్', 'FTCs', 'స్టాండర్డ్'] },
          'ml-IN': { text: 'പുതുക്കിയ FOIR പരിധികൾ (FOIR = Fixed Obligation to Income Ratio) | FTEs: ഗ്രേഡ് അടിസ്ഥാനമാക്കിയുള്ള പരിധികൾ | FTCs: 55% স্টാൻഡേർഡ് FOIR പരിധി', romanPhonetic: 'Puthukkiya FOIR paridhikal | FTEs: Grade adisthaanamaakkiyulla paridhikal | FTCs: 55% Standard FOIR paridhi', backTranslation: 'Revised FOIR limits | FTEs: Grade-based limits | FTCs: 55% Standard FOIR limit', transliteratedTerms: ['FOIR', 'FTEs', 'ഗ്രേഡ്', 'FTCs'] },
          'kn-IN': { text: 'ಪರಿಷ್ಕೃತ FOIR ಮಿತಿಗಳು (FOIR = Fixed Obligation to Income Ratio) | FTEs: ಗ್ರೇಡ್ ಆಧಾರಿತ ಮಿತಿಗಳು | FTCs: 55% ಸ್ಟ್ಯಾಂಡರ್ಡ್ FOIR ಮಿತಿ', romanPhonetic: 'Parishkrita FOIR mitigalu | FTEs: Grade aadhaarita mitigalu | FTCs: 55% Standard FOIR miti', backTranslation: 'Revised FOIR limits | FTEs: Grade-based limits | FTCs: 55% Standard FOIR limit', transliteratedTerms: ['FOIR', 'FTEs', 'ಗ್ರೇಡ್', 'FTCs', 'ಸ್ಟ್ಯಾಂಡರ್ಡ್'] },
        },
      },
      {
        id: 'fp-4',
        role: 'card_body',
        sectionLabel: 'Impact & Action Clauses',
        englishText: 'STRUCTURED DELINQUENCY ACTIONS: Separate action frameworks for FTEs and FTCs.\nHIGH FOIR: POTENTIAL IMPACT: May affect movement, authority, absorption and employment outcomes. Authority capping may apply to FTEs in identified sensitive roles.',
        layoutHint: 'Lower two policy impact sections',
        translations: {
          'hi-IN': { text: 'डिलिंक्वेंसी (पेमेंट में देरी) पर तय कार्रवाई: FTEs और FTCs के लिए अलग-अलग एक्शन फ्रेमवर्क।\nहाई FOIR का संभावित असर: इससे रोल मूवमेंट, अधिकार (Authority), परमानेंट होने (Absorption) और नौकरी से जुड़े फैसलों पर असर पड़ सकता है। संवेदनशील रोल्स में काम करने वाले FTEs के अधिकारों पर कैपिंग (सीमा) लागू हो सकती है।', romanPhonetic: 'Delinquency par tay karwayi... High FOIR ka sambhavit asar...', backTranslation: 'Structured delinquency actions for FTEs and FTCs. High FOIR may affect movement, authority, absorption, and employment outcomes.', transliteratedTerms: ['डिलिंक्वेंसी', 'FTEs', 'FTCs', 'एक्शन फ्रेमवर्क', 'हाई FOIR', 'रोल मूवमेंट', 'कैपिंग'] },
          'mr-IN': { text: 'डिलिंक्वेंसीवर (थकबाकी) निश्चित कारवाई: FTEs आणि FTCs साठी स्वतंत्र कृती आराखडा.\nहाय FOIR चा संभाव्य परिणाम: याचा परिणाम रोल मूव्हमेंट, अधिकार (Authority), कायमस्वरूपी सामावून घेणे (Absorption) आणि नोकरीच्या निर्णयांवर होऊ शकतो. संवेदनशील पदांवरील FTEs च्या अधिकारांवर मर्यादा (Authority Capping) येऊ शकते.', romanPhonetic: 'Delinquency var nishchit karwai... High FOIR cha sambhavya parinam...', backTranslation: 'Structured delinquency actions for FTEs & FTCs. High FOIR impact on movement, authority, absorption, and employment.', transliteratedTerms: ['डिलिंक्वेंसी', 'FTEs', 'FTCs', 'हाय FOIR', 'रोल मूव्हमेंट'] },
          'gu-IN': { text: 'ડિલિંક્વન્સી (પેમેન્ટ વિલંબ) સામે નક્કી કરેલી કાર્યવાહી: FTEs અને FTCs માટે અલગ એક્શન ફ્રેમવર્ક.\nહાઈ FOIR ની સંભવિત અસર: રોલ મૂવમેન્ટ, સત્તા (Authority), કાયમી સમાવેશ (Absorption) અને નોકરીને લગતા નિર્ણયો પર અસર થઈ શકે છે. સંવેદનશીલ રોલમાં રહેલા FTEs માટે સત્તાની મર્યાદા (Authority Capping) લાગુ થઈ શકે છે.', romanPhonetic: 'Delinquency same nakki kareli karyavahi... High FOIR ni sambhavit asar...', backTranslation: 'Structured delinquency actions. High FOIR may impact movement, authority, absorption, and employment.', transliteratedTerms: ['ડિલિંક્વન્સી', 'FTEs', 'FTCs', 'એક્શન ફ્રેમવર્ક', 'હાઈ FOIR'] },
          'bn-IN': { text: 'ডিলিঙ্কোয়েন্সি সংক্রান্ত সুনির্দিষ্ট পদক্ষেপ: FTEs এবং FTCs-দের জন্য আলাদা অ্যাকশন ফ্রেমওয়ার্ক।\nহাই FOIR-এর সম্ভাব্য প্রভাব: রোল মুভমেন্ট, ক্ষমতা (Authority), স্থায়ীকরণ (Absorption) এবং চাকরির ক্ষেত্রে প্রভাব পড়তে পারে। গুরুত্বপূর্ণ রোলে থাকা FTEs-দের ক্ষমতার ওপর সীমা (Authority Capping) প্রযোজ্য হতে পারে।', romanPhonetic: 'Delinquency shongkranto sunirdishto podokkhep... High FOIR-er shombhabbo probhab...', backTranslation: 'Structured delinquency actions. High FOIR impact on role movement, authority, absorption, and employment.', transliteratedTerms: ['ডিলিঙ্কোয়েন্সি', 'FTEs', 'FTCs', 'অ্যাকশন ফ্রেমওয়ার্ক', 'হাই FOIR'] },
          'ta-IN': { text: 'தவணை தாமதத்திற்கான (Delinquency) நடவடிக்கைகள்: FTEs மற்றும் FTCs-க்கு தனித்தனி செயல்முறைகள்.\nஅதிக FOIR-ஆல் ஏற்படும் தாக்கம்: பணி மாற்றம் (Movement), அதிகாரம் (Authority), நிரந்தரமாக்கல் (Absorption) மற்றும் பணி வாய்ப்புகளைப் பாதிக்கலாம். முக்கியப் பொறுப்புகளில் உள்ள FTEs-க்கு அதிகார வரம்பு (Authority Capping) விதிக்கப்படலாம்.', romanPhonetic: 'Thavanai thaamadhathirkaana nadavadikkaigal...', backTranslation: 'Structured delinquency actions. High FOIR impact on movement, authority, absorption, and employment.', transliteratedTerms: ['Delinquency', 'FTEs', 'FTCs', 'FOIR'] },
          'te-IN': { text: 'డిలింక్వెన్సీపై నిర్దిష్ట చర్యలు: FTEs మరియు FTCs కోసం వేర్వేరు యాక్షన్ ఫ్రేమ్‌వర్క్‌లు.\nఅధిక FOIR ప్రభావం: రోల్ మూవ్‌మెంట్, అధికారాలు (Authority), పర్మనెంట్ చేయడం (Absorption) మరియు ఉద్యోగ ఫలితాలపై ప్రభావం చూపవచ్చు. కీలక విభాగాల్లోని FTEs కు అధికార పరిమితి (Authority Capping) వర్తించవచ్చు.', romanPhonetic: 'Delinquency pai nirdishta charyalu...', backTranslation: 'Structured delinquency actions. High FOIR impact on movement, authority, absorption, and employment.', transliteratedTerms: ['డిలింక్వెన్సీ', 'FTEs', 'FTCs', 'యాక్షన్ ఫ్రేమ్‌వర్క్', 'FOIR'] },
          'ml-IN': { text: 'ഡിലിങ്ക്വൻസി നടപടികൾ: FTEs-നും FTCs-നും പ്രത്യേകം ആക്ഷൻ ഫ്രെയിംവർക്കുകൾ.\nഉയർന്ന FOIR ഉണ്ടാക്കാവുന്ന প্রভাবം: റോൾ മാറ്റം (Movement), അധികാരം (Authority), സ്ഥിരപ്പെടുത്തൽ (Absorption), തൊഴിൽ ফലങ്ങൾ എന്നിവയെ ബാധിക്കാം. പ്രധാന ചുമതലകളിലുള്ള FTEs-ന് അധികാര പരിധി (Authority Capping) ബാധകമായേക്കാം.', romanPhonetic: 'Delinquency nadapadikal...', backTranslation: 'Structured delinquency actions. High FOIR impact on movement, authority, absorption, and employment.', transliteratedTerms: ['ഡിലിങ്ക്വൻസി', 'FTEs', 'FTCs', 'ആക്ഷൻ ഫ്രെയിംവർക്ക്', 'FOIR'] },
          'kn-IN': { text: 'ಡಿಲಿಂಕ್ವೆನ್ಸಿ (ಪಾವತಿ ವಿಳಂಬ) ಕ್ರಮಗಳು: FTEs ಮತ್ತು FTCs ಗಾಗಿ ಪ್ರತ್ಯೇಕ ಆಕ್ಷನ್ ಫ್ರೇಮ್‌ವರ್ಕ್.\nಹೆಚ್ಚಿನ FOIR ಪರಿಣಾಮ: ರೋಲ್ ಮೂವ್‌ಮೆಂಟ್, அதிகார (Authority), ಖಾಯಂಗೊಳಿಸುವಿಕೆ (Absorption) ಮತ್ತು ಉದ್ಯೋಗದ ಫಲಿತಾಂಶಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರಬಹುದು. ಸೂಕ್ಷ್ಮ ಪಾತ್ರಗಳಲ್ಲಿರುವ FTEs ಗೆ ಅಧಿಕಾರದ ಮಿತಿ (Authority Capping) ಅನ್ವಯಿಸಬಹುದು.', romanPhonetic: 'Delinquency kramagalu...', backTranslation: 'Structured delinquency actions. High FOIR impact on movement, authority, absorption, and employment.', transliteratedTerms: ['ಡಿಲಿಂಕ್ವೆನ್ಸಿ', 'FTEs', 'FTCs', 'ಆಕ್ಷನ್ ಫ್ರೇಮ್‌ವರ್ಕ್', 'FOIR'] },
        },
      },
      {
        id: 'fp-5',
        role: 'footer',
        sectionLabel: 'QR & Helpdesk Footer',
        englishText: 'Scan to read the full policy on OPEN. | Queries? HR Genie or your HR Partner.',
        layoutHint: 'Keep OPEN, HR Genie, and HR Partner in English',
        translations: {
          'hi-IN': { text: 'पूरी पॉलिसी पढ़ने के लिए स्कैन करें और OPEN पर देखें। | कोई सवाल है? HR Genie या अपने HR Partner से संपर्क करें।', romanPhonetic: 'Poori policy padhne ke liye scan karein aur OPEN par dekhein. | Koi sawal hai? HR Genie ya apne HR Partner se sampark karein.', backTranslation: 'Scan to read full policy on OPEN. Queries? Contact HR Genie or your HR Partner.', transliteratedTerms: ['पॉलिसी', 'स्कैन', 'OPEN', 'HR Genie', 'HR Partner'] },
          'mr-IN': { text: 'OPEN वर संपूर्ण पॉलिसी वाचण्यासाठी स्कॅन करा. | काही प्रश्न आहेत? HR Genie किंवा तुमच्या HR Partner शी संपर्क साधा.', romanPhonetic: 'OPEN var sampoorna policy vachnyasathi scan kara. | Kahi prashna aahet? HR Genie kinva tumchya HR Partner shi sampark sadha.', backTranslation: 'Scan to read full policy on OPEN. Questions? Contact HR Genie or your HR Partner.', transliteratedTerms: ['OPEN', 'पॉलिसी', 'स्कॅन', 'HR Genie', 'HR Partner'] },
          'gu-IN': { text: 'OPEN પર સંપૂર્ણ પોલિસી વાંચવા માટે સ્કેન કરો. | કોઈ પ્રશ્ન છે? HR Genie અથવા તમારા HR Partner નો સંપર્ક કરો.', romanPhonetic: 'OPEN par sampoorna policy vanchva mate scan karo. | Koi prashna chhe? HR Genie athava tamara HR Partner no sampark karo.', backTranslation: 'Scan to read full policy on OPEN. Queries? Contact HR Genie or your HR Partner.', transliteratedTerms: ['OPEN', 'પોલિસી', 'સ્કેન', 'HR Genie', 'HR Partner'] },
          'bn-IN': { text: 'OPEN-এ সম্পূর্ণ পলিসিটি পড়তে স্ক্যান করুন। | কোনো প্রশ্ন আছে? HR Genie বা আপনার HR Partner-এর সাথে যোগাযোগ করুন।', romanPhonetic: 'OPEN-e shompurno policy-ti porte scan korun. | Kono proshno ache? HR Genie ba aapnar HR Partner-er shathe jogajog korun.', backTranslation: 'Scan to read full policy on OPEN. Questions? Contact HR Genie or your HR Partner.', transliteratedTerms: ['OPEN', 'পলিসি', 'স্ক্যান', 'HR Genie', 'HR Partner'] },
          'ta-IN': { text: 'OPEN தளத்தில் முழு பாலிசியைப் படிக்க ஸ்கேன் செய்யவும். | கேள்விகள் உள்ளதா? HR Genie அல்லது உங்கள் HR Partner-ஐத் தொடர்பு கொள்ளவும்.', romanPhonetic: 'OPEN thalathil muzhu policy-ai padikka scan seiyavum. | Kelvigal ulladha? HR Genie alladhu ungal HR Partner-ai thodarpu kollavum.', backTranslation: 'Scan to read full policy on OPEN. Questions? Contact HR Genie or your HR Partner.', transliteratedTerms: ['OPEN', 'பாலிசி', 'ஸ்கேன்', 'HR Genie', 'HR Partner'] },
          'te-IN': { text: 'OPEN లో పూర్తి పాలసీని చదవడానికి స్కాన్ చేయండి. | సందేహాలు ఉన్నాయా? HR Genie లేదా మీ HR Partner ను సంప్రదించండి.', romanPhonetic: 'OPEN lo poorti policy-ni chadavadaniki scan cheyandi. | Sandehalu unnaya? HR Genie leda mee HR Partner nu sampradinchandi.', backTranslation: 'Scan to read full policy on OPEN. Queries? Contact HR Genie or your HR Partner.', transliteratedTerms: ['OPEN', 'పాలసీ', 'స్కాన్', 'HR Genie', 'HR Partner'] },
          'ml-IN': { text: 'OPEN-ൽ പൂർണ്ണമായ പോളിസി വായിക്കാൻ സ്കാൻ ചെയ്യുക. | സംശയങ്ങളുണ്ടോ? HR Genie അല്ലെങ്കിൽ നിങ്ങളുടെ HR Partner-നെ സമീപിക്കുക.', romanPhonetic: 'OPEN-l poornamaaya policy vaayikkaan scan cheyyuka. | Samshayangalundo? HR Genie allengil ningalude HR Partner-ne sameepikkuka.', backTranslation: 'Scan to read full policy on OPEN. Queries? Contact HR Genie or your HR Partner.', transliteratedTerms: ['OPEN', 'പോളിസി', 'സ്കാൻ', 'HR Genie', 'HR Partner'] },
          'kn-IN': { text: 'OPEN ನಲ್ಲಿ ಸಂಪೂರ್ಣ ಪಾಲಿಸಿಯನ್ನು ಓದಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ. | ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? HR Genie ಅಥವಾ ನಿಮ್ಮ HR Partner ಅನ್ನು ಸಂಪರ್ಕಿಸಿ.', romanPhonetic: 'OPEN nalli sampoorna policy-yannu odalu scan maadi. | Prashnegaliveye? HR Genie athava nimma HR Partner annu samparkisi.', backTranslation: 'Scan to read full policy on OPEN. Questions? Contact HR Genie or your HR Partner.', transliteratedTerms: ['OPEN', 'ಪಾಲಿಸಿ', 'ಸ್ಕ್ಯಾನ್', 'HR Genie', 'HR Partner'] },
        },
      },
    ],
  },
  {
    id: 'creche-policy',
    title: 'Policy Update: Crèche & Childcare Assistance',
    category: 'Employee Benefits & Welfare',
    themeColor: 'indigo',
    imageUrl: './examples/creche-policy.png',
    rawSourceText: `POLICY UPDATE
CRÈCHE & CHILDCARE ASSISTANCE
EFFECTIVE 1 NOVEMBER 2026
WHO CAN CLAIM? Women employees or single parents of any gender.
CHILDREN COVERED: 6 months to 8 years
REVISED CLAIM LIMITS:
₹12,000 MEGAPOLIS | ₹10,000 TIER 1 & 2 | ₹8,000 TIER 3 & 4
EMPANELLED CRÈCHE TRANSITION: For children already enrolled at empanelled crèches, assistance continues till 31 December 2026. Revised eligibility applies thereafter.
Scan to read the full policy`,
    smartTerms: [
      {
        term: 'Crèche & Childcare Assistance',
        action: 'transliterate',
        reason: 'Employees know the policy as "Crèche (क्रेश / डे-केयर)"; pairing transliterated "क्रेश" with "चाइल्डकेयर सहायता" keeps it familiar and clear.',
        exampleOutput: 'क्रेश और चाइल्डकेयर सहायता',
      },
      {
        term: 'Megapolis / Tier 1 & 2 / Tier 3 & 4',
        action: 'transliterate',
        reason: 'HR city classification tiers must be transliterated so employees match their exact office location tier.',
        exampleOutput: 'मेगापोलिस | टियर 1 और 2 | टियर 3 और 4',
      },
      {
        term: 'Claim / Empanelled Crèche',
        action: 'everyday_translate',
        reason: 'Retain "क्लेम (Claim)" and explain "Empanelled" as "सूचीबद्ध (Empanelled) क्रेश".',
        exampleOutput: 'कौन क्लेम कर सकता है? / एम्पैनल्ड (सूचीबद्ध) क्रेश',
      },
    ],
    blocks: [
      {
        id: 'cr-1',
        role: 'headline',
        sectionLabel: 'Poster Headline & Effective Date',
        englishText: 'POLICY UPDATE | CRÈCHE & CHILDCARE ASSISTANCE | EFFECTIVE 1 NOVEMBER 2026',
        layoutHint: 'Left dark panel orange tags + white bold title',
        translations: {
          'hi-IN': { text: 'पॉलिसी अपडेट | क्रेश और चाइल्डकेयर सहायता (Crèche & Childcare) | 1 नवंबर 2026 से लागू', romanPhonetic: 'Policy Update | Creche aur Childcare Sahayata | 1 November 2026 se laagu', backTranslation: 'Policy Update | Creche & Childcare Assistance | Effective 1 November 2026', transliteratedTerms: ['पॉलिसी अपडेट', 'क्रेश', 'चाइल्डकेयर'] },
          'mr-IN': { text: 'पॉलिसी अपडेट | पाळणाघर (क्रेश) आणि चाइल्डकेयर सहाय्य | 1 नोव्हेंबर 2026 पासून लागू', romanPhonetic: 'Policy Update | Palnaghar (Creche) aani Childcare Sahayya | 1 November 2026 pasun laagu', backTranslation: 'Policy Update | Creche & Childcare Assistance | Effective 1 November 2026', transliteratedTerms: ['पॉलिसी अपडेट', 'क्रेश', 'चाइल्डकेयर'] },
          'gu-IN': { text: 'પોલિસી અપડેટ | ક્રેશ (ઘોડિયાઘર) અને ચાઇલ્ડકેર સહાય | 1 નવેમ્બર 2026થી અમલમાં', romanPhonetic: 'Policy Update | Creche ane Childcare Sahay | 1 November 2026 thi amalma', backTranslation: 'Policy Update | Creche & Childcare Assistance | Effective 1 November 2026', transliteratedTerms: ['પોલિસી અપડેટ', 'ક્રેશ', 'ચાઇલ્ડકેર'] },
          'bn-IN': { text: 'পলিসি আপডেট | ক্রেশ ও চাইল্ডকেয়ার সহায়তা | ১ নভেম্বর ২০২৬ থেকে কার্যকর', romanPhonetic: 'Policy Update | Creche o Childcare Shohayota | 1 November 2026 theke karjokor', backTranslation: 'Policy Update | Creche & Childcare Assistance | Effective 1 November 2026', transliteratedTerms: ['পলিসি আপডেট', 'ক্রেশ', 'চাইল্ডকেয়ার'] },
          'ta-IN': { text: 'பாலிசி அப்டேட் | கிரெஷ் (குழந்தைகள் பராமரிப்பு) & சைல்டுகேர் உதவி | 1 நவம்பர் 2026 முதல் அமல்', romanPhonetic: 'Policy Update | Creche & Childcare Udhavi | 1 November 2026 mudhal amal', backTranslation: 'Policy Update | Creche & Childcare Assistance | Effective 1 November 2026', transliteratedTerms: ['பாலிசி அப்டேட்', 'கிரெஷ்', 'சைல்டுகேர்'] },
          'te-IN': { text: 'పాలసీ అప్‌డేట్ | క్రెష్ (శిశు సంరక్షణ) & చైల్డ్‌కేర్ సహాయం | 1 నవంబర్ 2026 నుండి అమలు', romanPhonetic: 'Policy Update | Creche & Childcare Sahayam | 1 November 2026 nundi amalu', backTranslation: 'Policy Update | Creche & Childcare Assistance | Effective 1 November 2026', transliteratedTerms: ['పాలసీ అప్‌డేట్', 'క్రెష్', 'చైల్డ్‌కేర్'] },
          'ml-IN': { text: 'പോളിസി അപ്‌ഡേറ്റ് | ക്രഷ് & ചൈൽഡ് കെയർ സഹായം | 2026 നവംബർ 1 മുതൽ പ്രാബല്യത്തിൽ', romanPhonetic: 'Policy Update | Creche & Childcare Sahaayam | 2026 November 1 muthal praabalyathil', backTranslation: 'Policy Update | Creche & Childcare Assistance | Effective 1 November 2026', transliteratedTerms: ['പോളിസി അപ്‌ഡേറ്റ്', 'ക്രഷ്', 'ചൈൽഡ് കെയർ'] },
          'kn-IN': { text: 'ಪಾಲಿಸಿ ಅಪ್‌ಡೇಟ್ | ಕ್ರೆಶ್ (ಶಿಶುಪಾಲನಾ) ಮತ್ತು ಚೈಲ್ಡ್‌ಕೇರ್ ನೆರವು | 1 ನವೆಂಬರ್ 2026 ರಿಂದ ಜಾರಿ', romanPhonetic: 'Policy Update | Creche mattu Childcare Neravu | 1 November 2026 rinda jaari', backTranslation: 'Policy Update | Creche & Childcare Assistance | Effective 1 November 2026', transliteratedTerms: ['ಪಾಲಿಸಿ ಅಪ್‌ಡೇಟ್', 'ಕ್ರೆಶ್', 'ಚೈಲ್ಡ್‌ಕೇರ್'] },
        },
      },
      {
        id: 'cr-2',
        role: 'card_title',
        sectionLabel: 'Eligibility & Child Age',
        englishText: 'WHO CAN CLAIM? Women employees or single parents of any gender. | CHILDREN COVERED: 6 months to 8 years',
        layoutHint: 'Top two icon rows on the right panel',
        translations: {
          'hi-IN': { text: 'कौन क्लेम कर सकता है? महिला कर्मचारी या किसी भी जेंडर के सिंगल पेरेंट्स (अकेले माता या पिता)। | बच्चों की उम्र सीमा: 6 महीने से 8 साल तक', romanPhonetic: 'Kaun claim kar sakta hai? Mahila karmchari ya kisi bhi gender ke single parents. | Bachon ki umra seema: 6 mahine se 8 saal tak', backTranslation: 'Who can claim? Women employees or single parents of any gender. Children covered: 6 months to 8 years.', transliteratedTerms: ['क्लेम', 'जेंडर', 'सिंगल पेरेंट्स'] },
          'mr-IN': { text: 'कोण क्लेम करू शकते? महिला कर्मचारी किंवा कोणत्याही लिंगाचे (Gender) सिंगल पेरेंट्स. | पात्र मुलांचे वय: 6 महिने ते 8 वर्षे', romanPhonetic: 'Kon claim karu shakte? Mahila karmchari kinva kontyahi gender che single parents. | Patra mulanche vay: 6 mahine te 8 varshe', backTranslation: 'Who can claim? Women employees or single parents of any gender. Eligible children age: 6 months to 8 years.', transliteratedTerms: ['क्लेम', 'सिंगल पेरेंट्स'] },
          'gu-IN': { text: 'કોણ ક્લેમ કરી શકે? મહિલા કર્મચારીઓ અથવા કોઈપણ જેન્ડરના સિંગલ પેરેન્ટ્સ. | બાળકોની વય મર્યાદા: 6 મહિનાથી 8 વર્ષ', romanPhonetic: 'Kon claim kari shake? Mahila karmchario athava koipan gender na single parents. | Balkoni vay maryada: 6 mahina thi 8 varsh', backTranslation: 'Who can claim? Women employees or single parents of any gender. Children age limit: 6 months to 8 years.', transliteratedTerms: ['ક્લેમ', 'જેન્ડર', 'સિંગલ પેરેન્ટ્સ'] },
          'bn-IN': { text: 'কারা ক্লেইম করতে পারবেন? মহিলা কর্মী অথবা যেকোনো লিঙ্গের সিঙ্গেল পেরেন্টস (একক পিতা বা মাতা)। | সন্তানদের বয়সসীমা: ৬ মাস থেকে ৮ বছর', romanPhonetic: 'Kara claim korte parben? Mohila kormi othoba jekono linger single parents. | Shontander boyosh-shima: 6 mash theke 8 bochor', backTranslation: 'Who can claim? Women employees or single parents of any gender. Children age: 6 months to 8 years.', transliteratedTerms: ['ক্লেইম', 'সিঙ্গেল পেরেন্টস'] },
          'ta-IN': { text: 'யார் கிளைம் (Claim) செய்யலாம்? பெண் ஊழியர்கள் அல்லது எந்த பாலினத்தைச் சேர்ந்த சிங்கிள் பேரண்ட்ஸ் (Single Parents). | குழந்தைகளின் வயது வரம்பு: 6 மாதங்கள் முதல் 8 வயது வரை', romanPhonetic: 'Yaar claim seiyalaam? Pen oozhiyargal alladhu endha paalinathai serndha single parents. | Kuzhandhaigalin vayadhu varambu: 6 maadhangal mudhal 8 vayadhu varai', backTranslation: 'Who can claim? Women employees or single parents of any gender. Children age: 6 months to 8 years.', transliteratedTerms: ['கிளைம்', 'சிங்கிள் பேரண்ட்ஸ்'] },
          'te-IN': { text: 'ఎవరు క్లెయిమ్ చేయవచ్చు? మహిళా ఉద్యోగులు లేదా ఏ జెండర్‌కు చెందిన సింగిల్ పేరెంట్స్ అయినా. | పిల్లల వయస్సు పరిమితి: 6 నెలల నుండి 8 సంవత్సరాలు', romanPhonetic: 'Evaru claim cheyavachu? Mahila udyogulu leda ye gender-ku chendina single parents ayina. | Pillala vayassu parimiti: 6 nelala nundi 8 samvatsaralu', backTranslation: 'Who can claim? Women employees or single parents of any gender. Children age limit: 6 months to 8 years.', transliteratedTerms: ['క్లెయిమ్', 'జెండర్', 'సింగిల్ పేరెంట్స్'] },
          'ml-IN': { text: 'ആർക്കൊക്കെ ക്ലെയിം ചെയ്യാം? വനിതാ ജീവനക്കാർക്ക് അല്ലെങ്കിൽ ഏത് ലിംഗത്തിലുമുള്ള സിംഗിൾ പേരന്റ്സിന്. | കുട്ടികളുടെ പ്രായപരിധി: 6 മാസം മുതൽ 8 വയസ്സ് വരെ', romanPhonetic: 'Aarkkokke claim cheyyaam? Vanitha jeevanakkarkku allengil ethu lingathilumulla single parents-inu. | Kuttikalude praayaparidhi: 6 maasam muthal 8 vayassu vare', backTranslation: 'Who can claim? Women employees or single parents of any gender. Children age limit: 6 months to 8 years.', transliteratedTerms: ['ക്ലെയിം', 'സിംഗിൾ പേരന്റ്സ്'] },
          'kn-IN': { text: 'ಯಾರು ಕ್ಲೇಮ್ ಮಾಡಬಹುದು? ಮಹಿಳಾ ಉದ್ಯೋಗಿಗಳು ಅಥವಾ ಯಾವುದೇ ಲಿಂಗದ ಸಿಂಗಲ್ ಪೇರೆಂಟ್ಸ್. | ಮಕ್ಕಳ ವಯೋಮಿತಿ: 6 ತಿಂಗಳಿಂದ 8 ವರ್ಷಗಳು', romanPhonetic: 'Yaaru claim maadabahudu? Mahila udyogigalu athava yaavude lingada single parents. | Makkala vayomiti: 6 tingalinda 8 varshagalu', backTranslation: 'Who can claim? Women employees or single parents of any gender. Children age limit: 6 months to 8 years.', transliteratedTerms: ['ಕ್ಲೇಮ್', 'ಸಿಂಗಲ್ ಪೇರೆಂಟ್ಸ್'] },
        },
      },
      {
        id: 'cr-3',
        role: 'metric',
        sectionLabel: 'Revised Claim Limits by City Tier',
        englishText: 'REVISED CLAIM LIMITS: ₹12,000 MEGAPOLIS | ₹10,000 TIER 1 & 2 | ₹8,000 TIER 3 & 4',
        layoutHint: '3-column amount band',
        translations: {
          'hi-IN': { text: 'संशोधित क्लेम लिमिट: ₹12,000 मेगापोलिस | ₹10,000 टियर 1 और 2 | ₹8,000 टियर 3 और 4', romanPhonetic: 'Sanshodhit Claim Limit: ₹12,000 Megapolis | ₹10,000 Tier 1 aur 2 | ₹8,000 Tier 3 aur 4', backTranslation: 'Revised Claim Limits: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', transliteratedTerms: ['क्लेम लिमिट', 'मेगापोलिस', 'टियर 1 और 2', 'टियर 3 और 4'] },
          'mr-IN': { text: 'सुधारित क्लेम मर्यादा: ₹12,000 मेगापोलिस | ₹10,000 टियर 1 आणि 2 | ₹8,000 टियर 3 आणि 4', romanPhonetic: 'Sudharit Claim Maryada: ₹12,000 Megapolis | ₹10,000 Tier 1 aani 2 | ₹8,000 Tier 3 aani 4', backTranslation: 'Revised Claim Limits: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', transliteratedTerms: ['क्लेम', 'मेगापोलिस', 'टियर 1 आणि 2', 'टियर 3 आणि 4'] },
          'gu-IN': { text: 'સુધારેલી ક્લેમ લિમિટ: ₹12,000 મેગાપોલિસ | ₹10,000 ટિયર 1 અને 2 | ₹8,000 ટિયર 3 અને 4', romanPhonetic: 'Sudhareli Claim Limit: ₹12,000 Megapolis | ₹10,000 Tier 1 ane 2 | ₹8,000 Tier 3 ane 4', backTranslation: 'Revised Claim Limits: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', transliteratedTerms: ['ક્લેમ લિમિટ', 'મેગાપોલિસ', 'ટિયર'] },
          'bn-IN': { text: 'সংশোধিত ক্লেইম লিমিট: ₹১২,০০০ মেগাপলিস | ₹১০,০০০ টিয়ার ১ ও ২ | ₹৮,০০০ টিয়ার ৩ ও ৪', romanPhonetic: 'Shongshodhito Claim Limit: ₹12,000 Megapolis | ₹10,000 Tier 1 o 2 | ₹8,000 Tier 3 o 4', backTranslation: 'Revised Claim Limits: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', transliteratedTerms: ['ক্লেইম লিমিট', 'মেগাপলিস', 'টিয়ার'] },
          'ta-IN': { text: 'திருத்தப்பட்ட கிளைம் வரம்புகள்: ₹12,000 மெகாபொலிஸ் | ₹10,000 டயர் 1 & 2 | ₹8,000 டயர் 3 & 4', romanPhonetic: 'Thiruthappatta Claim Varambugal: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', backTranslation: 'Revised Claim Limits: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', transliteratedTerms: ['கிளைம்', 'மெகாபொலிஸ்', 'டயர்'] },
          'te-IN': { text: 'సవరించిన క్లెయిమ్ పరిమితులు: ₹12,000 మెగాపోలిస్ | ₹10,000 టైర్ 1 & 2 | ₹8,000 టైర్ 3 & 4', romanPhonetic: 'Savarinchina Claim Parimitulu: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', backTranslation: 'Revised Claim Limits: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', transliteratedTerms: ['క్లెయిమ్', 'మెగాపోలిస్', 'టైర్'] },
          'ml-IN': { text: 'പുതുക്കിയ ക്ലെയിം പരിധികൾ: ₹12,000 മെഗാപൊളിസ് | ₹10,000 ടയർ 1 & 2 | ₹8,000 ടയർ 3 & 4', romanPhonetic: 'Puthukkiya Claim Paridhikal: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', backTranslation: 'Revised Claim Limits: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', transliteratedTerms: ['ക്ലെയിം', 'മെഗാപൊളിസ്', 'ടയർ'] },
          'kn-IN': { text: 'ಪರಿಷ್ಕೃತ ಕ್ಲೇಮ್ ಮಿತಿಗಳು: ₹12,000 ಮೆಗಾಪೊಲಿಸ್ | ₹10,000 ಟೈರ್ 1 & 2 | ₹8,000 ಟೈರ್ 3 & 4', romanPhonetic: 'Parishkrita Claim Mitigalu: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', backTranslation: 'Revised Claim Limits: ₹12,000 Megapolis | ₹10,000 Tier 1 & 2 | ₹8,000 Tier 3 & 4', transliteratedTerms: ['ಕ್ಲೇಮ್', 'ಮೆಗಾಪೊಲಿಸ್', 'ಟೈರ್'] },
        },
      },
      {
        id: 'cr-4',
        role: 'footer',
        sectionLabel: 'Transition Rule & Footer',
        englishText: 'EMPANELLED CRÈCHE TRANSITION: For children already enrolled at empanelled crèches, assistance continues till 31 December 2026. Revised eligibility applies thereafter. | Scan to read the full policy',
        layoutHint: 'Bottom transition note + QR label',
        translations: {
          'hi-IN': { text: 'एम्पैनल्ड (सूचीबद्ध) क्रेश ट्रांज़िशन: जो बच्चे पहले से एम्पैनल्ड क्रेश में एनरोल्ड हैं, उनके लिए यह सहायता 31 दिसंबर 2026 तक जारी रहेगी। इसके बाद नई पात्रता (Eligibility) लागू होगी। | पूरी पॉलिसी पढ़ने के लिए स्कैन करें', romanPhonetic: 'Empanelled Creche Transition: Jo bache pehle se empanelled creche mein enrolled hain, unke liye yeh sahayata 31 December 2026 tak jaari rahegi...', backTranslation: 'For children already enrolled at empanelled creches, assistance continues till 31 Dec 2026. Revised eligibility applies after that.', transliteratedTerms: ['एम्पैनल्ड क्रेश', 'एनरोल्ड', 'पॉलिसी', 'स्कैन'] },
          'mr-IN': { text: 'एम्पॅनल्ड क्रेश बदल नियम: एम्पॅनल्ड (सूचीबद्ध) क्रेशमध्ये आधीच नाव नोंदवलेल्या मुलांसाठी ही मदत 31 डिसेंबर 2026 पर्यंत सुरू राहील. त्यानंतर नवीन पात्रता नियम लागू होतील. | संपूर्ण पॉलिसी वाचण्यासाठी स्कॅन करा', romanPhonetic: 'Empanelled Creche badal niyam...', backTranslation: 'For children already enrolled at empanelled creches, assistance continues till 31 Dec 2026. Revised eligibility applies thereafter.', transliteratedTerms: ['एम्पॅनल्ड क्रेश', 'पॉलिसी', 'स्कॅन'] },
          'gu-IN': { text: 'એમ્પેનલ્ડ ક્રેશ ટ્રાન્ઝિશન: એમ્પેનલ્ડ (સૂચિબદ્ધ) ક્રેશમાં પહેલેથી નોંધાયેલા બાળકો માટે સહાય 31 ડિસેમ્બર 2026 સુધી ચાલુ રહેશે. ત્યારબાદ સુધારેલા નિયમો લાગુ પડશે. | સંપૂર્ણ પોલિસી વાંચવા માટે સ્કેન કરો', romanPhonetic: 'Empanelled Creche Transition...', backTranslation: 'For children already enrolled in empanelled creches, assistance continues till 31 Dec 2026. Revised rules apply thereafter.', transliteratedTerms: ['એમ્પેનલ્ડ ક્રેશ', 'પોલિસી', 'સ્કેન'] },
          'bn-IN': { text: 'এমপ্যানেলড ক্রেশ পরিবর্তন নিয়ম: ইতিমধ্যে এমপ্যানেলড (তালিকাভুক্ত) ক্রেশে ভর্তি থাকা শিশুদের জন্য এই সহায়তা ৩১ ডিসেম্বর ২০২৬ পর্যন্ত চালু থাকবে। এরপর নতুন যোগ্যতার নিয়ম প্রযোজ্য হবে। | সম্পূর্ণ পলিসি পড়তে স্ক্যান করুন', romanPhonetic: 'Empanelled Creche poriborton niyom...', backTranslation: 'For children already enrolled at empanelled creches, assistance continues till 31 Dec 2026. New eligibility applies thereafter.', transliteratedTerms: ['এমপ্যানেলড ক্রেশ', 'পলিসি', 'স্ক্যান'] },
          'ta-IN': { text: 'அங்கீகரிக்கப்பட்ட (Empanelled) கிரெஷ் மாற்றம்: ஏற்கனவே அங்கீகரிக்கப்பட்ட கிரெஷ்களில் சேர்க்கப்பட்டுள்ள குழந்தைகளுக்கு, 31 டிசம்பர் 2026 வரை உதவி தொடரும். அதன் பிறகு திருத்தப்பட்ட தகுதி விதிகள் பொருந்தும். | முழு பாலிசியைப் படிக்க ஸ்கேன் செய்யவும்', romanPhonetic: 'Empanelled Creche maatram...', backTranslation: 'For children already enrolled at empanelled creches, assistance continues till 31 Dec 2026. Revised eligibility applies thereafter.', transliteratedTerms: ['Empanelled', 'கிரெஷ்', 'பாலிசி', 'ஸ்கேன்'] },
          'te-IN': { text: 'ఎంపానెల్డ్ క్రెష్ మార్పు నిబంధన: ఇప్పటికే ఎంపానెల్డ్ క్రెష్‌లలో చేరిన పిల్లలకు 31 డిసెంబర్ 2026 వరకు సహాయం కొనసాగుతుంది. ఆ తర్వాత సవరించిన అర్హత నిబంధనలు వర్తిస్తాయి. | పూర్తి పాలసీని చదవడానికి స్కాన్ చేయండి', romanPhonetic: 'Empanelled Creche maarpu nibandhana...', backTranslation: 'For children already enrolled at empanelled creches, assistance continues till 31 Dec 2026. Revised eligibility applies thereafter.', transliteratedTerms: ['ఎంపానెల్డ్ క్రెష్', 'పాలసీ', 'స్కాన్'] },
          'ml-IN': { text: 'എംപാനൽ ചെയ്ത ക്രഷ് മാറ്റം: നിലവിൽ എംപാനൽ ചെയ്ത ക്രഷുകളിൽ ചേർത്തിട്ടുള്ള കുട്ടികൾക്ക് 2026 ഡിസംബർ 31 വരെ സഹായം തുടരും. അതിനുശേഷം പുതുക്കിയ യോഗ്യതാ മാനദണ്ഡങ്ങൾ ബാധകമാകും. | പൂർണ്ണ പോളിസി വായിക്കാൻ സ്കാൻ ചെയ്യുക', romanPhonetic: 'Empanel cheytha creche maattam...', backTranslation: 'For children already enrolled at empanelled creches, assistance continues till 31 Dec 2026. Revised eligibility applies thereafter.', transliteratedTerms: ['എംപാനൽ', 'ക്രഷ്', 'പോളിസി', 'സ്കാൻ'] },
          'kn-IN': { text: 'ಎಂಪ್ಯಾನೆಲ್ಡ್ ಕ್ರೆಶ್ ಬದಲಾವಣೆ ನಿಯಮ: ಈಗಾಗಲೇ ಎಂಪ್ಯಾನೆಲ್ಡ್ ಕ್ರೆಶ್‌ಗಳಲ್ಲಿ ದಾಖಲಾಗಿರುವ ಮಕ್ಕಳಿಗೆ 31 ಡಿಸೆಂಬರ್ 2026 ರವರೆಗೆ ನೆರವು ಮುಂದುವರಿಯುತ್ತದೆ. ನಂತರ ಪರಿಷ್ಕೃತ ಅರ್ಹತಾ ನಿಯಮಗಳು ಅನ್ವಯಿಸುತ್ತವೆ. | ಸಂಪೂರ್ಣ ಪಾಲಿಸಿ ಓದಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ', romanPhonetic: 'Empanelled Creche badalaavane niyama...', backTranslation: 'For children already enrolled at empanelled creches, assistance continues till 31 Dec 2026. Revised eligibility applies thereafter.', transliteratedTerms: ['ಎಂಪ್ಯಾನೆಲ್ಡ್ ಕ್ರೆಶ್', 'ಪಾಲಿಸಿ', 'ಸ್ಕ್ಯಾನ್'] },
        },
      },
    ],
  },
];
