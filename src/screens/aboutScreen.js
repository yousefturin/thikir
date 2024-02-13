import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image,ScrollView } from "react-native";
import { useTheme } from '../context/ThemeContext';
import { useColor } from '../context/ColorContext';
import { useLanguage } from "../context/LanguageContext";
import { AboutStyles } from '../Styles/commonStyles';
import { getColorForTheme } from "../utils/themeUtils";
var pkg = require('../../package.json');

const AboutScreen = ({ navigation }) => {
  const { selectedTheme } = useTheme();
  const { selectedColor } = useColor();
  const { selectedLanguage } = useLanguage();
  const systemTheme = selectedTheme === 'system'; // Check if the theme is set to "system"
  
  //#region LightTheme
  const lightTheme = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6", 
    },
    appNameText: {
      color: "#000",
    },
    horizontalLine: {
      borderColor: "#fefffe",
    },  
    rectangleWrapper: {
      backgroundColor: "#fefffe",
    },
    rectangleText: {
      color: "#000",
    },
  });
  //#endregion
  
  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    container: {
      backgroundColor: "#151515", 
    },
    appNameText: {
      color: "#fff",
    },
    horizontalLine: {
      borderColor: "#262626",
    }, 
    rectangleWrapper: {
      backgroundColor: "#262626",
    },
    rectangleText: {
      color: "#fff",
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
    ...AboutStyles,
    container: {
      ...AboutStyles.container,
      ...selectedTheme === 'dark' ? themeStyles.container : themeStyles.container, 
    },
    appNameText: {
      ...AboutStyles.appNameText, 
      ...selectedTheme === 'dark' ? themeStyles.appNameText : themeStyles.appNameText, 
    },
    rectangleWrapper: {
      ...AboutStyles.rectangleWrapper, 
      ...selectedTheme === 'dark' ? themeStyles.rectangleWrapper : themeStyles.rectangleWrapper, 
    },
    rectangleText: {
      ...AboutStyles.rectangleText, 
      ...selectedTheme === 'dark' ? themeStyles.rectangleText : themeStyles.rectangleText, 
    },
    horizontalLine: {
      ...AboutStyles.horizontalLine, 
      ...selectedTheme  === 'dark'? themeStyles.horizontalLine : themeStyles.horizontalLine, 
    },
  };
  //#endregion
  
  const appIconImage = require("../../assets/Images/icon.png");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Menu")}
      ></TouchableOpacity>
      <Image source={appIconImage} style={styles.appLogoIcon}></Image>
      <Text style={[styles.appNameText, {fontFamily:selectedLanguage!="Arabic"?"MontserratBold": "ScheherazadeNewBold"}]}>{selectedLanguage!="Arabic"?"AL Mufrdun":"المفردون"}</Text>
      <Text style={styles.appVersionText}>{selectedLanguage!="Arabic"? "Version:":"اﻹصدار:"} {pkg.version}</Text>
      <View
        style={[
          styles.rectangleWrapper]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          >
        <View>
        {selectedLanguage!="Arabic"? (

          <Text style={[styles.rectangleText,{textAlign:"left",fontSize:16,fontFamily:"Montserrat"}]}>

              The Name is Inspired from Abu Huraira where he reported that Allah's Messenger ﷺ was travelling along the path leading to Mecca that he happened to pass by a mountain called Jumdan. He said:
              Proceed on, it is Jumdan, 
              <Text style={{ color: selectedColor, fontFamily: "MontserratBold", }}> Mufarradun </Text>
              have gone ahead. They (the Companions of the Holy Prophet) said: Allah's Messenger ﷺ, who are Mufarradun? He said: 
              «<Text style={{ color: selectedColor, fontFamily: "MontserratBold", }}>They are those who remember Allah much</Text>».

              {'\n\n'}  <Text style={{ fontSize: 13, fontFamily: "Montserrat"}}> - ( Sahih Muslim [4/2062] No: [2676])</Text>
              </Text>


          ):(
            <Text style={styles.rectangleText}>

          اسم التطبيق مستوحى من حديث أبي هريرة رضي الله عنه قال: "كان رسول ﷺ يسير في طريقه إلى مكة، فمرَّ على جبل يقال له جمدان" فقال: «سيروا هذا جمدان، سبق
          <Text style={{ color: selectedColor, fontFamily: "ScheherazadeNewBold", }}> المُفَرِّدُونَ</Text>».
          قالوا: "وما المُفَرِّدونَ يا رسول الله"؟!
          قال: «<Text style={{ color: selectedColor, fontFamily: "ScheherazadeNewBold", }}> الذاكرون الله كثيرًا والذاكرات</Text>».

          {'\n'}  <Text style={{ fontSize: 16, fontFamily: "ScheherazadeNew", }}> - (صحيح مسلم [4/2062] برقم [2676])</Text>
          </Text>
          )}
        </View>
      </ScrollView>
      </View>
    </View>
  );
};

export default AboutScreen;
