import React from "react";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";

export interface DataInputProps {
    styleInput?: StyleProp<ViewStyle> | undefined | null | false;
    styleLabel?: StyleProp<ViewStyle>;
    styleNote?: StyleProp<ViewStyle>;
    styleContainer?: StyleProp<ViewStyle>;
    styleContainerAndRightComponent?: StyleProp<ViewStyle>;
    backgroundColor?: string;
    label?: string;
    subLabel?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    textContentType?:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "creditCardExpiration"
    | "creditCardExpirationMonth"
    | "creditCardExpirationYear"
    | "creditCardSecurityCode"
    | "creditCardType"
    | "creditCardName"
    | "creditCardGivenName"
    | "creditCardMiddleName"
    | "creditCardFamilyName"
    | "emailAddress"
    | "familyName"
    | "fullStreetAddress"
    | "givenName"
    | "jobTitle"
    | "location"
    | "middleName"
    | "name"
    | "namePrefix"
    | "nameSuffix"
    | "nickname"
    | "organizationName"
    | "postalCode"
    | "streetAddressLine1"
    | "streetAddressLine2"
    | "sublocality"
    | "telephoneNumber"
    | "username"
    | "password"
    | "newPassword"
    | "oneTimeCode"
    | "birthdate"
    | "birthdateDay"
    | "birthdateMonth"
    | "birthdateYear"
    | "cellularEID"
    | "cellularIMEI"
    | "dateTime"
    | "flightNumber"
    | "shipmentTrackingNumber"
    | undefined;
    keyboardType?:
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "name-phone-pad"
    | "twitter"
    | "web-search"
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url"
    | "visible-password";
    autoFocus?: TextInputProps["autoFocus"];
    value: string;
    onChangeText: (text: string) => void;
    note?: string | false | undefined;
    characterLength?: number;
    onBlur?: () => void;
    onFocus?: () => void;
    RightComponent?: () => React.ReactNode;
    disabled?: boolean;
    multiline?: boolean;
    textAlignVertical?: "auto" | "top" | "bottom" | "center" | undefined;
    selection?: {
        start: number;
        end: number;
    };
    inputAccessoryViewID?: string;
    returnKeyType?: TextInputProps["returnKeyType"];
    onSubmitEditing?: () => void;
    spellCheck?: boolean;
    autoComplete?:
    | boolean
    | "off"
    | "username"
    | "password"
    | "email"
    | "name"
    | "postal-code"
    | "street-address"
    | "tel"
    | "cc-number"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "name-family"
    | "name-given"
    | "name-middle"
    | "nickname"
    | "organization-title"
    | "organization-name"
    | "country-name"
    | "language"
    | "birthday-day"
    | "birthday-month"
    | "birthday-year";
    importantForAutofill?:
    | "auto"
    | "yes"
    | "no"
    | "noExcludeDescendants"
    | "yesExcludeDescendants";
    extraInfo?: string;
    testID?: string;
}
export interface DataInputStylesProps {
    backgroundColor: string;
    note: string | boolean;
    extraInfo: string;
}
