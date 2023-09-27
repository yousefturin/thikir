import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemContex'; 
import { MainStyles } from '../context/commonStyles';
import {Svg, Path,Circle } from 'react-native-svg';
const Menu = ({ navigation }) => {
  const { isDarkMode } = useTheme(); 

  const lightStyles = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6", 
    },
    button: {
      backgroundColor: "#fefffe",
      shadowColor: "white",
    },
    buttonText:{
      color: "#000",
    },
    iconWrapper: {
      backgroundColor: "#e9e9ea",
      shadowColor: "white",
    },
    horizontalLine: {
      borderColor: "#fefffe",
    },  

  });

  const darkStyles = StyleSheet.create({
    container: {
      backgroundColor: "#151515", 
    },
    button: {
      backgroundColor: "#262626",
      shadowColor: "black",
    },
    buttonText:{
      color: "#fff",
    },
    iconWrapper: {
      backgroundColor: "#454545",
      shadowColor: "black",
    },
    horizontalLine: {
      borderColor: "#262626",
    },

  });
  const styles = {
    ...MainStyles,
    container: {
      ...MainStyles.container,
      ...isDarkMode ? darkStyles.container : lightStyles.container, 
    },
    buttonText: {
      ...MainStyles.buttonText, 
      ...isDarkMode ? darkStyles.buttonText : lightStyles.buttonText, 
    },
    button: {
      ...MainStyles.button, 
      ...isDarkMode ? darkStyles.button : lightStyles.button, 
    },
    iconWrapper: {
      ...MainStyles.iconWrapper, 
      ...isDarkMode ? darkStyles.iconWrapper : lightStyles.iconWrapper, 
    },
    horizontalLine: {
      ...MainStyles.horizontalLine, 
      ...isDarkMode ? darkStyles.horizontalLine : lightStyles.horizontalLine, 
    },
  };

  const tasbihImage = require("../../assets/tasbihIcon.png");
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          { borderRadius: 10, marginBottom: 30, marginTop: 30 },
        ]}
        onPress={() => navigation.navigate("التذكيرات")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#454545"
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>التذكيرات</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Ionicons
            name="notifications"
            size={24}
            color="#fff"
            style={styles.iconleft}
          />
        </View>
        <View style={styles.imageWrapper}>
          {/* Image component */}
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          { borderTopRightRadius: 10, borderTopLeftRadius: 10 },
        ]}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#454545"
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>السبحة</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Image source={tasbihImage} style={styles.specialIconleft}></Image>
        </View>
        <View style={styles.imageWrapper}>
          {/* Image component */}
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate("الأذكار المفضلة")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#454545"
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>الأذكار المفضلة</Text>
        </View>
        <View style={styles.iconWrapper}>
        <Svg width={24} height={24} viewBox="0 0 256 256">
                        <Path
                            d="M128,216S28,160,28,92A52,52,0,0,1,128,72h0A52,52,0,0,1,228,92C228,160,128,216,128,216Z"
                            stroke= '#4b1818'// Border color
                            strokeWidth={2} // Border width
                            stroke-linecap="round"
                            fill='#b83f3f'
                        />
                        </Svg>
        </View>
        <View style={styles.imageWrapper}>
          {/* Image component */}
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate("آية")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#454545"
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>آية</Text>
        </View>
        <View style={styles.iconWrapper}>
        <Svg width={24} height={24} viewBox="0 0 256 256">
                        <Path
                           d="M128,88a32,32,0,0,1,32-32h64a8,8,0,0,1,8,8V192a8,8,0,0,1-8,8H160a32,32,0,0,0-32,32"
                            fill="#406757" 
                            stroke="#20342b" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="12"
                        />
                        <Path
                           d="M24,192a8,8,0,0,0,8,8H96a32,32,0,0,1,32,32V88A32,32,0,0,0,96,56H32a8,8,0,0,0-8,8Z"
                            fill="#406757" 
                            stroke="#20342b" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="12"
                        />
                        </Svg>
        </View>
        
        <View style={styles.imageWrapper}>
          {/* Image component */}
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate("حديث")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#454545"
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>حديث</Text>
        </View>
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons
            name="bookshelf"
            size={24}
            color="#fff"
            style={styles.iconleft}
          />
        </View>
        
        <View style={styles.imageWrapper}>
          {/* Image component */}
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate("دعاء")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#454545"
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>دعاء</Text>
        </View>
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons
            name="hands-pray"
            size={24}
            color="#fff"
            style={styles.iconleft}
          />
        </View>
        
        <View style={styles.imageWrapper}>
          {/* Image component */}
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("الاعدادات")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#454545"
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>الاعدادات</Text>
        </View>
        <View style={styles.iconWrapper}>
        <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              fill="#000"
                stroke="#000" 
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Circle cx="12" cy="12" r="3" fill={"#e9e9ea"}></Circle>
            </Svg>
        </View>
        <View style={styles.imageWrapper}>
          {/* Image component */}
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[
          styles.button,
          
        ]}
        onPress={() => navigation.navigate("عن البرنامج")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#454545"
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>عن البرنامج</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Ionicons
            name="information-circle"
            size={23}
            color="#fff"
            style={styles.iconleft}
          />
        </View>
        <View style={styles.imageWrapper}>
          {/* Image component */}
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[
          styles.button,
          { borderBottomRightRadius: 10, borderBottomLeftRadius: 10 },
        ]}
        onPress={() => navigation.navigate("الابلاغ عن مشكلة")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#454545"
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>الابلاغ عن مشكلة</Text>
        </View>
        <View style={styles.iconWrapper}>
          <MaterialIcons
            name="report-problem"
            size={23}
            color="#fff"
            style={styles.iconleft}
          />
        </View>
        <View style={styles.imageWrapper}>
          {/* Image component */}
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <Text
        style={[
          {
            height: 200,
            width: "50%",
            textAlign: "center",
            color: "#be915a",
            fontFamily: "ScheherazadeNew",
          },
        ]}
      ></Text>
    </View>
  );
};



export default Menu;
