import React, { useState, useEffect } from "react";
import { Image,
          View,
          Text,
          StyleSheet,
           } from "react-native";
import { Magnetometer } from "expo-sensors";
import * as Location from 'expo-location';
import { useTheme } from "../context/ThemContex";
import { useLanguage } from "../context/LanguageContext";
import { QablaScreenStyle } from "../Styles/commonStyles";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const QiblaScreen = () => {
  const [location, setLocation] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [loadingDots, setLoadingDots] = useState('.');
  const [subscription, setSubscription] = useState(null);
  const [magnetometerData, setMagnetometerData] = useState([]);
  const [movingAverage, setMovingAverage] = useState(0);



  const { selectedTheme } = useTheme();
  const { selectedLanguage } = useLanguage();
  const systemTheme = selectedTheme === "system";

  const CompassTheme = systemTheme
    ? Appearance.getColorScheme() === 'dark'
      ? require("../../assets/Images/compass.png")
      : require("../../assets/Images/compassLightTheme.png")
    : selectedTheme === 'dark'
      ? require("../../assets/Images/compass.png")
      : require("../../assets/Images/compassLightTheme.png");

  const CompassPointerTheme = systemTheme
    ? Appearance.getColorScheme() === 'dark'
      ? require("../../assets/Images/compassQablePointerDark.png")
      : require("../../assets/Images/compassQablePointerLight.png")
    : selectedTheme === 'dark'
      ? require("../../assets/Images/compassQablePointerDark.png")
      : require("../../assets/Images/compassQablePointerLight.png");

  //#region LightTheme
  const lightTheme = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6",
    },
    degreeText: {
      color: '#363f3f',
    },
  });
  //#endregion

  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    container: {
      backgroundColor: "#151515",
    },
    degreeText: {
      color: '#fff',
    },
  });
  //#endregion

  const themeStyles = systemTheme
    ? Appearance.getColorScheme() === "dark"
      ? darkTheme
      : lightTheme
    : selectedTheme === "dark"
      ? darkTheme
      : lightTheme;


  //#region StylesMapping
  const styles = {
    ...QablaScreenStyle,
    degreeText: {
      ...QablaScreenStyle.degreeText,
      ...(selectedTheme === "dark"
        ? themeStyles.degreeText
        : themeStyles.degreeText),
    },
    container: {
      ...QablaScreenStyle.container,
      ...(selectedTheme === "dark"
        ? themeStyles.container
        : themeStyles.container),
    },
  };
  //#endregion


  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const saveLocation = async (latitude, longitude) => {
    try {
      await AsyncStorage.setItem('storedLocation', JSON.stringify({ latitude, longitude }));
    } catch (error) {
      console.error('Error saving location', error);
    }
  };
  
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
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
        // If there's no stored location, store the current location
        saveLocation(latitude, longitude);
      }
  
      setLocation({ latitude, longitude });
      calculateQiblaDirection(latitude, longitude);
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
        calculateQiblaDirection(latitude, longitude);
      }
    );
  
    return () => {
      if (locationListener.remove) {
        locationListener.remove();
      }
    };
  }, []);

  const calculateQiblaDirection = (currentLatitude, currentLongitude) => {
    const destLatitude = 21.4225; // Destination latitude
    const destLongitude = 39.8262; // Destination longitude

    currentLatitude = degreesToRadians(currentLatitude);
    currentLongitude = degreesToRadians(currentLongitude);
    const destLat = degreesToRadians(destLatitude);
    const destLon = degreesToRadians(destLongitude);

    const y = Math.sin(destLon - currentLongitude);
    const x =
              Math.cos(currentLatitude) * Math.sin(destLat) -
              Math.sin(currentLatitude) * Math.cos(destLat) * Math.cos(destLon - currentLongitude);

    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360; 
    Math.round(bearing);
    setQiblaDirection(bearing);
  };

  useEffect(() => {
    toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      subscripe();
    }
  };

  const subscripe = () => {
    Magnetometer.setUpdateInterval(16);
    setSubscription(
      Magnetometer.addListener((data) => {
        const filteredData = angle(data); // Apply any filtering method to the raw data

        setMagnetometerData((prevData) => {
          // Keep a larger number of data points
          const newData = [...prevData, filteredData];
          if (newData.length > 30) {
            newData.shift();
          }

          // Calculate the moving average
          const avg = Math.round(newData.reduce((acc, val) => acc + val, 0) / newData.length);

          // Apply a threshold  -?>  only update if the change is significant
          if (Math.abs(avg - movingAverage) > 1.0) {
            setMovingAverage(avg);
          }
          return newData;
        });
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };


  const angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };



  // const vibrationAngle = () => {
  //   if (vibrationAngleValues.includes(Math.round(qiblaDirection).toString())) {
  //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  //   }
  // };

  const degree = (movingAverage) => {
    return movingAverage - 90 >= 0 ? movingAverage - 90 : movingAverage + 271;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prevDots) => {
        if (prevDots === '...') {
          return '.';
        } else {
          return prevDots + '.';
        }
      });
    }, 500); // Adjust the interval duration as needed (500 milliseconds in this example)

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);


  return (
    <View style={styles.container}>
      {qiblaDirection !== null ? (
        <Text style={[styles.textDirection,{
          fontFamily:selectedLanguage!="Arabic"?"Montserrat":"AmiriFont"
        }]}> {selectedLanguage != "Arabic"?"Direction of Qibla:":"اتجاه القبلة :"} {Math.round(qiblaDirection)}°</Text>
      ) : (
        <Text style={styles.textDirection}>  {selectedLanguage != "Arabic"?"Loading":"جاري التحميل"}{loadingDots}</Text>
      )}
      <View style={styles.degreeContainer}>
        <Image
          x="0"
          y="0"
          source={CompassTheme}
          style={[
            styles.compassImage,
            {
              transform: [{ rotate: 360 - movingAverage + "deg" }],
            },
          ]}
        />
        {qiblaDirection !== null ? (
          <Image
            x="0"
            y="0"
            source={CompassPointerTheme}
            style={[
              styles.compassImageRed,
              {
                transform:
                  [{ rotate: 90 + Math.round(qiblaDirection) - movingAverage + "deg" }],
              },
            ]}
          />
        ) : null}
        <Text style={styles.degreeText}>
          {degree(movingAverage)}°
        </Text>
      </View>
            {/* circle with arrow animation will be here */}

      <View style={styles.triangleContainer}>
        <View style={styles.triangle}></View>
      </View>
    </View>
  );
};

export default QiblaScreen;