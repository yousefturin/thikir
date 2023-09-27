// 1. ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

// 2. Define Themes
const lightTheme = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  // Add other styles here
};

const darkTheme = {
  backgroundColor: '#151515',
  textColor: '#fff',
  // Add other styles here
};

// Create a ThemeContext
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Get the current theme
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
