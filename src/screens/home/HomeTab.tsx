import { Animated, Platform, View } from "react-native";
import React from "react";
import { colorSachem } from "@/styles/*";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import AzanTimeSection from "./components/AzanTimeSection";
import SupplicationSection from "./components/SupplicationSection";
import VerseSection from "./components/VerseSection";
import DuaSection from "./components/DuaSection";
import NamesOfAllahSection from "./components/NamesOfAllahSection";
import { useNameOfAllah } from "@/hooks/useNameOfAllah";
import { useVerseOfTheDay } from "@/hooks/useVerseOfTheDay";
import { useDuaOfTheDay } from "@/hooks/useDua";
import { useLocationStore } from "stores/useLocationStore";
import { useAppNavigation } from "@/hooks/useNavigation";
import { PRAYER_SETS, useAzanTime } from "@/hooks/useAzanTime";
import { scheduleAzansRolling } from "Services/Notifications";
import { useTranslation } from "react-i18next";

const HomeTab = () => {
  const navigation = useAppNavigation();
  const { i18n } = useTranslation();
  const { data: nameOfAllahData } = useNameOfAllah();
  const { data: verseOfTheDayData, isLoading: isVerseLoading } =
    useVerseOfTheDay(i18n.language);
  const { data: duaOfTheDayData, isLoading: isDuaVerseLoading } =
    useDuaOfTheDay();
  const requestLocation = useLocationStore((state) => state.requestLocation);
  const { latitude, longitude, canAskForPermission, isLocationEnabled } =
    useLocationStore();
  const { data, isLoading: isAzanLoading } = useAzanTime({
    latitude: latitude,
    longitude: longitude,
    enabled: isLocationEnabled,
    prayerSet: PRAYER_SETS.MAIN_FIVE,
  });
  // Schedule azan notifications when location changes
  React.useEffect(() => {
    if (!latitude || !longitude) return;
    scheduleAzansRolling(latitude, longitude);
  }, [navigation]);

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

  React.useEffect(() => {
    const fetchLocation = async () => {
      if (!isLocationEnabled && canAskForPermission) {
        await requestLocation();
      }
    };
    fetchLocation();
  }, [navigation]);

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
        <AzanTimeSection
          azanTimes={data}
          isLocationEnabled={isLocationEnabled}
          isAzanLoading={isAzanLoading}
        />
        <SupplicationSection />
        <View
          style={{
            flex: 1,
            backgroundColor: colorSachem.inkInverse,
          }}
        >
          <VerseSection
            verse={verseOfTheDayData}
            isVerseLoading={isVerseLoading}
          />
          <DuaSection
            duaVerse={duaOfTheDayData}
            isDuaVerseLoading={isDuaVerseLoading}
          />
          <NamesOfAllahSection nameOfAllahData={nameOfAllahData} />
        </View>
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

export default HomeTab;
