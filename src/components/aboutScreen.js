import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image,ScrollView } from "react-native";
import { useTheme } from '../context/ThemContex';
import { useColor } from '../context/ColorContext';
import { AboutStyles } from '../context/commonStyles';
import { Appearance } from 'react-native';
var pkg = require('../../package.json');
const AboutScreen = ({ navigation }) => {
  const { selectedTheme } = useTheme();
  const { selectedColor, setColor } = useColor();
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
      shadowColor: 'white',
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
      shadowColor: 'black',
    },
    rectangleText: {
      color: "#fff",
    },
  });
  //#endregion
  
  const themeStyles = systemTheme
  ? Appearance.getColorScheme() === 'dark'
    ? darkTheme
    : lightTheme
  : selectedTheme === 'dark'
  ? darkTheme
  : lightTheme;

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
  
  const appIconImage = require("../../assets/icon.png");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Menu")}
      ></TouchableOpacity>
      <Image source={appIconImage} style={styles.appLogoIcon}></Image>
      <Text style={styles.appNameText}>المفردون</Text>
      <Text style={styles.appVersionText}>اﻹصدار: {pkg.version}</Text>
      <View
        style={[
          styles.rectangleWrapper]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          >
        <View>
          <Text style={styles.rectangleText}>
            اسم التطبيق مستوحى من حديث أبي هريرة رضي الله عنه قال: "كان رسول ﷺ يسير في طريقه إلى مكة، فمرَّ على جبل يقال له جمدان" فقال: «سيروا هذا جمدان، سبق
            <Text style={{ color: selectedColor, fontFamily: "ScheherazadeNewBold", }}> المُفَرِّدُونَ</Text>».
            قالوا: "وما المُفَرِّدونَ يا رسول الله"؟!
            قال: «<Text style={{ color: selectedColor, fontFamily: "ScheherazadeNewBold", }}> الذاكرون الله كثيرًا والذاكرات</Text>».

            {'\n'}  <Text style={{ fontSize: 16, fontFamily: "ScheherazadeNew", }}> - (صحيح مسلم [4/2062] برقم [2676])</Text>
          </Text>
        </View>
      </ScrollView>
      </View>
    </View>
  );
};

export default AboutScreen;
