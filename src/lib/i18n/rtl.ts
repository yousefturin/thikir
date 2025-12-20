import { I18nManager } from 'react-native';
import { Language } from './i18n.types';

export function applyRTL(lang: Language): boolean {
    const shouldBeRTL = lang === 'ar';

    if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
        return true; // restart required
    }

    return false;
}
