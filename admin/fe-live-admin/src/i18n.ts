import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import i18next from 'i18next';

i18n
  .use(HttpBackend) // Load translation files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Bind i18next to react
  .init({
    fallbackLng: 'en', // Default language
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

export const i18nT = (
  key: string,
  options?: Record<string, unknown>
): string => {
  return i18next.t(key, options);
};
