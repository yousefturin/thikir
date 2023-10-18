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
import { useColor } from '../context/ColorContext';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Appearance } from 'react-native';

const FavouriteScreen = ({ navigation }) => {
  const { selectedTheme } = useTheme();
  const systemTheme = selectedTheme === 'system';
  const { selectedColor, setColor } = useColor();
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
      color: "#f2b784",
    },
    emptyMessageText:{
      color: "#000",
    }
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
      color: "#f2b784",
    },
    emptyMessageText:{
      color: "#fff",
    }
  });
  //#endregion
  const themeStyles = systemTheme
  ? Appearance.getColorScheme() === 'dark'
    ? darkTheme
    : lightTheme
  : selectedTheme === 'dark'
  ? darkTheme
  : lightTheme;
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
    TextMid: {
      ...HomeStyles.TextMid,
      ...(selectedTheme  === 'dark'? themeStyles.TextMid : themeStyles.TextMid), 
    },
    buttonText: {
      ...HomeStyles.buttonText, 
      ...(selectedTheme  === 'dark'? themeStyles.buttonText : themeStyles.buttonText), 
    },
    button: {
      ...HomeStyles.button, 
      ...(selectedTheme  === 'dark'? themeStyles.button : themeStyles.button), 
    },
    iconWrapper: {
      ...HomeStyles.iconWrapper, 
      ...(selectedTheme  === 'dark'? themeStyles.iconWrapper : themeStyles.iconWrapper), 
    },
    horizontalLine: {
      ...HomeStyles.horizontalLine, 
      ...(selectedTheme  === 'dark'? themeStyles.horizontalLine : themeStyles.horizontalLine), 
    },
    containerSearchMode: {
      ...HomeStyles.containerSearchMode, 
      ...(selectedTheme === 'dark'
        ? themeStyles.containerSearchMode
        : themeStyles.containerSearchMode), 
    },
    searchBarContainer: {
      ...HomeStyles.horizonsearchBarContainertalLine, 
      ...(selectedTheme === 'dark'
        ? themeStyles.searchBarContainer
        : themeStyles.searchBarContainer), 
    },
    searchBarInputContainer: {
      ...HomeStyles.searchBarInputContainer, 
      ...(selectedTheme === 'dark'
        ? themeStyles.searchBarInputContainer
        : themeStyles.searchBarInputContainer), 
    },
    searchBarInput: {
      ...HomeStyles.searchBarInput, 
      ...(selectedTheme === 'dark' ? themeStyles.searchBarInput : themeStyles.searchBarInput), 
    },
    buttonGrid: {
      ...HomeStyles.buttonGrid, 
      ...(selectedTheme === 'dark' ? themeStyles.buttonGrid : themeStyles.buttonGrid), 
    },
    squareButton: {
      ...HomeStyles.squareButton, 
      ...(selectedTheme === 'dark' ? themeStyles.squareButton : themeStyles.squareButton), 
    },
    buttonTextTop: {
      ...HomeStyles.buttonTextTop, 
      ...(selectedTheme  === 'dark'? themeStyles.buttonTextTop : themeStyles.buttonTextTop), 
    },
    iconTop: {
      ...HomeStyles.iconTop, 
      ...(selectedTheme  === 'dark'? themeStyles.iconTop : themeStyles.iconTop), 
    },
    emptyMessageText: {
      ...HomeStyles.emptyMessageText, 
      ...(selectedTheme === 'dark' ? themeStyles.emptyMessageText : themeStyles.emptyMessageText), 
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

export default FavouriteScreen;
