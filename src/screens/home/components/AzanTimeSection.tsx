import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colorSachem, fontSachem } from "@/styles/*";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import HeaderNavigation from "@/components/UI/HeaderNavigation";
import { Skeleton } from "moti/skeleton";
import { useAppNavigation } from "@/hooks/useNavigation";
import Format from "@/utils/Format";
import Extract from "@/utils/Extract";
import { useTranslation } from "react-i18next";

const SkeletonCommonProps = {
  colorMode: colorSachem.skTheme as "light" | "dark",
  backgroundColor: colorSachem.primary,
  colors: [colorSachem.brand3, colorSachem.brand1],
  transition: {
    type: "timing" as const,
    duration: 1000,
  },
};

type AzanTime = {
  value: string;
  time: string;
  title: string;
};

export type AzanTimeSectionProps = {
  azanTimes: AzanTime[];
  isLocationEnabled: boolean;
  isAzanLoading: boolean;
};

const AzanTimeSection = ({
  azanTimes,
  isLocationEnabled,
  isAzanLoading,
}: AzanTimeSectionProps) => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  // Memoize calculations to avoid unnecessary re-computations
  const { nextAzanIndex, nextAzanTime, nextAzanTitle, nextAzanLeftMinutes } =
    React.useMemo(() => {
      if (!azanTimes || azanTimes.length === 0) {
        return {
          nextAzanIndex: 0,
          nextAzanTime: { time: "00:00", title: "No Azan" },
          nextAzanTitle: "No Azan",
          nextAzanLeftMinutes: 0,
        };
      }

      const index = Extract.NextAzanIndex(azanTimes);
      const azanTime = azanTimes[index];
      const remainingMinutes = Extract.RemainingMinutes(
        azanTime?.time || "00:00"
      );

      return {
        nextAzanIndex: index,
        nextAzanTime: azanTime,
        nextAzanTitle: t(`azanNames.${azanTime?.value}`) || "Unknown",
        nextAzanLeftMinutes: remainingMinutes,
      };
    }, [azanTimes]);

  if (isAzanLoading) {
    return (
      <View style={{ marginBottom: 24 }}>
        <Skeleton.Group show>
          <View
            style={{
              marginHorizontal: 24,
            }}
          >
            <Skeleton
              show
              height={30}
              width={"50%"}
              radius={10}
              {...SkeletonCommonProps}
            />
            <View style={{ marginTop: 12 }}>
              <Skeleton
                show
                height={20}
                width={"80%"}
                radius={10}
                {...SkeletonCommonProps}
              />
            </View>
          </View>
          <View style={{ marginTop: 16, alignItems: "center" }}>
            <Skeleton
              show
              height={60}
              width={"50%"}
              radius={10}
              {...SkeletonCommonProps}
            />
          </View>
          <FlatList
            data={Array.from({ length: 5 })}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.azanContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={() => (
              <View style={styles.azanItemContainer}>
                <Skeleton
                  show
                  height={15}
                  width={40}
                  radius={10}
                  {...SkeletonCommonProps}
                />
                <View style={{ marginTop: 8 }}>
                  <Skeleton
                    show
                    height={15}
                    width={40}
                    radius={10}
                    {...SkeletonCommonProps}
                  />
                </View>
                <View style={styles.azanIndicator}>
                  <Skeleton
                    show
                    height={15}
                    width={15}
                    radius={7.5}
                    {...SkeletonCommonProps}
                  />
                </View>
              </View>
            )}
          />
        </Skeleton.Group>
      </View>
    );
  }

  if (!isLocationEnabled) {
    return (
      <View style={{ marginBottom: 24, height: 200 }}>
        <HeaderNavigation
          title={`Location Disabled`}
          description={`Enable location to see accurate azan times.`}
          rightTitle="Enable"
          onPressRightAction={null}
          lightText
        />
        <TouchableOpacity
          onPress={() => Linking.openSettings()}
          style={[
            styles.azanTimeContainer,
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderColor: colorSachem.tertiary,
              borderWidth: 1,
              borderRadius: 20,
              margin: 24,
            },
          ]}
        >
          <Text style={{ color: colorSachem.tertiary }}>
            Tap to Enable Location
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 24 }}>
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
        rightTitle={t("general.more")}
        onPressRightAction={() => navigation.navigate("AzanTimes")}
        lightText
      />
      <View style={styles.azanTimeContainer}>
        <Text style={styles.azanTime}>{nextAzanTime?.time || "--:--"}</Text>
      </View>
      <FlatList
        scrollEnabled={false}
        data={azanTimes}
        keyExtractor={(item, index) => item?.title || `azan-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.azanContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => {
          if (!item || typeof index !== "number") {
            return null;
          }

          const isNext = index === nextAzanIndex;
          return (
            <View style={styles.azanItemContainer}>
              <Text style={[styles.azanTitle, isNext ? styles.boldText : null]}>
                {t(`azanNames.${item.value}`) || "Unknown"}
              </Text>
              <Text
                style={[styles.azanTimeText, isNext ? styles.boldText : null]}
              >
                {item.time || "--:--"}
              </Text>
              <Text style={styles.azanIndicator}>{isNext ? "●" : "○"}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AzanTimeSection;

const styles = StyleSheet.create({
  azanTime: {
    fontSize: fontSachem.titleLarge,
    fontWeight: "700",
    color: colorSachem.inkInverse,
  },
  azanTimeContainer: {
    alignItems: "center",
  },
  azanContainer: {
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 16,
    justifyContent: "space-between",
    width: ScreenWidth,
  },
  separator: {
    width: 1.6,
    backgroundColor: colorSachem.inkInverse,
    marginHorizontal: 16,
  },
  azanItemContainer: {
    alignItems: "center",
  },
  azanTitle: {
    textAlign: "center",
    color: colorSachem.inkInverse,
    fontSize: fontSachem.labelMedium,
    fontWeight: "400",
  },
  azanTimeText: {
    color: colorSachem.inkInverse,
    fontSize: fontSachem.bodyLarge,
    fontWeight: "400",
  },
  azanIndicator: {
    color: colorSachem.inkInverse,
    fontSize: fontSachem.bodyLarge,
    marginTop: 4,
  },
  boldText: {
    // fontWeight: "700",
  },
});
