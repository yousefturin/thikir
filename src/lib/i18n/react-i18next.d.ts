// types/react-i18next.d.ts
import 'i18next';
import { TranslationKey } from '@/lib/i18n/i18n.types';

declare module 'i18next' {
    interface TFunction {
        (key: TranslationKey, options?: unknown): string;
    }
}

declare module 'react-i18next' {
    interface UseTranslationResponse {
        t: (key: TranslationKey, options?: unknown) => string;
    }
}