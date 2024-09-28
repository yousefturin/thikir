import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import SettingScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/aboutScreen";
import Menu from "../screens/Menu";
import QuranVerseScreen from "../screens/QuranVerseScreen";
import HadithScreen from "../screens/HadithScreen";
import GenericPage from "../screens/GenericPage";
import NamesOfAllahGenericPage from "../screens/namesOfAllahGenericPage";
import namesOfAllahScreen from "../screens/namesOfAllahScreen";
import DUAVerseScreen from "../screens/DuaScreen";
// import ReportProblemScreen from "../screens/ReportProblemScreen";
// import BarCodeScreen from "../screens/BarCodeScreen";
import ThikirAlarmScreen from "../screens/ThikirAlarmScreen";
import TasbihScreen from "../screens/tasbihScreen";
import QablaScreen from "../screens/QablaScreen";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import AzanScreen from "../screens/azanScreen";
import { getColorForTheme } from "../utils/themeUtils";

const Stack = createStackNavigator();
const customCardStyleInterpolator = ({ current, next, layouts }) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
        {
          translateX: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -layouts.screen.width],
              })
            : 0,
        },
      ],
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
  };
};

const AppNavigator = () => {
  const { selectedTheme } = useTheme();
  const systemTheme = selectedTheme === "system";

  const { selectedLanguage } = useLanguage();

  const headerTintColor = getColorForTheme(
    { dark: "white", light: "black" },
    selectedTheme,
    systemTheme
  );
  const barColor = getColorForTheme(
    { dark: "white", light: "black" },
    selectedTheme,
    systemTheme
  );
  const backgroundBarColor = getColorForTheme(
    { dark: "#050505", light: "#f2f2f6" },
    selectedTheme,
    systemTheme
  );

  const headerStyle = {
    height: 100,
    backgroundColor: backgroundBarColor,
    elevation: 0,
    shadowOpacity: 0,
  };
  
  return (
    <Stack.Navigator
      initialRouteName={selectedLanguage != "Arabic" ? "Home" : "الأذكار"}
      screenOptions={{
        headerTintColor,
        headerTitleStyle: {
          fontFamily:
            selectedLanguage != "Arabic" ? "Montserrat" : "ScheherazadeNewBold",
          fontSize: 22,
          
        },
        cardStyleInterpolator: customCardStyleInterpolator, // Custom animation
      }}
    >
      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "Home" : "الأذكار"}
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: null,
          headerTitleAlign:"center",
          headerLeft: () => (
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() =>
                  selectedLanguage != "Arabic"
                    ? navigation.navigate("Menu")
                    : navigation.navigate("القائمة")
                }
              >
                <Icon
                  name="bars"
                  size={24}
                  style={[
                    {
                      paddingRight: 15,
                      marginBottom: 10,
                      paddingTop: 10,
                      color: barColor,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: null,
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "Notifications" : "التذكيرات"}
        component={ThikirAlarmScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "Glorification" : "سبحة"}
        component={TasbihScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />

      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "Verse of Quran" : "آية"}
        component={QuranVerseScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "Hadith" : "حديث"}
        component={HadithScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "Invocational" : "دعاء"}
        component={DUAVerseScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name="GenericPage"
        component={GenericPage}
        options={({ route }) => ({
          headerTitle: () => (
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                color: barColor,
                fontSize: 18,
                textAlign: "center",

                fontFamily:
                  selectedLanguage != "Arabic"
                    ? "Montserrat"
                    : "ScheherazadeNewBold",
              }}
            >
              {route.params?.name || "Default Page Title"}
            </Text>
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name={
          selectedLanguage != "Arabic" ? "Names Of Allah" : "أسماء الله الحسنى"
        }
        component={namesOfAllahScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name="namesOfAllahGenericPage"
        component={NamesOfAllahGenericPage}
        options={({ route }) => ({
          headerTitle: () => (
            <Text
              style={{
                color: barColor,
                fontSize: 18,
                fontFamily:
                  selectedLanguage != "Arabic"
                    ? "Montserrat"
                    : "ScheherazadeNewBold",
              }}
            >
              {route.params?.name || "Default Page Title"}
            </Text>
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "Favorite" : "الأذكار المفضلة"}
        component={FavoriteScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "Direction of Prayer" : "القبلة"}
        component={QablaScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "Settings" : "الاعدادات"}
        component={SettingScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "About us" : "عن البرنامج"}
        component={AboutScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      {/* <Stack.Screen
        name="الابلاغ عن مشكلة"
        component={ReportProblemScreen}
        options={{
          headerStyle: headerStyle,
        }}
      /> */}
      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "Prayer Times" : "مواعيد الصلاة"}
        component={AzanScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ? "Menu" : "القائمة"}
        component={Menu}
        options={{
          headerStyle: headerStyle,
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
  },
});

export default AppNavigator;
