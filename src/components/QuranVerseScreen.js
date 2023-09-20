import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { fetchRandomVerse } from "../components/API/GETAyahofQuran";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuranVerseScreen = ({ navigation }) => {
  const [verse, setVerse] = useState("");
  const [lastFetchTime, setLastFetchTime] = useState(null);

  useEffect(() => {
    // Load the last fetch time from AsyncStorage
    loadLastFetchTime();

    // Check if it's been 8 hours since the last fetch
    const eightHoursInMilliseconds = 8 * 60 * 60 * 1000;
    if (!lastFetchTime || Date.now() - lastFetchTime >= eightHoursInMilliseconds) {
      getRandomVerse();
    }
  }, []);

  const getRandomVerse = async () => {
    try {
      const fetchedVerse = await fetchRandomVerse();
      setVerse(fetchedVerse);

      // Store the current time as the last fetch time
      const currentTime = Date.now();
      setLastFetchTime(currentTime);
      // Save the last fetch time to AsyncStorage
      saveLastFetchTime(currentTime);
    } catch (error) {
      console.error("Error fetching random verse:", error);
    }
  };

  const loadLastFetchTime = async () => {
    try {
      const storedTime = await AsyncStorage.getItem("lastFetchTime");
      if (storedTime) {
        setLastFetchTime(parseInt(storedTime));
      }
    } catch (error) {
      console.error("Error loading last fetch time from AsyncStorage:", error);
    }
  };

  const saveLastFetchTime = async (time) => {
    try {
      await AsyncStorage.setItem("lastFetchTime", time.toString());
    } catch (error) {
      console.error("Error saving last fetch time to AsyncStorage:", error);
    }
  };

  return (
    <View>
      {/* Navigation bar */}
      {/* Add your navigation bar here */}
      <Text>{verse}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
        {/* Add any button or navigation component you need */}
      </TouchableOpacity>
    </View>
  );
};

export default QuranVerseScreen;
