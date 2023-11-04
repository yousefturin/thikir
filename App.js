import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import * as Font from "expo-font";
import { Platform } from 'react-native';
import * as Notifications from "expo-notifications";
import { ThemeProvider } from "./src/context/ThemContex";
import { FontProvider } from "./src/context/FontContext";
import { ColorProvider  } from "./src/context/ColorContext";
import { NumberProvider } from './src/context/NumberContext';
import { LanguageProvider } from "./src/context/LanguageContext";

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const DarkThemeNavigator = {
    colors: {
      primary: 'rgb(10, 132, 255)',
      background: '#151515',
      card: 'rgb(18, 18, 18)',
      text: 'rgb(229, 229, 231)',
      border: 'rgb(39, 39, 41)',
      notification: 'rgb(255, 69, 58)',
    },
  };
  const LightThemeNavigator = {
    colors: {
      primary: 'rgb(10, 132, 255)',
      background: '#f2f2f6',
      card: 'rgb(18, 18, 18)',
      text: 'rgb(229, 229, 231)',
      border: 'rgb(39, 39, 41)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        AmiriFont: require("./assets/fonts/Amiri-Regular.ttf"),
        ScheherazadeNew: require("./assets/fonts/ScheherazadeNew-Regular.ttf"),
        ScheherazadeNewBold: require("./assets/fonts/ScheherazadeNew-Bold.ttf"),
        Hafs: require("./assets/fonts/Hafs.ttf"),
        MeQuran: require("./assets/fonts/MeQuran.ttf"),
        Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
        MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
        TimesRoman: require("./assets/fonts/TimesRoman-Regular.ttf"),
        lexend: require("./assets/fonts/Lexend-Regular.ttf")
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);
  
  useEffect(() => {
    const requestNotificationPermissions = async () => {
      if (Platform.OS === 'android'){
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === "granted") {
          console.log("Notification permissions granted");
  
          // Configure notification categories
          Notifications.setNotificationCategoryAsync("alarm", [
            {
              identifier: "dismiss",
              buttonTitle: "Dismiss",
            },
          ]);
        } else {
          console.log("Notification permissions denied");
        }
      }else{
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === "granted") {
          console.log("Notification permissions granted");
          // Configure notification categories
          Notifications.setNotificationCategoryAsync("alarm", [
            {
              identifier: "dismiss",
              buttonTitle: "Dismiss",
            },
          ]);
        } else {
          console.log("Notification permissions denied");
        }
      }
    };
    requestNotificationPermissions();
  }, []);


  if (!fontLoaded) {
    return console.log(!fontLoaded);
  };


  return (
    <NavigationContainer  theme={DarkThemeNavigator}>
    <ThemeProvider>
      <FontProvider> 
        <ColorProvider>
        <NumberProvider>
          <LanguageProvider>
            <AppNavigator />
          </LanguageProvider>
          </NumberProvider>
        </ColorProvider>
      </FontProvider>
    </ThemeProvider>
  </NavigationContainer>
  );
};

export default App;
