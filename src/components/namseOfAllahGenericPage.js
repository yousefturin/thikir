import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useTheme } from "../context/ThemContex";
import { useFont } from "../context/FontContext";
import { useColor } from '../context/ColorContext';
import { handleShare } from "../utils/shareUtils";
import { useNumberContext } from '../context/NumberContext'
import { namesOfAllahGenericPageScreenStyle } from "../context/commonStyles";
import { Appearance } from "react-native";
const NamesOfAllahGenericPage = ({ route }) => {

  const { selectedTheme } = useTheme();
  const { selectedFont } = useFont();
  const { selectedColor } = useColor();
  const systemTheme = selectedTheme === 'system';
  const { state, convertToEasternArabicNumerals } = useNumberContext();
  const { item } = route.params;
  const viewRef = React.useRef();

  const Share = async () => {
    await handleShare(viewRef.current);
  };
  //#endregion

      //#region LightTheme
      const lightTheme = StyleSheet.create({
        container: {
            backgroundColor: "#f2f2f6",
        },
        rectangle: {
            backgroundColor: "#fefffe",
            shadowColor: "white",
        },
        textDescription:{
          color: "#000",
        },
        textDescriptionMain:{
          color: "#000",
        },
        horizontalLine:{
          borderColor: "#f2f2f6",
        },
    });
    //#endregion

    //#region DarkTheme
    const darkTheme = StyleSheet.create({
      container: {
          backgroundColor: "#151515",
      },
      rectangle: {
        backgroundColor: "#262626",
        shadowColor: "black",
    },
    textDescription:{
      color: "#fff",
    },
    textDescriptionMain:{
      color: "#fff",
    },
    horizontalLine:{
      borderColor: "#151515",
    },
  });
  //#endregion

  const themeStyles = systemTheme
      ? Appearance.getColorScheme() === "dark"
          ? darkTheme
          : lightTheme
      : selectedTheme === "dark"
          ? darkTheme
          : lightTheme;


          //#region StyleMapping
          const styles = {
            ...namesOfAllahGenericPageScreenStyle,
            container: {
                ...namesOfAllahGenericPageScreenStyle.container,
                ...(selectedTheme === "dark"
                    ? themeStyles.container
                    : themeStyles.container),
            },
            rectangle: {
                ...namesOfAllahGenericPageScreenStyle.rectangle,
                ...(selectedTheme === "dark" 
                ? themeStyles.rectangle 
                : themeStyles.rectangle),
            },
            textDescription: {
                ...namesOfAllahGenericPageScreenStyle.textDescription,
                ...(selectedTheme === "dark"
                    ? themeStyles.textDescription
                    : themeStyles.textDescription), 
            },
            textDescriptionMain: {
                ...namesOfAllahGenericPageScreenStyle.textDescriptionMain,
                ...(selectedTheme === "dark" ? themeStyles.textDescriptionMain : themeStyles.textDescriptionMain), 
            },
            horizontalLine: {
                ...namesOfAllahGenericPageScreenStyle.horizontalLine,
                ...(selectedTheme === "dark"
                    ? themeStyles.horizontalLine
                    : themeStyles.horizontalLine), 
            },
        };
        //#endregion
    


  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={[styles.nameDisplay,{ color: selectedColor}]}>
          {item.name}
        </Text>
        <Text style={[styles.textDescriptionMain,{ fontFamily: selectedFont}]}>
          {firstDiscription = state.isArabicNumbers
          ? convertToEasternArabicNumerals(item.subItemName_1.toString())
                                : item.subItemName_1.toString()}
        </Text>
        <Text style={[styles.textDescription,{ fontFamily: selectedFont}]}>
        {secondDiscription = state.isArabicNumbers
          ? convertToEasternArabicNumerals(item.subItemDescriptionAR.toString())
                                : item.subItemDescriptionAR.toString()}
        </Text>
        <View style={styles.horizontalLine} />
        <Text style={styles.suraNameNumber}>
        
            {item.AyaNumber !== null ? `${item.SuraName} ` : `[${item.SuraName}]`} 
            {AyaNumberToBeDisplayed = state.isArabicNumbers
              ? (item.AyaNumber !== null ? `﴿${convertToEasternArabicNumerals(item.AyaNumber.toString())}﴾` : null)
              : (item.AyaNumber !== null ? `﴿${item.AyaNumber.toString()}﴾` : null)}
        </Text>
        <TouchableOpacity onPress={Share} style={styles.shareButton}>
          <View style={styles.dotContainer}>
            <Text style={[styles.dot,{color:selectedColor}]}>&#8226;</Text>
            <Text style={[styles.dot,{color:selectedColor}]}>&#8226;</Text>
            <Text style={[styles.dot,{color:selectedColor}]}>&#8226;</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );



};
export default NamesOfAllahGenericPage;