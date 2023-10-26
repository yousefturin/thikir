import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList,Switch } from 'react-native';
import { useTheme } from '../context/ThemContex';
import { useFont } from '../context/FontContext';
import { useColor } from '../context/ColorContext';
import {useNumberContext } from '../context/NumberContext'
import * as Haptics from 'expo-haptics';
import { SettingStyles } from '../context/commonStyles';
import Svg, { Path } from "react-native-svg";
import { Appearance } from 'react-native';

const SettingScreen = ({ navigation }) => {
  const { selectedTheme, toggleTheme } = useTheme(); 
  const systemTheme = selectedTheme === 'system'; // Check if the theme is set to "system"
  
  const { selectedFont, setFont } = useFont();

  const { selectedColor, setColor } = useColor();

  const { state, dispatch, convertToEasternArabicNumerals } = useNumberContext(); // Get the context values


  const toggleSwitch = () => {
    // Dispatch the action to toggle the numbers
    dispatch({ type: 'TOGGLE_NUMBERS' });
  };

  //#region LightTheme
  const lightTheme = StyleSheet.create({
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
  });
  //#endregion

  //#region DarkTheme
  const darkTheme = StyleSheet.create({
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
  });
  //#endregion
  
  const themeStyles = systemTheme
    ? Appearance.getColorScheme() === 'dark'
      ? darkTheme
      : lightTheme
    : selectedTheme === 'dark'
    ? darkTheme
    : lightTheme;

  //#region StylesMapping
  const styles = {
    ...SettingStyles,
    container: {
      ...SettingStyles.container,
      ...selectedTheme  === 'dark'? themeStyles.container : themeStyles.container, 
    },
    textColor: {
      ...SettingStyles.textColor,
      ...selectedTheme  === 'dark'? themeStyles.textColor : themeStyles.textColor, 
    },
    rectangle: {
      ...SettingStyles.rectangle, 
      ...selectedTheme  === 'dark'? themeStyles.rectangle : themeStyles.rectangle, 
    },
    horizontalLine: {
      ...SettingStyles.horizontalLine, 
      ...selectedTheme  === 'dark'? themeStyles.horizontalLine : themeStyles.horizontalLine, 
    },
  };
  //#endregion

  //#region redering ThemItem
  const themes = [
    { label: 'تلقائي', value: 'system' },
    { label: 'فاتح', value: 'light' },
    { label: 'داكن', value: 'dark' },
  ];

  const renderThemeItem = ({ item, index }) => (
    <View>
      <TouchableOpacity
        style={styles.themeOption}
        onPress={() => {
        toggleTheme(item.value);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Trigger haptic feedback
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
    { label: '#495064', value: '#495064' },//Blueish Color
    { label: '#f2b784', value: '#f2b784' },//System Orang Color
  ];
  
  const renderColorItem = ({ item }) => (
    <TouchableOpacity
      style={styles.colorOption}
      onPress={() => {
        setColor(item.value);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Trigger haptic feedback
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

  //#region renderingFontitem
  const fontOptions = [
    { label: 'خط النظام', value: 'ScheherazadeNew' },
    { label: 'خط القران', value: 'MeQuran' },
    { label: 'خط حفص ', value: 'Hafs' },
  ];

  const renderFontItem = ({ item, index }) => (
    <View>
      <TouchableOpacity
        style={styles.themeOption}
        onPress={() => {
        setFont(item.value);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Trigger haptic feedback
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
  
  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}></TouchableOpacity>
      <View style={[styles.wrapHeaderText,{ alignItems:"flex-end",}]}>
      <Text style={styles.HeadertextColor}>المظهر</Text>
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
      <View style={[styles.wrapHeaderText,{ alignItems:"flex-end",}]}>
      <Text style={styles.HeadertextColor}>خط العرض</Text>
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
      <View style={[styles.wrapHeaderText,{ alignItems:"flex-end",}]}>
      <Text style={styles.HeadertextColor}>لون التطبيق</Text>
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
    <View style={[styles.wrapHeaderText,{ alignItems:"flex-end",}]}>
    <Text style={styles.HeadertextColor}>نظام الارقام</Text>
    </View>
      <View style={styles.rectangle}>
        <View style={[{     
                  flexDirection: "row-reverse",
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                  height:50}]}>
          <Text style={[styles.textColor,{paddingRight:22}]}>
            {
               convertToEasternArabicNumerals('0123456789') 
              }
          </Text>
          <Switch
          style={[{marginLeft:10}]}
            value={state.isArabicNumbers}
            onValueChange={toggleSwitch}
            thumbColor={state.isArabicNumbers ? '#fefffe' : '#fefffe'}
            trackColor={{ true: selectedColor, false: '#454545' }}
          />
        </View>
      </View>
    </View>
  );
};




export default SettingScreen;
