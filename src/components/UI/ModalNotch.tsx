import { colorSachem } from "@/styles/*";
import React from "react";
import { StyleSheet, View } from "react-native";

export const ModalNotch = ({ style = { height: 48 } }) => (
  <View style={style} testID="modal-notch">
    <View style={styles.notch} />
  </View>
);

const styles = StyleSheet.create({
  notch: {
    height: 2,
    width: 64,
    borderRadius: 99999,
    marginVertical: 12,
    backgroundColor: colorSachem.tertiary,
    alignSelf: "center",
    position: "absolute",
    zIndex: 1,
    top: 0,
  },
});
