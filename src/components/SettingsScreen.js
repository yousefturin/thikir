import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, FlatList } from 'react-native';
import { useTheme } from '../context/ThemContex';
import { useFont } from '../context/FontContext';

const SettingScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { selectedFont, setFont } = useFont();

  const fontOptions = [
    { label: 'شهرازاد نو عريض', value: 'ScheherazadeNewBold' },
    { label: 'شهرازاد نو', value: 'ScheherazadeNew' },
    { label: 'العميري', value: 'AmiriFont' },
  ];

  const lightTheme = {
    backgroundColor: "#f2f2f6", 
    textColor: '#000000',
  };
  

  const darkTheme = {
    backgroundColor: '#151515',
    textColor: '#FFFFFF',
  };
  
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.fontOption,
        { backgroundColor: selectedFont === item.value ? "#f2b784" : 'transparent' },
      ]}
      onPress={() => setFont(item.value)}
    >
      <Text style={{ color: currentTheme.textColor, fontFamily: item.value }}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
      </TouchableOpacity>
      <View style={[styles.rectangle]}>
      <View style={styles.toggleContainer}>
        <Text style={{ color: currentTheme.textColor }}>تغير لون النظام</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? '#fefffe' : '#fefffe'} 
          trackColor={{ true: '#f2b784', false: '#454545' }}
        />
      </View>
      </View>
      <View style={[styles.rectangle]}>
      <View style={styles.fontOptionsContainer}>
        <Text style={[{ color: currentTheme.textColor },styles.textRectangle]}>أختر خط العرض</Text>
        <FlatList
          data={fontOptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.value}
          extraData={selectedFont}
        />
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 120,
  },
  toggleContainer: {
    flexDirection: "row-reverse",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  fontOptionsContainer: {
    flexDirection: "row-reverse",
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  fontOption: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width:"50%",
    alignItems:"center"
  },
  rectangle: {
    backgroundColor: "#fefffe",
    borderRadius: 10,
    marginTop: 20,
    width: "90%",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  textRectangle :{
    textAlignVertical:"center",
    paddingTop:60
  },
});

export default SettingScreen;
