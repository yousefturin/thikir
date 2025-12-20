import { I18nManager } from 'react-native';

import { items as arItems } from './ar';
import { items as enItems } from './en';

export const items = I18nManager.isRTL ? arItems : enItems;
