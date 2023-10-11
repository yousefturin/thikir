
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FontContext = createContext();

export function FontProvider({ children }) {
  const [selectedFont, setSelectedFont] = useState('ScheherazadeNew'); // Default font selection

  useEffect(() => {
    // Load the selected font from AsyncStorage on app startup
    async function fetchFont() {
      try {
        const fontValue = await AsyncStorage.getItem('@selectedFont');
        if (fontValue) {
          setSelectedFont(fontValue);
        }
      } catch (error) {
        console.error('Error fetching font:', error);
      }
    }

    fetchFont();
  }, []);

  // Set the selected font
  const setFont = (font) => {
    setSelectedFont(font);
    // Save the selected font to AsyncStorage
    AsyncStorage.setItem('@selectedFont', font);
  };

  useEffect(() => {
    // Save the selected theme to AsyncStorage whenever it changes
    if (selectedFont !== null) {
      AsyncStorage.setItem('@selectedFont', selectedFont);
    }
  }, [selectedFont]);

  if (selectedFont === null) {
    // Return null while the theme is loading
    return null;
  }

  return (
    <FontContext.Provider value={{ selectedFont, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  return useContext(FontContext);
}
