import React, { useEffect } from 'react';
import {  View,
          Text, 
          TouchableOpacity,
          StyleSheet,
          FlatList,
          Switch, 
          ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemContex';
import { useFont } from '../context/FontContext';
import { useColor } from '../context/ColorContext';
import { useNumberContext } from '../context/NumberContext';
import { useLanguage } from '../context/LanguageContext';
import * as Haptics from 'expo-haptics';
import { SettingStyles } from '../context/commonStyles';
import Svg, { Path } from "react-native-svg";
import { Appearance } from 'react-native';

const SettingScreen = ({ navigation }) => {
  const { selectedTheme, toggleTheme } = useTheme(); 
  const systemTheme = selectedTheme === 'system'; // Check if the theme is set to "system"
  const {selectedLanguage, setLanguage} = useLanguage();

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
    },
    horizontalLine: {
      borderColor: "#f2f2f6",
    },  
    textColorToggle:{
      color:"#000",
    },
    selectedColorCircle: {
      borderColor: '#5c5b5b',
    },
  });
  //#endregion

  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    pageContainer: {
      backgroundColor: "#151515",
    },
    container: {
      backgroundColor: "#151515",
    },
    textColor:{
      color:"#fff",
    },
    rectangle: {
      backgroundColor: "#262626",
    },
    horizontalLine: {
      borderColor: "#151515",
    },
    textColorToggle:{
      color:"#fff",
    },
    selectedColorCircle: {
      borderColor: '#EBEAEA',
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
    textColor: {},
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
      fontFamily:"Montserrat"
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
    <View>
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
    </View>
  );
  //#endregion

  const colorOptions = [ 
    { label: '#8d5b3c', value: '#8d5b3c' },//Oragish Color
    { label: '#AA767C', value: '#AA767C' },//Pinkish Color
    { label: '#9AB06B', value: '#9AB06B' },//Greenish Color
    { label: '#6081b5', value: '#6081b5' },//Blueish Color
    { label: '#f2b784', value: '#f2b784' },//System Orang Color
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
            <Svg width="64" height="64" fill="#767676" viewBox="4 4 32 32">
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

  // useEffect(() => {
    // if (selectedLanguage === "English" && selectedFont === "ScheherazadeNew") {
    //   selectedFont="Montserrat";
    // }else if (selectedLanguage === "English" && selectedFont === "MeQuran") {
    //   selectedFont="TimesRoman";
    // } else if (selectedLanguage === "English" && selectedFont === "Hafs") {
    //   selectedFont="lexend";
    // }else{
    //   selectedFont;
    // }


  //   } if (selectedLanguage === "Arabic" && selectedFont === "Montserrat") {
  //     setFont("ScheherazadeNew");
  //   } else if (selectedFont === "TimesRoman") {
  //     setFont("MeQuran");
  //   } else if (selectedFont === "lexend"){
  //     setFont("Hafs");
  //   }

  //   if (selectedLanguage === "Arabic" && selectedFont === "ScheherazadeNew") {
  //     setFont("ScheherazadeNew");
  //   } else if (selectedFont === "MeQuran") {
  //     setFont("MeQuran");
  //   } else if (selectedFont === "lexHafsend"){
  //     setFont("Hafs");
  //   }

  //   if (selectedLanguage === "English" && selectedFont === "Montserrat") {
  //     setFont("Montserrat");
  //   }else if (selectedFont === "TimesRoman") {
  //     setFont("TimesRoman");
  //   }else if (selectedFont === "lexend") {
  //     setFont("lexend");
  //   }
  // }, [selectedLanguage]);


  //#region renderingFontitem
  const fontOptions = [
    { label: systemFontLabel, value: "ScheherazadeNew" },
    { label: QuranFontLabel, value: "MeQuran" },
    { label: HafsFontLabel, value: "Hafs" },
  ];

  const renderFontItem = ({ item, index }) => (
    <View>
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
    </View>
  );
  //#endregion


    //#region renderLanguageItem
    const LanguageOptions = [
      { label: 'العربية', value: 'Arabic' },
      { label: 'English', value: 'English' },
    ];
    const renderLanguageItem = ({ item, index }) => (
      <View>
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
      </View>
    );
    //#endregion
  
  return (
    <View style={styles.pageContainer}>  
      <ScrollView 
      contentContainerStyle={styles.container}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}></TouchableOpacity>
        <View style={[styles.wrapHeaderText,{ alignItems: selectedLanguage != "Arabic" ? "flex-start" : "flex-end",}]}>
        <Text style={styles.HeadertextColor}>{selectedLanguage != "Arabic" ? "Theme" : "المظهر"}</Text>
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
        <Text style={styles.HeadertextColor}>{selectedLanguage != "Arabic" ? "Font" : "خط العرض"}</Text>
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
        <Text style={styles.HeadertextColor}>{selectedLanguage != "Arabic" ? "Language" : "لغة العرض"}</Text>
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
        <Text style={styles.HeadertextColor}>{selectedLanguage != "Arabic" ? "Color" : "لون التطبيق"}</Text>
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
      <Text style={styles.HeadertextColor}>{selectedLanguage != "Arabic" ? "Numbers Style" : "نظام الارقام"}</Text>
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
