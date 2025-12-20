import { colorSachem, fontSachem } from "@/styles/*";
import SvgComponent from "@/utils/SvgComponent";
import { Picker } from "@react-native-picker/picker";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";
import { View, Button, Platform, Text, StyleSheet } from "react-native";
import ReactNativeModal from "react-native-modal";

type ItemPickerProps = {
  pickerDataList: Array<{ value: string; label: string }>;
  isPicker: boolean;
  setIsPicker: React.Dispatch<React.SetStateAction<boolean>>;
  selectedData: { value: string; label: string } | null;
  setSelectedData: React.Dispatch<
    React.SetStateAction<{ value: string; label: string } | null>
  >;
  // Prayer time adjustment specific props
  prayerName?: string;
  originalTime?: string;
  onOffsetChange?: (offset: number) => void;
  previewAdjustedTime?: string;
};

const ItemPicker = ({
  pickerDataList,
  isPicker,
  setIsPicker,
  selectedData,
  setSelectedData,
  prayerName,
  originalTime,
  onOffsetChange,
  previewAdjustedTime,
}: ItemPickerProps) => {
  const { t } = useTranslation();
  const [tempSelectedData, setTempSelectedData] = useState(
    () =>
      selectedData || (pickerDataList.length === 1 ? pickerDataList[0] : null)
  );

  React.useEffect(() => {
    setTempSelectedData(
      selectedData || (pickerDataList.length === 1 ? pickerDataList[0] : null)
    );
  }, [selectedData, pickerDataList]);

  const handleValueChange = useCallback(
    (itemValue) => {
      const selectedItem = pickerDataList.find(
        (item: { value: string; label: string }) => item.value === itemValue
      );
      setTempSelectedData({
        value: selectedItem.value,
        label: selectedItem.label, // Set both value and label
      });

      // For prayer time adjustment, notify parent of offset change
      if (onOffsetChange && !isNaN(parseInt(itemValue))) {
        onOffsetChange(parseInt(itemValue));
      }
    },
    [pickerDataList, onOffsetChange]
  );

  const handleConfirmSelection = () => {
    let finalSelection = tempSelectedData;
    if (!finalSelection || !finalSelection.value) {
      // If nothing is selected, pick the first item as default
      finalSelection = pickerDataList.length > 0 ? pickerDataList[0] : null;
    }
    setSelectedData(finalSelection);
    setIsPicker(false);
  };

  return (
    <>
      {Platform.OS === "ios" ? (
        <ReactNativeModal
          isVisible={isPicker}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          swipeThreshold={170}
          backdropOpacity={0.2}
          statusBarTranslucent
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating
          onBackdropPress={() => setIsPicker(false)}
          onSwipeComplete={() => setIsPicker(false)}
          style={{ justifyContent: "flex-end", margin: 0 }}
        >
          <View
            style={{
              backgroundColor: colorSachem.inkInverse,
              borderTopStartRadius: 35,
              borderTopEndRadius: 35,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 24,
                marginBottom: 12,
              }}
            >
              {/* Neutral/Cancel Button */}
              <Button
                title={t("general.close")}
                color="grey"
                onPress={() => setIsPicker(false)}
              />
              {/* Positive/OK Button */}
              {Platform.OS === "ios" && (
                <Button
                  title={t("general.select")}
                  onPress={handleConfirmSelection}
                />
              )}
            </View>

            {/* Prayer Time Preview Section */}
            {prayerName && originalTime && (
              <View style={styles.timePreviewContainer}>
                <Text style={styles.prayerTitle}>
                  {t("general.timeAdjustment", { prayer: prayerName })}
                </Text>
                <View style={styles.timeComparisonContainer}>
                  <View style={styles.timeItem}>
                    <Text style={styles.timeLabel}>
                      {t("general.originalTime")}
                    </Text>
                    <Text style={styles.originalTime}>{originalTime}</Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    <SvgComponent
                      svgKey="ArrowRightLong"
                      width={24}
                      height={24}
                    />
                  </View>
                  <View style={styles.timeItem}>
                    <Text style={styles.timeLabel}>
                      {t("general.adjustedTime")}
                    </Text>
                    <Text style={styles.adjustedTime}>
                      {previewAdjustedTime || originalTime}
                    </Text>
                  </View>
                </View>
                {tempSelectedData?.value !== "0" && (
                  <Text style={styles.offsetInfo}>
                    {parseInt(tempSelectedData?.value || "0") > 0 ? "+" : ""}
                    {tempSelectedData?.value} {t("general.minute_plural")}
                  </Text>
                )}
              </View>
            )}

            <Picker
              selectedValue={
                tempSelectedData?.value ||
                (pickerDataList?.length === 1 ? pickerDataList[0]?.value : null)
              }
              onValueChange={handleValueChange}
            >
              {pickerDataList.map((item, index) => (
                <Picker.Item
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  label={t(String(item.label))}
                  value={String(item.value)}
                />
              ))}
            </Picker>
          </View>
        </ReactNativeModal>
      ) : (
        isPicker && (
          <Picker
            selectedValue={
              tempSelectedData?.value ||
              (pickerDataList?.length === 1 ? pickerDataList[0]?.value : null)
            }
            onValueChange={handleValueChange}
          >
            {pickerDataList.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        )
      )}
    </>
  );
};

export default ItemPicker;

const styles = StyleSheet.create({
  timePreviewContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colorSachem.tertiary,
  },
  prayerTitle: {
    fontSize: fontSachem.displaySmall,
    fontWeight: "600",
    color: colorSachem.ink,
    textAlign: "left",
    marginBottom: 16,
  },
  timeComparisonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  timeItem: {
    // flex: 1,
    alignItems: "center",
  },
  timeLabel: {
    fontSize: fontSachem.labelSmall,
    color: colorSachem.inkMedium,
    marginBottom: 4,
  },
  originalTime: {
    fontSize: fontSachem.displaySmall,
    fontWeight: "500",
    color: colorSachem.inkMedium,
  },
  adjustedTime: {
    fontSize: fontSachem.displaySmall,
    fontWeight: "600",
    color: colorSachem.brand,
  },
  arrowContainer: {
    paddingHorizontal: 16,
  },
  offsetInfo: {
    fontSize: fontSachem.labelSmall,
    color: colorSachem.inkMedium,
    textAlign: "center",
    fontStyle: "italic",
  },
});
