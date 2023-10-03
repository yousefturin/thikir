import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import * as Font from "expo-font";
import { Platform } from 'react-native';
import * as Notifications from "expo-notifications";
import { ThemeProvider  } from "./src/context/ThemContex";
import { FontProvider } from "./src/context/FontContext";
const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        AmiriFont: require("./assets/fonts/Amiri-Regular.ttf"),
        ScheherazadeNew: require("./assets/fonts/ScheherazadeNew-Regular.ttf"),
        ScheherazadeNewBold: require("./assets/fonts/ScheherazadeNew-Bold.ttf"),
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
  }

  return (
    <NavigationContainer>
    <ThemeProvider>
      <FontProvider> 
        <AppNavigator />
      </FontProvider>
    </ThemeProvider>
  </NavigationContainer>
  );
};

export default App;
