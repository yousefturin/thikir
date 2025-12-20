import { StyleSheet, View } from "react-native";
import React from "react";
import NamesOfAllahContainer from "@/components/UI/NamesOfAllahContainer";
import HeaderSection from "@/components/UI/HeaderSection";
import { useTranslation } from "react-i18next";

const NamesOfAllahSection = ({ nameOfAllahData }) => {
  const { t } = useTranslation();
  return (
    <View>
      <HeaderSection
        title={t("Tabs.Home.namesOfAllah.title")}
        actionTitle={t("general.more")}
        onPressAction={() => {}}
      />
      <View style={styles.container}>
        <NamesOfAllahContainer nameOfAllahData={nameOfAllahData} />
      </View>
    </View>
  );
};

export default NamesOfAllahSection;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
});
