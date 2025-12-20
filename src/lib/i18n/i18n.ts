import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { Language, LanguageDetector, TranslationKey } from './i18n.types';

import en from '@/lib/locales/en';
import ar from '@/lib/locales/ar';
import Extract from '@/utils/Extract';

const STORE_LANGUAGE_KEY = "settings.lang";
const STORE_USER_SET_KEY = "settings.langUserChosen";

const resources: Record<Language, { translation: typeof en }> = {
    en: { translation: en },
    ar: { translation: ar },
};
const languageDetectorPlugin: LanguageDetector = {
    type: 'languageDetector',
    async: true,
    init: () => { },

    detect: function (callback) {
        AsyncStorage.multiGet([STORE_LANGUAGE_KEY, STORE_USER_SET_KEY])
            .then(([[, lang], [, userChosen]]) => {
                if (userChosen === 'true' && lang) {
                    callback(lang as Language);
                } else {
                    const deviceLang = Extract.DefaultLanguage();
                    callback(deviceLang as Language);
                }
            })
            .catch((error) => {
                console.error("Error detecting language", error);
                const fallbackLang = Extract.DefaultLanguage();
                callback(fallbackLang as Language);
            });
    },

    cacheUserLanguage: function (language) {
        AsyncStorage.multiSet([
            [STORE_LANGUAGE_KEY, language],
            [STORE_USER_SET_KEY, 'true']
        ]).catch((error) => {
            console.error("Error saving language", error);
        });
    }
};

export const t = (key: TranslationKey, options?: unknown): string => {
    return String(i18n.t(key, options));
};
i18n.use(initReactI18next).use(languageDetectorPlugin).init({
    resources,
    compatibilityJSON: 'v4',
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
