import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { SvgKey } from "@/utils/SvgComponent";


export type SearchInputProps = {
    searchQuery: string;
    onSearch: (query: string) => void;
    onCancel: () => void;
    placeholder?: string;
    leftIcon?: SvgKey;
    onFocus?: () => void;
    onBlur?: () => void;
    ref?: React.Ref<TextInput>;
    showCancelButton?: boolean;
    style?: StyleProp<ViewStyle>;
    autoFocus?: boolean;
    testID?: string;
};