import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colorSachem, fontSachem } from "@/styles/*";

const NamesOfAllahContainer = ({ nameOfAllahData }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.nameText}>{nameOfAllahData?.name}</Text>
        {nameOfAllahData?.englishName && (
          <View style={styles.textContainer}>
            <Text style={styles.englishNameText}>
              {nameOfAllahData?.englishName}
            </Text>
            {nameOfAllahData?.translation && (
              <Text style={styles.englishNameTranslationText}>
                {nameOfAllahData?.translation}
              </Text>
            )}
          </View>
        )}
      </View>
      {nameOfAllahData?.description && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: colorSachem.tertiary,
              width: "100%",
              marginVertical: 8,
            }}
          />
          <View style={{ alignItems: "flex-start" }}>
            <Text style={styles.englishNameTranslationText}>
              {nameOfAllahData?.description}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default NamesOfAllahContainer;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 24,
    backgroundColor: colorSachem.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginStart: 16,
    alignItems: "flex-start",
  },
  nameText: {
    fontSize: fontSachem.displayHuge,
    fontFamily: "Lateef-Regular",
    color: colorSachem.brand,
    textAlign: "center",
  },
  englishNameText: {
    fontSize: fontSachem.displaySmall,
    color: colorSachem.ink,
  },
  englishNameTranslationText: {
    fontSize: fontSachem.labelMedium,
    color: colorSachem.inkMedium,
    marginTop: 8,
    textAlign: "left",
  },
});
