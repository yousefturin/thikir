import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colorSachem, fontSachem } from "@/styles/*";

const HeaderModal = ({
  title,
  description,
  RightButtonElement,
}: {
  title: string;
  description?: string;
  RightButtonElement?: React.ReactNode;
}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          RightButtonElement
            ? styles.textContainer
            : { flex: 1, alignItems: "flex-start" }
        }
      >
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      {RightButtonElement && <>{RightButtonElement}</>}
    </View>
  );
};

export default HeaderModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 8,
    gap: 12,
  },
  textContainer: {
    width: "60%",
    alignItems: "flex-start",
    flex: 1,
  },
  title: {
    fontSize: fontSachem.displayMedium,
    fontWeight: "700",
    color: colorSachem.ink,
  },
  description: {
    marginTop: 8,
    color: colorSachem.inkMedium,
    fontSize: fontSachem.labelMedium,
    flexWrap: "wrap",
    textAlign: "left",
  },
});
