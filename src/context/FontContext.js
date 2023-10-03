// FontContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FontContext = createContext();

export function FontProvider({ children }) {
  const [selectedFont, setSelectedFont] = useState('font1'); // Default font selection

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

  return (
    <FontContext.Provider value={{ selectedFont, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  return useContext(FontContext);
}