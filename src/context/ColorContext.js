import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ColorContext = createContext();

export function ColorProvider({ children }) {
    const [selectedColor, setSelectedColor] = useState(null); // Initialize with null or a loading state

    // Fetch the color from AsyncStorage before rendering
    useEffect(() => {
        async function fetchColor() {
            try {
                const colorValue = await AsyncStorage.getItem('@selectedColor');
                if (colorValue) {
                    setSelectedColor(colorValue);
                } else {
                    setSelectedColor('#f2b784'); // Default color if not found
                }
            } catch (error) {
                console.error('Error fetching color:', error);
                setSelectedColor('#f2b784'); // Default color in case of an error
            }
        }

        fetchColor();
    }, []);

    // Set the selected color
    const setColor = async (color) => {
        setSelectedColor(color);
        try {
            // Save the selected color to AsyncStorage
            await AsyncStorage.setItem('@selectedColor', color);
        } catch (error) {
            console.error('Error saving color:', error);
        }
    };

    if (selectedColor === null) {
        // Return a loading state or a placeholder while the color is loading
        return 
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
