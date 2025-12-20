import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { colorSachem } from "@/styles/*";
import NewItemButton from "@/components/Buttons/NewItemButton";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigation from "@/components/UI/HeaderNavigation";
import { useAppNavigation } from "@/hooks/useNavigation";
import { i18n, Language } from "@/lib/i18n";
import { applyRTL } from "@/lib/i18n/rtl";
import { reloadAppAsync } from "expo";

async function changeLanguage(lang: Language) {
  await i18n.changeLanguage(lang);
  const needsRestart = applyRTL(lang);
  if (needsRestart) {
    reloadAppAsync();
  }
}
const LanguageScreen = () => {
  const { t, i18n } = useTranslation();
  const navigation = useAppNavigation();

  const languageElements = [
    {
      image: "ArabicFlag",
      text: t("screens.LanguageScreen.languages.ar"),
      subtext: "اضبط لغة التطبيق إلى العربية",
      action: "ar",
    },
    {
      image: "EnglishFlag",
      text: t("screens.LanguageScreen.languages.en"),
      subtext: "Set app language to English",
      action: "en",
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={async () => {
          await AsyncStorage.multiSet([
            ["settings.lang", item.action],
            ["settings.langUserChosen", "true"],
          ]);
          await changeLanguage(item.action);
        }}
        style={{ marginHorizontal: 24, marginBottom: 16 }}
      >
        <NewItemButton
          name={item?.text}
          subtitle={item?.subtext}
          value={item?.action}
          onPress={() => {}}
          icon={item?.image}
          buttonTitle={null}
          hasMultiSelection
          selected={i18n.language}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        title={t("screens.LanguageScreen.title")}
        description={t("screens.LanguageScreen.description")}
        onPressLeftAction={() => navigation.goBack()}
        hasBottomBorder
      />
      <FlatList
        scrollEnabled={false}
        data={languageElements}
        renderItem={renderItem}
        keyExtractor={(item) => item.action}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 32, paddingBottom: 32 }}
      />
    </SafeAreaView>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSachem.inkInverse,
  },
});
