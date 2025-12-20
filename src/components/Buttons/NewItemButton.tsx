import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "./Button";

import SvgComponent, { SvgKey } from "@/utils/SvgComponent";
import { colorSachem, fontSachem } from "@/styles/*";

export type NewItemButtonType = {
  hasMultiSelection: boolean;
  selected: string;
  name: string;
  value: string;
  onPress: () => void;
  icon: SvgKey;
  buttonTitle: string;
  subtitle?: string;
  testID?: string;
};

const NewItemButton = ({
  hasMultiSelection,
  selected,
  name,
  value,
  onPress,
  icon,
  buttonTitle,
  subtitle = null,
  testID,
}: NewItemButtonType) => {
  return (
    <View style={styles.container}>
      {hasMultiSelection && (
        <View
          style={[
            {
              borderColor:
                selected === value ? colorSachem.brand : colorSachem.tertiary,
              borderWidth: selected === value ? 5 : 2,
            },
            styles.multiSelectionContainer,
          ]}
        >
          <View />
        </View>
      )}
      <View style={styles.iconContainer}>
        <SvgComponent
          svgKey={icon}
          width={18}
          height={18}
          fill={colorSachem.brand}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.elementName}>
          {name}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.elementValue}
        >
          {subtitle ? subtitle : value}
        </Text>
      </View>
      {/* {Validate.Input(buttonTitle) && onPress && (
        <Button
          title={buttonTitle}
          onPress={onPress}
          style={styles.button}
          styleText={styles.buttonText}
          buttonTestID={testID}
        />
      )} */}
    </View>
  );
};

export default NewItemButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorSachem.primary,
    flex: 1,
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorSachem.inkInverse,
  },
  elementName: {
    fontSize: fontSachem.labelMedium,
    color: colorSachem.ink,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "auto",
    writingDirection: "auto",
  },
  elementValue: {
    fontSize: fontSachem.labelMicro,
    color: colorSachem.inkMedium,
    textAlign: "auto",
    writingDirection: "auto",
  },
  multiSelectionContainer: {
    width: 16,
    height: 16,
    alignItems: "center",
    backgroundColor: colorSachem.inkInverse,
    borderRadius: 99999,
    marginRight: 12,
  },
  nameContainer: {
    alignItems: "flex-start",
    flex: 1,
    marginLeft: 16,
  },
  button: {
    height: 24,
    paddingHorizontal: 12,
  },
  buttonText: { fontSize: fontSachem.labelSmall },
});
