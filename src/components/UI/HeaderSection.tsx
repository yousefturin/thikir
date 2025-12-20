import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SvgComponent from "@/utils/SvgComponent";
import { colorSachem, fontSachem } from "@/styles/*";

const HeaderSection = ({
  title,
  actionTitle,
  onPressAction,
  lightText,
}: {
  title: string;
  actionTitle?: string;
  onPressAction?: () => void;
  lightText?: boolean;
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, lightText ? styles.lightText : null]}>
        {title}
      </Text>
      {actionTitle && (
        <TouchableOpacity onPress={onPressAction} style={styles.actionButton}>
          <Text
            style={[styles.actionTitle, lightText ? styles.lightText : null]}
          >
            {actionTitle}
          </Text>
          <SvgComponent
            svgKey="ArrowRight"
            width={24}
            height={24}
            stroke={lightText ? colorSachem.inkInverse : colorSachem.ink}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingBottom: 12,
  },
  title: {
    fontSize: fontSachem.labelLarge,
    fontWeight: "700",
    color: colorSachem.ink,
  },
  actionTitle: {
    fontSize: fontSachem.labelMedium,
    color: colorSachem.ink,
  },
  lightText: { color: colorSachem.inkInverse },
  actionButton: { flexDirection: "row", alignItems: "center", gap: 4 },
});
