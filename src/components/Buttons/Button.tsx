import { colorSachem, fontSachem } from "@/styles/*";
import React, { JSX } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

import { GestureResponderEvent } from "react-native-modal";

export interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  title?: string;
  type?: "main" | "outline" | "ghost";
  onPress: (event: GestureResponderEvent) => void;
  marginValue?: number;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: JSX.Element;
  rightIcon?: JSX.Element;
  buttonTestID?: string;
}
export interface getButtonStyleType {
  marginValue: number | undefined;
  disabled: boolean;
  isLoading: boolean;
  type: "main" | "outline" | "ghost";
}

export const Button = ({
  style,
  styleText,
  title,
  type = "main",
  onPress,
  marginValue,
  disabled = false,
  isLoading = false,
  icon,
  rightIcon,
  buttonTestID,
}: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      testID={buttonTestID}
      onPress={onPress}
      // @ts-expect-error: The Type has issue
      style={StyleSheet.flatten([
        getButtonStyle(marginValue, disabled, isLoading, type),
        style,
      ])}
    >
      {icon && icon}
      {isLoading ? (
        <ActivityIndicator size="small" color={colorSachem.brand} />
      ) : (
        title && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={StyleSheet.flatten([
              {
                fontSize: fontSachem.labelMedium,
                color:
                  type !== "main" ? colorSachem.ink : colorSachem.inkInverse,
                fontWeight: "600",
              },
              styleText,
            ])}
          >
            {title}
          </Text>
        )
      )}
      {rightIcon && rightIcon}
    </TouchableOpacity>
  );
};

const getButtonStyle = (
  marginValue: getButtonStyleType["marginValue"],
  disabled: getButtonStyleType["disabled"],
  isLoading: getButtonStyleType["isLoading"],
  type: getButtonStyleType["type"]
) => {
  return {
    width: "auto",
    height: 48,
    backgroundColor:
      disabled || isLoading
        ? colorSachem.disabled
        : type !== "main"
          ? "none"
          : colorSachem.brand,
    borderColor:
      type === "ghost"
        ? "none"
        : type === "outline"
          ? colorSachem.quaternary
          : colorSachem.tertiary,
    borderWidth: type === "ghost" ? 0 : type === "main" ? 0 : 1,
    borderStyle: "solid",
    borderRadius: 5000,
    justifyContent: "center",
    alignItems: "center",
    marginTop: marginValue,
    flexDirection: "row",
    gap: 8,
  };
};
