import React from "react";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppStackList } from "@/hooks/useNavigation";
import Welcome from "@/screens/welcome/Welcome";
import { AppBottomNavigation } from "./AppBottomNavigation";
import AzanTimesScreen from "@/screens/azan/AzanTimesScreen";
import SupplicationScreen from "@/screens/supplication/SupplicationScreen";
import LanguageScreen from "@/screens/Language/LanguageScreen";

export const navigationRef = createNavigationContainerRef();

const AppStack = createStackNavigator<AppStackList>(); // Here you can add your stack navigator screens Types
// Helper function to create screen options
// const createScreenOptions = (
//   titleKey: string,
//   backgroundColor: string = "#ffffff"
// ) => ({
//   headerShown: true,
//   headerTitle: titleKey,
//   headerTitleStyle: { fontSize: 18, fontWeight: "400" as const },
//   headerTitleAlign: "center" as const,
//   headerStyle: {
//     backgroundColor,
//     shadowColor: "transparent",
//     borderBottomColor: "#cccccc",
//     borderBottomWidth: 1,
//     shadowOpacity: 0,
//     elevation: 0,
//   },
//   headerTintColor: "#000000",
// });
const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator
        id={undefined}
        initialRouteName={"Home"} // Change initial route name here
        screenOptions={{
          headerShown: false,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackButtonDisplayMode: "minimal", // remove back title
          gestureEnabled: true,
        }}
      >
        <AppStack.Screen
          name="Home"
          component={AppBottomNavigation}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <AppStack.Screen
          name="AzanTimes"
          component={AzanTimesScreen}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="Language"
          component={LanguageScreen}
          options={{
            headerShown: false,
          }}
        />

        <AppStack.Screen
          name="SupplicationItem"
          component={SupplicationScreen}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
