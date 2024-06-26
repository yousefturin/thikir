import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { SearchBar } from "react-native-elements";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { getItems } from "../db/GetData";
import { getEnItems } from "../db/GetDataEn";
import { HomeStyles } from "../Styles/commonStyles";
import { useTheme } from "../context/ThemeContext";
import { useColor } from "../context/ColorContext";
import { useLanguage } from "../context/LanguageContext";
import { Svg, Path, Circle } from "react-native-svg";
import { getColorForTheme } from "../utils/themeUtils";
const {width} = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const { selectedLanguage } = useLanguage();
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (selectedLanguage !== "Arabic") {
      setItems(getEnItems());
    } else {
      setItems(getItems());
    }
  }, [selectedLanguage]);

  const { selectedTheme } = useTheme();
  const { selectedColor } = useColor();
  const systemTheme = selectedTheme === "system";

    const StatusBarColor = getColorForTheme(
        {
          dark: "light-content",
          light: "dark-content",
        },
        selectedTheme,
        systemTheme
      );

    const keyboardTheme = getColorForTheme(
        { dark: "dark", light: "light" },
        selectedTheme,
        systemTheme
      );

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
      shadowColor: "gray", 
    },
    searchBarInput: {
      backgroundColor: "#fefffe",
      color: "#dddddd",
    },
    buttonGrid: {
    },
    squareButton: {
      backgroundColor: "#fefffe",
      shadowColor: "gray", 
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
    },
    squareButton: {
      backgroundColor: "#262626",
      shadowColor: "black", 
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
      transform: [{ rotate: 0  + "deg" }],
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
      fontFamily:"ScheherazadeNewBold",
    },
  });
  //#endregion

  //#region EnglishLanguage
  const EnglishLanguage = StyleSheet.create({
    button: {
      flexDirection:"row-reverse",
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
      transform: [{ rotate: 180  + "deg" }],
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
      fontFamily:"Montserrat",
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
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.TextMid : ArabicLanguage.TextMid )
    },
    buttonText: {
      ...HomeStyles.buttonText,
      ...(selectedTheme === "dark"
        ? themeStyles.buttonText
        : themeStyles.buttonText),
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.buttonText : ArabicLanguage.buttonText )
    },
    button: {
      ...HomeStyles.button,
      ...(selectedTheme === "dark" ? themeStyles.button : themeStyles.button), 
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.button : ArabicLanguage.button )
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
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.horizontalLine : ArabicLanguage.horizontalLine )
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
        ...(selectedLanguage != "Arabic" ? EnglishLanguage.squareButton : ArabicLanguage.squareButton )
    },
    buttonTextTop: {
      ...HomeStyles.buttonTextTop,
      ...(selectedTheme === "dark"
        ? themeStyles.buttonTextTop
        : themeStyles.buttonTextTop), 
        ...(selectedLanguage != "Arabic" ? EnglishLanguage.buttonTextTop : ArabicLanguage.buttonTextTop )
    },
    iconTop: {
      ...HomeStyles.iconTop,
      ...(selectedTheme === "dark" ? themeStyles.iconTop : themeStyles.iconTop), 
    },
    icon:{
      ...HomeStyles.icon,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.icon : ArabicLanguage.icon )
    },
    iconWrapperTop:{
      ...HomeStyles.iconWrapperTop,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.iconWrapperTop : ArabicLanguage.iconWrapperTop )
    },
    TextMidWrapper:{
      ...HomeStyles.TextMidWrapper,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.TextMidWrapper : ArabicLanguage.TextMidWrapper )
    },
  };
  //#endregion

  //#region Filtering top 4 displayed

  const desiredNames = selectedLanguage != "Arabic" ? 
  [   
  "Evening remembrance",
  "Morning remembrance",
  "After salam remembrance",
  "Befor sleeping remembrance",
  ]
  :
  [
    "أذكار المساء",
    "أذكار الصباح",
    "الأذكار بعد الصلاة",
    "أذكار النوم",
  ]

  const filteredItems = items.filter((item) =>
    desiredNames.includes(item.name)
  );

  const desiredOrderMap = {};
  desiredNames.forEach((name, index) => {
    desiredOrderMap[name] = index;
  });

  const sortedItems = filteredItems.slice().sort((a, b) => {
    const orderA = desiredOrderMap[a.name];
    const orderB = desiredOrderMap[b.name];
    return orderA - orderB;
  });
  //#endregion

  //#region Style baed on index
  const renderBorderRadius = (index, isSearchedItems) => {
    const itemCount = isSearchedItems ? searchedItems.length : items.length;

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

  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);

  //#endregion

  //#region search in items
  const handleSearch = (query) => {
    setSearchQuery(query);

    const normalizedQuery = query.toLowerCase().replace(/[أإِ]/g, "ا");

    // Filter items based on the normalized search query and normalized item names
    const filtered = items.filter((item) => {
      const normalizedItemName = item.name.toLowerCase().replace(/[أإِ]/g, "ا");
      return normalizedItemName.includes(normalizedQuery);
    });

    setSearchedItems(filtered);
  };

  const handleSearchBarClick = () => {
    setSearchMode(true);
  };

  const handleCancel = () => {
    setSearchQuery("");
    setSearchMode(false);
    setSearchedItems([]); // Clear filtered items when cancel button is clicked
  };
  //#endregion

  //#region SVG topItemIcons
  const topItemIcons = [
    {
      viewBox: "0 0 512 512",
      width: 40,
      height: 40,
      paths: [
        {
          d: "M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z",
        },
      ],

      cx: "0",
      cy: "0",
      r: "0",
    },
    {
      viewBox: "0 0 512 512",
      width: 40,
      height: 40,
      paths: [
        {
          d: "M340 480H106c-29.5 0-54.92-7.83-73.53-22.64C11.23 440.44 0 415.35 0 384.8c0-26.66 10.08-49.8 29.14-66.91 15.24-13.68 36.17-23.21 59-26.84.06 0 .08 0 .09-.05 6.44-39 23.83-72.09 50.31-95.68A140.24 140.24 0 01232 160c30.23 0 58.48 9.39 81.71 27.17a142.24 142.24 0 0142.19 53.21 16 16 0 0011.19 9c26 5.61 48.4 17.29 65.17 34C453 304.11 464 331.71 464 363.2c0 32.85-13.13 62.87-37 84.52-22.89 20.82-53.8 32.28-87 32.28zm19-232.18zM387.89 221.68a168.8 168.8 0 0134.76 14.71 4 4 0 005.82-2.44 97 97 0 003.53-26.68c-.39-52.43-43.48-95.22-95.91-95.27A95.46 95.46 0 00281 129.33h-.06a3.38 3.38 0 001 6 162.45 162.45 0 0151.28 26.4 173.92 173.92 0 0145.32 52.51 16 16 0 009.35 7.44zM496 224h-32a16 16 0 010-32h32a16 16 0 010 32zM336 96a16 16 0 01-16-16V48a16 16 0 0132 0v32a16 16 0 01-16 16zM245.49 133.49a15.92 15.92 0 01-11.31-4.69l-22.63-22.62a16 16 0 0122.63-22.63l22.62 22.63a16 16 0 01-11.31 27.31zM426.51 133.49a16 16 0 01-11.31-27.31l22.62-22.63a16 16 0 0122.63 22.63l-22.63 22.62a15.92 15.92 0 01-11.31 4.69z",
        },
      ],
      cx: "0",
      cy: "0",
      r: "0",
    },
    {
      viewBox: "0 3 60 60",
      width: 40,
      height: 40,
      paths: [
        {
          d: "M40.8,29.08c0.15-0.1,0.26-0.24,0.33-0.4l2.17-1.13c0.78-0.4,1.47-0.92,2.05-1.55c1.21-1.34,1.87-3.06,1.87-4.85  c0-0.45-0.03-0.87-0.11-1.27L46.96,19c-0.07-0.38-0.34-0.69-0.71-0.8c-0.37-0.1-0.77,0.01-1.02,0.3l-2.73,3.05  c-0.26-0.36-0.65-0.61-1.11-0.71c-0.78-0.15-1.54,0.18-1.95,0.86l-0.9,1.51c-0.02-0.02-0.05-0.02-0.07-0.03  c-0.28-0.08-0.58-0.02-0.82,0.15l-5.74,4.03l-0.97-5.11c-0.24-1.28-0.92-2.42-1.89-3.25c-1.14,0.62-2.44,0.98-3.83,0.98  c-2.14,0-4.07-0.85-5.51-2.21c-0.38,0.29-0.75,0.63-1.05,1.03c-1.51,2-2.35,4.49-2.35,7v14.74c0,2.55,1.2,4.9,3.13,6.43  c-0.33,0.15-0.64,0.37-0.89,0.66c-0.79,0.9-1.72,1.65-2.77,2.24l-2.21,1.25c-0.63,0.35-0.92,1.05-0.74,1.75  c0.18,0.69,0.78,1.15,1.5,1.15h27.42c2.49,0,4.53-2.03,4.53-4.53c0-1.59-0.85-3.08-2.23-3.9c-0.04-0.03-0.09-0.05-0.15-0.07  l-13.77-5.29v-3.65L40.8,29.08z",
        },
      ],
      cx: "25.22",
      cy: "11.98",
      r: "6",
    },
    {
      viewBox: "0 0 512  512",
      width: 40,
      height: 40,
      paths: [
        {
          d: "M432 230.7a79.44 79.44 0 00-32-6.7H112a79.51 79.51 0 00-32 6.69A80.09 80.09 0 0032 304v112a16 16 0 0032 0v-8a8.1 8.1 0 018-8h368a8.1 8.1 0 018 8v8a16 16 0 0032 0V304a80.09 80.09 0 00-48-73.3zM376 80H136a56 56 0 00-56 56v72a4 4 0 005.11 3.84A95.5 95.5 0 01112 208h4.23a4 4 0 004-3.55A32 32 0 01152 176h56a32 32 0 0131.8 28.45 4 4 0 004 3.55h24.46a4 4 0 004-3.55A32 32 0 01304 176h56a32 32 0 0131.8 28.45 4 4 0 004 3.55h4.2a95.51 95.51 0 0126.89 3.85A4 4 0 00432 208v-72a56 56 0 00-56-56z",
        },
      ],
      cx: "0",
      cy: "0",
      r: "0",
    },
  ];
  //#endregion

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.container}
        contentOffset={{ x: 0, y: 7 }}
      >
        <SearchBar
          placeholder={selectedLanguage != "Arabic" ? "Search..." : "بحث..."}
          onChangeText={handleSearch}
          value={searchQuery}
          platform="ios"
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={[
            styles.searchBarInputContainer,
            searchMode && styles.searchBarInputContainerTop, // Apply this style when searchMode is true
          ]}
          inputStyle={[
            styles.searchBarInput,
            { textAlign: selectedLanguage != "Arabic" ? "left" : "right"}, // Align the text to the right
          ]}
          onFocus={handleSearchBarClick}
          onCancel={handleCancel}
          showCancel
          
          cancelButtonTitle={selectedLanguage != "Arabic" ? "Cancel" : "الغاء"}
          keyboardAppearance={keyboardTheme}
          searchIcon={{ color: selectedColor }}
        />
        {searchMode ? (
          // Display search results when searchMode is true
          <>
            <View style={styles.containerSearchMode}>
              {searchedItems.map((item, index) => (
                <View key={item.name}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      renderBorderRadius(index, true), // Pass true for searchedItems
                      searchMode,
                    ]}
                    onPress={() =>
                      navigation.navigate("GenericPage", {
                        name: item.name,
                        item: item,
                        itemIndex: index,
                      })
                    }
                    activeOpacity={searchMode ? 1 : 0.7}
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
                      <Text style={styles.buttonText}>{item.name}</Text>
                    </View>
                    <View style={styles.imageWrapper}>
                      {/* Image component */}
                      <Image style={styles.image} />
                    </View>
                  </TouchableOpacity>
                  {index !== searchedItems.length - 1 && (
                    <View style={styles.horizontalLine} />
                  )}
                </View>
              ))}
            </View>
          </>
        ) : (
          // Display content when searchMode is false
          <>
            <View style={styles.buttonGrid}>
              {sortedItems.map((item, index) => (
                <TouchableOpacity
                  key={item.name}
                  style={[
                    styles.squareButton,
                    renderBorderRadius(index, false), // Pass false for items
                    searchMode,
                  ]}
                  onPress={() => {
                    // Find the actual index of the item in the items array
                    const actualIndex = items.findIndex(
                      (i) => i.name === item.name
                    );
                    navigation.navigate("GenericPage", {
                      name: item.name,
                      item: item,
                      itemIndex: actualIndex,
                    });
                  }}
                  activeOpacity={searchMode ? 1 : 0.7}
                >
                  <View style={styles.iconWrapperTop}>
                    <Svg
                      width={topItemIcons[index].width}
                      height={topItemIcons[index].height}
                      viewBox={topItemIcons[index].viewBox}
                    >
                      {topItemIcons[index].paths.map((pathData, pathIndex) => (
                        <Path
                          key={pathIndex}
                          d={pathData.d}
                          fill={selectedColor}
                          stroke={selectedColor} // Border color
                          strokeWidth={1} // Border width
                          stroke-linecap="round"
                        />
                      ))}
                      <Circle
                        cx={topItemIcons[index].cx}
                        cy={topItemIcons[index].cy}
                        r={topItemIcons[index].r}
                        fill={selectedColor}
                      />
                    </Svg>
                  </View>
                  <View style={styles.nameWrapper}>
                    <Text                       
                        numberOfLines={2}
                        ellipsizeMode="tail" 
                        allowFontScaling={false} 
                        style={styles.buttonTextTop}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.TextMidWrapper}>
              <Text style={styles.TextMid}>{selectedLanguage != "Arabic" ? "Catalogue" : "الفهرس"}</Text>
            </View>
            {items.map((item, index) => (
              <View key={item.name}>
                <TouchableOpacity
                  style={[styles.button, renderBorderRadius(index), searchMode]}
                  onPress={() =>
                    navigation.navigate("GenericPage", {
                      name: item.name,
                      item: item,
                      itemIndex: index,
                    })
                  }
                  activeOpacity={searchMode ? 1 : 0.7}
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
                    <Text                         
                        numberOfLines={2}
                        ellipsizeMode="tail" 
                        style={styles.buttonText}>
                            {item.name}</Text>
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
          </>
        )}
      </ScrollView>
      <StatusBar
        style="dark"
        translucent={true}
        barStyle={StatusBarColor}
        animated={true}
      />
    </View>
  );
};

export default HomeScreen;
