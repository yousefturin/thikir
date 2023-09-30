import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItems } from "../db/GetData";
import { HomeStyles } from "../context/commonStyles";
import { useTheme } from "../context/ThemContex";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const FavouriteScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  //#region LightTheme
  const lightStyles = StyleSheet.create({
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
      shadowColor: "white",
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
      shadowColor: "white",
    },
    searchBarInput: {
      backgroundColor: "#fefffe",
      color: "#dddddd",
    },
    buttonGrid: {
      shadowColor: "white",
    },
    squareButton: {
      backgroundColor: "#fefffe",
    },
    buttonTextTop: {
      color: "#000",
    },
    iconTop: {
      color: "#be915a",
    },
    emptyMessageText:{
      color: "#000",
    }
  });
  //#endregion
  
  //#region DarkTheme
  const darkStyles = StyleSheet.create({
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
      backgroundColor: "#262626",
      shadowColor: "black",
    },
    buttonText: {
      color: "#fff",
    },
    iconWrapper: {
      shadowColor: "black",
    },
    horizontalLine: {
      borderColor: "#262626",
    },
    containerSearchMode: {
      backgroundColor: "#151515",
    },
    searchBarContainer: {
      backgroundColor: "#151515",
    },
    searchBarInputContainer: {
      backgroundColor: "#262626",
      shadowColor: "black",
    },
    searchBarInput: {
      backgroundColor: "#262626",
      color: "#dddddd",
    },
    buttonGrid: {
      shadowColor: "black",
    },
    squareButton: {
      backgroundColor: "#262626",
    },
    buttonTextTop: {
      color: "#dddddd",
    },
    iconTop: {
      color: "#be915a",
    },
    emptyMessageText:{
      color: "#fff",
    }
  });
  //#endregion
  
  //#region StyleMapping
  const styles = {
    ...HomeStyles,
    pageContainer: {
      ...HomeStyles.pageContainer,
      ...(isDarkMode ? darkStyles.pageContainer : lightStyles.pageContainer), 
    },
    container: {
      ...HomeStyles.container,
      ...(isDarkMode ? darkStyles.container : lightStyles.container), 
    },
    TextMid: {
      ...HomeStyles.TextMid,
      ...(isDarkMode ? darkStyles.TextMid : lightStyles.TextMid), 
    },
    buttonText: {
      ...HomeStyles.buttonText, 
      ...(isDarkMode ? darkStyles.buttonText : lightStyles.buttonText), 
    },
    button: {
      ...HomeStyles.button, 
      ...(isDarkMode ? darkStyles.button : lightStyles.button), 
    },
    iconWrapper: {
      ...HomeStyles.iconWrapper, 
      ...(isDarkMode ? darkStyles.iconWrapper : lightStyles.iconWrapper), 
    },
    horizontalLine: {
      ...HomeStyles.horizontalLine, 
      ...(isDarkMode ? darkStyles.horizontalLine : lightStyles.horizontalLine), 
    },
    containerSearchMode: {
      ...HomeStyles.containerSearchMode, 
      ...(isDarkMode
        ? darkStyles.containerSearchMode
        : lightStyles.containerSearchMode), 
    },
    searchBarContainer: {
      ...HomeStyles.horizonsearchBarContainertalLine, 
      ...(isDarkMode
        ? darkStyles.searchBarContainer
        : lightStyles.searchBarContainer), 
    },
    searchBarInputContainer: {
      ...HomeStyles.searchBarInputContainer, 
      ...(isDarkMode
        ? darkStyles.searchBarInputContainer
        : lightStyles.searchBarInputContainer), 
    },
    searchBarInput: {
      ...HomeStyles.searchBarInput, 
      ...(isDarkMode ? darkStyles.searchBarInput : lightStyles.searchBarInput), 
    },
    buttonGrid: {
      ...HomeStyles.buttonGrid, 
      ...(isDarkMode ? darkStyles.buttonGrid : lightStyles.buttonGrid), 
    },
    squareButton: {
      ...HomeStyles.squareButton, 
      ...(isDarkMode ? darkStyles.squareButton : lightStyles.squareButton), 
    },
    buttonTextTop: {
      ...HomeStyles.buttonTextTop, 
      ...(isDarkMode ? darkStyles.buttonTextTop : lightStyles.buttonTextTop), 
    },
    iconTop: {
      ...HomeStyles.iconTop, 
      ...(isDarkMode ? darkStyles.iconTop : lightStyles.iconTop), 
    },
    emptyMessageText: {
      ...HomeStyles.emptyMessageText, 
      ...(isDarkMode ? darkStyles.emptyMessageText : lightStyles.emptyMessageText), 
    },
  };
  //#endregion

  const [clickedIndexes, setClickedIndexes] = useState([]);
  const items = getItems(); 

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

  //#region Style baed on index
const renderBorderRadius = (index) => {
  if (clickedIndexes.length === 1) {
    return {       
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,};
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
        contentOffset={{ x: 0, y: 100 }}
      >
        {clickedIndexes.length === 0 ? ( // Check if clickedIndexes is empty
          <View style={styles.emptyMessage}>
            <Text  allowFontScaling={false}  style={styles.emptyMessageText}>أضف عناصر إلى قائمة المفضلة</Text>
          </View>
        ) : (
          clickedIndexes.map((index) => (
            <View key={index}>
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
                    size={24}
                    color="#454545"
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

export default FavouriteScreen;
