import { View } from "react-native";
import React from "react";
import HeaderSection from "@/components/UI/HeaderSection";
import Verse from "@/components/UI/Verse";
import { VerseData } from "@/hooks/useVerseOfTheDay";
import { useTranslation } from "react-i18next";

const VerseSection = ({
  verse,
  isVerseLoading,
}: {
  verse: VerseData;
  isVerseLoading: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <View>
      <HeaderSection
        title={t("Tabs.Home.verse.title")}
        actionTitle={t("general.more")}
        onPressAction={() => {}}
      />
      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <Verse
          text={verse?.verseText}
          verseNumber={verse?.verseNumber}
          verseName={verse?.verseNameEn}
          translation={verse?.meaning}
          isLoading={isVerseLoading}
        />
      </View>
    </View>
  );
};

export default VerseSection;
