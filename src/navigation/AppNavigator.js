import React from "react";
import { createStackNavigator} from "@react-navigation/stack";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeScreen from "../components/HomeScreen";
import FavouriteScreen from "../components/FavouriteScreen";
import SettingScreen from "../components/SettingsScreen";
import AboutScreen from "../components/aboutScreen";
import Menu from "../components/Menu";
import QuranVerseScreen from "../components/QuranVerseScreen";
import HadithScreen from "../components/HadithScreen";
import GenericPage from "../components/GenericPage";
import NamesOfAllahGenericPage from "../components/namseOfAllahGenericPage"
import namesOfAllahScreen from "../components/namesOfAllahScreen"
import DUAVerseScreen from "../components/DuaScreen";
import ReportProblemScreen from "../components/ReportProblemScreen";
// import BarCodeScreen from "../components/BarCodeScreen";
import ThikirAlarmScreen from "../components/ThikirAlarmScreen";
import TasbihScreen from "../components/tasbihScreen";
import QablaScreen from "../components/QablaScreen";
import { useTheme } from '../context/ThemContex';
import { useLanguage } from '../context/LanguageContext';
import { Appearance } from 'react-native';

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
  const systemTheme = selectedTheme === 'system'; 

  const { selectedLanguage } = useLanguage();

  const headerTintColor = systemTheme
  ? Appearance.getColorScheme() === 'dark'
    ?"white"
    :"black"
  : selectedTheme === 'dark'
    ?"white"
    :"black";
  const barColor = systemTheme
    ? Appearance.getColorScheme() === 'dark'
      ?"white"
      :"black"
    : selectedTheme === 'dark'
      ?"white"
      :"black";
  const backgroundBarColor = systemTheme
      ? Appearance.getColorScheme() === 'dark'
      ?"#151515"
      :"#f2f2f6"
      : selectedTheme === 'dark'
      ?"#151515"
      :"#f2f2f6"
        
  const headerStyle = {height: 100, backgroundColor: backgroundBarColor, elevation: 0, shadowOpacity: 0, };
  return (
    <Stack.Navigator
    initialRouteName= {selectedLanguage != "Arabic" ?  "Home": "الأذكار" }
    screenOptions={{
      headerTintColor,
      headerTitleStyle: {
        fontFamily: selectedLanguage != "Arabic" ?  "Montserrat": "ScheherazadeNewBold",
        fontSize: 22,
      },
      cardStyleInterpolator: customCardStyleInterpolator, // Custom animation
    }}
  >
    <Stack.Screen
      name= {selectedLanguage != "Arabic" ?  "Home": "الأذكار" }
      component={HomeScreen}
      options={({ navigation }) => ({
        headerTitle: null,
        headerLeft: () => (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => selectedLanguage != "Arabic" ?  navigation.navigate("Menu"): navigation.navigate("القائمة")}
            >
              <Icon
                name="bars"
                size={24}
                style={[
                  { paddingRight: 190, marginBottom: 10, paddingTop: 10, color: barColor },
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
      name={selectedLanguage != "Arabic" ?  "Notifications": "التذكيرات"}
      component={ThikirAlarmScreen}
      options={{
        headerStyle: headerStyle,
      }}
    />
    <Stack.Screen
      name={selectedLanguage != "Arabic" ?  "Glorification": "سبحة"}
      component={TasbihScreen}
      options={{
        headerStyle: headerStyle,
      }}
    />
    
      <Stack.Screen
        name={selectedLanguage != "Arabic" ?  "Verse of Quran": "آية"}
        component={QuranVerseScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ?  "Hadith": "حديث"}
        component={HadithScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ?  "Invocational": "دعاء" }
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
                textAlign:"center",

                fontFamily: selectedLanguage != "Arabic" ?  "Montserrat": "ScheherazadeNewBold"
              }}
            >
              {route.params?.name || "Default Page Title"}
            </Text>
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ?  "Names Of Allah": "أسماء الله الحسنى" }
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
                fontFamily: selectedLanguage!="Arabic"?"Montserrat":"ScheherazadeNewBold",
              }}
            >
              {route.params?.name || "Default Page Title"}
            </Text>
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ?  "Favorite": "الأذكار المفضلة" }
        component={FavouriteScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ?  "Direction of Prayer": "القبلة"}
        component={QablaScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name= {selectedLanguage != "Arabic" ?  "Settings": "الاعدادات" }
        component={SettingScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name={selectedLanguage != "Arabic" ?  "About us": "عن البرنامج" }
        component={AboutScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name="الابلاغ عن مشكلة"
        component={ReportProblemScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      {/* <Stack.Screen
        name="ScanBarCode"
        component={BarCodeScreen}
        options={{
          headerStyle: headerStyle,
        }}
      /> */}
      <Stack.Screen
        name= {selectedLanguage != "Arabic" ?  "Menu": "القائمة" }
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
