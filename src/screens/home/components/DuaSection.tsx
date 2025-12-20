import { View } from "react-native";
import React from "react";
import HeaderSection from "@/components/UI/HeaderSection";
import Verse from "@/components/UI/Verse";
import { useTranslation } from "react-i18next";

const DuaSection = ({ duaVerse, isDuaVerseLoading }) => {
  const { t } = useTranslation();
  return (
    <View>
      <HeaderSection
        title={t("Tabs.Home.dua.title")}
        actionTitle={t("general.more")}
        onPressAction={() => {}}
      />
      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <Verse
          text={duaVerse?.text}
          translation={duaVerse?.translation}
          reference={duaVerse?.reference}
          isLoading={isDuaVerseLoading}
        />
      </View>
    </View>
  );
};

export default DuaSection;
