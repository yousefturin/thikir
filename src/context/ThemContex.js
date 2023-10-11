import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

// Define Themes
const lightTheme = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
};

const darkTheme = {
  backgroundColor: '#151515',
  textColor: '#FFFFFF',
};

// Create a ThemeContext
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(null); // Use null to represent initial loading state
  useEffect(() => {
    async function fetchTheme() {
      try {
        const themeValue = await AsyncStorage.getItem('@selectedTheme');
        if (themeValue === 'dark' || themeValue === 'light' || themeValue === 'system') {
          setSelectedTheme(themeValue); // Set the selected theme if it's "dark," "light," or "system"
        } else {
          const systemTheme = Appearance.getColorScheme();
          setSelectedTheme(systemTheme || 'light');
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
        setSelectedTheme('light'); // Set the default theme in case of an error
      }
    }
    fetchTheme();
  }, []);

  // Toggle Theme
  const toggleTheme = (theme) => {
    setSelectedTheme(theme);
  };

  // Get the current theme
  const themes = {
    light: lightTheme,
    dark: darkTheme,
  };

  useEffect(() => {
    // Save the selected theme to AsyncStorage whenever it changes
    if (selectedTheme !== null) {
      AsyncStorage.setItem('@selectedTheme', selectedTheme);
    }
  }, [selectedTheme]);

  if (selectedTheme === null) {
    // Return null while the theme is loading
    return null;
  }

  const currentTheme =
    selectedTheme === 'system'
      ? themes[Appearance.getColorScheme() || 'light'] // Use system theme as detected by Appearance
      : themes[selectedTheme] || lightTheme;

  return (
    <ThemeContext.Provider value={{ selectedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
