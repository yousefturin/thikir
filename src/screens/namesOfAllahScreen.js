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
    TextMid: {
      color: "#000",
    },
    button: {
      backgroundColor: "#fefffe",
      shadowColor: "gray", 
    },
    buttonText: {
      color: "#000",
    },
    iconWrapper: {
      shadowColor: "white",
    },
    horizontalLine: {
      borderColor: "#fefffe",
    },
    containerSearchMode: {
      backgroundColor: "#f2f2f6",
    },
    searchBarContainer: {
      backgroundColor: "#f2f2f6",
    },
    searchBarInputContainer: {
      backgroundColor: "#fefffe",
    },
    searchBarInput: {
      backgroundColor: "#fefffe",
      color: "#dddddd",
    },
    buttonGrid: {},
    squareButton: {
      backgroundColor: "#fefffe",
    },
    buttonTextTop: {
      color: "#000",
    },
    iconTop: {
      color: "#f2b784",
    },
  });
  //#endregion

  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    pageContainer: {
      backgroundColor: "#151515",
    },
    container: {
      backgroundColor: "#151515",
    },
    TextMid: {
      color: "#fff",
    },
    button: {
      backgroundColor: "#242424",
      shadowColor: "black", 
    },
    buttonText: {
      color: "#fff",
    },
    iconWrapper: {
      shadowColor: "black",
    },
    horizontalLine: {
      borderColor: "#242424",
    },
    containerSearchMode: {
      backgroundColor: "#151515",
    },
    searchBarContainer: {
      backgroundColor: "#151515",
    },
    searchBarInputContainer: {
      backgroundColor: "#242424",
    },
    searchBarInput: {
      backgroundColor: "#242424",
      color: "#dddddd",
    },
    buttonGrid: {},
    squareButton: {
      backgroundColor: "#242424",
    },
    buttonTextTop: {
      color: "#dddddd",
    },
    iconTop: {
      color: "#f2b784",
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
    squareButton: {
      alignItems: "flex-end",
    },
    icon: {
      transform: [{ rotate: 0 + "deg" }],
      marginLeft: 20,
    },
    buttonTextTop: {
      textAlign: "right",
      marginRight: 10,
      fontFamily: "ScheherazadeNew",
      fontSize: 18,
    },
    iconWrapperTop: {
      right: 10,
    },
    TextMidWrapper: {
      alignItems: "flex-end",
      marginRight: width > 600 ? 60 : 35,
    },
    horizontalLine: {
      marginLeft: width > 600 ? 610 : 350,
    },
    TextMid: {
      fontFamily: "ScheherazadeNewBold",
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
    squareButton: {
      alignItems: "flex-start",
    },
    icon: {
      transform: [{ rotate: 180 + "deg" }],
      marginRight: 20,
    },
    buttonTextTop: {
      textAlign: "left",
      marginLeft: 10,
      fontFamily: "Montserrat",
      fontSize: 16,
    },
    iconWrapperTop: {
      left: 10,
    },
    TextMidWrapper: {
      alignItems: "flex-start",
      marginLeft: width > 600 ? 60 : 35,
    },
    horizontalLine: {
      marginRight: width > 600 ? 610 : 350,
    },
    TextMid: {
      fontFamily: "Montserrat",
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
    TextMid: {
      ...HomeStyles.TextMid,
      ...(selectedTheme === "dark" ? themeStyles.TextMid : themeStyles.TextMid),
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.TextMid
        : ArabicLanguage.TextMid),
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
    iconWrapper: {
      ...HomeStyles.iconWrapper,
      ...(selectedTheme === "dark"
        ? themeStyles.iconWrapper
        : themeStyles.iconWrapper),
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
    containerSearchMode: {
      ...HomeStyles.containerSearchMode,
      ...(selectedTheme === "dark"
        ? themeStyles.containerSearchMode
        : themeStyles.containerSearchMode),
    },
    searchBarContainer: {
      ...HomeStyles.searchBarContainer,
      ...(selectedTheme === "dark"
        ? themeStyles.searchBarContainer
        : themeStyles.searchBarContainer),
    },
    searchBarInputContainer: {
      ...HomeStyles.searchBarInputContainer,
      ...(selectedTheme === "dark"
        ? themeStyles.searchBarInputContainer
        : themeStyles.searchBarInputContainer),
    },
    searchBarInput: {
      ...HomeStyles.searchBarInput,
      ...(selectedTheme === "dark"
        ? themeStyles.searchBarInput
        : themeStyles.searchBarInput),
    },
    buttonGrid: {
      ...HomeStyles.buttonGrid,
      ...(selectedTheme === "dark"
        ? themeStyles.buttonGrid
        : themeStyles.buttonGrid),
    },
    squareButton: {
      ...HomeStyles.squareButton,
      ...(selectedTheme === "dark"
        ? themeStyles.squareButton
        : themeStyles.squareButton),
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.squareButton
        : ArabicLanguage.squareButton),
    },
    buttonTextTop: {
      ...HomeStyles.buttonTextTop,
      ...(selectedTheme === "dark"
        ? themeStyles.buttonTextTop
        : themeStyles.buttonTextTop),
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.buttonTextTop
        : ArabicLanguage.buttonTextTop),
    },
    iconTop: {
      ...HomeStyles.iconTop,
      ...(selectedTheme === "dark" ? themeStyles.iconTop : themeStyles.iconTop),
    },
    icon: {
      ...HomeStyles.icon,
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.icon
        : ArabicLanguage.icon),
    },
    iconWrapperTop: {
      ...HomeStyles.iconWrapperTop,
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.iconWrapperTop
        : ArabicLanguage.iconWrapperTop),
    },
    TextMidWrapper: {
      ...HomeStyles.TextMidWrapper,
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.TextMidWrapper
        : ArabicLanguage.TextMidWrapper),
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
          <View key={item.name}>
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
              <View style={styles.iconWrapper}>
                <FontAwesomeIcon
                  name="angle-left"
                  size={moderateScale(16)}
                  color={selectedColor}
                  style={styles.icon}
                />
              </View>
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
