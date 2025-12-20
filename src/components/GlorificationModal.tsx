import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import ReactNativeModal from "react-native-modal";
import {
  Glorification,
  useGlorificationStore,
} from "stores/glorificationStore";
import { colorSachem, fontSachem } from "../styles";
import { ModalNotch } from "./UI/ModalNotch";
import HeaderModal from "./UI/HeaderModal";
import { Button } from "./Buttons/Button";
import SvgComponent from "@/utils/SvgComponent";
import SwipeableItem from "./UI/SwipeableItem";
import { OnLayoutAnimation } from "@/utils/OnLayoutAnimation";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import Extract from "@/utils/Extract";
import { useTranslation } from "react-i18next";
import { DataInput } from "./Inputs/DataInput";
import { ScrollView } from "react-native-gesture-handler";
import Validate from "@/utils/Validate";

interface GlorificationModalProps {
  visible: boolean;
  onClose: () => void;
}

const GlorificationModal: React.FC<GlorificationModalProps> = ({
  visible,
  onClose,
}) => {
  const {
    glorifications,
    selectedGlorificationId,
    addGlorification,
    setSelectedGlorification,
    removeGlorification,
  } = useGlorificationStore();
  const { t } = useTranslation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGlorificationText, setNewGlorificationText] = useState("");
  const [newGlorificationTarget, setNewGlorificationTarget] = useState("");
  const [inputErrorText, setInputErrorText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  React.useEffect(() => {
    setShowAddForm(false);
    setNewGlorificationText("");
    setNewGlorificationTarget("");
    setInputErrorText("");
    setIsButtonDisabled(false);
  }, [visible]);

  const handleAddNew = () => {
    setShowAddForm(true);
    setIsButtonDisabled(false);
    setInputErrorText("");
  };

  const handleSaveNew = () => {
    if (Validate.Input(newGlorificationText)) {
      const target = newGlorificationTarget
        ? parseInt(newGlorificationTarget, 10)
        : undefined;
      addGlorification(newGlorificationText.trim(), target);
      setNewGlorificationText("");
      setNewGlorificationTarget("");
      setShowAddForm(false);
      onClose();
    } else {
      setInputErrorText(t("models.GlorificationModal.errorEmptyText"));
      setIsButtonDisabled(true);
    }
  };

  const handleCancelAdd = () => {
    setNewGlorificationText("");
    setNewGlorificationTarget("");
    setShowAddForm(false);
  };

  const handleSelectGlorification = (id: string) => {
    setSelectedGlorification(id);
    onClose();
  };

  const onDeleteGlorification = async (id: string) => {
    OnLayoutAnimation();
    notificationAsync(NotificationFeedbackType.Error);
    removeGlorification(id);
  };

  const onDeleteGlorificationConfirm = async () => {
    return new Promise<boolean>((resolve) => {
      Alert.alert(
        t("alerts.deleteGlorification.title"),
        t("alerts.deleteGlorification.message"),
        [
          {
            text: t("general.cancel"),
            style: "cancel",
            onPress: () => resolve(false),
          },
          {
            text: t("general.delete"),
            onPress: () => resolve(true),
          },
        ],
        { cancelable: true }
      );
    });
  };

  const renderGlorificationItem = ({ item }: { item: Glorification }) => (
    <TouchableOpacity
      style={{ marginHorizontal: 24, marginBottom: 16 }}
      activeOpacity={1}
      onPress={() => handleSelectGlorification(item.id)}
    >
      <SwipeableItem
        item={item}
        onSwipeToLeft={onDeleteGlorification}
        onSwipeToLeftConfirm={onDeleteGlorificationConfirm}
        isLeftDisabled
        component={
          <SwipeableElement
            item={item}
            isSelected={selectedGlorificationId === item.id}
          />
        }
        rightComponent={<RightComponentAction t={t} />}
        componentBackgroundColor={colorSachem.primary}
      />
    </TouchableOpacity>
  );

  return (
    <ReactNativeModal
      isVisible={visible}
      hasBackdrop
      statusBarTranslucent
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      swipeDirection={"down"}
      animationInTiming={500}
      animationOutTiming={400}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
      propagateSwipe
      onBackdropPress={() => {
        Keyboard.dismiss();
        onClose();
      }}
      onSwipeComplete={() => {
        Keyboard.dismiss();
        onClose();
      }}
      onDismiss={() => {
        onClose();
        Keyboard.dismiss();
      }}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={{
          backgroundColor: colorSachem.inkInverse,
          height: ScreenHeight * 0.8,
          borderTopEndRadius: 35,
          borderTopStartRadius: 35,
        }}
      >
        <ModalNotch />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {showAddForm ? (
            <HeaderModal
              title={t("models.GlorificationModal.addNewGlorification")}
              description={t(
                "models.GlorificationModal.addNewGlorificationDescription"
              )}
              RightButtonElement={
                <Button
                  title={t("general.cancel")}
                  onPress={handleCancelAdd}
                  icon={
                    <SvgComponent
                      svgKey="Minus"
                      width={16}
                      height={16}
                      stroke={colorSachem.red5}
                    />
                  }
                  style={{
                    maxHeight: 32,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    backgroundColor: colorSachem.red1,
                  }}
                  styleText={{ color: colorSachem.red5 }}
                />
              }
            />
          ) : (
            <HeaderModal
              title={t("models.GlorificationModal.title")}
              description={t("models.GlorificationModal.description")}
              RightButtonElement={
                <Button
                  title={t("general.addNew")}
                  onPress={handleAddNew}
                  icon={<SvgComponent svgKey="Plus" width={16} height={16} />}
                  style={{
                    maxHeight: 32,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    backgroundColor: colorSachem.brand1,
                  }}
                  styleText={{ color: colorSachem.brand }}
                />
              }
            />
          )}
        </View>

        {showAddForm ? (
          <KeyboardAvoidingView
            behavior={Platform.select({ ios: "padding", android: "height" })}
            keyboardVerticalOffset={160}
            style={{
              flex: 1,
              gap: 16,
              paddingHorizontal: 24,
              paddingTop: 24,

              justifyContent: "space-between",
            }}
          >
            <ScrollView
              keyboardDismissMode="interactive"
              showsVerticalScrollIndicator={false}
            >
              <DataInput
                label={t("models.GlorificationModal.glorificationText")}
                value={newGlorificationText}
                onChangeText={setNewGlorificationText}
                note={inputErrorText}
                styleNote={styles.note}
              />
              <DataInput
                label={t("models.GlorificationModal.targetCount")}
                subLabel={t("models.GlorificationModal.targeCountOptional")}
                value={newGlorificationTarget}
                onChangeText={setNewGlorificationTarget}
                keyboardType="numeric"
              />
            </ScrollView>
            <Button
              disabled={isButtonDisabled}
              title={t("general.save")}
              onPress={handleSaveNew}
              style={{
                backgroundColor: colorSachem.brand,
                marginBottom: 32,
              }}
              styleText={{ color: colorSachem.inkInverse }}
            />
          </KeyboardAvoidingView>
        ) : (
          <FlatList
            data={glorifications}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 32, paddingTop: 24 }}
            renderItem={renderGlorificationItem}
            ListEmptyComponent={() => (
              <View
                style={{
                  padding: 40,
                  alignItems: "center",
                  flex: 1,
                  height: ScreenHeight * 0.6,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: fontSachem.labelSmall,
                    color: colorSachem.inkLight,
                    textAlign: "center",
                  }}
                >
                  {t("models.GlorificationModal.noGlorifications")}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </ReactNativeModal>
  );
};

const SwipeableElement = ({
  item,
  isSelected,
}: {
  item: Glorification;
  isSelected: boolean;
}) => {
  const { t } = useTranslation();
  //TODO:CHECK TEXT IF arabic give different Font Family
  const isArabic = Extract.IsArabic(item.text);
  return (
    <View
      style={{
        borderRadius: 16,
        padding: 24,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        minHeight: 72,
      }}
    >
      <View
        style={{
          borderColor: isSelected ? colorSachem.brand : colorSachem.tertiary,
          borderWidth: isSelected ? 5 : 2,
          width: 16,
          height: 16,
          alignItems: "center",
          backgroundColor: colorSachem.inkInverse,
          borderRadius: 99999,
          marginEnd: 12,
        }}
      />

      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Text
          style={{
            fontSize: fontSachem.labelLarge,
            color: colorSachem.brand,
            fontFamily: isArabic ? "Lateef-Regular" : undefined,
          }}
        >
          {item.text}
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: fontSachem.labelLarge,
            color: colorSachem.ink,
          }}
        >
          {item.count}
        </Text>
        <Text
          style={{
            marginTop: 4,
            fontSize: fontSachem.labelSmall,
            color: colorSachem.inkMedium,
          }}
        >
          {t("general.timesSaid")}
        </Text>
      </View>
    </View>
  );
};
const RightComponentAction = ({ t }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <SvgComponent
        svgKey="Trash"
        width={24}
        height={24}
        fill={colorSachem.primary}
      />
      <Text
        style={{
          fontSize: fontSachem.labelSmall,
          color: colorSachem.primary,
          textAlign: "center",
        }}
      >
        {t("general.delete")}
      </Text>
    </View>
  );
};
export default GlorificationModal;
const styles = StyleSheet.create({
  note: {
    fontSize: fontSachem.labelSmall,
    fontWeight: "600",
    color: colorSachem.error,
    marginBottom: 20,
    textAlign: "left",
  },
});
