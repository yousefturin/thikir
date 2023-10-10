import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../context/ThemContex';
import { useFont } from '../context/FontContext';
import { SettingStyles } from '../context/commonStyles';

const SettingScreen = ({ navigation }) => {
  const { selectedTheme, toggleTheme } = useTheme(); 
  const { selectedFont, setFont } = useFont();
  
  
  const currentTheme = selectedTheme === 'dark' ? darkTheme : lightTheme; 

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

  //#region StylesMapping
  const styles = {
    ...SettingStyles,
    container: {
      ...SettingStyles.container,
      ...selectedTheme  === 'dark'? darkTheme.container : lightTheme.container, 
    },
    textColor: {
      ...SettingStyles.textColor,
      ...selectedTheme  === 'dark'? darkTheme.textColor : lightTheme.textColor, 
    },
    rectangle: {
      ...SettingStyles.rectangle, 
      ...selectedTheme  === 'dark'? darkTheme.rectangle : lightTheme.rectangle, 
    },
    horizontalLine: {
      ...SettingStyles.horizontalLine, 
      ...selectedTheme  === 'dark'? darkTheme.horizontalLine : lightTheme.horizontalLine, 
    },
  };
  //#endregion

  //#region redering ThemItem
  const themes = [
    { label: 'داكن', value: 'dark' },
    { label: 'فاتح', value: 'light' },
    { label: 'تلقائي', value: 'system' },
  ];

  const renderThemeItem = ({ item, index }) => (
    <View>
      <TouchableOpacity
        style={styles.themeOption}
        onPress={() => toggleTheme(item.value)}
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
    { label: '#F2B784', value: '#F2B784' },
    { label: '#6682C3', value: '#6682C3' },
    { label: '#9AB06B', value: '#9AB06B' },
    { label: '#AA767C', value: '#AA767C' },
    { label: '#CD7845', value: '#CD7845' },
  ];
  
  const renderColorItem = ({ item }) => (
    <TouchableOpacity
      style={styles.colorOption}
      onPress={() => setColor(item.value)} // Assuming you have a function to set the selected color
    >
      <View style={[styles.colorCircle, { backgroundColor: item.value }]}></View>
    </TouchableOpacity>
  );

  //#region renderingFontitem
  const fontOptions = [
    { label: 'خط النظام', value: 'ScheherazadeNew' },
    { label: 'خط القران', value: 'MeQuran' },
    { label: 'خط حفص', value: 'Hafs' },
  ];

  const renderFontItem = ({ item, index }) => (
    <View>
      <TouchableOpacity
        style={styles.themeOption}
        onPress={() => setFont(item.value)}
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
      <Text style={styles.HeadertextColor}>المظهر</Text>
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
      <Text style={styles.HeadertextColor}>خط العرض</Text>
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
      <Text style={styles.HeadertextColor}>لون التطبيق</Text>
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
      <Text style={styles.HeadertextColor}>أيقون التطبيق</Text>
      <View style={styles.rectangle}>
        <View style={styles.fontOptionsContainer}>
        {/*Need to render the 5 icons that user will select any of to change the app icon*/}
          <FlatList
            scrollEnabled={false} 
          />
        </View>
      </View>
    </View>
  );
};




export default SettingScreen;
