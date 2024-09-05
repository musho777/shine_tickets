import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'am',
    supportedLngs: ['en', 'ru', 'am'],
    debug: false,
    defaultNS: 'translation',
    ns: ['translation'],
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false, // Disable suspense to handle SSR better
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
