import { useFocusEffect } from '@react-navigation/native';
import React from "react";
import { LayoutAnimation, Platform } from "react-native";

export const OnLayoutAnimation = () => {
  return Platform.OS === 'ios' && LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

export const OnLayoutAnimationCustom = (config) => {
  return Platform.OS === 'ios' && LayoutAnimation.configureNext(config);
}

export const useIOSLayoutAnimation = () => {
  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS !== 'ios') return;

      const timer = setTimeout(() => {
        OnLayoutAnimation();
      }, 300);

      return () => {
        clearTimeout(timer);
        OnLayoutAnimationCustom({
          duration: 0,
          update: { type: 'easeInEaseOut' },
        });
      };
    }, [])
  );
};
