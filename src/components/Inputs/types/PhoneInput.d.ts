
import { StyleProp, ViewStyle } from "react-native";


import Validate from "@/utils/Validate";

export type PhoneInputProps =
    | {
        label: string;
        value: string;
        onChangeText: (text: string) => void;
        currentCountryFlag: keyof typeof Validate.phoneNumberFormat;
        autoFocus?: boolean;
        canCountryCodeBeChanged?: true;
        onBlur: () => void;
        onFocus?: () => void;
        styleNote?: StyleProp<ViewStyle>;
        styleInput?: StyleProp<ViewStyle>;
        note?: string;
        characterLength?: number;
        backgroundColor?: string;
        extraInfo?: string;
        testID?: string;
    }
    | {
        label: string;
        value: string;
        onChangeText: (text: string) => void;
        openCountryPicker: () => void;
        isCountryPickerModal: boolean;
        currentCountryFlag: keyof typeof Validate.phoneNumberFormat;
        autoFocus?: boolean;
        canCountryCodeBeChanged?: false;
        onBlur: () => void;
        onFocus?: () => void;
        styleNote?: StyleProp<ViewStyle>;
        styleInput?: StyleProp<ViewStyle>;
        note?: string;
        characterLength?: number;
        backgroundColor?: string;
        extraInfo?: string;
        testID?: string;
    };
