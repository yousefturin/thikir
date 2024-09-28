import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRandomVerseFromFile } from "../API/GETHadethArb";
import { handleShare } from "../Service/ShareService";
import { useTheme } from "../context/ThemeContext";
import { useFont } from "../context/FontContext";
import { useColor } from "../context/ColorContext";
import { QuranVerseStyles } from "../Styles/commonStyles";
import { useNumberContext } from "../context/NumberContext";
import { getColorForTheme } from "../utils/themeUtils";
import { useLanguage } from "../context/LanguageContext";
import initializeScalingUtils from "../utils/core/NormalizeSize"

const CACHE_KEY = "randomHadithCache";
const CACHE_EXPIRATION_TIME = 2 * 60 * 60 * 1000;


const HADITHVerseScreen = ({ navigation }) => {
  const { selectedTheme } = useTheme();
  const { selectedFont } = useFont();
  const { selectedLanguage } = useLanguage();
  const { selectedColor } = useColor();
  const { state, convertToEasternArabicNumerals } = useNumberContext();
  const systemTheme = selectedTheme === "system";
  const { scale, verticalScale, moderateScale } = initializeScalingUtils(Dimensions);

  //#region LightTheme
  const lightTheme = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6",
    },
    rectangle: {
      backgroundColor: "#fefffe",
    },
    title: {
      color: "#000",
    },
    horizontalLine: {
      borderColor: "rgba(198, 198, 200, 0.45)",
    },
  });
  //#endregion

  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    container: {
      backgroundColor: "#050505",
    },
    rectangle: {
      backgroundColor: "#1C1C1E",
    },
    title: {
      color: "#fff",
    },
    horizontalLine: {
      borderColor: "rgba(84, 84, 84, 0.45)",
    },
  });
  //#endregion
  const themeStyles = getColorForTheme(
    { dark: darkTheme, light: lightTheme },
    selectedTheme,
    systemTheme
  );

  const styles = {
    ...QuranVerseStyles,
    container: {
      ...QuranVerseStyles.container,
      ...(selectedTheme === "dark"
        ? themeStyles.container
        : themeStyles.container),
    },
    rectangle: {
      ...QuranVerseStyles.rectangle,
      ...(selectedTheme === "dark"
        ? themeStyles.rectangle
        : themeStyles.rectangle),
    },
    title: {
      ...QuranVerseStyles.title,
      ...(selectedTheme === "dark" ? themeStyles.title : themeStyles.title),
    },
    horizontalLine: {
      ...QuranVerseStyles.horizontalLine,
      ...(selectedTheme === "dark"
        ? themeStyles.horizontalLine
        : themeStyles.horizontalLine),
    },
  };
  //#endregion

  //#region
  const [HADITH, setHADITH] = useState("");
  const [REF, setREF] = useState("");
  const [TRANSLATION, setTRANSLATION] = useState("");
  const [REF_TRANSLATION, setREF_TRANSLATION] = useState("");
  const [verseTextLength, setVerseTextLength] = useState(0);

  const [maxFontSizeDescription, setMaxFontSizeDescription] = useState(20);
  const [maxPadding, setMaxPadding] = useState(60);
  const [maxPaddingHorizontal, setMaxPaddingHorizontal] = useState(20);

  const viewRef = React.useRef();
  //#endregion

  const Share = async () => {
    await handleShare(viewRef.current);
  };

  //#region getCachedHadith
  useEffect(() => {
    console.log(selectedFont);
    // Check if cached verse exists and if it's not expired
    async function getCachedVerseHadith() {
      try {
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const {
            HADITH: cachedHADITH,
            REF: cachedREF,
            TRANSLATION: cachedTRANSLATION,
            REF_TRANSLATION: cachedREF_TRANSLATION,
            timestamp,
          } = parsedData;
          const currentTime = new Date().getTime();
          if (currentTime - timestamp <= CACHE_EXPIRATION_TIME) {
            // Use the cached verse if it's not expired
            setHADITH(cachedHADITH);
            setREF(cachedREF);

            setTRANSLATION(cachedTRANSLATION);
            setREF_TRANSLATION(cachedREF_TRANSLATION);
            // Calculate the length of the cached verse text and control styles
            let length;
            if (selectedLanguage != "Arabic") {
              length = cachedTRANSLATION.length;
            } else {
              length = cachedHADITH.length;
            }
            setVerseTextLength(length);
            controlStyle(length);
            return;
          }
        }
        // Fetch a new random verse if no cached verse or it's expired
        getRandomVerse();
      } catch (error) {
        console.error("Error getting cached verse:", error);
        // Fetch a new random verse if there's an error with AsyncStorage
        getRandomVerse();
      }
    }
    getCachedVerseHadith();
  }, []);
  //#endregion

  //#region getRandomVerse
  const getRandomVerse = async () => {
    try {
      const {
        HADITH: fetchedHADITH,
        REF: fetchedREF,
        TRANSLATION: fetchedTRANSLATION,
        REF_TRANSLATION: fetchedREF_TRANSLATION,
      } = await fetchRandomVerseFromFile();
      // Set the fetched verse and related information in the component state
      setHADITH(fetchedHADITH);
      setREF(fetchedREF);

      setTRANSLATION(fetchedTRANSLATION);
      setREF_TRANSLATION(fetchedREF_TRANSLATION);
      // Calculate the length of the fetched verse text and control styles
      let length;
      if (selectedLanguage != "Arabic") {
        length = fetchedTRANSLATION.length;
      } else {
        length = fetchedHADITH.length;
      }
      setVerseTextLength(length);
      controlStyle(length);
      // Cache the fetched verse and related information along with the current timestamp
      const currentTime = new Date().getTime();
      const dataToCache = JSON.stringify({
        HADITH: fetchedHADITH,
        REF: fetchedREF,
        TRANSLATION: fetchedTRANSLATION,
        REF_TRANSLATION: fetchedREF_TRANSLATION,
        timestamp: currentTime,
      });
      await AsyncStorage.setItem(CACHE_KEY, dataToCache);
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error fetching random verse:", error);
    }
  };
  //#endregion

  //#region DisplayViewStyle base on character length
  const controlStyle = (verseTextLength) => {
    let MaxFontSize = moderateScale(20);
    let maxPadding =  moderateScale(30);
    let maxPaddingHorizontal =  moderateScale(20);

    if (verseTextLength > 1200) {
      MaxFontSize = moderateScale(16);
      maxPadding =  moderateScale(20);
      maxPaddingHorizontal =  moderateScale(10);
    } else if (verseTextLength < 100) {
      MaxFontSize = moderateScale(27);
      maxPadding =  moderateScale(20);
      maxPaddingHorizontal =  moderateScale(20);
    }
    setMaxFontSizeDescription(MaxFontSize);
    setMaxPadding(maxPadding);
    setMaxPaddingHorizontal(maxPaddingHorizontal);
  };

  const textStyle = {
    fontSize: maxFontSizeDescription,
    padding: maxPadding,
    paddingHorizontal: maxPaddingHorizontal,
  };
  //#endregion

  return (
    <View ref={viewRef} style={styles.container}>
      <View style={[styles.rectangle, textStyle]}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={[
              styles.title,
              textStyle,
              {
                textAlign: selectedLanguage != "Arabic" ? "left" : "center",
                fontFamily:
                  selectedLanguage === "English" &&
                  selectedFont === "ScheherazadeNew"
                    ? "Montserrat"
                    : selectedLanguage === "English" &&
                      selectedFont === "MeQuran"
                    ? "TimesRoman"
                    : selectedLanguage === "English" && selectedFont === "Hafs"
                    ? "lexend"
                    : selectedFont,
              },
            ]}
          >
            {selectedLanguage != "Arabic"
              ? (HadithToDisplay = state.isArabicNumbers
                  ? convertToEasternArabicNumerals(TRANSLATION.toString())
                  : TRANSLATION.toString())
              : (HadithToDisplay = state.isArabicNumbers
                  ? convertToEasternArabicNumerals(HADITH.toString())
                  : HADITH.toString())}
          </Text>
          <View style={styles.horizontalLine} />
          <Text style={[styles.description]}>
            {selectedLanguage != "Arabic"
              ? (REFToDisplay = state.isArabicNumbers
                  ? convertToEasternArabicNumerals(REF_TRANSLATION.toString())
                  : REF_TRANSLATION.toString())
              : (REFToDisplay = state.isArabicNumbers
                  ? convertToEasternArabicNumerals(REF.toString())
                  : REF.toString())}
          </Text>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("Menu")}
          style={styles.shareButton}
        ></TouchableOpacity>
        <TouchableOpacity onPress={Share} style={styles.shareButton}>
          <View style={styles.dotContainer}>
            <Text style={[styles.dot, { color: selectedColor }]}>&#8226;</Text>
            <Text style={[styles.dot, { color: selectedColor }]}>&#8226;</Text>
            <Text style={[styles.dot, { color: selectedColor }]}>&#8226;</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HADITHVerseScreen;
