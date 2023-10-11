import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ColorContext = createContext();

export function ColorProvider({ children }) {
    const [selectedColor, setSelectedColor] = useState('#f2b784'); // Default font selection

    useEffect(() => {
        // Load the selected font from AsyncStorage on app startup
        async function fetchColor() {
            try {
                const colorValue = await AsyncStorage.getItem('@selectedColor');
                if (colorValue) {
                    setSelectedColor(colorValue);
                }
            } catch (error) {
                console.error('Error fetching font:', error);
            }
        }

        fetchColor();
    }, []);

    // Set the selected font
    const setColor = (color) => {
        setSelectedColor(color);
        // Save the selected font to AsyncStorage
        AsyncStorage.setItem('@selectedColor', color);
    };

    useEffect(() => {
        // Save the selected theme to AsyncStorage whenever it changes
        if (selectedColor !== null) {
            AsyncStorage.setItem('@selectedColor', selectedColor);
        }
    }, [selectedColor]);

    if (selectedColor === null) {
        // Return null while the theme is loading
        return null;
    }

    return (
        <ColorContext.Provider value={{ selectedColor, setColor }}>
            {children}
        </ColorContext.Provider>
    );
}

export function useColor() {
    return useContext(ColorContext);
}
