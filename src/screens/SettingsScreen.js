import React, { useEffect } from 'react';
import {  View,
          Text, 
          TouchableOpacity,
          StyleSheet,
          FlatList,
          Switch, 
          ScrollView,
          Dimensions,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useFont } from '../context/FontContext';
import { useColor } from '../context/ColorContext';
import { useNumberContext } from '../context/NumberContext';
import { useLanguage } from '../context/LanguageContext';
import * as Haptics from 'expo-haptics';
import { SettingStyles } from '../Styles/commonStyles';
import Svg, { Path } from "react-native-svg";
import { getColorForTheme } from "../utils/themeUtils";
import initializeScalingUtils from "../utils/core/NormalizeSize"

const SettingScreen = ({ navigation }) => {
  const { selectedTheme, toggleTheme } = useTheme(); 
  const systemTheme = selectedTheme === 'system'; // Check if the theme is set to "system"
  const {selectedLanguage, setLanguage} = useLanguage();
  const { moderateScale } = initializeScalingUtils(Dimensions);

  const { selectedFont, setFont } = useFont();

  const { selectedColor, setColor } = useColor();

  const { state, dispatch, convertToEasternArabicNumerals } = useNumberContext(); // Get the context values


  const toggleSwitch = () => {
    // Dispatch the action to toggle the numbers
    dispatch({ type: 'TOGGLE_NUMBERS' });
  };

  //#region LightTheme
  const lightTheme = StyleSheet.create({
    pageContainer: {
      backgroundColor: "#f2f2f6",
    },
    container: {
      backgroundColor: "#f2f2f6",
    },
    textColor:{
      color:"#000",
    },
    rectangle: {
      backgroundColor: "#fefffe",
      shadowColor: "gray", 
    },
    horizontalLine: {
      borderColor: "rgba(198, 198, 200, 0.45)",
    },
    textColorToggle:{
      color:"#000",
    },
    selectedColorCircle: {
      borderColor: "rgba(198, 198, 200, 0.45)",
    },
  });
  //#endregion

  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    pageContainer: {
      backgroundColor: "#050505",
    },
    container: {
      backgroundColor: "#050505",
    },
    textColor:{
      color:"#fff",
    },
    rectangle: {
      backgroundColor: "#1C1C1E",
      shadowColor: "black", 
    },
    horizontalLine: {
      borderColor: "rgba(84, 84, 84, 0.45)",
    },
    textColorToggle:{
      color:"#fff",
    },
    selectedColorCircle: {
      borderColor: "rgba(84, 84, 84, 0.45)",
    },
  });
  //#endregion
  
  const themeStyles = getColorForTheme(
    { dark: darkTheme, light: lightTheme },
    selectedTheme,
    systemTheme
  );

  //#region ArabicLanguage
  const ArabicLanguage = StyleSheet.create({
    themeOption: {
      flexDirection:"row",
    },
    togglePadding:{
      marginLeft:10,
    },
    toggleContainer:{
      flexDirection: "row-reverse",
    },
    textColorToggle:{
      paddingRight:22
    },
    textColor: {
    },
    horizontalLine: {
      marginRight: 20,
    },
  });
  //#endregion

  //#region EnglishLanguage
  const EnglishLanguage = StyleSheet.create({
    themeOption: {
      flexDirection:"row-reverse",
    },
    togglePadding:{
      marginRight:10,
    },
    toggleContainer:{
      flexDirection: "row",
    },
    textColorToggle:{
      paddingLeft:22
    },
    textColor: {
      fontFamily:"Montserrat",
      marginLeft:5
    },
    horizontalLine: {
      marginLeft: 20,
    },
  });
  //#endregion

  //#region StylesMapping
  const styles = {
    ...SettingStyles,
    pageContainer: {
      ...SettingStyles.pageContainer,
      ...(selectedTheme === "dark"
        ? themeStyles.pageContainer
        : themeStyles.pageContainer),
    },
    container: {
      ...SettingStyles.container,
      ...selectedTheme  === 'dark'? themeStyles.container : themeStyles.container, 
    },
    textColor: {
      ...SettingStyles.textColor,
      ...selectedTheme  === 'dark'? themeStyles.textColor : themeStyles.textColor,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.textColor : ArabicLanguage.textColor ) 
    },
    rectangle: {
      ...SettingStyles.rectangle, 
      ...selectedTheme  === 'dark'? themeStyles.rectangle : themeStyles.rectangle, 
    },
    horizontalLine: {
      ...SettingStyles.horizontalLine, 
      ...selectedTheme  === 'dark'? themeStyles.horizontalLine : themeStyles.horizontalLine,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.horizontalLine : ArabicLanguage.horizontalLine)
    },
    themeOption:{
      ...SettingStyles.themeOption, 
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.themeOption : ArabicLanguage.themeOption ),
    },
    togglePadding:{
      ...SettingStyles.togglePadding, 
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.togglePadding : ArabicLanguage.togglePadding ),
    },
    toggleContainer:{
      ...SettingStyles.toggleContainer, 
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.toggleContainer : ArabicLanguage.toggleContainer ),
    },
    textColorToggle:{
      ...SettingStyles.textColorToggle, 
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.textColorToggle : ArabicLanguage.textColorToggle ),
      ...selectedTheme  === 'dark'? themeStyles.textColorToggle : themeStyles.textColorToggle,
    },
    selectedColorCircle:{
      ...SettingStyles.selectedColorCircle, 
      ...selectedTheme  === 'dark'? themeStyles.selectedColorCircle : themeStyles.selectedColorCircle, 
    }
  };
  //#endregion
  
  
  const AutoSystemTheme = selectedLanguage != "Arabic" ? "System Theme" : "تلقائي";
  const LightSystemTheme = selectedLanguage != "Arabic" ? "Light Theme" : "فاتح";
  const DarkSystemTheme = selectedLanguage != "Arabic" ? "Dark Theme" : "داكن";
  //#region redering ThemItem
  const themes = [
    { label: AutoSystemTheme, value: 'system' },
    { label: LightSystemTheme, value: 'light' },
    { label: DarkSystemTheme, value: 'dark' },
  ];

  const renderThemeItem = ({ item, index }) => (
    <>
      <TouchableOpacity
        style={styles.themeOption}
        onPress={() => {
          if (selectedTheme !== item.value) {
            toggleTheme(item.value);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Trigger haptic feedback
        }
      }}
      activeOpacity={0.7}
      >
        <View style={[styles.themeCircle,{borderColor:selectedColor}]}>
          {selectedTheme === item.value && (
            <View style={[styles.selectedCircle,{backgroundColor:selectedColor}]}></View>
          )}
        </View>
        <Text style={styles.textColor}>{item.label}</Text>
      </TouchableOpacity>
      {index !== themes.length - 1 && <View style={styles.horizontalLine}></View>}
    </>
  );
  //#endregion

  const colorOptions = [ 
    { label: '#FACFAD', value: '#FACFAD' },//Oragish Color
    { label: '#006C67', value: '#006C67' },//Pinkish Color
    { label: '#615de9', value: '#615de9' },//Greenish Color
    { label: '#96E6B3', value: '#96E6B3' },//System Orang Color
    { label: '#4bbfe2', value: '#4bbfe2' },//Blueish Color
  ];
  
  const renderColorItem = ({ item }) => (
    <TouchableOpacity
      style={styles.colorOption}
      onPress={() => {
        if (selectedColor !== item.value) {
          setColor(item.value);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Trigger haptic feedback
        }
      }}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.colorCircle,
          { backgroundColor: item.value },
          selectedColor === item.value && styles.selectedColorCircle,
        ]}
      >
        {selectedColor === item.value && (
          <View style={styles.checkIcon}>
            <Svg width={moderateScale(64)} height={moderateScale(64)} fill="#767676" viewBox="4 4 32 32">
              <Path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/> 
            </Svg>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const systemFontLabel = selectedLanguage != "Arabic" ? "System Font" : "خط النظام";
  const QuranFontLabel = selectedLanguage != "Arabic" ? "Times Font" : "خط القران";
  const HafsFontLabel = selectedLanguage != "Arabic" ? "lexend Font" : "خط حفص";

  //#region renderingFontitem
  const fontOptions = [
    { label: systemFontLabel, value: "ScheherazadeNew" },
    { label: QuranFontLabel, value: "MeQuran" },
    { label: HafsFontLabel, value: "Hafs" },
  ];

  const renderFontItem = ({ item, index }) => (
    <>
      <TouchableOpacity
        style={styles.themeOption}
        onPress={() => {
          if (selectedFont !== item.value) {
            setFont(item.value);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Trigger haptic feedback
        }

      }}
        activeOpacity={0.7}
      >
        <View style={[styles.themeCircle,{borderColor:selectedColor}]}>
          {selectedFont === item.value && (
            <View style={[styles.selectedCircle,{backgroundColor:selectedColor}]}></View>
          )}
        </View>
        <Text style={styles.textColor}>{item.label}</Text>
      </TouchableOpacity>
      {index !== fontOptions.length - 1 && <View style={styles.horizontalLine}></View>}
    </>
  );
  //#endregion


    //#region renderLanguageItem
    const LanguageOptions = [
      { label: 'العربية', value: 'Arabic' },
      { label: 'English', value: 'English' },
    ];
    const renderLanguageItem = ({ item, index }) => (
      <>
        <TouchableOpacity
          style={styles.themeOption}
          onPress={() => {
          if (selectedLanguage !== item.value) {
          setLanguage(item.value);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Trigger haptic feedback
          selectedLanguage != "Arabic" ? navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }], 
          })  
          :navigation.reset({
          index: 0,
          routes: [{ name: 'الأذكار' }], 
          });
        }}
      }
          activeOpacity={0.7}
          
        >
          <View style={[styles.themeCircle,{borderColor:selectedColor}]}>
            {selectedLanguage === item.value && (
              <View style={[styles.selectedCircle,{backgroundColor:selectedColor}]}></View>
            )}
          </View>
          <Text style={styles.textColor}>{item.label}</Text>
        </TouchableOpacity>
        {index !== LanguageOptions.length - 1 && <View style={styles.horizontalLine}></View>}
      </>
    );
    //#endregion
  
  return (
    <View style={styles.pageContainer}>  
      <ScrollView 
      contentContainerStyle={styles.container}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}></TouchableOpacity>
        <View style={[styles.wrapHeaderText,{ alignItems: selectedLanguage != "Arabic" ? "flex-start" : "flex-end",}]}>
        <Text style={styles.HeaderTextColor}>{selectedLanguage != "Arabic" ? "Theme" : "المظهر"}</Text>
        </View>
        <View style={styles.rectangle}>
          <View style={styles.themeOptionsContainer}>
            <FlatList
              data={themes}
              renderItem={renderThemeItem}
              keyExtractor={(item) => item.value}
              extraData={selectedTheme}
              scrollEnabled={false} // Set scrollEnabled to false to make it not scrollable
            />
          </View>
        </View>
        <View style={[styles.wrapHeaderText,{ alignItems: selectedLanguage != "Arabic" ? "flex-start" : "flex-end",}]}>
        <Text style={styles.HeaderTextColor}>{selectedLanguage != "Arabic" ? "Font" : "خط العرض"}</Text>
        </View>
        <View style={styles.rectangle}>
          <View style={styles.fontOptionsContainer}>
            <FlatList
              data={fontOptions}
              renderItem={renderFontItem}
              keyExtractor={(item) => item.value}
              extraData={selectedFont}
              scrollEnabled={false} 
            />
          </View>
        </View>
        <View style={[styles.wrapHeaderText,{ alignItems: selectedLanguage != "Arabic" ? "flex-start" : "flex-end",}]}>
        <Text style={styles.HeaderTextColor}>{selectedLanguage != "Arabic" ? "Language" : "لغة العرض"}</Text>
        </View>
        <View style={styles.rectangle}>
          <View style={styles.fontOptionsContainer}>
            <FlatList
              data={LanguageOptions}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item.value}
              extraData={selectedFont}
              scrollEnabled={false} 
            />
          </View>
        </View>
        <View style={[styles.wrapHeaderText,{ alignItems: selectedLanguage != "Arabic" ? "flex-start" : "flex-end",}]}>
        <Text style={styles.HeaderTextColor}>{selectedLanguage != "Arabic" ? "Color" : "لون التطبيق"}</Text>
        </View>
      <View style={styles.rectangle}>
        <View style={styles.colorOptionsContainer}>
          <FlatList
            data={colorOptions}
            renderItem={renderColorItem}
            keyExtractor={(item) => item.value}
            horizontal={true} // Display colors in a horizontal row
            scrollEnabled={false}
          />
        </View>
      </View>
      <View style={[styles.wrapHeaderText,{ alignItems: selectedLanguage != "Arabic" ? "flex-start" : "flex-end",}]}>
      <Text style={styles.HeaderTextColor}>{selectedLanguage != "Arabic" ? "Numbers Style" : "نظام الارقام"}</Text>
      </View>
        <View style={styles.rectangle}>
          <View style={styles.toggleContainer}>
            <Text style={[styles.textColorToggle]}>
              {
                convertToEasternArabicNumerals('0123456789') 
                }
            </Text>
            <Switch
            style={styles.togglePadding}
              value={state.isArabicNumbers}
              onValueChange={toggleSwitch}
              thumbColor={state.isArabicNumbers ? '#fefffe' : '#fefffe'}
              trackColor={{ true: selectedColor, false: '#454545' }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};




export default SettingScreen;
