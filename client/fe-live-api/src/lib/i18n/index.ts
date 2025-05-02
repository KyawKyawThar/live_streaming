import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en/translation.json';
import cnTranslation from './locales/cn/translation.json';
import koTranslation from './locales/ko/translation.json';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import i18next from 'i18next';

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      cn: { translation: cnTranslation },
      ko: { translation: koTranslation },
    },
    fallbackLng: 'en',
    lng: savedLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const changeLanguage = (lng: string) => {
  if (lng === 'ko') {
    moment.locale('ko');
  } else if (lng === 'cn') {
    moment.locale('zh-cn');
  } else {
    moment.locale('en');
  }

  i18n.changeLanguage(lng);

  localStorage.setItem('language', lng);
};

export const i18nT = (
  key: string,
  options?: Record<string, unknown>
): string => {
  return i18next.t(key, options);
};
