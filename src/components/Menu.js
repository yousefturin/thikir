import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Menu = ({ navigation }) => {
  const tasbihImage = require("../../assets/tasbihIcon.png");
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          { borderRadius: 10, marginBottom: 30, marginTop: 30 },
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
          { borderBottomRightRadius: 10, borderBottomLeftRadius: 10 },
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 80,
    paddingTop: 30,
  },
  iconWrapperLeft: {
    width: "10%",
  },
  iconWrapper: {
    width: "8%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#454545",
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  nameWrapper: {
    width: "70%",
    
  },
  imageWrapper: {
    width: "1%",
  },
  button: {
    backgroundColor: "#262626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "300",
    textAlign: "right",
    marginRight: 20,
    fontFamily: "ScheherazadeNewBold",
  },
  image: {
    width: 44,
    height: 55,
  },
  icon: {
    marginLeft: 20,
  },
  iconleft: {},
  specialIconleft: {
    width: 24,
    height: 24,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#262626",
    width: 13,
    marginLeft: 360,
  },
});

export default Menu;
