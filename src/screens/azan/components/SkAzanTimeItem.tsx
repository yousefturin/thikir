import { StyleSheet, View } from "react-native";
import React from "react";
import { colorSachem } from "@/styles/*";
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
const SkAzanTimeItem = () => {
  return (
    <View style={styles.container}>
      <Skeleton.Group show>
        <View style={styles.iconContainer}>
          <Skeleton
            show
            width={28}
            height={28}
            radius={14}
            {...SkeletonCommonProps}
          />
        </View>
        <View style={styles.textContainer}>
          <Skeleton
            show
            height={16}
            width={"60%"}
            radius={5}
            {...SkeletonCommonProps}
          />
          <View style={{ marginTop: 4 }}>
            <Skeleton
              show
              height={12}
              width={"90%"}
              radius={5}
              {...SkeletonCommonProps}
            />
          </View>
          <View style={{ marginTop: 4 }}>
            <Skeleton
              show
              height={12}
              width={"40%"}
              radius={5}
              {...SkeletonCommonProps}
            />
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Skeleton
            show
            height={24}
            width={60}
            radius={5}
            {...SkeletonCommonProps}
          />
        </View>
      </Skeleton.Group>
    </View>
  );
};

export default SkAzanTimeItem;
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
  },
});
