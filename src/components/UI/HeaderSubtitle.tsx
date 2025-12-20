import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colorSachem, fontSachem } from "@/styles/*";
export type HeaderSubtitleType = {
  title: string;
  style?: object;
};
const HeaderSubtitle = ({ title, style }: HeaderSubtitleType) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default HeaderSubtitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 26,
    paddingHorizontal: 24,
    paddingBottom: 14,
  },
  title: {
    fontSize: fontSachem.labelSmall,
    color: colorSachem.inkLight,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
