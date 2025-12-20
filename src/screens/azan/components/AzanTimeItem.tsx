import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SvgComponent, { SvgKey } from "@/utils/SvgComponent";
import { colorSachem, fontSachem } from "@/styles/*";

const AzanTimeItem = ({
  onPress,
  title,
  description,
  icon,
  time,
  isCurrentPray,
  value,
  offsetValue,
}: {
  onPress?: (item: {
    value: string;
    title: string;
    description?: string;
    icon: SvgKey;
    time: string;
  }) => void;
  title: string;
  description?: string;
  icon: SvgKey;
  time: string;
  isCurrentPray?: boolean;
  value: string;
  offsetValue?: string;
}) => {
  const item = { value, title, description, icon, time };
  return (
    <TouchableOpacity
      onPress={() => onPress?.(item)}
      style={[
        styles.container,
        isCurrentPray && { backgroundColor: colorSachem.brand1 },
      ]}
    >
      <View style={styles.iconContainer}>
        <SvgComponent
          svgKey={icon}
          width={28}
          height={28}
          stroke={isCurrentPray ? colorSachem.brand : colorSachem.ink}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            isCurrentPray && {
              color: colorSachem.brandDark,
              fontWeight: "600",
            },
          ]}
        >
          {title}
        </Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={[
            styles.time,
            isCurrentPray && {
              fontWeight: "700",
              color: colorSachem.brandDark,
            },
          ]}
        >
          {time}
        </Text>
        {offsetValue && (
          <Text
            style={[
              styles.description,
              {
                fontStyle: "italic",
                fontSize: fontSachem.labelMicro,
                textAlign: "auto",
                writingDirection: "auto",
              },
            ]}
          >
            {offsetValue}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AzanTimeItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 20,
    backgroundColor: colorSachem.primary,
    marginBottom: 16,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 13.33,
    backgroundColor: colorSachem.inkInverse,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  title: {
    fontSize: fontSachem.labelLarge,
    color: colorSachem.ink,
    fontWeight: "500",
  },
  description: {
    fontSize: fontSachem.labelSmall,
    color: colorSachem.inkMedium,
    marginTop: 4,
    // textAlign: "auto",
    // writingDirection: "auto",
  },
  time: {
    fontSize: fontSachem.displaySmall,
    color: colorSachem.ink,
    fontWeight: "500",
  },
});
