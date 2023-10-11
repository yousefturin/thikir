import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
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
import DUAVerseScreen from "../components/DuaScreen";
import ReportProblemScreen from "../components/ReportProblemScreen";
import ThikirAlarmScreen from "../components/ThikirAlarmScreen";
import { useTheme } from '../context/ThemContex'; 
import { Appearance } from 'react-native';
const Stack = createStackNavigator();



const AppNavigator = () => {
  const { selectedTheme } = useTheme();
  const systemTheme = selectedTheme === 'system'; 

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
      initialRouteName="الأذكار"
      screenOptions={{
        headerTintColor,
        headerTitleStyle: {
          fontFamily: "ScheherazadeNewBold",
          fontSize: 22, 
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
                  style={[
                    { paddingRight: 190, marginBottom: 10, paddingTop: 10,color:barColor },
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
        name="التذكيرات"
        component={ThikirAlarmScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name="آية"
        component={QuranVerseScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name="حديث"
        component={HadithScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name="دعاء"
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
              style={{
                color: barColor,
                fontSize: 18,
                fontFamily: "ScheherazadeNewBold",
              }}
            >
              {route.params?.name || "Default Page Title"}
            </Text>
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="الأذكار المفضلة"
        component={FavouriteScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name="الاعدادات"
        component={SettingScreen}
        options={{
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name="عن البرنامج"
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
      <Stack.Screen
        name="القائمة"
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
