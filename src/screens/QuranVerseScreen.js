import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { handleShare } from "../Service/ShareService";
import { useTheme } from '../context/ThemeContext'; 
import { useFont } from "../context/FontContext";
import { useColor } from '../context/ColorContext';
import { useLanguage } from "../context/LanguageContext";
import { QuranVerseStyles } from '../Styles/commonStyles';
import { useNumberContext } from '../context/NumberContext';
import { getColorForTheme } from "../utils/themeUtils";
import { useRandomVerse } from "../Service/QuranVerseService";

const QuranVerseScreen = ({ navigation }) => {
  const { selectedTheme } = useTheme();
  const { selectedFont } = useFont();
  const { selectedColor } = useColor();
  const { selectedLanguage } = useLanguage();
  const { state, convertToEasternArabicNumerals } = useNumberContext(); 
  const systemTheme = selectedTheme === 'system';

  const verseData = useRandomVerse();

  //#region selectedFont
  const HafsFont = StyleSheet.create({
      title:{
          fontFamily:"Hafs",
      }
  });
  const ScheherazadeNewFont = StyleSheet.create({
      title:{
          fontFamily:"ScheherazadeNew",
      }
  });
  const MeQuranFont = StyleSheet.create({
      title:{
          fontFamily:"MeQuran",
      }
  });
  //#endregion

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
      borderColor: "#f2f2f6",
  },
  });
  //#endregion
  
  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    container: {
      backgroundColor: "#151515", 
    },
    rectangle: {
      backgroundColor: "#262626",
    },
    title: {
      color: "#fff",
    },
    horizontalLine: {
      borderColor: "#151515",
  },
  });
  //#endregion
  const themeStyles = getColorForTheme(
    { dark: darkTheme, light: lightTheme },
    selectedTheme,
    systemTheme
  );

  //#region StyleMapping
  const styles = {
    ...QuranVerseStyles,
    container: {
      ...QuranVerseStyles.container,
      ...selectedTheme  === 'dark'? themeStyles.container : themeStyles.container, 
    },
    rectangle: {
      ...QuranVerseStyles.rectangle, 
      ...selectedTheme  === 'dark'? themeStyles.rectangle : themeStyles.rectangle, 
    },
    title: {
      ...QuranVerseStyles.title, 
      ...selectedTheme  === 'dark'? themeStyles.title : themeStyles.title, 
      ...(selectedFont === 'MeQuran' ? MeQuranFont.title : (selectedFont === 'ScheherazadeNew' ? ScheherazadeNewFont.title : HafsFont.title)),
    },
    horizontalLine: {
      ...QuranVerseStyles.horizontalLine,
      ...(selectedTheme  === 'dark'? themeStyles.horizontalLine : themeStyles.horizontalLine),
  },
  };
  //#endregion

  const [maxFontSizeDescription, setMaxFontSizeDescription] = useState(20);
  const [maxPadding, setMaxPadding] = useState(60);
  const [maxpaddingHorizontal, setMaxpaddingHorizontal] = useState(20);
  const [textLength, setTextLength] = useState(verseData.verseTextLength);
  const viewRef = React.useRef();
  //#endregion
  
  useEffect(() => {
    let MaxFontSize = 20;
    let maxPadding = 30;
    let maxpaddingHorizontal = 20;

    if (textLength > 1200) {
      MaxFontSize = 16;
      maxPadding = 20;
      maxpaddingHorizontal = 10;
    } else if (textLength < 100) {
      MaxFontSize = 27;
      maxPadding = 20;
      maxpaddingHorizontal = 20;
    }

    setMaxFontSizeDescription(MaxFontSize);
    setMaxPadding(maxPadding);
    setMaxpaddingHorizontal(maxpaddingHorizontal);
  }, [textLength]);
  
    const textStyle = {
      fontSize: maxFontSizeDescription,
      padding: maxPadding,
      paddingHorizontal: maxpaddingHorizontal,
    };
    //#endregion


  const Share = async () => {
    await handleShare(viewRef.current);
  };


  
  return (

    <View ref={viewRef} style={styles.container}>
      <View style={[styles.rectangle, textStyle]}>
      <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          >
        <Text style={[styles.title, textStyle]}>
          {verseData.verseText} 
          ﴿ 
          {ayahNumberToDisplay = state.isArabicNumbers
          ? convertToEasternArabicNumerals(verseData.ayahNumber.toString())
          : verseData.ayahNumber.toString()}﴾
        </Text>
        <View style={styles.horizontalLine} />
        <Text style={[styles.tafsirStyle,
        {fontFamily:selectedLanguage!="Arabic"? "Montserrat":"AmiriFont",
        textAlign:selectedLanguage!="Arabic"? "left": "right",
        }]}>
        {selectedLanguage!="Arabic"?verseData.EnTafsir:verseData.tafsir}</Text>

        <Text style={styles.description}>
        [ {selectedLanguage!= "Arabic"?verseData.surahNameEn:verseData.surahName} ]</Text>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("Menu")}
          style={styles.shareButton}
        ></TouchableOpacity>
        <TouchableOpacity onPress={Share} style={styles.shareButton}>
          <View style={styles.dotContainer}>
            <Text style={[styles.dot,{color:selectedColor}]}>&#8226;</Text>
            <Text style={[styles.dot,{color:selectedColor}]}>&#8226;</Text>
            <Text style={[styles.dot,{color:selectedColor}]}>&#8226;</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default QuranVerseScreen;
