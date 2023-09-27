import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/ThemContex'; // Import the useTheme hook from your ThemeContext file

const SettingScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useTheme(); // Access theme state and toggle function

  const lightTheme = {
    backgroundColor: "#f2f2f6", 
    textColor: '#000000',
    // Add other light theme styles here
  };

  const darkTheme = {
    backgroundColor: '#151515',
    textColor: '#FFFFFF',
    // Add other dark theme styles here
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      {/* Navigation bar */}
      {/* Add your navigation bar here */}
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
        {/* Content */}
      </TouchableOpacity>
      
      {/* iOS-style toggle */}
      <View style={styles.toggleContainer}>
        <Text style={{ color: currentTheme.textColor }}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? '#fefffe' : '#fefffe'} 
                  trackColor={{ true: '#be915a', false: '#454545' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // Add other common styles here
  },
  toggleContainer: {
    flexDirection:"row-reverse",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  // Add other styles as needed
});

export default SettingScreen;
