import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, Image} from 'react-native';


const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [selectedLanguage, setSelectedLanguage] = useState("Arabic"); // Default font selection
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Load the selected font from AsyncStorage on app startup
        async function fetchLanguage() {
            try {
                const LanguageValue = await AsyncStorage.getItem("@selectedLanguage");
                if (LanguageValue) {
                    setSelectedLanguage(LanguageValue);
                }
            } catch (error) {
                console.error("Error fetching Language:", error);
            }finally {
                setTimeout(() => {
                setLoading(false); // Mark loading as complete
            }, 300); 
            }
        }

        fetchLanguage();
    }, []);
    const appIconImage = require("../../assets/Images/splashEntro.png");
    // Set the selected font
    const setLanguage = (Language) => {
        setSelectedLanguage(Language);
        // Save the selected font to AsyncStorage
        AsyncStorage.setItem("@selectedLanguage", Language);
    };

    useEffect(() => {
        // Save the selected theme to AsyncStorage whenever it changes
        if (selectedLanguage !== null) {
            AsyncStorage.setItem("@selectedLanguage", selectedLanguage);
        }
    }, [selectedLanguage]);

    if (loading) {
        // Return a loading indicator while the language is being loaded
        return (
            <View style={{ flex: 1, backgroundColor: "#151515" ,paddingTop:240}}>
            <View style={{ flex: 1, justifyContent:"flex-start", alignItems: 'center'  }}>
                <Image
                source={appIconImage}
                style={{resizeMode: "cover", width: 420, height: 420 }}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#242424" style={{ width: "100%", height: 20 }} />
            </View>
            </View>
        );
    }

    return (
        <LanguageContext.Provider value={{ selectedLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
