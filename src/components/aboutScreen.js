import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
var pkg = require('../../package.json');

const AboutScreen = ({ navigation }) => {
  const appIconImage = require("../../assets/AppIcon.png");
  return (

    
    <View style={styles.container}>
      {/* Navigation bar */}
      {/* Add your navigation bar here */}
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
        <View style={styles.rectangleText}>
        <Text style={styles.rectangleText}>
  اسم التطبيق مستوحى من حديث أبي هريرة رضي الله عنه قال: "كان رسول ﷺ يسير في طريقه إلى مكة، فمرَّ على جبل يقال له جمدان" فقال: «سيروا هذا جمدان، سبق 
  <Text style={{ color: '#7a9aff' ,    fontFamily: "ScheherazadeNewBold",}}> المُفَرِّدُونَ</Text>».
  قالوا: "وما المُفَرِّدونَ يا رسول الله"؟!
  قال: «<Text style={{ color: '#7a9aff' ,    fontFamily: "ScheherazadeNewBold",}}> الذاكرون الله كثيرًا والذاكرات</Text>».

  {'\n'}  <Text style={{ fontSize:16,    fontFamily: "ScheherazadeNew",}}> - (صحيح مسلم [4/2062] برقم [2676])</Text>
</Text>
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
    paddingBottom: 80,
    paddingTop:50,
  },
  appNameText:{
    color: "#fff",
    fontSize: 28,
    fontFamily: "ScheherazadeNewBold",
    marginTop: 10,
  },
  appVersionText:{
    color: "#454545",
    fontSize: 12,
  },
  rectangleWrapper: {
    marginTop:30,
    height:180,
    borderRadius:10,
    backgroundColor: "#262626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
  },
  rectangleText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "300",
    textAlign: "right",
    marginHorizontal:5,
    fontFamily: "ScheherazadeNew",
  },
  appLogoIcon: {
    width: 126,
    height: 126,
    borderRadius: 27,
    shadowColor: "black", // For iOS
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 12,
    shadowRadius: 6,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#262626",
    marginLeft: 360,
  },
});
export default AboutScreen;
