import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text,TouchableOpacity, View, StyleSheet,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../HomeScreen';
import FavouriteScreen from '../FavouriteScreen';
import SettingScreen from '../SettingsScreen';
import AboutScreen from '../aboutScreen';
import Menu from '../Menu';
import GenericPage from '../GenericPage';

const Stack = createStackNavigator();

const headerStyle = {
  backgroundColor: '#023B4F', // Set the background color of the navigation bar
};
const headerBackgroundImage = require('../../../assets/HeaderBackground.jpg');
const headerTintColor = 'white'; // Set the text color to white

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="الأذكار" screenOptions={{ headerTintColor }}>
      <Stack.Screen
        name="الأذكار"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: null,
          headerLeft: () => (
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('القائمة')}>
                <Icon name="bars" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: null,
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground source={headerBackgroundImage} style={styles.headerBackground}>
              {/* You can add any other header components here */}
            </ImageBackground>
          ),
        })}
      />
      <Stack.Screen
        name="GenericPage"
        component={GenericPage}
        options={({ route, navigation }) => ({
          headerTitle: () => (
            <Text style={{ color: 'white', fontSize: 18 }}>
              {route.params?.name || 'Default Page Title'}
            </Text>
          ),
          headerLeft: () => (
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('الأذكار')}>
                <Icon name="angle-left" size={34} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight:  () => (
            <View style={styles.iconContainerRight}>
              <TouchableOpacity onPress={() => navigation.navigate('الأذكار')}>
              <Icon name="bookmark" size={24} color="white" style={styles.icon} />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground source={headerBackgroundImage} style={styles.headerBackground}>
              {/* You can add any other header components here */}
            </ImageBackground>
          ),
        })}
      />
      <Stack.Screen
        name="الأذكار المفضلة"
        component={FavouriteScreen}
        options={{
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground source={headerBackgroundImage} style={styles.headerBackground}>
              {/* You can add any other header components here */}
            </ImageBackground>
          ),
        }}
      />
      <Stack.Screen
        name="الاعدادات"
        component={SettingScreen}
        options={{
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground source={headerBackgroundImage} style={styles.headerBackground}>
              {/* You can add any other header components here */}
            </ImageBackground>
          ),
        }}
      />
      <Stack.Screen
        name="عن البرنامج"
        component={AboutScreen}
        options={{
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground source={headerBackgroundImage} style={styles.headerBackground}>
              {/* You can add any other header components here */}
            </ImageBackground>
          ),
        }}
      />
      <Stack.Screen
        name="القائمة"
        component={Menu}
        options={{
          headerStyle: headerStyle,
          headerBackground: () => (
            <ImageBackground source={headerBackgroundImage} style={styles.headerBackground}>
              {/* You can add any other header components here */}
            </ImageBackground>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 16, // Adjust the margin as needed
  },
  iconContainerRight: {
    marginRight: 16, // Adjust the margin as needed
  },
  headerBackground: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    shadowColor: 'black', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2, // Adjust the height to control the shadow's vertical offset
    },
    shadowOpacity: 0.5, // Adjust the opacity of the shadow
    shadowRadius: 4, // Adjust the radius of the shadow
    elevation: 4, // This is for Android elevation
  },
});

export default AppNavigator;
