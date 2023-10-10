import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRandomVerseFromFile } from "../API/GETHadethArb";
import { handleShare } from "../utils/shareUtils";
import { useTheme } from '../context/ThemContex'; 
import { QuranVerseStyles } from '../context/commonStyles';
const CACHE_KEY = "randomHadithCache";
const CACHE_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

const HADITHVerseScreen = ({ navigation }) => {
  const { selectedTheme } = useTheme();
  
  //#region LightTheme
  const lightStyles = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6", 
    },
    rectangle: {
      backgroundColor: "#fefffe",
      shadowColor: "white",
    },
    title: {
      color: "#000",
    },
    horizontalLine: {
      borderColor: "#f2f2f6",
  },
  });
  //#endregion

  //#region DarkTheme
  const darkStyles = StyleSheet.create({
    container: {
      backgroundColor: "#151515", 
    },
    rectangle: {
      backgroundColor: "#262626",
      shadowColor: "black",
    },
    title: {
      color: "#fff",
    },
    horizontalLine: {
      borderColor: "#151515",
  },
  });
  //#endregion

  //#region StyleMapping
  const styles = {
    ...QuranVerseStyles,
    container: {
      ...QuranVerseStyles.container,
      ...selectedTheme === 'dark' ? darkStyles.container : lightStyles.container, 
    },
    rectangle: {
      ...QuranVerseStyles.rectangle, 
      ...selectedTheme === 'dark' ? darkStyles.rectangle : lightStyles.rectangle, 
    },
    title: {
      ...QuranVerseStyles.title, 
      ...selectedTheme  === 'dark'? darkStyles.title : lightStyles.title, 
    },
    horizontalLine: {
      ...QuranVerseStyles.horizontalLine,
      ...(selectedTheme === 'dark' ? darkStyles.horizontalLine : lightStyles.horizontalLine),
  },
  };
  //#endregion
  
  //#region
  const [HADITH, setHADITH] = useState("");
  const [REF, setREF] = useState("");
  const [verseTextLength, setVerseTextLength] = useState(0);
  const [maxFontSizeDescription, setMaxFontSizeDescription] = useState(20);
  const [maxPadding, setMaxPadding] = useState(60);
  const [maxpaddingHorizontal, setMaxpaddingHorizontal] = useState(20);
  const viewRef = React.useRef();
  //#endregion

  const Share = async () => {
    await handleShare(viewRef.current);
  };

  //#region getCachedHadith
  useEffect(() => {
    // Check if cached verse exists and if it's not expired
    async function getCachedVerseHadith() {
      try {
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const {
            HADITH: cachedHADITH,
            REF: cachedREF,
            timestamp,
          } = parsedData;
          const currentTime = new Date().getTime();
          if (currentTime - timestamp <= CACHE_EXPIRATION_TIME) {
            // Use the cached verse if it's not expired
            setHADITH(cachedHADITH);
            setREF(cachedREF);
            // Calculate the length of the cached verse text and control styles
            const length = cachedHADITH.length;
            setVerseTextLength(length);
            controlStyle(length);
            return;
          }
        }
        // Fetch a new random verse if no cached verse or it's expired
        getRandomVerse();
      } catch (error) {
        console.error("Error getting cached verse:", error);
        // Fetch a new random verse if there's an error with AsyncStorage
        getRandomVerse();
      }
    }
    getCachedVerseHadith();
  }, []);
  //#endregion

  //#region getRandomVerse
  const getRandomVerse = async () => {
    try {
      const {
        HADITH: fetchedHADITH,
        REF: cachedREF,
      } = await fetchRandomVerseFromFile();
      // Set the fetched verse and related information in the component state
      setHADITH(fetchedHADITH);
      setREF(cachedREF);
      // Calculate the length of the fetched verse text and control styles
      const length = fetchedHADITH.length;
      setVerseTextLength(length);
      controlStyle(length);
      // Cache the fetched verse and related information along with the current timestamp
      const currentTime = new Date().getTime();
      const dataToCache = JSON.stringify({
        HADITH: fetchedHADITH,
        REF: cachedREF,
        timestamp: currentTime,
      });
      await AsyncStorage.setItem(CACHE_KEY, dataToCache);
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error fetching random verse:", error);
    }
  };
  //#endregion

  //#region DisplayViewStyle base on character length
  const controlStyle = (verseTextLength) => {
    let MaxFontSize = 20;
    let maxPadding = 30;
    let maxpaddingHorizontal = 20;

    if (verseTextLength > 1200) {
      MaxFontSize = 16;
      maxPadding = 20;
      maxpaddingHorizontal = 10;
    } else if (verseTextLength < 100) {
      MaxFontSize = 27;
      maxPadding = 20;
      maxpaddingHorizontal = 20;
    }
    setMaxFontSizeDescription(MaxFontSize);
    setMaxPadding(maxPadding);
    setMaxpaddingHorizontal(maxpaddingHorizontal);
  };

  const textStyle = {
    fontSize: maxFontSizeDescription,
    padding: maxPadding,
    paddingHorizontal: maxpaddingHorizontal,
  };
  //#endregion
  
  return (
    <View ref={viewRef} style={styles.container}>
      <View style={[styles.rectangle, textStyle]}>
      <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          >
          <Text style={[styles.title, textStyle]}>{HADITH}</Text>
          <View style={styles.horizontalLine} />
          <Text style={styles.description}>{REF}</Text>
      </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("Menu")}
          style={styles.shareButton}
        ></TouchableOpacity>
        <TouchableOpacity onPress={Share} style={styles.shareButton}>
          <View style={styles.dotContainer}>
            <Text style={styles.dot}>&#8226;</Text>
            <Text style={styles.dot}>&#8226;</Text>
            <Text style={styles.dot}>&#8226;</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default HADITHVerseScreen;
