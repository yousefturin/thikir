import React from "react";
import { Animated, StyleSheet, Text, TextInput, View } from "react-native";

import { DataInputProps, DataInputStylesProps } from "./types/DataInput";
import { colorSachem, fontSachem } from "@/styles/*";
import Validate from "@/utils/Validate";

const DataInputComponent = ({
  styleInput = { position: "relative" },
  styleLabel,
  styleNote,
  styleContainer = { width: "100%" },
  styleContainerAndRightComponent = {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backgroundColor = colorSachem.primary,
  label = "",
  placeholder = "",
  secureTextEntry,
  textContentType = "none",
  keyboardType = "default",
  autoFocus = false,
  value = "",
  onChangeText = () => {},
  note = "",
  characterLength = 100,
  onBlur = () => {},
  onFocus = () => {},
  RightComponent = null,
  disabled = false,
  subLabel = "",
  multiline = false,
  textAlignVertical = "center",
  selection = { start: undefined, end: undefined },
  inputAccessoryViewID,
  returnKeyType,
  onSubmitEditing,
  spellCheck = false,
  importantForAutofill = "no",
  extraInfo = "",
  testID,
}: DataInputProps): React.ReactNode => {
  const noteOpacity = React.useRef(new Animated.Value(0)).current; // Ref for controlling opacity animation
  const [hasSetSelection, setHasSetSelection] = React.useState(false);
  // Effect to animate the note visibility based on its presence
  React.useEffect(() => {
    const toValue = Validate.Input(note) ? 1 : 0;
    Animated.timing(noteOpacity, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [note]); // Run effect when `note` changes

  return (
    <View style={styleContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {/* Label */}
        {Validate.Input(label) && (
          <Text
            style={StyleSheet.flatten([
              styles.label,
              styleLabel,
              { color: note ? colorSachem.error : colorSachem.ink },
            ])}
          >
            {label}
          </Text>
        )}
        {/* SubLabel */}
        {Validate.Input(subLabel) && (
          <Text
            style={{
              color: colorSachem.inkLight,
              fontSize: fontSachem.labelSmall,
            }}
          >
            {" "}
            {subLabel}
          </Text>
        )}
      </View>

      {/* Input and Right Component */}
      <View
        style={[
          styleContainerAndRightComponent,
          { opacity: disabled ? 0.5 : 1 },
        ]}
      >
        <TextInput
          // @ts-expect-error : Some Type Issue
          style={StyleSheet.flatten([
            getInputStyle(backgroundColor, note, extraInfo),
            styleInput,
          ])}
          testID={testID}
          multiline={multiline}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={colorSachem.inkLight}
          secureTextEntry={secureTextEntry}
          textContentType={textContentType}
          keyboardType={keyboardType}
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChangeText}
          maxLength={characterLength}
          onBlur={onBlur}
          onFocus={() => {
            setHasSetSelection(true);
            onFocus?.();
          }}
          textAlignVertical={textAlignVertical}
          selection={!hasSetSelection ? selection : undefined}
          inputAccessoryViewID={inputAccessoryViewID}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          spellCheck={spellCheck}
          importantForAutofill={importantForAutofill}
        />
        {RightComponent && (
          <View
            style={{
              position: "absolute",
              right: 15,
              margin: "auto",
              paddingTop: note || extraInfo ? 18 : 0,
              paddingBottom: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RightComponent />
          </View>
        )}
      </View>

      {/* Note Section */}
      {note && typeof note === "string" && typeof note !== "boolean" && (
        <View style={styles.noteContainer}>
          <Animated.Text
            style={StyleSheet.flatten([
              styles.note,
              styleNote,
              { opacity: noteOpacity, flex: 1 },
            ])}
          >
            {note}
          </Animated.Text>
        </View>
      )}
      {extraInfo !== "" && !note ? (
        <View style={styles.extraInfoContainer}>
          <Text
            style={StyleSheet.flatten([
              styles.note,
              { flex: 1, color: colorSachem.inkMedium, fontWeight: "400" },
            ])}
          >
            {extraInfo}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
export const DataInput = React.memo(DataInputComponent);

const getInputStyle = (
  backgroundColor: DataInputStylesProps["backgroundColor"],
  note: DataInputStylesProps["note"],
  extraInfo: DataInputStylesProps["extraInfo"]
) => ({
  marginTop: 8,
  fontSize: fontSachem.labelMedium,
  width: "100%",
  borderRadius: 16,
  paddingVertical: 16,
  paddingLeft: 16,
  paddingHorizontal: 14,
  marginBottom: Boolean(extraInfo) || Boolean(note) ? 8 : 24,
  color: colorSachem.ink,

  borderColor: note ? colorSachem.error : colorSachem.tertiary,
  borderWidth: 1.6,
  backgroundColor: backgroundColor,
});
const styles = StyleSheet.create({
  label: {
    fontSize: fontSachem.labelMedium,
    color: colorSachem.ink,
    fontWeight: "600",
    // lineHeight: 18,
  },
  note: {
    fontSize: fontSachem.labelSmall,
    fontWeight: "600",
    color: colorSachem.error,
    // marginTop: 8,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "80%",
  },
  extraInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});
