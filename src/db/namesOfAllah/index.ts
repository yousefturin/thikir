import { I18nManager } from 'react-native';

import { names as arItems } from './ar';
import { names as enItems } from './en';

export const namesOfAllah = I18nManager.isRTL ? arItems : enItems;