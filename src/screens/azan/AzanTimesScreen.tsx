import {
  Animated,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import HeaderNavigation from "@/components/UI/HeaderNavigation";
import { useAppNavigation } from "@/hooks/useNavigation";
import { colorSachem, fontSachem } from "@/styles/*";
import { useLocationStore } from "stores/useLocationStore";
import { PRAYER_SETS } from "@/types/azanTypes";
import { useAzanTime } from "@/hooks/useAzanTime";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import Extract from "@/utils/Extract";
import Format from "@/utils/Format";
import HeaderModal from "@/components/UI/HeaderModal";
import AzanTimeItem from "./components/AzanTimeItem";
import ItemPicker from "@/components/Picker/Picker";
import PrayerTimeUtils from "@/utils/PrayerTimeUtils";
import SkAzanTimeItem from "./components/SkAzanTimeItem";
import { useAzanStore } from "stores/azanStore";
import { useTranslation } from "react-i18next";

const AzanTimesScreen = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const requestLocation = useLocationStore((state) => state.requestLocation);
  const { latitude, longitude, canAskForPermission, isLocationEnabled } =
    useLocationStore();
  const {
    data,
    setUserOffset,
    userOffsets,
    isLoading: isAzanTimeLoading,
  } = useAzanTime({
    latitude: latitude,
    longitude: longitude,
    enabled: isLocationEnabled,
    prayerSet: PRAYER_SETS.ALL_WITHOUT_THIRDS,
  });

  // Prayer time adjustment state
  const [isPrayerAdjustmentPicker, setIsPrayerAdjustmentPicker] =
    React.useState(false);
  const [selectedPrayerForAdjustment, setSelectedPrayerForAdjustment] =
    React.useState<{
      value: string;
      title: string;
      originalTime: string;
      currentOffset: number;
    } | null>(null);
  const [tempOffset, setTempOffset] = React.useState(0);
  const [selectedOffsetData, setSelectedOffsetData] = React.useState<{
    value: string;
    label: string;
  } | null>(null);

  // Generate offset picker data (-60 to +60 minutes)
  const offsetPickerData = React.useMemo(() => {
    return PrayerTimeUtils.generateOffsetPickerData();
  }, []);

  const prevNextAzanRef = React.useRef<{
    nextAzanIndex: number;
    nextAzanTime: { time: string; title: string };
    nextAzanTitle: string;
    nextAzanLeftMinutes: number;
  } | null>(null);

  const { nextAzanIndex, nextAzanTime, nextAzanTitle, nextAzanLeftMinutes } =
    React.useMemo(() => {
      if (!data || data.length === 0) {
        // Return the last valid value, or a fallback if nothing exists yet
        return (
          prevNextAzanRef.current || {
            nextAzanIndex: 0,
            nextAzanTime: { time: "--:--", title: "No Azan" },
            nextAzanTitle: "No Azan",
            nextAzanLeftMinutes: 0,
          }
        );
      }

      const index = Extract.NextAzanIndex(data);
      const azanTime = data[index];
      const remainingMinutes = Extract.RemainingMinutes(
        azanTime?.time || "--:--"
      );

      const result = {
        nextAzanIndex: index,
        nextAzanTime: azanTime,
        nextAzanTitle: t(`azanNames.${azanTime?.value}`) || "Unknown",
        nextAzanLeftMinutes: remainingMinutes,
      };

      // Update the ref with the latest valid value
      prevNextAzanRef.current = result;

      return result;
    }, [data]);

  // Calculate preview adjusted time based on temp offset
  const previewAdjustedTime = React.useMemo(() => {
    if (!selectedPrayerForAdjustment?.originalTime) return "";
    return PrayerTimeUtils.calculateAdjustedTime(
      selectedPrayerForAdjustment.originalTime,
      tempOffset
    );
  }, [selectedPrayerForAdjustment?.originalTime, tempOffset]);

  // Handle prayer item press to open adjustment picker
  const handlePrayerPress = React.useCallback(
    (item: {
      value: string;
      title: string;
      description?: string;
      icon: string;
      time: string;
    }) => {
      if (!data) return;

      // Get the current offset for this prayer from the store
      const currentOffset = userOffsets[item.title] || 0;

      // Use the current displayed time as the original
      // Note: If there's an offset, we need to calculate the original time
      const originalTime =
        currentOffset !== 0
          ? PrayerTimeUtils.calculateAdjustedTime(item.time, -currentOffset)
          : item.time;

      setSelectedPrayerForAdjustment({
        value: item.value,
        title: item.title,
        originalTime: originalTime,
        currentOffset,
      });
      setTempOffset(currentOffset);
      setSelectedOffsetData(PrayerTimeUtils.getOffsetData(currentOffset));
      setIsPrayerAdjustmentPicker(true);
    },
    [data]
  );

  // Handle offset change during picker interaction
  const handleOffsetChange = React.useCallback((offset: number) => {
    setTempOffset(offset);
  }, []);

  // Handle confirmation of prayer time adjustment
  const handleConfirmPrayerAdjustment = React.useCallback(() => {
    if (selectedPrayerForAdjustment) {
      setUserOffset(selectedPrayerForAdjustment.title, tempOffset);
      useAzanStore.setState((state) => ({
        cacheMetadata: {
          ...state.cacheMetadata!,
          AZAN_SCHEDULED_V1: false,
        },
      }));
      // Data will refresh automatically due to store invalidation
      setIsPrayerAdjustmentPicker(false);
      setSelectedPrayerForAdjustment(null);
    }
  }, [selectedPrayerForAdjustment, tempOffset, setUserOffset]);

  React.useEffect(() => {
    const fetchLocation = async () => {
      if (!isLocationEnabled && canAskForPermission) {
        await requestLocation();
      }
    };
    fetchLocation();
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
        <HeaderNavigation
          title={t("Tabs.Home.title", {
            azanName: nextAzanTitle,
          })}
          description={t("Tabs.Home.description", {
            timeRemaining: Format.TimeRemaining(nextAzanLeftMinutes).timeValue,
            timeUnit: t(
              `general.${Format.TimeRemaining(nextAzanLeftMinutes).timeUnit}`
            ),
          })}
          onPressLeftAction={() => navigation.goBack()}
          lightText
        />
        <View style={styles.azanTimeContainer}>
          <Text style={styles.azanTime}>{nextAzanTime?.time || "--:--"}</Text>
        </View>
        <View style={styles.azanContainer}>
          <HeaderModal
            title={t("screens.AzanScreen.title")}
            description={t("screens.AzanScreen.description")}
          />
          {isAzanTimeLoading ? (
            <FlatList
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              keyExtractor={(item) => `loading-azan-${item}`}
              scrollEnabled={false}
              contentContainerStyle={{
                paddingBottom: 24,
                marginHorizontal: 24,
                paddingTop: 24,
              }}
              renderItem={() => <SkAzanTimeItem />}
            />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item, index) => item?.title || `azan-${index}`}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={{
                paddingBottom: 24,
                paddingHorizontal: 24,
                paddingTop: 24,
              }}
              renderItem={({ item, index }) => {
                // const hasOffset =
                //   userOffsets[item.title] && userOffsets[item.title] !== 0;
                // const offsetValue = userOffsets[item.title] || 0;
                return (
                  <AzanTimeItem
                    value={item.value}
                    title={t(`azanNames.${item.value}`)}
                    time={item.time}
                    description={t(`azanNamesDescription.${item.value}`)}
                    // offsetValue={
                    //   hasOffset
                    //     ? `(${offsetValue > 0 ? "+" : ""}${offsetValue}min offset)`
                    //     : undefined
                    // }
                    icon={item.svgKey}
                    isCurrentPray={index === nextAzanIndex}
                    onPress={handlePrayerPress}
                  />
                );
              }}
            />
          )}
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

      {/* Prayer Time Adjustment Picker */}
      <ItemPicker
        pickerDataList={offsetPickerData}
        isPicker={isPrayerAdjustmentPicker}
        setIsPicker={setIsPrayerAdjustmentPicker}
        selectedData={selectedOffsetData}
        setSelectedData={(offsetData) => {
          if (typeof offsetData === "function") {
            // Handle function case if needed
            return;
          }
          setSelectedOffsetData(offsetData);
          if (offsetData) {
            const offset = parseInt(offsetData.value);
            setTempOffset(offset);
            handleConfirmPrayerAdjustment();
          }
        }}
        prayerName={selectedPrayerForAdjustment?.title}
        originalTime={selectedPrayerForAdjustment?.originalTime}
        onOffsetChange={handleOffsetChange}
        previewAdjustedTime={previewAdjustedTime}
      />
    </LinearGradient>
  );
};

export default AzanTimesScreen;
const styles = StyleSheet.create({
  azanTime: {
    fontSize: fontSachem.titleLarge,
    fontWeight: "700",
    color: colorSachem.inkInverse,
  },
  azanTimeContainer: {
    alignItems: "center",
    paddingBottom: 24,
  },
  azanContainer: {
    flex: 1,
    backgroundColor: colorSachem.inkInverse,
    paddingVertical: 24,
  },
});
