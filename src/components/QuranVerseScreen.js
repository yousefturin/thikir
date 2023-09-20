import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { fetchRandomVerse } from "../components/API/GETAyahofQuran";


const CACHE_KEY = "randomVerseCache";
const CACHE_EXPIRATION_TIME = 8 * 60 * 60 * 1000;

const QuranVerseScreen = ({ navigation }) => {
  const [verseText, setVerse] = useState("");
  const [surahName, setSurahName] = useState("");
  const [ayahNumber, setAyahNumber] = useState("");

  useEffect(() => {
    // Check if cached verse exists and if it's not expired
    async function getCachedVerse() {
      try {
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const { verseText: cachedVerse, surahName: cachedSurahName, ayahNumber: cachedAyahNumber, timestamp } = parsedData;
          const currentTime = new Date().getTime();
          if (currentTime - timestamp <= CACHE_EXPIRATION_TIME) {
            // Use the cached verse if it's not expired
            setVerse(cachedVerse);
            setSurahName(cachedSurahName);
            setAyahNumber(cachedAyahNumber);
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

  const getRandomVerse = async () => {
    try {
      const { verseText: fetchedVerse, surahName: fetchedSurahName, ayahNumber: fetchedAyahNumber } = await fetchRandomVerse();
      // Set the fetched verse and related information in the component state
      setVerse(fetchedVerse);
      setSurahName(fetchedSurahName);
      setAyahNumber(fetchedAyahNumber);
      // Cache the fetched verse and related information along with the current timestamp
      const currentTime = new Date().getTime();
      const dataToCache = JSON.stringify({ verseText: fetchedVerse, surahName: fetchedSurahName, ayahNumber: fetchedAyahNumber, timestamp: currentTime });
      await AsyncStorage.setItem(CACHE_KEY, dataToCache);
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error fetching random verse:", error);
    }
  };

  return (
    <View style={styles.container}>
 
      {/* Navigation bar */}
      {/* Add your navigation bar here */}
      <Text style={styles.buttonText}>{surahName}</Text>
      <Text style={styles.buttonText}>{ayahNumber}</Text>
      <Text style={styles.buttonText}>{verseText}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
        {/* Add any button or navigation component you need */}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 80,
    paddingTop: 30,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "300",
    textAlign: "right",
    marginRight: 20,
    fontFamily: "ScheherazadeNewBold",
  },
});

export default QuranVerseScreen;

