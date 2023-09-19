import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"; 
import { Ionicons } from '@expo/vector-icons';


const tasbihImage = require('../../assets/tasbihIcon.png');


const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
          <TouchableOpacity
      style={[styles.button, {borderRadius:10,marginBottom:30, marginTop: 30, }]}
        
      >
        <View style={styles.iconWrapper}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#d1c9c3"
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
      style={[styles.button, {borderTopRightRadius: 10,
    borderTopLeftRadius: 10, }]}
      >
        <View style={styles.iconWrapper}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#d1c9c3"
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>السبحة</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Image source={tasbihImage} style={styles.specialIconleft}>

          </Image>
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
      >
        <View style={styles.iconWrapper}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#d1c9c3"
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
        style={styles.button}
        onPress={() => navigation.navigate("الاعدادات")}
      >
        <View style={styles.iconWrapper}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#d1c9c3"
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
              style={[styles.button, {borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10, }]}
        onPress={() => navigation.navigate("عن البرنامج")}
      >
        <View style={styles.iconWrapper}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color="#d1c9c3"
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>عن البرنامج</Text>
        </View>
        <View style={styles.iconWrapper}>
          <FontAwesomeIcon
            name="info-circle"
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
  iconWrapper: {
    width: "10%",
    alignItems: "center",
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

  },
  buttonText: {
    color: "#dddddd",
    fontSize: 18,
    fontWeight: "300",
    textAlign: "right",
    marginRight: 20,
    fontFamily: "ScheherazadeNew",
  },
  image: {
    width: 44,
    height: 55,
  },
  icon: {
    marginLeft: 20,
  },
  iconleft: {
    marginRight: 20,
  },
  specialIconleft:{
    marginRight: 20,
    width:24,
    height:24,
    color:'white',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#262626",
    marginLeft: 360,
  },
});

export default Menu;
