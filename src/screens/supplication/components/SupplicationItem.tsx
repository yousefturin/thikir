import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colorSachem, fontSachem } from "@/styles/*";
import SvgComponent from "@/utils/SvgComponent";
import { useTranslation } from "react-i18next";

interface SupplicationItemProps {
  item: {
    id: number;
    name: string;
    category: string;
    subItems: Array<{
      id: number;
      name: string;
      repTime: string;
      count: number;
      subItemName: string;
      subItemTranslation: string;
      subItemDescription?: string;
    }>;
  };
  onPress: (id: number) => void;
}

const SupplicationItem: React.FC<SupplicationItemProps> = ({
  item,
  onPress,
}) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPress(item.id)}
    >
      <View style={styles.iconContainer}>
        <SvgComponent
          svgKey={"Book"}
          width={28}
          height={28}
          stroke={colorSachem.ink}
        />
      </View>
      <View style={{ flexShrink: 1, flex: 1, alignItems: "flex-start" }}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.subItemCount}>
          {item.subItems?.length || 0} {t("general.supplication")}
        </Text>
      </View>
      <View style={styles.rightIconContainer}>
        <Text style={styles.readText}>{t("general.read")}</Text>
        <SvgComponent
          svgKey={"ArrowRight"}
          width={24}
          height={24}
          stroke={colorSachem.inkMedium}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SupplicationItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorSachem.primary,
    padding: 16,
    paddingHorizontal: 12,
    marginHorizontal: 24,
    marginVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 13.33,
    backgroundColor: colorSachem.inkInverse,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: fontSachem.labelLarge,
    fontWeight: "600",
    color: colorSachem.ink,
  },
  subItemCount: {
    fontSize: fontSachem.labelSmall,
    color: colorSachem.inkMedium,
    marginTop: 4,
  },
  rightIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readText: {
    fontSize: fontSachem.labelSmall,
    color: colorSachem.inkMedium,
  },
});
