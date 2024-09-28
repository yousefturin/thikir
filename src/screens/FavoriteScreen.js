import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItems } from "../db/GetData";
import { getEnItems } from "../db/GetDataEn";
import { HomeStyles } from "../Styles/commonStyles";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { useColor } from '../context/ColorContext';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { getColorForTheme } from "../utils/themeUtils";
import initializeScalingUtils from "../utils/core/NormalizeSize";
const { width } = Dimensions.get("window");

const FavoriteScreen = ({ navigation }) => {
  const { selectedTheme } = useTheme();
  const { selectedLanguage } = useLanguage();
  const systemTheme = selectedTheme === 'system';
  const { selectedColor } = useColor();
  const { moderateScale } = initializeScalingUtils(Dimensions);
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
    iconWrapper: {
      shadowColor: "white",
    },
    horizontalLine: {
      borderColor: "rgba(198, 198, 200, 0.45)",
    },
    emptyMessageText: {
      color: "#000",
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
    iconWrapper: {
      shadowColor: "black",
    },
    horizontalLine: {
      borderColor: "rgba(84, 84, 84, 0.45)",
    },
    emptyMessageText: {
      color: "#fff",
    }
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
      fontSize: moderateScale(18),
    },
    icon: {
      transform: [{ rotate: 0 + "deg" }],
      marginLeft: 20,
    },
    horizontalLine: {
      marginRight: 20,
    },
    emptyMessageText: {
      fontFamily: "ScheherazadeNew",
    }
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
    emptyMessageText: {
      fontFamily: "Montserrat",
    }
  });
  //#endregion



  //#region StyleMapping
  const styles = {
    ...HomeStyles,
    pageContainer: {
      ...HomeStyles.pageContainer,
      ...(selectedTheme === 'dark' ? themeStyles.pageContainer : themeStyles.pageContainer),
    },
    container: {
      ...HomeStyles.container,
      ...(selectedTheme === 'dark' ? themeStyles.container : themeStyles.container),
    },
    buttonText: {
      ...HomeStyles.buttonText,
      ...(selectedTheme === 'dark' ? themeStyles.buttonText : themeStyles.buttonText),
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.buttonText : ArabicLanguage.buttonText)
    },
    button: {
      ...HomeStyles.button,
      ...(selectedTheme === 'dark' ? themeStyles.button : themeStyles.button),
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.button : ArabicLanguage.button)
    },
    iconWrapper: {
      ...HomeStyles.iconWrapper,
      ...(selectedTheme === 'dark' ? themeStyles.iconWrapper : themeStyles.iconWrapper),
    },
    horizontalLine: {
      ...HomeStyles.horizontalLine,
      ...(selectedTheme === 'dark' ? themeStyles.horizontalLine : themeStyles.horizontalLine),
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.horizontalLine : ArabicLanguage.horizontalLine)
    },
    icon: {
      ...HomeStyles.icon,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.icon : ArabicLanguage.icon)
    },
    emptyMessageText: {
      ...HomeStyles.emptyMessageText,
      ...(selectedTheme === 'dark' ? themeStyles.emptyMessageText : themeStyles.emptyMessageText),
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.emptyMessageText : ArabicLanguage.emptyMessageText)
    },
    wrapperButton: {
      ...HomeStyles.wrapperButton,
      ...(selectedTheme === "dark"
        ? themeStyles.wrapperButton
        : themeStyles.wrapperButton),
    },
  };
  //#endregion

  const [clickedIndexes, setClickedIndexes] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (selectedLanguage !== "Arabic") {
      setItems(getEnItems());
    } else {
      setItems(getItems());
    }
  }, [selectedLanguage]);

  //#region FavButtonState Load
  useEffect(() => {
    // Load the button state array from AsyncStorage
    async function loadButtonState() {
      try {
        const savedState = await AsyncStorage.getItem("buttonState");
        if (savedState !== null) {
          const parsedState = JSON.parse(savedState);
          // Filter the item indices that have the button clicked (isFilled)
          const indexesWithButtonClicked = parsedState
            .map((isFilled, index) => (isFilled ? index : null))
            .filter((index) => index !== null);
          setClickedIndexes(indexesWithButtonClicked);
        }
      } catch (error) {
        console.error("Error loading button state from AsyncStorage:", error);
      }
    }
    loadButtonState();
  }, []);

  //#endregion

  //#region Style based on index
  const renderBorderRadius = (index) => {
    if (clickedIndexes.length === 1) {
      return {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      };
    } else if (index === clickedIndexes[0]) {
      return {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      };
    } else if (index === clickedIndexes[clickedIndexes.length - 1]) {
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
        {clickedIndexes.length === 0 ? ( // Check if clickedIndexes is empty
          <View style={styles.emptyMessage}>
            <Text allowFontScaling={false} style={styles.emptyMessageText}>{selectedLanguage != "Arabic" ? "Add Remembrance to Favourites" : "أضف عناصر إلى قائمة المفضلة"}</Text>
          </View>
        ) : (
          clickedIndexes.map((index) => (
            <View key={index} style={[styles.wrapperButton,renderBorderRadius(index),]}>
              <TouchableOpacity
                style={[styles.button, renderBorderRadius(index)]}
                onPress={() =>
                  navigation.navigate("GenericPage", {
                    name: items[index].name,
                    item: items[index],
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
                  <Text style={styles.buttonText}>{items[index].name}</Text>
                </View>
                <View style={styles.imageWrapper}>
                  {/* Image component */}
                  <Image style={styles.image} />
                </View>
              </TouchableOpacity>
              {index !== clickedIndexes[clickedIndexes.length - 1] && (
                <View style={styles.horizontalLine} />
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );

};

export default FavoriteScreen;
