import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRandomVerse } from "../API/GETAyahofQuran";
import { handleShare } from "../utils/shareUtils";
import { useTheme } from '../context/ThemContex'; 
import { QuranVerseStyles } from '../context/commonStyles';

const CACHE_KEY = "randomVerseCache";
const CACHE_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

const QuranVerseScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();

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
      ...isDarkMode ? darkStyles.container : lightStyles.container, 
    },
    rectangle: {
      ...QuranVerseStyles.rectangle, 
      ...isDarkMode ? darkStyles.rectangle : lightStyles.rectangle, 
    },
    title: {
      ...QuranVerseStyles.title, 
      ...isDarkMode ? darkStyles.title : lightStyles.title, 
    },
    horizontalLine: {
      ...QuranVerseStyles.horizontalLine,
      ...(isDarkMode ? darkStyles.horizontalLine : lightStyles.horizontalLine),
  },
  };
  //#endregion
  
  //#region
  const [verseText, setVerse] = useState("");
  const [surahName, setSurahName] = useState("");
  const [ayahNumber, setAyahNumber] = useState("");
  const [tafsir, setTafsir] = useState("");
  const [verseTextLength, setVerseTextLength] = useState(0);
  const [maxFontSizeDescription, setMaxFontSizeDescription] = useState(20);
  const [maxPadding, setMaxPadding] = useState(60);
  const [maxpaddingHorizontal, setMaxpaddingHorizontal] = useState(20);

  const viewRef = React.useRef();
  //#endregion
  
  const Share = async () => {
    await handleShare(viewRef.current);
  };

  //#region getCachedVerse
  useEffect(() => {
    // Check if cached verse exists and if it's not expired
    async function getCachedVerse() {
      try {
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const {
            verseText: cachedVerse,
            surahName: cachedSurahName,
            ayahNumber: cachedAyahNumber,
            tafsirText: cachedTafsir,
            timestamp,
          } = parsedData;
          const currentTime = new Date().getTime();
          if (currentTime - timestamp <= CACHE_EXPIRATION_TIME) {
            // Use the cached verse if it's not expired
            setVerse(cachedVerse);
            setSurahName(cachedSurahName);
            setAyahNumber(cachedAyahNumber);
            setTafsir(cachedTafsir);
            // Calculate the length of the cached verse text and control styles
            const length = cachedVerse.length;
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
    getCachedVerse();
  }, []);
  //#endregion

  //#region getRandomVerse
  const getRandomVerse = async () => {
    try {
      const {
        verseText: fetchedVerse,
        surahName: fetchedSurahName,
        ayahNumber: fetchedAyahNumber,
        tafsirText: fetchedTafsir,
      } = await fetchRandomVerse();
      // Set the fetched verse and related information in the component state
      setVerse(fetchedVerse);
      setSurahName(fetchedSurahName);
      setAyahNumber(fetchedAyahNumber);
      setTafsir(fetchedTafsir);
      // Calculate the length of the fetched verse text and control styles
      const length = fetchedVerse.length;
      setVerseTextLength(length);
      controlStyle(length);
      // Cache the fetched verse and related information along with the current timestamp
      const currentTime = new Date().getTime();
      const dataToCache = JSON.stringify({
        verseText: fetchedVerse,
        surahName: fetchedSurahName,
        ayahNumber: fetchedAyahNumber,
        tafsirText: fetchedTafsir,
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
        <Text style={[styles.title, textStyle]}>
          {verseText} ﴿ {ayahNumber} ﴾
        </Text>
        <View style={styles.horizontalLine} />
        <Text style={styles.tafsirStyle}>{tafsir}</Text>
        <Text style={styles.description}>{surahName}</Text>
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


export default QuranVerseScreen;
