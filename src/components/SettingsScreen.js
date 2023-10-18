import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList,Switch } from 'react-native';
import { useTheme } from '../context/ThemContex';
import { useFont } from '../context/FontContext';
import { useColor } from '../context/ColorContext';
import {useNumberContext } from '../context/NumberContext'
import { SettingStyles } from '../context/commonStyles';
import Svg, { Path } from "react-native-svg";
import { Appearance } from 'react-native';

const SettingScreen = ({ navigation }) => {
  const { selectedTheme, toggleTheme } = useTheme(); 
  const { selectedFont, setFont } = useFont();
  const { selectedColor, setColor } = useColor();
  const { state, dispatch, convertToEasternArabicNumerals } = useNumberContext(); // Get the context values
  const systemTheme = selectedTheme === 'system'; // Check if the theme is set to "system"
  const toggleSwitch = () => {
    // Dispatch the action to toggle the numbers
    dispatch({ type: 'TOGGLE_NUMBERS' });
  };

  const orangeMain = StyleSheet.create({
    themeCircle:{
      borderColor:"#f2b784"
    },
    selectedCircle:{
      backgroundColor: '#f2b784',
    },
  });
  
  const pink = StyleSheet.create({
    themeCircle:{
      borderColor:"#6682C3"
    },
    selectedCircle:{
      backgroundColor: '#6682C3',
    },
  });
  const green = StyleSheet.create({
    themeCircle:{
      borderColor:"#9AB06B"
    },
    selectedCircle:{
      backgroundColor: '#9AB06B',
    },
  });
  const blue = StyleSheet.create({
    themeCircle:{
      borderColor:"#AA767C"
    },
    selectedCircle:{
      backgroundColor: '#AA767C',
    },
  });
  const peach = StyleSheet.create({
    themeCircle:{
      borderColor:"#CD7845"
    },
    selectedCircle:{
      backgroundColor: '#CD7845',
    },
  });

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
      shadowColor: "white",
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
      shadowColor: "black",
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
    themeCircle: {
      ...SettingStyles.themeCircle,
      ...(selectedColor === '#f2b784'
        ? orangeMain.themeCircle
        : selectedColor === '#6682C3'
        ? pink.themeCircle
        : selectedColor === '#9AB06B'
        ? green.themeCircle
        : selectedColor === '#AA767C'
        ? blue.themeCircle
        : peach.themeCircle),
    },
    selectedCircle: {
      ...SettingStyles.selectedCircle,
      ...(selectedColor === '#f2b784'
        ? orangeMain.selectedCircle
        : selectedColor === '#6682C3'
        ? pink.selectedCircle
        : selectedColor === '#9AB06B'
        ? green.selectedCircle
        : selectedColor === '#AA767C'
        ? blue.selectedCircle
        : peach.selectedCircle),
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
        onPress={() => toggleTheme(item.value)}
        activeOpacity={0.7}
      >
        <View style={styles.themeCircle}>
          {selectedTheme === item.value && (
            <View style={styles.selectedCircle}></View>
          )}
        </View>
        <Text style={styles.textColor}>{item.label}</Text>
      </TouchableOpacity>
      {index !== themes.length - 1 && <View style={styles.horizontalLine}></View>}
    </View>
  );
  //#endregion

  const colorOptions = [
    { label: '#CD7845', value: '#CD7845' },
    { label: '#AA767C', value: '#AA767C' },
    { label: '#9AB06B', value: '#9AB06B' },
    { label: '#6682C3', value: '#6682C3' },
    { label: '#f2b784', value: '#f2b784' },
  ];
  
  const renderColorItem = ({ item }) => (
    <TouchableOpacity
      style={styles.colorOption}
      onPress={() => setColor(item.value)} 
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
        onPress={() => setFont(item.value)}
        activeOpacity={0.7}
      >
        <View style={styles.themeCircle}>
          {selectedFont === item.value && (
            <View style={styles.selectedCircle}></View>
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
            scrollEnabled={false} // Set scrollEnabled to false to make it not scrollable
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
