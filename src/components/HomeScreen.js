import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { SearchBar } from 'react-native-elements';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { getItems } from "../db/GetData";
import { HomeStyles } from '../context/commonStyles';
import { useTheme } from '../context/ThemContex';



const HomeScreen = ({ navigation }) => {
  const items = getItems();

  const { isDarkMode } = useTheme();
  const StatusBarColor = isDarkMode
    ? "light-content"
    : "dark-content";
  //#region LightTheme
  const lightStyles = StyleSheet.create({
    pageContainer: {
      backgroundColor: "#f2f2f6", // Background color for the entire page
    },
    container: {
      backgroundColor: "#f2f2f6",
    },
    TextMid: {
      color: '#000',
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
      backgroundColor: '#fefffe',
      shadowColor: "white",
    },
    searchBarInput: {
      backgroundColor: '#fefffe',
      color: '#dddddd'
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
  //#endregion
  //#region DarkTheme
  const darkStyles = StyleSheet.create({
    pageContainer: {
      backgroundColor: "#151515", // Background color for the entire page
    },
    container: {
      backgroundColor: "#151515",
    },
    TextMid: {
      color: '#fff',
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
      backgroundColor: '#262626',
      shadowColor: "black",
    },
    searchBarInput: {
      backgroundColor: '#262626',
      color: '#dddddd'
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
  //#endregion
  //#region Styles
  const styles = {
    ...HomeStyles,
    pageContainer: {
      ...HomeStyles.pageContainer,
      ...isDarkMode ? darkStyles.pageContainer : lightStyles.pageContainer, // Override container background color
    },
    container: {
      ...HomeStyles.container,
      ...isDarkMode ? darkStyles.container : lightStyles.container, // Override container background color
    },
    TextMid: {
      ...HomeStyles.TextMid,
      ...isDarkMode ? darkStyles.TextMid : lightStyles.TextMid, // Override container background color
    },
    buttonText: {
      ...HomeStyles.buttonText, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.buttonText : lightStyles.buttonText, // Override button background color
    },
    button: {
      ...HomeStyles.button, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.button : lightStyles.button, // Override button background color
    },
    iconWrapper: {
      ...HomeStyles.iconWrapper, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.iconWrapper : lightStyles.iconWrapper, // Override button background color
    },
    horizontalLine: {
      ...HomeStyles.horizontalLine, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.horizontalLine : lightStyles.horizontalLine, // Override button background color
    },
    containerSearchMode: {
      ...HomeStyles.containerSearchMode, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.containerSearchMode : lightStyles.containerSearchMode, // Override button background color
    },
    searchBarContainer: {
      ...HomeStyles.horizonsearchBarContainertalLine, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.searchBarContainer : lightStyles.searchBarContainer, // Override button background color
    },
    searchBarInputContainer: {
      ...HomeStyles.searchBarInputContainer, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.searchBarInputContainer : lightStyles.searchBarInputContainer, // Override button background color
    },
    searchBarInput: {
      ...HomeStyles.searchBarInput, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.searchBarInput : lightStyles.searchBarInput, // Override button background color
    },
    buttonGrid: {
      ...HomeStyles.buttonGrid, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.buttonGrid : lightStyles.buttonGrid, // Override button background color
    },
    squareButton: {
      ...HomeStyles.squareButton, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.squareButton : lightStyles.squareButton, // Override button background color
    },
    buttonTextTop: {
      ...HomeStyles.buttonTextTop, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.buttonTextTop : lightStyles.buttonTextTop, // Override button background color
    },
    iconTop: {
      ...HomeStyles.iconTop, // Apply all styles from HomeStyles.button
      ...isDarkMode ? darkStyles.iconTop : lightStyles.iconTop, // Override button background color
    },
  };
  //#endregion
  //#region  

  const desiredNames = [
    "أذكار المساء",
    "أذكار الصباح",
    "الأذكار بعد الصلاة",
    "أذكار النوم",
  ];
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

  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Replace "أ" and "إِ" with "ا" in the query
    const normalizedQuery = query.replace(/[أإِ]/g, 'ا');

    // Filter items based on the normalized search query and normalized item names
    const filtered = items.filter((item) => {
      const normalizedItemName = item.name.replace(/[أإِ]/g, 'ا');
      return normalizedItemName.includes(normalizedQuery);
    });

    setSearchedItems(filtered); // Update the searched items state
  };

  const handleSearchBarClick = () => {
    setSearchMode(true);
  };

  const handleCancel = () => {
    setSearchQuery('');
    setSearchMode(false);
    setSearchedItems([]); // Clear filtered items when cancel button is clicked
  };

//#endregion

  const topItemIcons = ["moon", "partly-sunny", "notifications", "bed"];

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.container}
        contentOffset={{ x: 0, y: 100 }}
      >
        <SearchBar
          placeholder="بحث..."
          onChangeText={handleSearch}
          value={searchQuery}
          platform="ios"
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={[
            styles.searchBarInputContainer,
            searchMode && styles.searchBarInputContainerTop, // Apply this style when searchMode is true
          ]}
          inputStyle={styles.searchBarInput}
          onFocus={handleSearchBarClick}
          onCancel={handleCancel}
          showCancel
          cancelButtonTitle="الغاء"
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
                      searchMode
                    ]}
                    onPress={() =>
                      navigation.navigate("GenericPage", {
                        name: item.name,
                        item: item,
                        itemIndex:index,
                      })
                    }
                    activeOpacity={searchMode ? 1 : 0.7}
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
                    searchMode
                  ]}
                  onPress={() => {
                      // Find the actual index of the item in the items array
                      const actualIndex = items.findIndex((i) => i.name === item.name);
                      navigation.navigate("GenericPage", {
                        name: item.name,
                        item: item,
                        itemIndex: actualIndex,
                      });
                    }}
                    activeOpacity={searchMode ? 1 : 0.7}
                  >
                  <View style={styles.iconWrapperTop}>
                    <Ionicons
                      name={topItemIcons[index]}
                      size={35}
                      style={styles.iconTop}
                    />
                  </View>
                  <View style={styles.nameWrapper}>
                    <Text style={styles.buttonTextTop}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.TextMidWrapper}>
              <Text style={styles.TextMid}>الفهرس</Text>
            </View>
            {items.map((item, index) => (
              <View key={item.name}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    renderBorderRadius(index),
                    searchMode
                  ]}
                  onPress={() =>
                    navigation.navigate("GenericPage", {
                      name: item.name,
                      item: item,
                      itemIndex:index,
                    })
                  }
                  activeOpacity={searchMode ? 1 : 0.7}
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
                    <Text style={styles.buttonText}>{item.name}</Text>
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

}



export default HomeScreen;
