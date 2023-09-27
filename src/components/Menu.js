import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemContex'; 
import { MainStyles } from '../context/commonStyles';
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
          <FontAwesomeIcon
            name="bookmark"
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
          <Ionicons
            name="book"
            size={23}
            color="#fff"
            style={[styles.iconleft]}
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
          <FontAwesomeIcon
            name="cog"
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
