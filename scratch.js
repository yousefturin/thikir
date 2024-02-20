import React, { useState, useEffect } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useTheme } from "../context/ThemContex";
import { useLanguage } from "../context/LanguageContext";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { fetchPrayerTimes } from '../API/GETAzanTime';

// Create a singleton object to manage location
const locationSingleton = {
  location: null,  
  
  async getLocation() {
    console.log("I am starting the Singleton case")
    if (!this.location) {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        const { coords } = await Location.getCurrentPositionAsync({});
        this.location = coords;
        console.log("I am starting the Singleton case but leaving")
      } catch (error) {
        console.error("Error getting location", error);
      }
    }
    return this.location;
  }
};

const AzanScreen = () => {

  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [storedTimings, setStoredTimings] = useState(null);


  useEffect(() => {
    const fetchPrayerTimesIfNeeded = async () => {
      try {
        // Fetch location using Singleton
        const coords = await locationSingleton.getLocation();
        if (!coords) return;
  
        const { latitude, longitude } = coords;
        console.log("The obtained Location array data:",latitude, longitude)
        // Save location if not already stored
        const storedLocation = await AsyncStorage.getItem("storedLocation");
        console.log("do location needs to be saved?")
        console.log("The stored Location array data:",storedLocation)
        if (!storedLocation) {
          console.log("yes location is being saved, no stored location was found")
          await saveLocation(latitude, longitude);
        }
        console.log("location was found from storage")
        // Fetch stored date
        
        const storedDate = await AsyncStorage.getItem("storedDate");
        console.log("do date needs to be stored?")
        console.log("The stored Date array data:",storedDate)
        if (!storedDate) {
          console.log("yes date is being saved, no stored date was found")
          await saveDate();
        } else {
          console.log("location was found from storage")
          const { day: storedDay, month: storedMonth, year: storedYear } = JSON.parse(storedDate);
          console.log("=============================================")
          console.log("the stored day:",storedDay)
          console.log("the stored month:",storedMonth)
          console.log("the stored year:",storedYear)
        }
  
        // Check if API call needs to be made
        const { latitude: storedLatitude, longitude: storedLongitude } = JSON.parse(storedLocation);
        const { day: storedDay, month: storedMonth, year: storedYear } = JSON.parse(storedDate);
        console.log("do i need to call api ?")


        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const roundedLatitude = parseFloat(latitude.toFixed(2));
        const roundedLongitude = parseFloat(longitude.toFixed(2));
        const roundedStoredLatitude = parseFloat(storedLatitude.toFixed(2));
        const roundedStoredLongitude = parseFloat(storedLongitude.toFixed(2));

        setDay(currentDay);
        setMonth(currentMonth);
        setYear(currentYear);

        console.log("the stored latitude:",roundedStoredLatitude)
        console.log("the stored longitude:",roundedStoredLongitude)
        console.log("the obtained latitude:",roundedLatitude)
        console.log("the obtained longitude:",roundedLongitude)
        console.log("=============================================")

        console.log("the obtained day :",currentDay)
        console.log("the obtained month :",currentMonth)
        console.log("the obtained year :",currentYear)
        console.log("the stored day:",storedDay)
        console.log("the stored month will be stored as :",storedMonth)
        console.log("the stored year will be stored as :",storedYear)
        


        if (
          roundedLatitude !== roundedStoredLatitude || 
          roundedLongitude !== roundedStoredLongitude || 
          currentMonth !== storedMonth || 
          currentYear !== storedYear
        ) {
          console.log("yes the values are not the same api call is needed")
          await fetchAndSetPrayerTimes(storedMonth, storedYear, latitude, longitude, currentDay);

        } else {
          console.log("no the values are the same api call is not needed")

          await filterAndSetStoredTimings(storedMonth, storedYear, currentDay);
        }
      } catch (error) {
        console.error("Error fetching prayer times", error);
      }
    };
  
    fetchPrayerTimesIfNeeded();
  
    // Cleanup function
    return () => {
      // Perform any cleanup if needed
    };
  }, []);
  
  const saveLocation = async (latitude, longitude) => {
    try {
      console.log(latitude, longitude)
      await AsyncStorage.setItem(
        "storedLocation",
        JSON.stringify({ latitude, longitude })
      );
    } catch (error) {
      console.error("Error saving location", error);
    }
  };
  
  const saveDate = async () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    try {
      await AsyncStorage.setItem(
        "storedDate",
        JSON.stringify({
          day: currentDay,
          month: currentMonth,
          year: currentYear,
        })
      );
      setDay(currentDay);
      setMonth(currentMonth);
      setYear(currentYear);
      console.log("the current day will be stored as :",currentDate)
      console.log("the current month will be stored as :",currentMonth)
      console.log("the current year will be stored as :",currentYear)
    } catch (error) {
      console.error("Error saving date", error);
    }
  };
  
  const fetchAndSetPrayerTimes = async (storedMonth, storedYear, latitude, longitude, currentDay) => {
    try {
      console.log(storedMonth, storedYear, latitude, longitude)
      await fetchPrayerTimes(storedMonth, storedYear, latitude, longitude);
      await filterAndSetStoredTimings(storedMonth, storedYear, currentDay);
    } catch (error) {
      console.error("Error fetching and setting prayer times", error);
    }
  };
  
  const filterAndSetStoredTimings = async (storedMonth, storedYear, currentDay) => {
    try {
      // Retrieve and parse data from AsyncStorage
      const jsonData = await AsyncStorage.getItem('prayer_times');
      const parsedData = JSON.parse(jsonData);
      const data = parsedData.data;

  
      // Filter data based on stored date
      if (Array.isArray(data)) {
        console.log("The filtered day :",currentDay)
        console.log("The filtered month:",storedMonth)
        console.log("The filtered year:",storedYear)
        const paddedStoredDay = String(currentDay).padStart(2, '0');
        const paddedStoredMonth = String(storedMonth).padStart(2, '0');
        const formattedDate = `${paddedStoredDay}-${paddedStoredMonth}-${storedYear}`;
        const prayerTimes = data.filter(entry => entry.date.gregorian.date === formattedDate);
        if (prayerTimes.length > 0) {
          const newPrayerTimes = prayerTimes[0].timings;
          console.log("The data for today is:",newPrayerTimes)
          setStoredTimings(newPrayerTimes);
          await AsyncStorage.setItem('prayer_times_of_day', JSON.stringify(newPrayerTimes));
          console.log("Stored timings set successfully:", newPrayerTimes);
        } else {
          console.log("No prayer times found for stored date");
        } 
      } else {
        console.log("Error: Data is not in the expected format");
      }
    } catch (error) {
      console.error("Error filtering and setting stored timings", error);
    }
  };
  

  return (
    <View style={[{ justifyContent: "center", alignItems: "center", flex: 1 }]}>
      <Text style={[{ fontFamily: "MontserratBold", fontSize: 42, color: "#fff" }]}>
        {day && month && year ? `${day}-${month}-${year}` : "Loading..."}{" "}
        { locationSingleton.location ? 
          `Lat: ${locationSingleton.location.latitude}, Long: ${locationSingleton.location.longitude}` 
          : "Location not available"
        }
      </Text>
      <Text style={[{ fontFamily: "MontserratBold", fontSize: 42, color: "#fff" }]}>Stored Prayer Timings:</Text>
      {storedTimings ? (
        Object.entries(storedTimings).map(([prayer, time]) => (
          <View key={prayer}>
            <Text style={[{ fontFamily: "MontserratBold", fontSize: 42, color: "#fff" }]}>
              {prayer}: {time}
            </Text>
          </View>
        ))
      ) : (
        <Text style={[{ fontFamily: "MontserratBold", fontSize: 42, color: "#fff" }]}>No stored timings available</Text>
      )}
    </View>
  );
};

export default AzanScreen;
