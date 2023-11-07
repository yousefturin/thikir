import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRandomVerse } from '../API/GETAyahofQuran';

const CACHE_KEY = 'randomVerseCache';
const CACHE_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

export const useRandomVerse = () => {
  const [verseData, setVerseData] = useState({
    verseText: '',
    surahName: '',
    surahNameEn: '',
    ayahNumber: '',
    tafsir: '',
    EnTafsir: '',
    verseTextLength: 0,
  });

  const getRandomVerse = async () => {
    try {
      const {
        verseText,
        surahName,
        surahNameEn,
        ayahNumber,
        tafsirTextAR,
        tafsirTextEN,
      } = await fetchRandomVerse();

      // Calculate the length of the fetched verse text and control styles
      const length = verseText.length;
      const verseDataToCache = {
        verseText,
        surahName,
        surahNameEn,
        ayahNumber,
        tafsir: tafsirTextAR,
        EnTafsir: tafsirTextEN,
        verseTextLength: length,
      };

      setVerseData(verseDataToCache);

      // Cache the fetched verse and related information along with the current timestamp
      const currentTime = new Date().getTime();
      const dataToCache = JSON.stringify({
        ...verseDataToCache,
        timestamp: currentTime,
      });

      await AsyncStorage.setItem(CACHE_KEY, dataToCache);
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error('Error fetching random verse:', error);
    }
  };

  useEffect(() => {
    // Check if cached verse exists and if it's not expired
    const getCachedVerse = async () => {
      try {
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const currentTime = new Date().getTime();

          if (currentTime - parsedData.timestamp <= CACHE_EXPIRATION_TIME) {
            setVerseData(parsedData);
          } else {
            getRandomVerse();
          }
        } else {
          getRandomVerse();
        }
      } catch (error) {
        console.error('Error getting cached verse:', error);
        getRandomVerse();
      }
    };

    getCachedVerse();
  }, []);

  return verseData;
};
