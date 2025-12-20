import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colorSachem, fontSachem } from "@/styles/*";
import { Skeleton } from "moti/skeleton";
const SkeletonCommonProps = {
  colorMode: colorSachem.skTheme as "light" | "dark",
  backgroundColor: colorSachem.primary,
  colors: [colorSachem.brand3, colorSachem.brand1],
  transition: {
    type: "timing" as const,
    duration: 1000,
  },
};
const Verse = ({
  text,
  verseNumber,
  verseName,
  translation,
  isLoading,
  reference,
}: {
  text: string;
  verseNumber?: number;
  verseName?: string;
  translation: string;
  isLoading: boolean;
  reference?: string;
}) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Skeleton.Group show>
          <Skeleton
            show
            height={30}
            width={"100%"}
            radius={10}
            {...SkeletonCommonProps}
          />
          <View style={styles.separator} />
          <View style={{ marginTop: 12 }}>
            <Skeleton
              show
              height={60}
              width={"100%"}
              radius={10}
              {...SkeletonCommonProps}
            />
          </View>
          <View style={{ marginTop: 12, alignItems: "flex-end" }}>
            <Skeleton
              show
              height={15}
              width={"50%"}
              radius={5}
              {...SkeletonCommonProps}
            />
          </View>
        </Skeleton.Group>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: fontSachem.displaySmall,
          color: colorSachem.brand,
          marginBottom: 12,
          fontFamily: "Lateef-Regular",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
      <View style={styles.separator} />
      <Text
        style={{
          fontSize: fontSachem.labelSmall,
          color: colorSachem.inkMedium,
          marginTop: 12,
          textAlign: "left",
          fontStyle: "italic",
        }}
      >
        {translation}
      </Text>
      {verseName && verseName && (
        <Text
          style={{
            fontSize: fontSachem.labelMicro,
            color: colorSachem.inkLight,
            marginTop: 12,
            textAlign: "auto",
            writingDirection: "auto",
          }}
        >
          — {verseName}: {verseNumber}
        </Text>
      )}
      {reference && (
        <Text
          style={{
            fontSize: fontSachem.labelMicro,
            color: colorSachem.inkLight,
            marginTop: 4,
            textAlign: "auto",
            writingDirection: "auto",
          }}
        >
          {reference}
        </Text>
      )}
    </View>
  );
};

export default Verse;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colorSachem.primary,
    borderRadius: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colorSachem.tertiary,
    marginTop: 8,
  },
});
