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
  const lightStyles = StyleSheet.create({
    pageContainer: {
      backgroundColor: "#f2f2f6", // Background color for the entire page
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
  });
  const darkStyles = StyleSheet.create({
    pageContainer: {
      backgroundColor: "#151515", // Background color for the entire page
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
  });

  const styles = {
    ...HomeStyles,
    pageContainer: {
      ...HomeStyles.pageContainer,
      ...(isDarkMode ? darkStyles.pageContainer : lightStyles.pageContainer), // Override container background color
    },
    container: {
      ...HomeStyles.container,
      ...(isDarkMode ? darkStyles.container : lightStyles.container), // Override container background color
    },
    TextMid: {
      ...HomeStyles.TextMid,
      ...(isDarkMode ? darkStyles.TextMid : lightStyles.TextMid), // Override container background color
    },
    buttonText: {
      ...HomeStyles.buttonText, // Apply all styles from HomeStyles.button
      ...(isDarkMode ? darkStyles.buttonText : lightStyles.buttonText), // Override button background color
    },
    button: {
      ...HomeStyles.button, // Apply all styles from HomeStyles.button
      ...(isDarkMode ? darkStyles.button : lightStyles.button), // Override button background color
    },
    iconWrapper: {
      ...HomeStyles.iconWrapper, // Apply all styles from HomeStyles.button
      ...(isDarkMode ? darkStyles.iconWrapper : lightStyles.iconWrapper), // Override button background color
    },
    horizontalLine: {
      ...HomeStyles.horizontalLine, // Apply all styles from HomeStyles.button
      ...(isDarkMode ? darkStyles.horizontalLine : lightStyles.horizontalLine), // Override button background color
    },
    containerSearchMode: {
      ...HomeStyles.containerSearchMode, // Apply all styles from HomeStyles.button
      ...(isDarkMode
        ? darkStyles.containerSearchMode
        : lightStyles.containerSearchMode), // Override button background color
    },
    searchBarContainer: {
      ...HomeStyles.horizonsearchBarContainertalLine, // Apply all styles from HomeStyles.button
      ...(isDarkMode
        ? darkStyles.searchBarContainer
        : lightStyles.searchBarContainer), // Override button background color
    },
    searchBarInputContainer: {
      ...HomeStyles.searchBarInputContainer, // Apply all styles from HomeStyles.button
      ...(isDarkMode
        ? darkStyles.searchBarInputContainer
        : lightStyles.searchBarInputContainer), // Override button background color
    },
    searchBarInput: {
      ...HomeStyles.searchBarInput, // Apply all styles from HomeStyles.button
      ...(isDarkMode ? darkStyles.searchBarInput : lightStyles.searchBarInput), // Override button background color
    },
    buttonGrid: {
      ...HomeStyles.buttonGrid, // Apply all styles from HomeStyles.button
      ...(isDarkMode ? darkStyles.buttonGrid : lightStyles.buttonGrid), // Override button background color
    },
    squareButton: {
      ...HomeStyles.squareButton, // Apply all styles from HomeStyles.button
      ...(isDarkMode ? darkStyles.squareButton : lightStyles.squareButton), // Override button background color
    },
    buttonTextTop: {
      ...HomeStyles.buttonTextTop, // Apply all styles from HomeStyles.button
      ...(isDarkMode ? darkStyles.buttonTextTop : lightStyles.buttonTextTop), // Override button background color
    },
    iconTop: {
      ...HomeStyles.iconTop, // Apply all styles from HomeStyles.button
      ...(isDarkMode ? darkStyles.iconTop : lightStyles.iconTop), // Override button background color
    },
  };

  const [clickedIndexes, setClickedIndexes] = useState([]);
  const items = getItems(); 

//#region 
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

//#region
const renderBorderRadius = (index) => {

  if (clickedIndexes.length === 1) {
    return {       
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,};
  } else if (index === clickedIndexes[0]) {
    // First item in the clickedIndexes array, apply top border radius
    return {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    };
  } else if (index === clickedIndexes[clickedIndexes.length - 1]) {
    // Last item in the clickedIndexes array, apply bottom border radius
    return {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    };
  }
  // Default border radius for other items
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
        {clickedIndexes.map((index) => (
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
        ))}
      </ScrollView>
    </View>
  );
};

export default FavouriteScreen;
