// lib/i18n/types.ts
import en from '@/lib/locales/en';

export type RecursiveKeyOf<TObj extends object> = {
    [TKey in keyof TObj & string]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & string];

export type TranslationKey = RecursiveKeyOf<typeof en>;
export type Language = 'en' | 'ar'
    ;

export interface LanguageDetector {
    type: 'languageDetector';
    async: boolean;
    init: () => void;
    detect: (callback: (lng: Language) => void) => void;
    cacheUserLanguage: (lng: Language) => void;
}
