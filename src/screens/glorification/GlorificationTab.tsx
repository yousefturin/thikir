import { StyleSheet, View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorSachem } from "@/styles/*";
import HeaderNavigation from "@/components/UI/HeaderNavigation";
import { useGlorificationStore } from "stores/glorificationStore";
import GlorificationModal from "@/components/GlorificationModal";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Button } from "@/components/Buttons/Button";
import SvgComponent from "@/utils/SvgComponent";
import Extract from "@/utils/Extract";
import { useTranslation } from "react-i18next";

const GlorificationTab = () => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const {
    getCurrentCount,
    getSelectedGlorification,
    updateGlorificationCount,
    resetGlorificationCount,
  } = useGlorificationStore();

  const selectedGlorification = getSelectedGlorification();
  const currentCount = getCurrentCount();

  const createRipple = (x: number, y: number) => {
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1500);
  };

  const handleCountPress = () => {
    if (selectedGlorification) {
      updateGlorificationCount(selectedGlorification.id, 1);
    } else {
      Alert.alert(
        t("alerts.noGlorificationSelected.title"),
        t("alerts.noGlorificationSelected.message")
      );
    }
  };

  const handleScreenTap = (x: number, y: number) => {
    createRipple(x, y);
    handleCountPress();
  };

  // Gesture handler for tap detection
  const screenTapGesture = Gesture.Tap().onEnd((event) => {
    runOnJS(handleScreenTap)(event.x, event.y);
  });

  const buttonTapGesture = Gesture.Tap().onStart(() => {
    // Do nothing — just capture
  });

  const handleReset = () => {
    if (selectedGlorification.count === 0) return;
    Alert.alert(
      t("alerts.resetGlorificationCount.title"),
      t("alerts.resetGlorificationCount.message"),
      [
        { text: t("general.cancel"), style: "cancel" },
        {
          text: t("general.reset"),
          style: "destructive",
          onPress: () => resetGlorificationCount(selectedGlorification?.id),
        },
      ]
    );
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: colorSachem.inkInverse,
      }}
    >
      <HeaderNavigation
        title={t("Tabs.GlorificationTab.title")}
        description={t("Tabs.GlorificationTab.description")}
        rightIcon="Reset"
        onPressRightAction={handleReset}
      />

      <GestureDetector gesture={screenTapGesture}>
        <Animated.View style={styles.container}>
          {/* Count Display in Middle */}
          <View style={styles.countContainer}>
            <View style={styles.countButton}>
              <Text style={styles.countNumber}>{currentCount}</Text>
              {selectedGlorification?.target && (
                <Text style={styles.targetText}>
                  / {selectedGlorification.target}
                </Text>
              )}
            </View>
          </View>
          {/* Selected Glorification Button at Bottom */}
          <GestureDetector gesture={Gesture.Exclusive(buttonTapGesture)}>
            <View style={styles.bottomContainer}>
              <Button
                title={
                  selectedGlorification
                    ? selectedGlorification.text
                    : t("general.addNew")
                }
                onPress={() => setModalVisible(true)}
                styleText={{
                  flex: 1,
                  textAlign: "center",
                  fontFamily:
                    selectedGlorification &&
                    Extract.IsArabic(selectedGlorification.text)
                      ? "Lateef-Regular"
                      : undefined,
                }}
                style={{
                  paddingHorizontal: 16,
                  height: 56,
                }}
                icon={
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 13.33,
                      backgroundColor: colorSachem.inkInverse,
                    }}
                  >
                    <SvgComponent svgKey="List" width={24} height={24} />
                  </View>
                }
                rightIcon={
                  <SvgComponent
                    svgKey={modalVisible ? "ArrowDown" : "ArrowUp"}
                    width={24}
                    height={24}
                  />
                }
              />
            </View>
          </GestureDetector>
          {/* Ripple Effects */}
          {ripples.map((ripple) => (
            <RippleEffect key={ripple.id} x={ripple.x} y={ripple.y} />
          ))}
        </Animated.View>
      </GestureDetector>

      <GlorificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

// Realistic Water Ripple Effect Component
const RippleEffect: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  // Multiple ripple waves for more realistic effect
  const rippleWaves = [
    {
      scale: useSharedValue(0),
      opacity: useSharedValue(0),
      delay: 0,
      maxScale: 3,
      duration: 1200,
    },
    {
      scale: useSharedValue(0),
      opacity: useSharedValue(0),
      delay: 150,
      maxScale: 2.5,
      duration: 1000,
    },
    {
      scale: useSharedValue(0),
      opacity: useSharedValue(0),
      delay: 300,
      maxScale: 2,
      duration: 800,
    },
  ];

  React.useEffect(() => {
    rippleWaves.forEach((wave, index) => {
      // Realistic easing - fast start, slow end like real water
      const easeOut = Easing.bezier(0.25, 0.46, 0.45, 0.94);

      wave.scale.value = withDelay(
        wave.delay,
        withTiming(wave.maxScale, {
          duration: wave.duration,
          easing: easeOut,
        })
      );

      // Opacity fades differently for each wave
      wave.opacity.value = withDelay(
        wave.delay,
        withSequence(
          withTiming(0.7 - index * 0.15, { duration: 100 }),
          withTiming(0, {
            duration: wave.duration - 100,
            easing: Easing.out(Easing.quad),
          })
        )
      );
    });
  }, []);

  return (
    <View style={styles.rippleContainer}>
      {rippleWaves.map((wave, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: wave.scale.value }],
          opacity: wave.opacity.value,
        }));

        return (
          <Animated.View
            key={index}
            style={[
              styles.rippleWave,
              {
                left: x - 30 - index * 5,
                top: y - 30 - index * 5,
                width: 60 + index * 10,
                height: 60 + index * 10,
                borderRadius: 30 + index * 5,
                borderWidth: 1.5 - index * 0.3,
                borderColor: `rgba(0, 122, 255, ${0.8 - index * 0.2})`,
              },
              animatedStyle,
            ]}
          />
        );
      })}

      {/* Central impact point */}
      <CentralImpact x={x} y={y} />
    </View>
  );
};

// Central impact animation for the initial touch point
const CentralImpact: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    // Quick pulse at the center
    scale.value = withSequence(
      withTiming(1.5, { duration: 150, easing: Easing.out(Easing.back(2)) }),
      withTiming(0, { duration: 200, easing: Easing.in(Easing.quad) })
    );

    opacity.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(0, { duration: 250 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.centralImpact,
        {
          left: x - 8,
          top: y - 8,
        },
        animatedStyle,
      ]}
    />
  );
};

export default GlorificationTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  countButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  countNumber: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#333",
  },
  targetText: {
    fontSize: 32,
    color: "#666",
    marginTop: 10,
  },
  bottomContainer: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  rippleContainer: {
    position: "absolute",
    pointerEvents: "none",
  },
  rippleWave: {
    position: "absolute",
    backgroundColor: "transparent",
    pointerEvents: "none",
  },
  centralImpact: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(0, 122, 255, 0.9)",
    pointerEvents: "none",
  },
});
