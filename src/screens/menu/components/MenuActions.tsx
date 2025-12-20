import React from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import SvgComponent from "@/utils/SvgComponent";
import { colorSachem, fontSachem } from "@/styles/*";
import { MenuItemType } from "@/config/menuStructure";

const MenuActions = ({
  buttons,
  onPress,
}: {
  buttons: MenuItemType[];
  onPress: (item: MenuItemType) => void;
}) => {
  const { t } = useTranslation();
  const renderItem = ({
    item,
    index,
  }: {
    item: MenuItemType;
    index: number;
  }) => (
    <TouchableOpacity
      onPress={() => onPress(item)}
      testID={item?.testID}
      activeOpacity={0.8}
      style={[
        styles.buttonAction,
        index === 0 && { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
        index === buttons.length - 1 && {
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        },
        index !== buttons.length - 1 && { borderRadius: 0 },
      ]}
    >
      <View style={styles.svgContainer}>
        <SvgComponent
          svgKey={item.svgKey}
          stroke={colorSachem.ink}
          width={20}
          height={20}
        />
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.titleArrowContainer}>
          <Text style={styles.title}>{t(item.title)}</Text>
          <SvgComponent
            svgKey="ArrowRight"
            width={24}
            height={24}
            stroke={colorSachem.ink}
          />
        </View>

        {index !== buttons.length - 1 && <View style={styles.divider} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.buttonContainer}>
      <FlatList
        scrollEnabled={false}
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MenuActions;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 24,
    marginBottom: 8,
    zIndex: 0,
    borderColor: colorSachem.inkInverse20,
    borderWidth: 1,
  },
  buttonAction: {
    height: 55,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colorSachem.primary,
  },
  svgContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorSachem.inkInverse,
  },
  titleContainer: {
    flex: 0.93,
  },
  titleArrowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
  title: {
    flex: 1,
    color: colorSachem.ink,
    fontWeight: "400",
    fontSize: fontSachem.labelMedium,
    textAlign: "left",
  },
  divider: {
    backgroundColor: colorSachem.tertiary,
    height: 1,
    width: "100%",
  },
});
