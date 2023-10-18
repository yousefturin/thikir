import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NumberContext = createContext();

const initialState = {
  isArabicNumbers: false, // English numbers as default
};

const numberReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_NUMBERS':
      // No need to perform conversion here
      return { ...state, isArabicNumbers: !state.isArabicNumbers };
    default:
      return state;
  }
};

const convertToEasternArabicNumerals = (text) => {
    const conversionMapping = {
      '0': '٠',
      '1': '١',
      '2': '٢',
      '3': '٣',
      '4': '٤',
      '5': '٥',
      '6': '٦',
      '7': '٧',
      '8': '٨',
      '9': '٩',
    };

    return text.replace(/[0-9]/g, (match) => conversionMapping[match] || match);
  };

const NumberProvider = ({ children }) => {
  const [state, dispatch] = useReducer(numberReducer, initialState);

  useEffect(() => {
    // Load the toggle option from AsyncStorage on app startup
    const loadAsyncData = async () => {
      try {
        const value = await AsyncStorage.getItem('numberDisplay');
        if (value !== null) {
          dispatch({ type: 'TOGGLE_NUMBERS' }); // Toggle if saved option is true
        }
      } catch (error) {
        console.error('Error loading number display option', error);
      }
    };

    loadAsyncData();
  }, []);

  return (
    <NumberContext.Provider value={{ state, dispatch, convertToEasternArabicNumerals }}>
      {children}
    </NumberContext.Provider>
  );
};

const useNumberContext = () => {
  return useContext(NumberContext);
};

export { NumberProvider, useNumberContext };
