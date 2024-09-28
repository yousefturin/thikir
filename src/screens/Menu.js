import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "../context/ThemeContext";
import { useColor } from "../context/ColorContext";
import { useLanguage } from "../context/LanguageContext";
import { MainStyles } from "../Styles/commonStyles";
import { getColorForTheme } from "../utils/themeUtils";
import SvgComponent from "../../assets/Svg/svgComponents";
import initializeScalingUtils from "../utils/core/NormalizeSize"

const Menu = ({ navigation }) => {

  const { selectedTheme } = useTheme();
  const { selectedColor } = useColor();
  const { selectedLanguage } = useLanguage();
  const systemTheme = selectedTheme === "system";
  const { moderateScale } = initializeScalingUtils(Dimensions);

  //#region LightTheme
  const lightTheme = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6",
    },
    button: {
      backgroundColor: "#fefffe",
      // shadowColor: "gray",
    },
    buttonText: {
      color: "#000",
    },
    iconWrapper: {
      backgroundColor: "#e9e9ea",
      shadowColor: "gray",
    },
    horizontalLine: {
      borderColor: "rgba(198, 198, 200, 0.45)",
    },
    wrapperButton:{
      backgroundColor: "#fefffe",
      shadowColor: "gray",
    }
  });
  //#endregion

  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    container: {
      backgroundColor: "#050505",
    },
    button: {
      backgroundColor: "#1C1C1E",
    },
    buttonText: {
      color: "#fff",
    },
    iconWrapper: {
      backgroundColor: "#3a3a3a",
      shadowColor: "black",
    },
    horizontalLine: {
      borderColor: "rgba(84, 84, 84, 0.45)",
    },
    wrapperButton:{
      backgroundColor: "#1C1C1E",
      shadowColor: "black",
    }
  });
  //#endregion

  const themeStyles = getColorForTheme(
    { dark: darkTheme, light: lightTheme },
    selectedTheme,
    systemTheme
  );

  //#region ArabicLanguage
  const ArabicLanguage = StyleSheet.create({
    button: {
      flexDirection: "row",
    },
    iconWrapper: {
      marginRight: 10,
    },
    buttonText: {
      textAlign: "right",
      marginRight: 15,
    },
    icon: {
      transform: [{ rotate: 0 + "deg" }],
      marginLeft: 20,
    },
    horizontalLine: {
      marginRight: 60,
      overflow: "hidden",
    },
  });
  //#endregion

  //#region EnglishLanguage
  const EnglishLanguage = StyleSheet.create({
    button: {
      flexDirection: "row-reverse",
    },
    iconWrapper: {
      marginLeft: 5,
    },
    buttonText: {
      textAlign: "left",
      marginLeft: 20,
      fontFamily: "Montserrat",
    },
    icon: {
      transform: [{ rotate: 180 + "deg" }],
      marginRight: 20,
    },
    horizontalLine: {
      marginLeft: 60,
      overflow: "hidden",
    },
  });
  //#endregion

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
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.buttonText : ArabicLanguage.buttonText)
    },
    button: {
      ...MainStyles.button,
      ...(selectedTheme === "dark" ? themeStyles.button : themeStyles.button),
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.button : ArabicLanguage.button)
    },
    iconWrapper: {
      ...MainStyles.iconWrapper,
      ...(selectedTheme === "dark"
        ? themeStyles.iconWrapper
        : themeStyles.iconWrapper),
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.iconWrapper : ArabicLanguage.iconWrapper)
    },
    horizontalLine: {
      ...MainStyles.horizontalLine,
      ...(selectedTheme === "dark"
        ? themeStyles.horizontalLine
        : themeStyles.horizontalLine),
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.horizontalLine : ArabicLanguage.horizontalLine)
    },
    icon: {
      ...MainStyles.icon,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.icon : ArabicLanguage.icon)
    },
    wrapperButton: {
      ...MainStyles.wrapperButton,
      ...(selectedTheme === "dark"
        ? themeStyles.wrapperButton
        : themeStyles.wrapperButton),
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
        onPress={() => selectedLanguage != "Arabic" ? navigation.navigate("Notifications") : navigation.navigate("التذكيرات")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={moderateScale(16)}
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "Notification" : "التذكيرات"}</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="ThikirAlarmSVG" width={moderateScale(22)} height={moderateScale(22)} fill={selectedColor} style={styles.iconleft} />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>

      <View style={styles.wrapperButton}>
        <TouchableOpacity
          style={[
            styles.button,
            { borderTopRightRadius: 10, borderTopLeftRadius: 10 },
          ]}
          onPress={() => selectedLanguage != "Arabic" ? navigation.navigate("Glorification") : navigation.navigate("سبحة")}
          activeOpacity={0.7}
        >

          <View style={styles.iconWrapperLeft}>
            <FontAwesomeIcon
              name="angle-left"
              size={moderateScale(16)}
              color={selectedColor}
              style={styles.icon}
            />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "Glorification" : "السبحة"}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <SvgComponent svgKey="TasbihSVG" fill={selectedColor} style={styles.iconleft} />
          </View>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} />
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />


        <TouchableOpacity
          style={[styles.button]}
          onPress={() => selectedLanguage != "Arabic" ? navigation.navigate("Prayer Times") : navigation.navigate("مواعيد الصلاة")}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapperLeft}>
            <FontAwesomeIcon
              name="angle-left"
              size={moderateScale(16)}
              color={selectedColor}
              style={styles.icon}
            />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "Prayer Times" : "مواعيد الصلاة"}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <SvgComponent svgKey="AzanSVG" fill={selectedColor} style={styles.iconleft} />
          </View>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} />
          </View>
        </TouchableOpacity>

        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => selectedLanguage != "Arabic" ? navigation.navigate("Favorite") : navigation.navigate("الأذكار المفضلة")}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapperLeft}>
            <FontAwesomeIcon
              name="angle-left"
              size={moderateScale(16)}
              color={selectedColor}
              style={styles.icon}
            />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "Favorite Supplications" : "الأذكار المفضلة"}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <SvgComponent svgKey="FavThikirSVG" fill={selectedColor} style={styles.iconleft} />
          </View>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} />
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => selectedLanguage != "Arabic" ? navigation.navigate("Names Of Allah") : navigation.navigate("أسماء الله الحسنى")}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapperLeft}>
            <FontAwesomeIcon
              name="angle-left"
              size={moderateScale(16)}
              color={selectedColor}
              style={styles.icon}
            />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "Names of Allah" : "أسماء الله الحسنى"}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <SvgComponent svgKey="NamesOfAllahSVG" fill={selectedColor} style={styles.iconleft} />
          </View>

          <View style={styles.imageWrapper}>
            <Image style={styles.image} />
          </View>
        </TouchableOpacity>
          <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => selectedLanguage != "Arabic" ? navigation.navigate("Verse of Quran") : navigation.navigate("آية")}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapperLeft}>
            <FontAwesomeIcon
              name="angle-left"
              size={moderateScale(16)}
              color={selectedColor}
              style={styles.icon}
            />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "Verse of Quran" : "آية"}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <SvgComponent svgKey="AyaSVG" fill={selectedColor} style={styles.iconleft} />
          </View>

          <View style={styles.imageWrapper}>
            <Image style={styles.image} />
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => selectedLanguage != "Arabic" ? navigation.navigate("Hadith") : navigation.navigate("حديث")}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapperLeft}>
            <FontAwesomeIcon
              name="angle-left"
              size={moderateScale(16)}
              color={selectedColor}
              style={styles.icon}
            />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "Hadith" : "حديث"}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <SvgComponent svgKey="HadithSVG" fill={selectedColor} style={styles.iconleft} />
          </View>

          <View style={styles.imageWrapper}>
            <Image style={styles.image} />
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => selectedLanguage != "Arabic" ? navigation.navigate("Direction of Prayer") : navigation.navigate("القبلة")}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapperLeft}>
            <FontAwesomeIcon
              name="angle-left"
              size={moderateScale(16)}
              color={selectedColor}
              style={styles.icon}
            />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "Direction of Prayer" : "القبلة"}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <SvgComponent svgKey="QiblaSVG" fill={selectedColor} style={styles.iconleft} />
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
          onPress={() => selectedLanguage != "Arabic" ? navigation.navigate("Invocational") : navigation.navigate("دعاء")}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapperLeft}>
            <FontAwesomeIcon
              name="angle-left"
              size={moderateScale(16)}
              color={selectedColor}
              style={styles.icon}
            />
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "Invocational" : "دعاء"}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <SvgComponent svgKey="DuaaSVG" fill={selectedColor} style={styles.iconleft} />
          </View>

          <View style={styles.imageWrapper}>
            <Image style={styles.image} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.wrapperButton,{marginTop: 30}]}>
      <TouchableOpacity
        style={[
          styles.button,
          { borderTopRightRadius: 10, borderTopLeftRadius: 10},
        ]}
        onPress={() => selectedLanguage != "Arabic" ? navigation.navigate("Settings") : navigation.navigate("الاعدادات")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={moderateScale(16)}
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "Settings" : "الاعدادات"}</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="SettingSVG" fill={selectedColor} style={styles.iconleft} />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity
        style={[styles.button,
        { borderBottomRightRadius: 10, borderBottomLeftRadius: 10 },]}
        onPress={() => selectedLanguage != "Arabic" ? navigation.navigate("About us") : navigation.navigate("عن البرنامج")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapperLeft}>
          <FontAwesomeIcon
            name="angle-left"
            size={moderateScale(16)}
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "About us" : "عن البرنامج"}</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="AboutAppSVG" fill={selectedColor} style={styles.iconleft} />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} />
        </View>
      </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
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
            size={moderateScale(16)}
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
        <Text style={styles.buttonText}>{selectedLanguage != "Arabic" ? "Report a Problem" : "الابلاغ عن مشكلة"}</Text>
        </View>
        <View style={styles.iconWrapper}>
          <SvgComponent svgKey="ReportProblemSVG" style={styles.iconleft} />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} />
        </View>
      </TouchableOpacity> */}

    </View>
  );
};

export default Menu;
