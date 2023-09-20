import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRandomVerse } from "../components/API/GETAyahofQuran";
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
const CACHE_KEY = "randomVerseCache";
const CACHE_EXPIRATION_TIME = 8*60*60*1000;

const QuranVerseScreen = ({ navigation }) => {
  const [verseText, setVerse] = useState("");
  const [surahName, setSurahName] = useState("");
  const [ayahNumber, setAyahNumber] = useState("");
  const [verseTextLength, setVerseTextLength] = useState(0);
  const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(150);
  const [maxFontSizeDescription, setMaxFontSizeDescription] = useState(20);
  const [maxPadding, setMaxPadding] = useState(60);
  const [maxpaddingHorizontal, setMaxpaddingHorizontal] = useState(20);

  const handleShare = async () => {
    try {
      // Capture the content of the component as an image
      const uri = await captureRef(viewRef, {
        format: 'png', // or 'jpeg'
        quality: 1.0,
      });

      // Share the captured image
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png', // or 'image/jpeg'
        dialogTitle: 'Share this image',
        UTI: 'public.png', // On iOS, specify the Universal Type Identifier (UTI)
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  let viewRef = React.createRef();
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

  const getRandomVerse = async () => {
    try {
      const { verseText: fetchedVerse, surahName: fetchedSurahName, ayahNumber: fetchedAyahNumber } = await fetchRandomVerse();
      // Set the fetched verse and related information in the component state
      setVerse(fetchedVerse);
      setSurahName(fetchedSurahName);
      setAyahNumber(fetchedAyahNumber);
      // Calculate the length of the fetched verse text and control styles
      const length = fetchedVerse.length;
      setVerseTextLength(length);
      controlStyle(length);
      // Cache the fetched verse and related information along with the current timestamp
      const currentTime = new Date().getTime();
      const dataToCache = JSON.stringify({ verseText: fetchedVerse, surahName: fetchedSurahName, ayahNumber: fetchedAyahNumber, timestamp: currentTime });
      await AsyncStorage.setItem(CACHE_KEY, dataToCache);
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error fetching random verse:", error);
    }
  };

  // Define the controlStyle function
  const controlStyle = (verseTextLength) => {
    // Your style control logic here
    // Example code:
    let maxHeight = 550;
    let MaxFontSize = 20;
    let maxPadding = 40;
    let maxpaddingHorizontal = 20;

    if (verseTextLength > 1200) {
      maxHeight = 450;
      MaxFontSize = 16;
      maxPadding = 30;
      maxpaddingHorizontal = 10;
    }
    else if (verseTextLength < 100){
      maxHeight = 650;
      MaxFontSize = 27;
      maxPadding = 30;
      maxpaddingHorizontal = 20;
    }


    // Update state variables with calculated values
    setMaxDescriptionHeight(maxHeight);
    setMaxFontSizeDescription(MaxFontSize);
    setMaxPadding(maxPadding);
    setMaxpaddingHorizontal(maxpaddingHorizontal);
  };

  // You can use the calculated styles in your Text component
  const textStyle = {
    fontSize: maxFontSizeDescription,
    maxHeight: maxDescriptionHeight,
    padding: maxPadding,
    paddingHorizontal: maxpaddingHorizontal,
  };

  return (
    <View ref={viewRef} style={styles.container}>
      <View style={[styles.rectangle, textStyle]}>
        <Text style={[styles.title, textStyle]}>
          {verseText} ﴿ {ayahNumber} ﴾
        </Text>
        <Text style={styles.description}>{surahName}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.shareButton}>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#151515',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
    
  },
  rectangle: {
    backgroundColor: '#262626',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '90%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'ScheherazadeNew',
  },
  description: {
    fontSize: 11,
    textAlign: 'center',
    color: '#767676',
    fontFamily: 'AmiriFont',
  },
  shareButton: {
    position: 'absolute',
    top: 10, // Adjust the top value to position the button as desired
    left: 10, // Adjust the left value to position the button as desired
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    color: 'orange',
    fontSize: 15,
    fontWeight:'700',
    marginHorizontal: 1, // Adjust the margin to control spacing between dots
  },
});

export default QuranVerseScreen;

