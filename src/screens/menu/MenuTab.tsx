import { Animated, Platform, SectionList, StyleSheet } from "react-native";
import React from "react";
import { colorSachem } from "@/styles/*";
import HeaderNavigation from "@/components/UI/HeaderNavigation";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import HeaderSubtitle from "@/components/UI/HeaderSubtitle";
import { menuStructure } from "@/config/menuStructure";
import { useAppNavigation } from "@/hooks/useNavigation";
import MenuActions from "./components/MenuActions";
import { useTranslation } from "react-i18next";

const MenuTab = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 10, 100],
    outputRange: [
      colorSachem.transparent,
      colorSachem.transparent,
      colorSachem.inkInverse,
    ],
    extrapolate: "clamp",
  });

  return (
    <LinearGradient
      colors={[colorSachem.brand, colorSachem.brandDark]}
      locations={[0, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <Animated.ScrollView
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
          paddingBottom: 20,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        horizontal={false}
        scrollEventThrottle={16}
      >
        <HeaderNavigation title={t("Tabs.MenuTab.title")} lightText />
        <SectionList
          scrollEnabled={false}
          contentContainerStyle={styles.actionsWrapper}
          sections={menuStructure}
          keyExtractor={(_, index) => index.toString()}
          renderSectionHeader={({ section }) => (
            <HeaderSubtitle
              style={{ backgroundColor: colorSachem.inkInverse }}
              title={t(section.title)}
            />
          )}
          renderSectionFooter={({ section }) => (
            <MenuActions
              buttons={section.data}
              onPress={(item) => {
                navigation.navigate(item.actionParam);
              }}
            />
          )}
          renderItem={() => null}
        />
      </Animated.ScrollView>
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          zIndex: -1,
          height: ScreenHeight / 2,
          backgroundColor: backgroundColor,
        }}
      />
    </LinearGradient>
  );
};

export default MenuTab;

const styles = StyleSheet.create({
  actionsWrapper: {
    flex: 1,
    backgroundColor: colorSachem.inkInverse,
  },
});
