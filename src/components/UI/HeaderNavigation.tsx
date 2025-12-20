import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colorSachem, fontSachem } from "@/styles/*";
import SvgComponent, { SvgKey } from "@/utils/SvgComponent";

const HeaderNavigation = ({
  title,
  description,
  onPressRightAction,
  rightTitle,
  rightIcon = "ArrowRight",
  leftIcon = "ArrowLeft",
  leftTitle,
  onPressLeftAction,
  lightText,
  hasBottomBorder = false,
}: {
  title: string;
  description?: string;
  onPressRightAction?: () => void;
  rightTitle?: string;
  rightIcon?: SvgKey;
  leftIcon?: SvgKey;
  leftTitle?: string;
  onPressLeftAction?: () => void;
  lightText?: boolean;
  hasBottomBorder?: boolean;
}) => {
  return (
    <View style={[styles.container, hasBottomBorder && styles.bottomBorder]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          flex: 1,
          flexShrink: 1,
        }}
      >
        {onPressLeftAction && (
          <TouchableOpacity onPress={onPressLeftAction}>
            {leftTitle && (
              <Text style={[styles.title, lightText && styles.lightText]}>
                {leftTitle}
              </Text>
            )}
            <SvgComponent
              svgKey={leftIcon}
              width={24}
              height={24}
              stroke={lightText ? colorSachem.inkInverse : colorSachem.ink}
            />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.title,
                lightText && styles.lightText,
                { marginEnd: 24 },
              ]}
            >
              {title}
            </Text>
          </View>
          {description && (
            <Text style={[styles.description, lightText && styles.lightText]}>
              {description}
            </Text>
          )}
        </View>
      </View>
      {onPressRightAction && (
        <TouchableOpacity
          onPress={onPressRightAction}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {rightTitle && (
            <Text style={[styles.description, lightText && styles.lightText]}>
              {rightTitle}
            </Text>
          )}
          <SvgComponent
            svgKey={rightIcon}
            width={24}
            height={24}
            stroke={lightText ? colorSachem.inkInverse : colorSachem.ink}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  title: {
    color: colorSachem.ink,
    fontSize: fontSachem.displayLarge,
    fontWeight: "600",
    marginBottom: 4,
  },
  lightText: {
    color: colorSachem.inkInverse,
  },
  description: {
    fontSize: fontSachem.labelMedium,
    color: colorSachem.inkMedium,
  },
  bottomBorder: {
    borderBottomColor: colorSachem.tertiary,
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
});
