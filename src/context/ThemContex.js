// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [isDarkMode, setIsDarkMode] = useState(null); // Use null to represent initial loading state

  useEffect(() => {
    async function fetchTheme() {
      try {
        const themeValue = await AsyncStorage.getItem('@selectedTheme');
        if (themeValue === 'dark') {
          setIsDarkMode(true);
        } else {
          setIsDarkMode(false);
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
        setIsDarkMode(false); // Set the default theme in case of an error
      }
    }

    fetchTheme();
  }, []);

  // Toggle Theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Get the current theme
  const currentTheme = isDarkMode === null ? lightTheme : isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    // Save the selected theme to AsyncStorage whenever it changes
    if (isDarkMode !== null) {
      AsyncStorage.setItem('@selectedTheme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  if (isDarkMode === null) {
    // Return null while the theme is loading
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
