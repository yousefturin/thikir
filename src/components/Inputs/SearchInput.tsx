import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Animated,
  Button,
  Easing,
  ViewStyle,
  StyleProp,
  I18nManager,
} from "react-native";

import { colorSachem } from "@/styles/Sachem";
import SvgComponent, { SvgKey } from "@/utils/SvgComponent";

const INPUT_EXPANDED_WIDTH = 0.99; // 100% (relative)
const INPUT_SHRUNK_WIDTH = 1; // 99% (relative)

export type SearchInputProps = {
  searchQuery: string;
  onSearch: (query: string) => void;
  onCancel: () => void;
  placeholder?: string;
  leftIcon?: SvgKey;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: React.Ref<TextInput>;
  showCancelButton?: boolean;
  style?: StyleProp<ViewStyle>;
  autoFocus?: boolean;
  testID?: string;
};

const SearchInput = React.forwardRef<TextInput, SearchInputProps>(
  (
    {
      searchQuery,
      onSearch,
      onCancel,
      onBlur,
      onFocus,
      placeholder,
      leftIcon,
      showCancelButton = true,
      style,
      autoFocus = false,
      testID,
    },
    ref
  ) => {
    const [isFirstInputFocused, setIsFirstInputFocused] = React.useState(false);

    const inputWidth = React.useRef(new Animated.Value(1)).current;
    const cancelAnim = React.useRef(new Animated.Value(0)).current; // 0: hidden, 1: visible

    React.useEffect(() => {
      if (!showCancelButton) return;
      if (isFirstInputFocused) {
        Animated.parallel([
          Animated.timing(inputWidth, {
            toValue: INPUT_SHRUNK_WIDTH,
            duration: 320,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
          Animated.timing(cancelAnim, {
            toValue: 1,
            duration: 320,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(inputWidth, {
            toValue: INPUT_EXPANDED_WIDTH,
            duration: 320,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
          Animated.timing(cancelAnim, {
            toValue: 0,
            duration: 480,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
        ]).start();
      }
    }, [isFirstInputFocused, inputWidth, cancelAnim, showCancelButton]);

    const handleCancel = () => {
      if (showCancelButton) {
        setIsFirstInputFocused(false);
        // Wait for animation to finish before calling onCancel
        Animated.parallel([
          Animated.timing(inputWidth, {
            toValue: INPUT_EXPANDED_WIDTH,
            duration: 480,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
          Animated.timing(cancelAnim, {
            toValue: 0,
            duration: 320,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
        ]).start(() => {
          onCancel();
        });
      } else {
        onCancel();
      }
    };
    return (
      <View style={styles.container}>
        <Animated.View
          style={StyleSheet.flatten([
            styles.inputWrapper,
            {
              flex: inputWidth,
              marginEnd: cancelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 8],
              }),
            },
            style,
          ])}
        >
          <SvgComponent
            svgKey={leftIcon}
            width={16}
            height={16}
            style={styles.icon}
          />
          <TextInput
            testID={testID}
            style={[
              styles.input,
              { textAlign: I18nManager.isRTL ? "right" : "left" },
            ]}
            ref={ref}
            placeholder={placeholder}
            value={searchQuery}
            onChangeText={onSearch}
            clearButtonMode="while-editing"
            onFocus={() => {
              setIsFirstInputFocused(true);
              onFocus?.();
            }}
            onBlur={() => {
              setIsFirstInputFocused(false);
              onBlur?.();
            }}
            autoFocus={autoFocus}
          />
        </Animated.View>
        {showCancelButton && (
          <Animated.View
            style={{
              opacity: cancelAnim,
              transform: [
                {
                  translateX: cancelAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [40, 0],
                  }),
                },
              ],
              pointerEvents: isFirstInputFocused ? "auto" : "none",
            }}
          >
            {isFirstInputFocused && (
              <View style={styles.focusedContainer}>
                <Button
                  title="Cancel"
                  onPress={handleCancel}
                  color={colorSachem.brand}
                  accessibilityLabel="Cancel"
                />
              </View>
            )}
          </Animated.View>
        )}
      </View>
    );
  }
);

export default SearchInput;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorSachem.primary,
    borderRadius: 16,
    paddingHorizontal: 10,
    height: 46,
    borderWidth: 1,
    borderColor: colorSachem.tertiary,
    zIndex: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorSachem.primary,
    borderRadius: 16,
  },
  focusedContainer: {
    marginEnd: 5,
    overflow: "hidden",
    width: 80,
    borderRadius: 999,
  },
  icon: { marginEnd: 8 },
});
