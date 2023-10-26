import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemContex";
import { useColor } from "../context/ColorContext";
import { MainStyles } from "../context/commonStyles";
import { Appearance } from "react-native";
import SvgComponent from "../../assets/svgComponents";

const Menu = ({ navigation }) => {
  const { selectedTheme } = useTheme();
  const { selectedColor, setColor } = useColor();
  const systemTheme = selectedTheme === "system";
  //#region LightTheme
  const lightTheme = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6",
    },
    button: {
      backgroundColor: "#fefffe",

    },
    buttonText: {
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
  //#endregion

  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    container: {
      backgroundColor: "#151515",
    },
    button: {
      backgroundColor: "#262626",
    },
    buttonText: {
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
  //#endregion
  const themeStyles = systemTheme
    ? Appearance.getColorScheme() === "dark"
      ? darkTheme
      : lightTheme
    : selectedTheme === "dark"
    ? darkTheme
    : lightTheme;

  //#region StyleMapping
  const styles = {
    ...MainStyles,
    container: {
      ...MainStyles.container,
      ...(selectedTheme === "dark"
        ? themeStyles.container
        : themeStyles.container),
    },
    buttonText: {
      ...MainStyles.buttonText,
      ...(selectedTheme === "dark"
        ? themeStyles.buttonText
        : themeStyles.buttonText),
    },
    button: {
      ...MainStyles.button,
      ...(selectedTheme === "dark" ? themeStyles.button : themeStyles.button),
    },
    iconWrapper: {
      ...MainStyles.iconWrapper,
      ...(selectedTheme === "dark"
        ? themeStyles.iconWrapper
        : themeStyles.iconWrapper),
    },
    horizontalLine: {
      ...MainStyles.horizontalLine,
      ...(selectedTheme === "dark"
        ? themeStyles.horizontalLine
        : themeStyles.horizontalLine),
    },
  };
  //#endregion

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
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>التذكيرات</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="ThikirAlarmSVG" style={styles.iconleft} />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          { borderTopRightRadius: 10, borderTopLeftRadius: 10 },
        ]}
        onPress={() => navigation.navigate("سبحة")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>السبحة</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="TasbihSVG" style={styles.iconleft} />
        </View>
        <View style={styles.imageWrapper}>
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
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>الأذكار المفضلة</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="FavThikirSVG" style={styles.iconleft} />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate("أسماء الله الحسنى")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>أسماء الله الحسنى</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="NamesOfAllahSVG" style={styles.iconleft} />
        </View>

        <View style={styles.imageWrapper}>
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
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>آية</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="AyaSVG" style={styles.iconleft} />
        </View>

        <View style={styles.imageWrapper}>
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
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>حديث</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="HadithSVG" style={styles.iconleft} />
        </View>

        <View style={styles.imageWrapper}>
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate("القبلة")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>القبلة</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="QiblaSVG" style={styles.iconleft} />
        </View>

        <View style={styles.imageWrapper}>
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>

      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[
          styles.button,
          { borderBottomRightRadius: 10, borderBottomLeftRadius: 10 },
        ]}
        onPress={() => navigation.navigate("دعاء")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>دعاء</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="DuaaSVG" style={styles.iconleft} />
        </View>

        <View style={styles.imageWrapper}>
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          { borderTopRightRadius: 10, borderTopLeftRadius: 10, marginTop: 30 },
        ]}
        onPress={() => navigation.navigate("الاعدادات")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>الاعدادات</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="SettingSVG" style={styles.iconleft} />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate("عن البرنامج")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={24}
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>عن البرنامج</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="AboutAppSVG" style={styles.iconleft} />
        </View>
        <View style={styles.imageWrapper}>
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
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>الابلاغ عن مشكلة</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="ReportProblemSVG" style={styles.iconleft} />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <Text
        style={[
          {
            height: 200,
            width: "50%",
            textAlign: "center",
            color: "#f2b784",
            fontFamily: "ScheherazadeNew",
          },
        ]}
      ></Text>
    </View>
  );
};

export default Menu;
