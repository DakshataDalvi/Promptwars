/**
 * MaidanMind — Internationalization (i18n)
 * =========================================
 * UI translations for 7 Indian languages + English
 * Languages: English, Hindi, Marathi, Gujarati, Tamil, Bengali, Kannada
 */

const LANGUAGES = {
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  hi: { name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  mr: { name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  gu: { name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' }
};

const TRANSLATIONS = {
  // App name and tagline
  appName: {
    en: 'MaidanMind', hi: 'मैदानमाइंड', mr: 'मैदानमाइंड',
    gu: 'મેદાનમાઇન્ડ', ta: 'மைதான்மைண்ட்', bn: 'ময়দানমাইন্ড', kn: 'ಮೈದಾನ್‌ಮೈಂಡ್'
  },
  tagline: {
    en: 'AI Crowd Intelligence for Indian Stadiums',
    hi: 'भारतीय स्टेडियमों के लिए AI भीड़ प्रबंधन',
    mr: 'भारतीय स्टेडियमसाठी AI गर्दी व्यवस्थापन',
    gu: 'ભારતીય સ્ટેડિયમ માટે AI ભીડ મેનેજમેન્ટ',
    ta: 'இந்திய அரங்குகளுக்கான AI கூட்ட நிர்வாகம்',
    bn: 'ভারতীয় স্টেডিয়ামের জন্য AI ভিড় ব্যবস্থাপনা',
    kn: 'ಭಾರತೀಯ ಕ್ರೀಡಾಂಗಣಗಳಿಗೆ AI ಜನಸಂದಣಿ ನಿರ್ವಹಣೆ'
  },

  // Navigation
  navHome: {
    en: 'Home', hi: 'होम', mr: 'होम', gu: 'હોમ', ta: 'முகப்பு', bn: 'হোম', kn: 'ಮುಖಪುಟ'
  },
  navMap: {
    en: 'Map', hi: 'मैप', mr: 'नकाशा', gu: 'નકશો', ta: 'வரைபடம்', bn: 'মানচিত্র', kn: 'ನಕ್ಷೆ'
  },
  navQueue: {
    en: 'Queue', hi: 'कतार', mr: 'रांग', gu: 'કતાર', ta: 'வரிசை', bn: 'সারি', kn: 'ಸರತಿ'
  },
  navChat: {
    en: 'Chat', hi: 'चैट', mr: 'चॅट', gu: 'ચેટ', ta: 'அரட்டை', bn: 'চ্যাট', kn: 'ಚಾಟ್'
  },
  navSafety: {
    en: 'Safety', hi: 'सुरक्षा', mr: 'सुरक्षा', gu: 'સુરક્ષા', ta: 'பாதுகாப்பு', bn: 'নিরাপত্তা', kn: 'ಸುರಕ್ಷತೆ'
  },

  // Home page
  selectVenue: {
    en: 'Select Stadium', hi: 'स्टेडियम चुनें', mr: 'स्टेडियम निवडा',
    gu: 'સ્ટેડિયમ પસંદ કરો', ta: 'அரங்கைத் தேர்ந்தெடுக்கவும்', bn: 'স্টেডিয়াম নির্বাচন করুন', kn: 'ಕ್ರೀಡಾಂಗಣ ಆಯ್ಕೆಮಾಡಿ'
  },
  liveMatch: {
    en: 'Live Match', hi: 'लाइव मैच', mr: 'लाइव्ह सामना',
    gu: 'લાઇવ મેચ', ta: 'நேரடி போட்டி', bn: 'লাইভ ম্যাচ', kn: 'ಲೈವ್ ಪಂದ್ಯ'
  },
  crowdStatus: {
    en: 'Crowd Status', hi: 'भीड़ स्थिति', mr: 'गर्दीची स्थिती',
    gu: 'ભીડની સ્થિતિ', ta: 'கூட்ட நிலை', bn: 'ভিড়ের অবস্থা', kn: 'ಜನಸಂದಣಿ ಸ್ಥಿತಿ'
  },
  temperature: {
    en: 'Temperature', hi: 'तापमान', mr: 'तापमान',
    gu: 'તાપમાન', ta: 'வெப்பநிலை', bn: 'তাপমাত্রা', kn: 'ತಾಪಮಾನ'
  },

  // Quick stats
  capacity: {
    en: 'Capacity', hi: 'क्षमता', mr: 'क्षमता', gu: 'ક્ષમતા', ta: 'கொள்ளளவு', bn: 'ধারণক্ষমতা', kn: 'ಸಾಮರ್ಥ್ಯ'
  },
  attendance: {
    en: 'Attendance', hi: 'उपस्थिति', mr: 'उपस्थिती', gu: 'હાજરી', ta: 'வருகை', bn: 'উপস্থিতি', kn: 'ಹಾಜರಾತಿ'
  },
  fastestGate: {
    en: 'Fastest Gate', hi: 'सबसे तेज़ गेट', mr: 'सर्वात जलद गेट',
    gu: 'સૌથી ઝડપી ગેટ', ta: 'விரைவான வாயில்', bn: 'দ্রুততম গেট', kn: 'ವೇಗದ ಗೇಟ್'
  },

  // Queue
  virtualQueue: {
    en: 'Virtual Queue', hi: 'वर्चुअल कतार', mr: 'व्हर्च्युअल रांग',
    gu: 'વર્ચ્યુઅલ કતાર', ta: 'மெய்நிகர் வரிசை', bn: 'ভার্চুয়াল সারি', kn: 'ವರ್ಚುಅಲ್ ಸರತಿ'
  },
  getToken: {
    en: 'Get Token', hi: 'टोकन लें', mr: 'टोकन घ्या',
    gu: 'ટોકન મેળવો', ta: 'டோக்கன் பெறு', bn: 'টোকেন নিন', kn: 'ಟೋಕನ್ ಪಡೆಯಿರಿ'
  },
  waitTime: {
    en: 'Wait Time', hi: 'प्रतीक्षा समय', mr: 'प्रतीक्षा वेळ',
    gu: 'રાહ જોવાનો સમય', ta: 'காத்திருப்பு நேரம்', bn: 'অপেক্ষার সময়', kn: 'ಕಾಯುವ ಸಮಯ'
  },
  foodStalls: {
    en: 'Food Stalls', hi: 'खाने की दुकानें', mr: 'खाद्य स्टॉल',
    gu: 'ફૂડ સ્ટોલ', ta: 'உணவுக் கடைகள்', bn: 'খাবারের দোকান', kn: 'ಆಹಾರ ಅಂಗಡಿಗಳು'
  },
  restrooms: {
    en: 'Restrooms', hi: 'शौचालय', mr: 'स्वच्छतागृह',
    gu: 'શૌચાલય', ta: 'கழிவறைகள்', bn: 'শৌচাগার', kn: 'ಶೌಚಾಲಯ'
  },
  merchandise: {
    en: 'Merchandise', hi: 'मर्चेंडाइज़', mr: 'मर्चेंडाइज',
    gu: 'મર્ચેન્ડાઇઝ', ta: 'பொருட்கள்', bn: 'পণ্যদ্রব্য', kn: 'ಮರ್ಚೆಂಡೈಸ್'
  },
  tokenReady: {
    en: 'Your token is ready!', hi: 'आपका टोकन तैयार है!', mr: 'तुमचा टोकन तयार आहे!',
    gu: 'તમારો ટોકન તૈયાર છે!', ta: 'உங்கள் டோக்கன் தயார்!', bn: 'আপনার টোকেন প্রস্তুত!', kn: 'ನಿಮ್ಮ ಟೋಕನ್ ಸಿದ್ಧ!'
  },
  myTokens: {
    en: 'My Tokens', hi: 'मेरे टोकन', mr: 'माझे टोकन',
    gu: 'મારા ટોકન', ta: 'என் டோக்கன்கள்', bn: 'আমার টোকেন', kn: 'ನನ್ನ ಟೋಕನ್‌ಗಳು'
  },

  // Chat
  chatPlaceholder: {
    en: 'Ask about the stadium, food, exits...',
    hi: 'स्टेडियम, खाना, निकास के बारे में पूछें...',
    mr: 'स्टेडियम, खाणे, बाहेर पडणे बद्दल विचारा...',
    gu: 'સ્ટેડિયમ, ખોરાક, નીકળવા વિશે પૂછો...',
    ta: 'அரங்கம், உணவு, வெளியேற்றம் பற்றி கேளுங்கள்...',
    bn: 'স্টেডিয়াম, খাবার, প্রস্থান সম্পর্কে জিজ্ঞাসা করুন...',
    kn: 'ಕ್ರೀಡಾಂಗಣ, ಆಹಾರ, ನಿರ್ಗಮನ ಬಗ್ಗೆ ಕೇಳಿ...'
  },
  aiThinking: {
    en: 'AI is thinking...', hi: 'AI सोच रहा है...', mr: 'AI विचार करत आहे...',
    gu: 'AI વિચારી રહ્યું છે...', ta: 'AI சிந்திக்கிறது...', bn: 'AI ভাবছে...', kn: 'AI ಯೋಚಿಸುತ್ತಿದೆ...'
  },

  // Safety
  emergencySOS: {
    en: 'Emergency SOS', hi: 'आपातकालीन SOS', mr: 'आणीबाणी SOS',
    gu: 'ઇમરજન્સી SOS', ta: 'அவசர SOS', bn: 'জরুরি SOS', kn: 'ತುರ್ತು SOS'
  },
  heatIndex: {
    en: 'Heat Index', hi: 'ताप सूचकांक', mr: 'उष्णता निर्देशांक',
    gu: 'ગરમીનો ઇન્ડેક્સ', ta: 'வெப்ப குறியீடு', bn: 'তাপ সূচক', kn: 'ಶಾಖ ಸೂಚ್ಯಂಕ'
  },
  crowdAlert: {
    en: 'Crowd Alert', hi: 'भीड़ चेतावनी', mr: 'गर्दी इशारा',
    gu: 'ભીડ ચેતવણી', ta: 'கூட்ட எச்சரிக்கை', bn: 'ভিড় সতর্কতা', kn: 'ಜನಸಂದಣಿ ಎಚ್ಚರಿಕೆ'
  },
  evacuationRoute: {
    en: 'Evacuation Route', hi: 'निकासी मार्ग', mr: 'निर्वासन मार्ग',
    gu: 'ખાલી કરવાનો માર્ગ', ta: 'வெளியேற்ற வழி', bn: 'সরিয়ে নেওয়ার পথ', kn: 'ಸ್ಥಳಾಂತರ ಮಾರ್ಗ'
  },
  nearestMedical: {
    en: 'Nearest Medical', hi: 'निकटतम चिकित्सा', mr: 'सर्वात जवळचा वैद्यकीय',
    gu: 'નજીકનું મેડિકલ', ta: 'அருகிலுள்ள மருத்துவம்', bn: 'নিকটতম চিকিৎসা', kn: 'ಹತ್ತಿರದ ವೈದ್ಯಕೀಯ'
  },
  hydrateReminder: {
    en: '💧 Stay hydrated! Drink water regularly.',
    hi: '💧 हाइड्रेटेड रहें! नियमित पानी पिएं।',
    mr: '💧 हायड्रेट राहा! नियमित पाणी प्या।',
    gu: '💧 હાઇડ્રેટેડ રહો! નિયમિત પાણી પીવો।',
    ta: '💧 நீரேற்றமாக இருங்கள்! தொடர்ந்து நீர் அருந்துங்கள்.',
    bn: '💧 হাইড্রেটেড থাকুন! নিয়মিত পানি পান করুন।',
    kn: '💧 ಹೈಡ್ರೇಟೆಡ್ ಆಗಿರಿ! ನಿಯಮಿತವಾಗಿ ನೀರು ಕುಡಿಯಿರಿ.'
  },
  heatWarning: {
    en: '⚠️ High temperature detected in your section!',
    hi: '⚠️ आपके सेक्शन में उच्च तापमान!',
    mr: '⚠️ तुमच्या सेक्शनमध्ये उच्च तापमान!',
    gu: '⚠️ તમારા સેક્શનમાં ઊંચું તાપમાન!',
    ta: '⚠️ உங்கள் பிரிவில் அதிக வெப்பநிலை!',
    bn: '⚠️ আপনার সেকশনে উচ্চ তাপমাত্রা!',
    kn: '⚠️ ನಿಮ್ಮ ವಿಭಾಗದಲ್ಲಿ ಹೆಚ್ಚಿನ ತಾಪಮಾನ!'
  },

  // Status labels
  statusComfortable: {
    en: 'Comfortable', hi: 'आरामदायक', mr: 'आरामदायक',
    gu: 'આરામદાયક', ta: 'வசதியான', bn: 'আরামদায়ক', kn: 'ಆರಾಮದಾಯಕ'
  },
  statusModerate: {
    en: 'Moderate', hi: 'सामान्य', mr: 'मध्यम',
    gu: 'મધ્યમ', ta: 'மிதமான', bn: 'মাঝারি', kn: 'ಮಧ್ಯಮ'
  },
  statusCrowded: {
    en: 'Crowded', hi: 'भीड़भाड़', mr: 'गर्दी',
    gu: 'ભીડ', ta: 'நெரிசல்', bn: 'ভিড়', kn: 'ಜನಸಂದಣಿ'
  },
  statusCritical: {
    en: 'Critical', hi: 'गंभीर', mr: 'गंभीर',
    gu: 'ગંભીર', ta: 'ஆபத்தான', bn: 'জটিল', kn: 'ಗಂಭೀರ'
  },
  
  // General
  minutes: {
    en: 'min', hi: 'मिनट', mr: 'मिनिटे', gu: 'મિનિટ', ta: 'நிமிடம்', bn: 'মিনিট', kn: 'ನಿಮಿಷ'
  },
  settings: {
    en: 'Settings', hi: 'सेटिंग्स', mr: 'सेटिंग्ज',
    gu: 'સેટિંગ્સ', ta: 'அமைப்புகள்', bn: 'সেটিংস', kn: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು'
  },
  language: {
    en: 'Language', hi: 'भाषा', mr: 'भाषा',
    gu: 'ભાષા', ta: 'மொழி', bn: 'ভাষা', kn: 'ಭಾಷೆ'
  },
  accessibility: {
    en: 'Accessibility', hi: 'सुगम्यता', mr: 'सुलभता',
    gu: 'ઍક્સેસિબિલિટી', ta: 'அணுகல்', bn: 'প্রবেশযোগ্যতা', kn: 'ಪ್ರವೇಶಸಾಧ್ಯತೆ'
  },
  smartTip: {
    en: '🧠 Smart Tip', hi: '🧠 स्मार्ट टिप', mr: '🧠 स्मार्ट टिप',
    gu: '🧠 સ્માર્ટ ટિપ', ta: '🧠 ஸ்மார்ட் டிப்', bn: '🧠 স্মার্ট টিপ', kn: '🧠 ಸ್ಮಾರ್ಟ್ ಟಿಪ್'
  },
  exitPlan: {
    en: 'Exit Plan', hi: 'निकासी योजना', mr: 'बाहेर पडण्याची योजना',
    gu: 'બહાર નીકળવાની યોજના', ta: 'வெளியேறும் திட்டம்', bn: 'বেরিয়ে যাওয়ার পরিকল্পনা', kn: 'ನಿರ್ಗಮನ ಯೋಜನೆ'
  }
};

/**
 * Get translated string
 * @param {string} key - Translation key
 * @param {string} lang - Language code (e.g., 'en', 'hi', 'gu')
 * @returns {string} Translated string or English fallback
 */
function t(key, lang) {
  const currentLang = lang || (window.MaidanMind && window.MaidanMind.currentLanguage) || 'en';
  if (TRANSLATIONS[key] && TRANSLATIONS[key][currentLang]) {
    return TRANSLATIONS[key][currentLang];
  }
  if (TRANSLATIONS[key] && TRANSLATIONS[key]['en']) {
    return TRANSLATIONS[key]['en'];
  }
  return key;
}
