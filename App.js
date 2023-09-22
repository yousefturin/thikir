import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import * as Font from "expo-font";
const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        AmiriFont: require("./assets/fonts/Amiri-Regular.ttf"),
        ScheherazadeNew: require("./assets/fonts/ScheherazadeNew-Regular.ttf"),
        ScheherazadeNewBold: require("./assets/fonts/ScheherazadeNew-Bold.ttf"),
        // Load other fonts as needed
      });
      setFontLoaded(true);
    }
    const requestNotificationPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        console.log('Notification permissions granted');
        
        // Configure notification categories
        Notifications.setNotificationCategoryAsync('alarm', [
          {
            identifier: 'dismiss',
            buttonTitle: 'Dismiss',
          },
        ]);
      } else {
        console.log('Notification permissions denied');
      }
    };
    loadFonts();
  }, []);

  
  if (!fontLoaded) {
    return console.log(!fontLoaded); // Display a loading indicator
  }
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
