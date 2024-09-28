import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "../context/ThemeContext";
import { useColor } from "../context/ColorContext";
import { useLanguage } from "../context/LanguageContext";
import { HomeStyles } from "../Styles/commonStyles";
import { getColorForTheme } from "../utils/themeUtils";
import initializeScalingUtils from "../utils/core/NormalizeSize"
const { width } = Dimensions.get("window");

const NamesOfAllahScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (selectedLanguage !== "Arabic") {
      setItems(require("../db/db_namesOfAllahEn.json"));
    } else {
      setItems(require("../db/db_namesOfAllah.json"));
    }
  }, [selectedLanguage]);

  const { scale, verticalScale, moderateScale } = initializeScalingUtils(Dimensions);
  const { selectedTheme } = useTheme();
  const { selectedColor } = useColor();
  const { selectedLanguage } = useLanguage();
  const systemTheme = selectedTheme === "system";

  //#region LightTheme
  const lightTheme = StyleSheet.create({
    pageContainer: {
      backgroundColor: "#f2f2f6",
    },
    container: {
      backgroundColor: "#f2f2f6",
    },
    wrapperButton:{
      backgroundColor: "#fefffe",
      shadowColor: "gray",
    },
    button: {
      backgroundColor: "#fefffe",
    },
    buttonText: {
      color: "#000",
    },
    horizontalLine: {
      borderColor: "rgba(198, 198, 200, 0.45)",
    },
  });
  //#endregion

  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    pageContainer: {
      backgroundColor: "#050505",
    },
    container: {
      backgroundColor: "#050505",
    },
    wrapperButton:{
      backgroundColor: "#1C1C1E",
      shadowColor: "black",
    },
    button: {
      backgroundColor: "#1C1C1E",
    },
    buttonText: {
      color: "#fff",
    },
    horizontalLine: {
      borderColor: "rgba(84, 84, 84, 0.45)",
    },
  });
  //#endregion

  const themeStyles = getColorForTheme(
    { dark: darkTheme, light: lightTheme },
    selectedTheme,
    systemTheme
  );

  //#region ArabicLanguage
  const ArabicLanguage = StyleSheet.create({
    button: {
      flexDirection: "row",
      fontFamily: "ScheherazadeNew",
    },
    buttonText: {
      textAlign: "right",
      marginLeft: 30,
      fontFamily: "ScheherazadeNew",
    },
    icon: {
      transform: [{ rotate: 0 + "deg" }],
      marginLeft: 20,
    },
    horizontalLine: {
      marginRight: 20,
    },
  });
  //#endregion

  //#region EnglishLanguage
  const EnglishLanguage = StyleSheet.create({
    button: {
      flexDirection: "row-reverse",
    },
    buttonText: {
      textAlign: "left",
      marginRight: 30,
      fontFamily: "Montserrat",
    },
    icon: {
      transform: [{ rotate: 180 + "deg" }],
      marginRight: 20,
    },
    horizontalLine: {
      marginLeft: 20,
    },
  });
  //#endregion

  //#region StylesMapping
  const styles = {
    ...HomeStyles,
    pageContainer: {
      ...HomeStyles.pageContainer,
      ...(selectedTheme === "dark"
        ? themeStyles.pageContainer
        : themeStyles.pageContainer),
    },
    container: {
      ...HomeStyles.container,
      ...(selectedTheme === "dark"
        ? themeStyles.container
        : themeStyles.container),
    },
    buttonText: {
      ...HomeStyles.buttonText,
      ...(selectedTheme === "dark"
        ? themeStyles.buttonText
        : themeStyles.buttonText),
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.buttonText
        : ArabicLanguage.buttonText),
    },
    button: {
      ...HomeStyles.button,
      ...(selectedTheme === "dark" ? themeStyles.button : themeStyles.button),
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.button
        : ArabicLanguage.button),
    },
    horizontalLine: {
      ...HomeStyles.horizontalLine,
      ...(selectedTheme === "dark"
        ? themeStyles.horizontalLine
        : themeStyles.horizontalLine),
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.horizontalLine
        : ArabicLanguage.horizontalLine),
    },
    icon: {
      ...HomeStyles.icon,
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.icon
        : ArabicLanguage.icon),
    },
    wrapperButton: {
      ...HomeStyles.wrapperButton,
      ...(selectedTheme === "dark"
        ? themeStyles.wrapperButton
        : themeStyles.wrapperButton),
    },
  };
  //#endregion

  //#region Style based on index
  const renderBorderRadius = (index) => {
    const itemCount = items.length;

    if (itemCount === 1) {
      return {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      };
    } else if (index === 0) {
      return {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      };
    } else if (index === itemCount - 1) {
      return {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      };
    }
    return {};
  };
  //#endregion

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { justifyContent: "flex-start", paddingTop: 40 },
        ]}
        contentOffset={{ x: 0, y: 0 }}
      >
        {items.map((item, index) => (
          <View key={item.name} style={[styles.wrapperButton,renderBorderRadius(index),]}>
            <TouchableOpacity
              style={[styles.button, renderBorderRadius(index)]}
              onPress={() =>
                navigation.navigate("namesOfAllahGenericPage", {
                  name:
                    selectedLanguage != "Arabic"
                      ? item.subItemName_1
                      : item.name,
                  item: item,
                  itemIndex: index,
                })
              }
              activeOpacity={0.7}
            >
                <FontAwesomeIcon
                  name="angle-left"
                  size={moderateScale(16)}
                  color={selectedColor}
                  style={styles.icon}
                />
              <View style={styles.nameWrapper}>
                <Text style={[styles.buttonText]}>
                  {selectedLanguage != "Arabic"
                    ? item.subItemName_1
                    : item.name}
                </Text>
              </View>
              <View style={styles.imageWrapper}>
                {/* Image component */}
                <Image style={styles.image} />
              </View>
            </TouchableOpacity>
            {index !== items.length - 1 && (
              <View style={styles.horizontalLine} />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NamesOfAllahScreen;
