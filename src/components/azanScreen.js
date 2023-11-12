import React, { useState, useEffect } from "react";
import { Image,
          View,
          Text,
          StyleSheet,
           } from "react-native";
import * as Location from 'expo-location';
import { useTheme } from "../context/ThemContex";
import { useLanguage } from "../context/LanguageContext";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";




const AzanScreen = () => {
    const [location, setLocation] = useState(null);
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);

    const saveLocation = async (latitude, longitude) => {
        try {
          await AsyncStorage.setItem('storedLocation', JSON.stringify({ latitude, longitude }));
        } catch (error) {
          console.error('Error saving location', error);
        }
      };

      const saveDate = async () => {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
        const currentYear = currentDate.getFullYear();
    
        try {
          // Save the day, month, and year to AsyncStorage
          await AsyncStorage.setItem('storedDate', JSON.stringify({ day: currentDay, month: currentMonth, year: currentYear }));
          setDay(currentDay);
          setMonth(currentMonth);
          setYear(currentYear);
        } catch (error) {
          console.error('Error saving date', error);
        }
      };
      
      const getLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
          }
      
          const { coords } = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = coords;
    
      
          // Check if the stored location is equal to the new one
          const storedLocation = await AsyncStorage.getItem('storedLocation');
          
          if (storedLocation) {
            const { storedLatitude, storedLongitude } = JSON.parse(storedLocation);
            if (latitude !== storedLatitude || longitude !== storedLongitude) {
              // If the new location is different from the stored location, update it
              saveLocation(latitude, longitude);
            }
          } else {
            saveDate();
            saveLocation(latitude, longitude);
          }
      
          setLocation({ latitude, longitude });
        //   calculateQiblaDirection(latitude, longitude);
        } catch (error) {
          console.error('Error getting location', error);
        }
      };
      
      useEffect(() => {
        getLocation();
        // Set up a location listener to update the location when it changes
        const locationListener = Location.watchPositionAsync(
          { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 5000 }, // Adjust the options as needed
          async (location) => {
            const { coords } = location;
            const { latitude, longitude } = coords;
      
            // Check if the new location is different from the stored location
            const storedLocation = await AsyncStorage.getItem('storedLocation');
            if (storedLocation) {
              const { storedLatitude, storedLongitude } = JSON.parse(storedLocation);
              if (latitude !== storedLatitude || longitude !== storedLongitude) {
                // If the new location is different from the stored location, update it
                saveLocation(latitude, longitude);
              }
            } else {
              // If there's no stored location, store the current location
              saveLocation(latitude, longitude);
            }
      
            setLocation({ latitude, longitude });
            saveDate();
          }
        );
      
        return () => {
          if (locationListener.remove) {
            locationListener.remove();
          }
        };
      }, []);
      return(
        <View style={[{justifyContent:"center",alignItems:"center",flex:1}]}>
          <Text style={[{fontFamily:"MontserratBold",fontSize:42,color:"#fff"}]} >Coming Soon</Text>
        </View>
      );
 };

export default AzanScreen;