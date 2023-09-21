import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeScreen from "../components/HomeScreen";
import FavouriteScreen from "../components/FavouriteScreen";
import SettingScreen from "../components/SettingsScreen";
import AboutScreen from "../components/aboutScreen";
import Menu from "../components/Menu";
import QuranVerseScreen from "../components/QuranVerseScreen";
import GenericPage from "../components/GenericPage";

const Stack = createStackNavigator();

const headerStyle = {
  backgroundColor: "#023B4F",
};
const headerBackgroundImage = require("../../assets/HeaderBackground.jpg");
const headerTintColor = "white"; // Set the text color to white

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="الأذكار"
      screenOptions={{
        headerTintColor,
        headerTitleStyle: {
          fontFamily: "ScheherazadeNewBold", // Set your desired font family here
          fontSize: 22, // Adjust font size as needed
        },
      }}
    >
      <Stack.Screen
        name="الأذكار"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: null,
          headerLeft: () => (
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("القائمة")}>
                <Icon
                  name="bars"
                  size={24}
                  color="white"
                  style={[
                    { paddingRight: 190, marginBottom: 10, paddingTop: 10 },
                  ]}
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: null,
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground
              source={headerBackgroundImage}
              style={styles.headerBackground}
            ></ImageBackground>
          ),
        })}
      />
      <Stack.Screen
        name="آية"
        component={QuranVerseScreen}
        options={{
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground
              source={headerBackgroundImage}
              style={styles.headerBackground}
            ></ImageBackground>
          ),
        }}
      />
      <Stack.Screen
        name="GenericPage"
        component={GenericPage}
        options={({ route, navigation }) => ({
          headerTitle: () => (
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "ScheherazadeNewBold",
              }}
            >
              {route.params?.name || "Default Page Title"}
            </Text>
          ),
          headerLeft: () => (
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("الأذكار")}>
                <Icon
                  name="angle-left"
                  size={24}
                  color="white"
                  style={[
                    { paddingRight: 190, marginBottom: 10, paddingTop: 10 },
                  ]}
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={styles.iconContainerRight}>
              <TouchableOpacity onPress={() => navigation.navigate("الأذكار")}>
                <Icon
                  name="bookmark"
                  size={24}
                  color="white"
                  style={[
                    {
                      marginLeft: 170,
                      marginBottom: 10,
                      paddingTop: 10,
                      paddingRight: 20,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground
              source={headerBackgroundImage}
              style={styles.headerBackground}
            ></ImageBackground>
          ),
        })}
      />
      <Stack.Screen
        name="الأذكار المفضلة"
        component={FavouriteScreen}
        options={{
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground
              source={headerBackgroundImage}
              style={styles.headerBackground}
            ></ImageBackground>
          ),
        }}
      />
      <Stack.Screen
        name="الاعدادات"
        component={SettingScreen}
        options={{
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground
              source={headerBackgroundImage}
              style={styles.headerBackground}
            ></ImageBackground>
          ),
        }}
      />
      <Stack.Screen
        name="عن البرنامج"
        component={AboutScreen}
        options={{
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground
              source={headerBackgroundImage}
              style={styles.headerBackground}
            ></ImageBackground>
          ),
        }}
      />
      <Stack.Screen
        name="القائمة"
        component={Menu}
        options={{
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground
              source={headerBackgroundImage}
              style={styles.headerBackground}
            ></ImageBackground>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 16,
  },
  iconContainerRight: {
    marginRight: 16,
  },
  headerBackground: {
    flex: 1,
    resizeMode: "cover",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default AppNavigator;