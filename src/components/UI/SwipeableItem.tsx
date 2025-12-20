import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { OnLayoutAnimation } from "@/utils/OnLayoutAnimation";
import { colorSachem } from "@/styles/*";

export type SwipeableItemProps = {
  item?: object;
  onSwipeToLeft?: (id: number | string) => void;
  onSwipeToLeftConfirm?: () => Promise<boolean>;
  onSwipeToRight?: (item: SwipeableItemProps["item"]) => void;
  idLabel?: string;
  isSwipeable?: boolean;
  isLeftDisabled?: boolean;
  isRightDisabled?: boolean;
  component: React.ReactNode;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  componentBackgroundColor?: string;
};
export type handleSwipeableOpenType = "left" | "right";

const SwipeableItem = ({
  item,
  onSwipeToLeft = () => {},
  onSwipeToLeftConfirm = async () => true,
  onSwipeToRight = () => {},
  idLabel = "id",
  component,
  isSwipeable = true,
  isLeftDisabled = false,
  isRightDisabled = false,
  leftComponent,
  rightComponent,
  componentBackgroundColor = colorSachem.primary,
}: SwipeableItemProps) => {
  const translateX = useSharedValue(0);
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);
  const opacityValueSecond = useSharedValue(1);
  const swipeableRef = React.useRef(null);
  const swipeDirection = useSharedValue<"left" | "right" | null>(null);

  const handleSwipeableOpen = (direction: handleSwipeableOpenType) => {
    swipeDirection.value = direction;
    if (direction === "right") {
      // Self-close and trigger delete when swiped right
      if (swipeableRef.current) {
        swipeableRef.current.close();
        onSwipeToRight(item);
      } else {
        handleConfirmDelete();
        impactAsync(ImpactFeedbackStyle.Light);
      }
    }
  };
  const handleSwipeableClose = () => {
    swipeDirection.value = null;
    impactAsync(ImpactFeedbackStyle.Rigid);
  };

  const swipeableContainerAnimatedStyle = useAnimatedStyle(() => {
    let borderTopRightRadius = 20;
    let borderBottomRightRadius = 20;
    let borderTopLeftRadius = 20;
    let borderBottomLeftRadius = 20;

    if (swipeDirection.value === "left") {
      borderTopLeftRadius = 0;
      borderBottomLeftRadius = 0;
    } else if (swipeDirection.value === "right") {
      borderTopRightRadius = 0;
      borderBottomRightRadius = 0;
    }

    return {
      borderTopRightRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderBottomLeftRadius,
      transform: [{ translateX: translateX.value }],
      opacity: opacityValue.value,
    };
  });
  const underBtnMaskAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacityValueSecond.value,
  }));

  const getRightButtonActionStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: scaleValue.value },
    ] as const,
    opacity: opacityValueSecond.value,
  }));

  const handleConfirmDelete = async () => {
    const isConfirmed = await onSwipeToLeftConfirm();
    if (isConfirmed) {
      handleDelete();
    }
  };
  const handleDelete = () => {
    translateX.value = withTiming(-300, { duration: 300 });
    opacityValue.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(onSwipeToLeft)(item[idLabel]);
      }
    });
    // Animate the background button out as well
    opacityValueSecond.value = withTiming(0, { duration: 200 });
    OnLayoutAnimation();
  };

  const renderLeftAction = () => (
    <>
      <View style={styles.editBtn}>{leftComponent && leftComponent}</View>
      <Reanimated.View
        style={[styles.leftActionMask, underBtnMaskAnimatedStyle]}
      />
    </>
  );

  const renderRightActions = () => (
    <>
      <Reanimated.View style={getRightButtonActionStyle}>
        <TouchableOpacity
          style={styles.ButtonDelete}
          onPress={() => {
            swipeableRef.current.close();
            handleConfirmDelete();
          }}
        >
          {rightComponent && rightComponent}
        </TouchableOpacity>
      </Reanimated.View>
      <Reanimated.View
        style={[styles.rightActionMask, underBtnMaskAnimatedStyle]}
      />
    </>
  );

  return (
    <>
      {isSwipeable ? (
        <Swipeable
          ref={swipeableRef}
          renderLeftActions={isLeftDisabled ? null : renderLeftAction}
          renderRightActions={isRightDisabled ? null : renderRightActions}
          friction={3}
          dragOffsetFromLeftEdge={20}
          dragOffsetFromRightEdge={20}
          overshootFriction={8}
          overshootLeft
          overshootRight
          onSwipeableWillOpen={handleSwipeableOpen}
          onSwipeableWillClose={handleSwipeableClose}
        >
          <Reanimated.View
            style={[
              swipeableContainerAnimatedStyle,
              { backgroundColor: componentBackgroundColor },
            ]}
          >
            {component && component}
          </Reanimated.View>
        </Swipeable>
      ) : (
        <Reanimated.View
          style={[
            swipeableContainerAnimatedStyle,
            { backgroundColor: componentBackgroundColor },
          ]}
        >
          {component && component}
        </Reanimated.View>
      )}
    </>
  );
};

export default SwipeableItem;

const styles = StyleSheet.create({
  editBtn: {
    height: "100%",
    width: 100,
    backgroundColor: colorSachem.brand1,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  ButtonDelete: {
    height: "100%",
    width: 100,
    backgroundColor: colorSachem.error,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rightActionMask: {
    position: "absolute",
    right: 0,
    width: "100%",
    height: "100%",
    top: 0,
    backgroundColor: colorSachem.error,
    zIndex: -1,
    borderRadius: 20,
  },
  leftActionMask: {
    position: "absolute",
    right: 0,
    width: "100%",
    height: "100%",
    top: 0,
    backgroundColor: colorSachem.brand1,
    zIndex: -1,
    borderRadius: 20,
  },
});
