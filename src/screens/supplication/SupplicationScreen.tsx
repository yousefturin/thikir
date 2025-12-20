import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  PanResponder,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import React from "react";
import { items } from "@/db/thikir";
import HeaderNavigation from "@/components/UI/HeaderNavigation";
import { useAppNavigation } from "@/hooks/useNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorSachem, fontSachem } from "@/styles/*";
import SvgComponent from "@/utils/SvgComponent";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { useTranslation } from "react-i18next";

const SupplicationScreen = ({
  route,
}: {
  route: { params: { id: number } };
}) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const supplicationItem = React.useMemo(
    () => items.find((item) => item.id === id),
    [id]
  );

  // State management
  const [currentSubItemIndex, setCurrentSubItemIndex] = React.useState(0);
  const [countsArray, setCountsArray] = React.useState(
    supplicationItem?.subItems?.map(() => 0) || []
  );
  const [completedArray, setCompletedArray] = React.useState(
    supplicationItem?.subItems?.map(() => false) || []
  );
  const [isLongPress, setIsLongPress] = React.useState(false);
  const [autoAdvancedArray, setAutoAdvancedArray] = React.useState(
    supplicationItem?.subItems?.map(() => false) || []
  );

  // Animated values for each item
  const completionScales = React.useRef(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    supplicationItem?.subItems?.map(() => useSharedValue(0)) || []
  ).current;
  const completionOpacities = React.useRef(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    supplicationItem?.subItems?.map(() => useSharedValue(0)) || []
  ).current;
  const textOpacities = React.useRef(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    supplicationItem?.subItems?.map(() => useSharedValue(1)) || []
  ).current;

  // Touch detection variables
  // eslint-disable-next-line no-undef
  const pressTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const startX = React.useRef(0);
  const startY = React.useRef(0);
  const isSwiping = React.useRef(false);

  const flatListRef = React.useRef<FlatList>(null);
  const totalSubItems = supplicationItem?.subItems?.length || 0;
  const currentSubItem = supplicationItem?.subItems?.[currentSubItemIndex];
  const targetCount = currentSubItem?.count || 1;

  // Handle completion animations
  React.useEffect(() => {
    completedArray.forEach((isCompleted, index) => {
      if (isCompleted) {
        completionScales[index].value = withSpring(1, {
          damping: 15,
          stiffness: 200,
        });
        completionOpacities[index].value = withTiming(1, { duration: 300 });
        textOpacities[index].value = withTiming(0, { duration: 150 });
      } else {
        completionScales[index].value = withTiming(0, { duration: 200 });
        completionOpacities[index].value = withTiming(0, { duration: 200 });
        textOpacities[index].value = withTiming(1, { duration: 200 });
      }
    });
  }, [completedArray]);

  // Create animated styles for all items
  const completedAnimatedStyles =
    supplicationItem?.subItems?.map((_, index) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAnimatedStyle(() => ({
        transform: [{ scale: completionScales[index]?.value || 0 }],
        opacity: completionOpacities[index]?.value || 0,
      }))
    ) || [];

  const textAnimatedStyles =
    supplicationItem?.subItems?.map((_, index) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAnimatedStyle(() => ({
        opacity: textOpacities[index]?.value || 1,
      }))
    ) || [];

  // Handle increment count for specific index
  const incrementCount = React.useCallback(
    (index: number) => {
      if (!supplicationItem?.subItems?.[index] || completedArray[index]) return;

      const newCount = countsArray[index] + 1;
      const newCountsArray = [...countsArray];
      newCountsArray[index] = newCount;
      setCountsArray(newCountsArray);

      // Check if target count reached
      const targetCount = supplicationItem.subItems[index].count;
      if (newCount >= targetCount) {
        const newCompletedArray = [...completedArray];
        newCompletedArray[index] = true;
        setCompletedArray(newCompletedArray);

        // Auto-advance only if this is the current item and we haven't auto-advanced it before
        if (
          index === currentSubItemIndex &&
          !autoAdvancedArray[index] &&
          index < totalSubItems - 1
        ) {
          const newAutoAdvancedArray = [...autoAdvancedArray];
          newAutoAdvancedArray[index] = true;
          setAutoAdvancedArray(newAutoAdvancedArray);

          setTimeout(() => {
            goToNext();
          }, 500);
        }
      }
    },
    [
      countsArray,
      completedArray,
      supplicationItem,
      currentSubItemIndex,
      autoAdvancedArray,
      totalSubItems,
    ]
  );

  // Handle viewable items change
  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentSubItemIndex(viewableItems[0].index || 0);
    }
  }, []);

  // Press handling functions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContainerPressIn = (e: any) => {
    if (pressTimeout.current) clearTimeout(pressTimeout.current);

    // Start long press detection
    pressTimeout.current = setTimeout(() => {
      setIsLongPress(true);
    }, 500);

    // Store start coordinates
    startX.current = e.nativeEvent.pageX;
    startY.current = e.nativeEvent.pageY;

    // Assume not swiping yet
    isSwiping.current = false;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContainerPressOut = (e: any, index: number) => {
    if (pressTimeout.current) {
      clearTimeout(pressTimeout.current);
      pressTimeout.current = null;
    }

    const endX = e.nativeEvent.pageX;
    const endY = e.nativeEvent.pageY;
    const deltaX = Math.abs(endX - startX.current);
    const deltaY = Math.abs(endY - startY.current);

    const SWIPE_THRESHOLD = 10;

    // Only increment if:
    // 1. Not a long press
    // 2. Not swiping (movement above threshold)
    if (!isLongPress && deltaX < SWIPE_THRESHOLD && deltaY < SWIPE_THRESHOLD) {
      incrementCount(index);
    }

    // Reset
    setIsLongPress(false);
    isSwiping.current = false;
  };
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false, // let touches pass through
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // mark swipe if moved more than 10px
        return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10) {
          isSwiping.current = true;
        }
      },
    })
  ).current;

  // Navigation functions
  const goToNext = React.useCallback(() => {
    if (currentSubItemIndex >= totalSubItems - 1) return;
    const nextIndex = currentSubItemIndex + 1;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  }, [currentSubItemIndex, totalSubItems]);

  const goToPrevious = React.useCallback(() => {
    if (currentSubItemIndex <= 0) return;
    const prevIndex = currentSubItemIndex - 1;
    flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
  }, [currentSubItemIndex]);

  // Reset function for current item
  const resetCurrent = React.useCallback(() => {
    const newCountsArray = [...countsArray];
    const newCompletedArray = [...completedArray];
    const newAutoAdvancedArray = [...autoAdvancedArray];
    newCountsArray[currentSubItemIndex] = 0;
    newCompletedArray[currentSubItemIndex] = false;
    newAutoAdvancedArray[currentSubItemIndex] = false; // Reset auto-advance tracking
    setCountsArray(newCountsArray);
    setCompletedArray(newCompletedArray);
    setAutoAdvancedArray(newAutoAdvancedArray);
  }, [countsArray, completedArray, autoAdvancedArray, currentSubItemIndex]);
  // Render item for FlatList
  const renderSupplicationItem = ({ item, index }) => {
    const itemCompleted = completedArray[index] || false;
    const itemCount = countsArray[index] || 0;

    return (
      <View style={styles.flatListItem}>
        {/* Arabic Text */}
        <ScrollView
          style={styles.arabicContainer}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={() => {
            isSwiping.current = true;
          }}
          contentContainerStyle={{ minHeight: ScreenHeight - 200 }}
        >
          <View {...panResponder.panHandlers} style={{ flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPressIn={(e) => handleContainerPressIn(e)}
              onPressOut={(e) => handleContainerPressOut(e, index)}
              disabled={itemCompleted}
              style={{
                minHeight: ScreenHeight - 200,
                flex: 1,
              }}
            >
              <View style={{ flex: 0.8, justifyContent: "flex-start" }}>
                <View style={styles.repeatContainer}>
                  {itemCompleted ? (
                    <Animated.View
                      style={[
                        completedAnimatedStyles[index],
                        { flexDirection: "row", alignItems: "center", gap: 4 },
                      ]}
                    >
                      <SvgComponent
                        svgKey="CheckDone"
                        width={16}
                        height={16}
                        fill={colorSachem.success}
                      />
                      <Text
                        style={[
                          styles.repeatText,
                          { color: colorSachem.success },
                        ]}
                      >
                        {t("general.completed")}
                      </Text>
                    </Animated.View>
                  ) : (
                    <Animated.View
                      style={[
                        textAnimatedStyles[index],
                        { flexDirection: "row", alignItems: "center", gap: 4 },
                      ]}
                    >
                      <SvgComponent
                        svgKey="Repeat"
                        width={16}
                        height={16}
                        stroke={colorSachem.ink}
                      />
                      <Text style={styles.repeatText}>
                        {t("general.repeat")} {itemCount} / {targetCount}
                      </Text>
                    </Animated.View>
                  )}
                </View>
                <View style={{}}>
                  <View style={styles.arabicTextContainer}>
                    <Text style={styles.arabicText}>{item.subItemName}</Text>
                  </View>
                </View>

                {item?.subItemTranslation && (
                  <>
                    <View style={styles.translationHeaderContainer}>
                      <Text style={styles.translationHeaderText}>
                        Translation
                      </Text>
                    </View>

                    <Text style={styles.translationText}>
                      {item.subItemTranslation}
                    </Text>
                  </>
                )}

                {item.subItemDescription && (
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                      {item.subItemDescription}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  if (
    !supplicationItem ||
    !supplicationItem.subItems ||
    supplicationItem.subItems.length === 0
  ) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colorSachem.inkInverse }}
      >
        <HeaderNavigation
          title="Supplication Not Found"
          onPressLeftAction={() => navigation.goBack()}
        />
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Supplication not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isLastSubItem = currentSubItemIndex === totalSubItems - 1;
  const isFirstSubItem = currentSubItemIndex === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorSachem.inkInverse }}>
      <HeaderNavigation
        title={supplicationItem.name}
        description={supplicationItem.category}
        onPressLeftAction={() => navigation.goBack()}
        onPressRightAction={() => resetCurrent()}
        rightIcon="Reset"
      />

      {/* Main Content Area - FlatList */}
      <FlatList
        ref={flatListRef}
        data={supplicationItem.subItems}
        renderItem={renderSupplicationItem}
        keyExtractor={(item, index) => `${item.id || index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        style={styles.flatListContainer}
        onScrollBeginDrag={() => {
          isSwiping.current = true;
        }}
      />

      {/* Bottom Control Panel */}
      <View style={styles.controlPanel}>
        {/* Counter Display */}

        {/* Navigation Controls */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={goToPrevious}
            disabled={isFirstSubItem}
            style={[
              styles.navButton,
              isFirstSubItem && styles.navButtonDisabled,
            ]}
          >
            <SvgComponent
              svgKey="ArrowLeft"
              width={24}
              height={24}
              stroke={isFirstSubItem ? colorSachem.disabled : colorSachem.brand}
            />
            <Text
              style={[
                styles.navButtonText,
                isFirstSubItem && styles.navButtonTextDisabled,
              ]}
            >
              {t("general.previous")}
            </Text>
          </TouchableOpacity>
          <Text style={styles.progressText}>
            {currentSubItemIndex + 1} {t("general.of")} {totalSubItems}
          </Text>

          <TouchableOpacity
            onPress={goToNext}
            disabled={isLastSubItem}
            style={[
              styles.navButton,
              isLastSubItem && styles.navButtonDisabled,
            ]}
          >
            <Text
              style={[
                styles.navButtonText,
                isLastSubItem && styles.navButtonTextDisabled,
              ]}
            >
              {isLastSubItem ? t("general.previous") : t("general.next")}
            </Text>
            <SvgComponent
              svgKey="ArrowRight"
              width={24}
              height={24}
              stroke={isLastSubItem ? colorSachem.disabled : colorSachem.brand}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: fontSachem.bodyMedium,
    color: colorSachem.error,
    textAlign: "center",
  },
  flatListContainer: {
    flex: 1,
  },
  flatListItem: {
    width: Dimensions.get("window").width,
    flex: 1,
    paddingHorizontal: 20,
  },
  translationHeaderContainer: {
    borderTopWidth: 1,
    borderTopColor: colorSachem.tertiary,
    paddingTop: 24,
    paddingBottom: 12,
  },
  translationHeaderText: {
    fontSize: fontSachem.labelLarge,
    color: colorSachem.ink,
    fontWeight: "600",
  },
  progressText: {
    fontSize: fontSachem.labelSmall,
    color: colorSachem.ink,
    fontWeight: "600",
    textAlign: "center",
  },
  arabicTextContainer: {
    marginBottom: 32,
    backgroundColor: colorSachem.primary,
    padding: 16,
    borderRadius: 20,
  },
  repeatContainer: {
    marginTop: 32,
    alignSelf: "flex-start",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 4,
  },
  repeatText: {
    fontSize: fontSachem.labelMedium,
    color: colorSachem.ink,
    textAlign: "center",
    fontWeight: "600",
  },
  arabicContainer: {
    flex: 1,
  },
  arabicText: {
    fontSize: fontSachem.displaySmall,
    color: colorSachem.ink,
    textAlign: "left",
    lineHeight: 28,
  },
  translationText: {
    fontSize: fontSachem.labelMedium,
    color: colorSachem.inkMedium,
    lineHeight: 24,
    marginBottom: 12,
  },
  descriptionContainer: {
    borderTopColor: colorSachem.tertiary,
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 12,
    paddingBottom: 32,
  },
  descriptionText: {
    fontSize: fontSachem.labelSmall,
    color: colorSachem.inkLight,
    textAlign: "left",
    lineHeight: 20,
    fontStyle: "italic",
  },
  controlPanel: {
    backgroundColor: colorSachem.inkInverse,
    paddingHorizontal: 24,
    paddingVertical: 24,

    borderTopColor: colorSachem.tertiary,
    borderTopWidth: 1,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 9999,
    backgroundColor: colorSachem.brand1,
    minWidth: 120,
    justifyContent: "center",
  },
  navButtonDisabled: {
    backgroundColor: colorSachem.secondary,
    opacity: 0.6,
  },
  navButtonText: {
    fontSize: fontSachem.labelLarge,
    color: colorSachem.brand,
    fontWeight: "600",
  },
  navButtonTextDisabled: {
    color: colorSachem.disabled,
  },
});

export default SupplicationScreen;
