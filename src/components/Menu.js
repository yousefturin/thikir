import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemContex";
import { useColor } from '../context/ColorContext';
import { MainStyles } from "../context/commonStyles";
import { Svg, Path, Circle } from "react-native-svg";
import { Appearance } from 'react-native';

const Menu = ({ navigation }) => {

  const { selectedTheme } = useTheme();
  const { selectedColor, setColor } = useColor();
  const systemTheme = selectedTheme === 'system';
  //#region LightTheme
  const lightTheme = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6",
    },
    button: {
      backgroundColor: "#fefffe",
      shadowColor: "white",
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
      shadowColor: "black",
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
  ? Appearance.getColorScheme() === 'dark'
    ? darkTheme
    : lightTheme
  : selectedTheme === 'dark'
  ? darkTheme
  : lightTheme;

  //#region StyleMapping
  const styles = {
    ...MainStyles,
    container: {
      ...MainStyles.container,
      ...(selectedTheme === 'dark' ? themeStyles.container : themeStyles.container),
    },
    buttonText: {
      ...MainStyles.buttonText,
      ...(selectedTheme === 'dark' ? themeStyles.buttonText : themeStyles.buttonText),
    },
    button: {
      ...MainStyles.button,
      ...(selectedTheme  === 'dark'? themeStyles.button : themeStyles.button),
    },
    iconWrapper: {
      ...MainStyles.iconWrapper,
      ...(selectedTheme === 'dark' ? themeStyles.iconWrapper : themeStyles.iconWrapper),
    },
    horizontalLine: {
      ...MainStyles.horizontalLine,
      ...(selectedTheme === 'dark' ? themeStyles.horizontalLine : themeStyles.horizontalLine),
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
          <Svg width={24} height={24} viewBox="0 0 256 256">
            <Path
              d="M207.8,112a79.7,79.7,0,0,0-79.2-80H128a79.9,79.9,0,0,0-79.8,80c0,34.3-7.1,53.7-13,63.9a16.2,16.2,0,0,0-.1,16.1A15.9,15.9,0,0,0,49,200H88a40,40,0,0,0,80,0h39a15.9,15.9,0,0,0,13.9-8,16.2,16.2,0,0,0-.1-16.1C214.9,165.7,207.8,146.3,207.8,112ZM128,224a24.1,24.1,0,0,1-24-24h48A24.1,24.1,0,0,1,128,224ZM224.9,73.3a9.3,9.3,0,0,1-3.5.8,7.9,7.9,0,0,1-7.2-4.5,97,97,0,0,0-35-38.8,8,8,0,0,1,8.5-13.6,111.7,111.7,0,0,1,40.8,45.4A8,8,0,0,1,224.9,73.3Zm-190.3.8a9.3,9.3,0,0,1-3.5-.8,8,8,0,0,1-3.6-10.7A111.7,111.7,0,0,1,68.3,17.2a8,8,0,0,1,8.5,13.6,97,97,0,0,0-35,38.8A7.9,7.9,0,0,1,34.6,74.1Z"
              stroke="#c9aa27" // Border color
              strokeWidth={5} // Border width
              stroke-linecap="round"
              fill="#d7b52a"
            />
          </Svg>
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
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>السبحة</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Svg viewBox="0 0 24 24" width={24} height={24}>
            <Path
              d="M4.972,9.147a1.056,1.056,0,1,0-1.494,0A1.057,1.057,0,0,0,4.972,9.147Z"
              fill="#fff"
            />
            <Path
              d="M5.8,20.645a1.056,1.056,0,1,0,0,1.494A1.051,1.051,0,0,0,5.8,20.645Z"
              fill="#fff"
            />
            <Path
              d="M2.941,12.367a1.056,1.056,0,1,0-1.494,0A1.057,1.057,0,0,0,2.941,12.367Z"
              fill="#aa767c"
            />
            <Path
              d="M3.566,18.776a1.056,1.056,0,1,0-1.8.747,1.081,1.081,0,0,0,1.494,0A1.045,1.045,0,0,0,3.566,18.776Z"
              fill="#aa767c"
            />
            <Path
              d="M2.356,15.921a1.056,1.056,0,1,0-1.494,0A1.056,1.056,0,0,0,2.356,15.921Z"
              fill="#fff"
            />
            <Path
              d="M10.509,4.242a1.056,1.056,0,1,0-1.493,0A1.08,1.08,0,0,0,10.509,4.242Z"
              fill="#fff"
            />
            <Path
              d="M7.521,6.369a1.057,1.057,0,1,0-1.495,0A1.057,1.057,0,0,0,7.521,6.369Z"
              fill="#aa767c"
            />
            <Path
              d="M13.857,2.742a1.056,1.056,0,1,0-1.494,0A1.08,1.08,0,0,0,13.857,2.742Z"
              fill="#aa767c"
            />
            <Path
              d="M21.644,6a1.057,1.057,0,1,0,0-1.495A1.057,1.057,0,0,0,21.644,6Z"
              fill="#fff"
            />
            <Path
              d="M17.526,2.35a1.057,1.057,0,1,0-1.494,0A1.059,1.059,0,0,0,17.526,2.35Z"
              fill="#fff"
            />
            <Path
              d="M19.529,3.317a1.057,1.057,0,1,0-.309-.747A1.057,1.057,0,0,0,19.529,3.317Z"
              fill="#aa767c"
            />
            <Path
              d="M15.021,9.615a1.055,1.055,0,1,0,.748.308A1.057,1.057,0,0,0,15.021,9.615Z"
              fill="#aa767c"
            />
            <Path
              d="M20.754,13.584,20,17.277a.077.077,0,0,0,.021.056.078.078,0,0,0,.061.028h.241l-.005-.676a.25.25,0,0,1,.248-.252h0a.25.25,0,0,1,.25.248l.005.677.332,0-.01-1.819a.25.25,0,0,1,.249-.252h0a.251.251,0,0,1,.25.249l.01,1.819.333,0,0-.326a.25.25,0,0,1,.248-.252h0a.251.251,0,0,1,.25.249l0,.327.24,0a.079.079,0,0,0,.062-.029.081.081,0,0,0,.018-.067l-.811-3.673Z"
              fill="#fff"
            />
            <Path
              d="M21.362,11.853a.768.768,0,0,0-.764.772l0,.46,1.536-.009,0-.46a.766.766,0,0,0-.767-.763Z"
              fill="#fff"
            />
            <Path
              d="M19.862,8.605a1.54,1.54,0,0,1,.437-.914,1.555,1.555,0,0,1,1.793-.286,3.925,3.925,0,0,0,.091-.622,1.537,1.537,0,0,1-.893-.435,1.558,1.558,0,0,1,0-2.2,1.422,1.422,0,0,1,.155-.126c-.06-.083-.125-.169-.192-.249a1.546,1.546,0,0,1-2.439-1.721,4.3,4.3,0,0,0-.507-.16,1.551,1.551,0,0,1-3.066-.1q-.265.037-.585.108a1.547,1.547,0,0,1-2.866.917q-.27.11-.545.234A1.552,1.552,0,0,1,8.662,4.6c-.03-.031-.053-.066-.08-.1l-.161.11L8.1,4.824A1.55,1.55,0,0,1,5.738,6.776Q5.495,7,5.264,7.25c.02.018.043.031.062.05A1.556,1.556,0,0,1,3.383,9.708c-.112.184-.227.385-.344.606a1.538,1.538,0,0,1,.255.205,1.556,1.556,0,0,1-1.1,2.656c-.04,0-.079-.008-.119-.011-.028.167-.054.337-.076.51a1.54,1.54,0,0,1,.711.4,1.558,1.558,0,0,1,0,2.2,1.536,1.536,0,0,1-.648.381,4.657,4.657,0,0,0,.162.633,1.554,1.554,0,0,1,1.386.388,1.547,1.547,0,0,1,.039,2.153c.12.14.245.274.372.4A1.547,1.547,0,0,1,6.53,21.845c.14.054.289.107.44.159a1.536,1.536,0,0,1,.4-.707,1.558,1.558,0,0,1,2.2,0,1.537,1.537,0,0,1,.433.876,2.562,2.562,0,0,0,.451-.193,1.551,1.551,0,0,1,1.8-2.331q.077-.228.148-.5a1.552,1.552,0,0,1-.559-2.555,1.552,1.552,0,0,1,1.114-.454c.019-.117.037-.236.055-.352l.036-.222a1.543,1.543,0,0,1-.526-.345,1.549,1.549,0,0,1,1.241-2.642c.079-.217.174-.449.288-.7a1.466,1.466,0,0,1-.13-.106,1.557,1.557,0,0,1,1.956-2.4c.159-.148.327-.292.507-.431a1.552,1.552,0,1,1,2.945-.472C19.516,8.524,19.691,8.567,19.862,8.605Z"
              fill="none"
            />
            <Path
              d="M21.4,7.735a1.057,1.057,0,1,0,.747.309A1.052,1.052,0,0,0,21.4,7.735Z"
              fill="#aa767c"
            />
            <Path
              d="M9.216,21.65a1.057,1.057,0,1,0,0,1.5A1.052,1.052,0,0,0,9.216,21.65Z"
              fill="#aa767c"
            />
            <Path
              d="M12.2,16.947a1.057,1.057,0,1,0,.747-.309A1.048,1.048,0,0,0,12.2,16.947Z"
              fill="#aa767c"
            />
            <Path
              d="M11.746,20.058a1.056,1.056,0,1,0,.747.309A1.052,1.052,0,0,0,11.746,20.058Z"
              fill="#fff"
            />
            <Path
              d="M12.876,13.373a1.055,1.055,0,1,0,.747-.31A1.057,1.057,0,0,0,12.876,13.373Z"
              fill="#fff"
            />
            <Path
              d="M18.538,7.538a1.057,1.057,0,1,0,0,1.494A1.054,1.054,0,0,0,18.538,7.538Z"
              fill="#fff"
            />
            <Path
              d="M23.491,6.348a1.552,1.552,0,0,0-1.6-2.566c-.091-.131-.19-.26-.3-.384a1.548,1.548,0,0,0-.214-1.928,1.557,1.557,0,0,0-2.2,0,1.538,1.538,0,0,0-.116.14,4.81,4.81,0,0,0-.746-.231,1.551,1.551,0,0,0-3.055-.1c-.2.026-.442.068-.708.127A1.52,1.52,0,0,0,14.21.9a1.591,1.591,0,0,0-2.2,0A1.551,1.551,0,0,0,11.6,2.347q-.277.113-.574.247a1.453,1.453,0,0,0-.162-.2,1.593,1.593,0,0,0-2.2,0,1.556,1.556,0,0,0-.344,1.677l-.178.122-.363.249A1.547,1.547,0,0,0,5.425,6.385c-.2.185-.4.379-.586.588A1.55,1.55,0,0,0,3.009,9.36c-.141.226-.284.478-.432.758a1.552,1.552,0,0,0-.989,2.933c-.033.189-.062.381-.087.578a1.542,1.542,0,0,0-.992.444,1.552,1.552,0,0,0,1.059,2.652,4.929,4.929,0,0,0,.185.727,1.408,1.408,0,0,0-.343.224,1.551,1.551,0,0,0,1.843,2.46c.143.166.291.327.451.485a1.553,1.553,0,0,0,2.445,1.871,1.429,1.429,0,0,0,.161-.2c.2.076.4.149.615.221a1.541,1.541,0,0,0,1.544,1.437A1.551,1.551,0,0,0,10,22.694a3.023,3.023,0,0,0,.816-.344A1.55,1.55,0,1,0,12.7,19.893q.1-.291.2-.649c.017,0,.033,0,.049,0a1.551,1.551,0,0,0,.507-3.021c.018-.121.037-.243.056-.361l.031-.2c.029,0,.057.008.086.008a1.556,1.556,0,0,0,1.1-2.656,1.536,1.536,0,0,0-.473-.319c.066-.178.144-.369.236-.573a1.548,1.548,0,0,0,1.754-2.412q.2-.184.424-.36c.009.01.015.021.025.031a1.539,1.539,0,0,0,2.5-.431c.245.074.477.134.7.178a1.529,1.529,0,0,0,1.264,1.19V11.4a1.242,1.242,0,0,0-.686.334,1.26,1.26,0,0,0-.366.9l0,.71a.252.252,0,0,0,.074.176c.02.02.05.019.075.031L19.5,17.187a.582.582,0,0,0,.574.674h0l1.32-.007h0l.831,0h0l.488,0a.583.583,0,0,0,.569-.692l-.8-3.623a.233.233,0,0,0,.144-.208l0-.71a1.251,1.251,0,0,0-.984-1.2V10.323a1.548,1.548,0,0,0,.878-2.6,4.326,4.326,0,0,0,.156-.949A1.538,1.538,0,0,0,23.491,6.348ZM23.138,4.5a1.057,1.057,0,1,1-.747-.309A1.059,1.059,0,0,1,23.138,4.5ZM20.276,1.514a1.055,1.055,0,1,1-.747.309A1.052,1.052,0,0,1,20.276,1.514ZM16.032.855a1.057,1.057,0,1,1,0,1.5A1.054,1.054,0,0,1,16.032.855Zm-3.669.393a1.056,1.056,0,0,1,1.494,1.494,1.08,1.08,0,0,1-1.494,0A1.057,1.057,0,0,1,12.363,1.248Zm-3.347,1.5a1.056,1.056,0,0,1,1.493,1.494,1.08,1.08,0,0,1-1.493,0A1.057,1.057,0,0,1,9.016,2.748ZM6.026,4.875a1.057,1.057,0,1,1,0,1.494A1.054,1.054,0,0,1,6.026,4.875ZM3.478,7.653a1.056,1.056,0,1,1,0,1.494A1.054,1.054,0,0,1,3.478,7.653Zm-2.031,3.22a1.056,1.056,0,1,1,0,1.494A1.053,1.053,0,0,1,1.447,10.873ZM.862,14.427a1.056,1.056,0,1,1,0,1.494A1.054,1.054,0,0,1,.862,14.427Zm.9,5.1a1.056,1.056,0,1,1,1.494,0A1.081,1.081,0,0,1,1.763,19.523ZM4.3,22.139a1.056,1.056,0,1,1,1.494,0A1.057,1.057,0,0,1,4.3,22.139Zm3.42,1.006a1.057,1.057,0,1,1,1.494,0A1.059,1.059,0,0,1,7.722,23.145Zm4.771-1.284a1.056,1.056,0,1,1,0-1.494A1.057,1.057,0,0,1,12.493,21.861Zm1.2-3.421a1.056,1.056,0,1,1,0-1.493A1.056,1.056,0,0,1,13.69,18.44Zm.68-3.573a1.057,1.057,0,1,1,0-1.494A1.057,1.057,0,0,1,14.37,14.867Zm1.4-3.45a1.055,1.055,0,1,1,0-1.494A1.057,1.057,0,0,1,15.769,11.417Zm1.274-2.385a1.057,1.057,0,1,1,1.5,0A1.057,1.057,0,0,1,17.043,9.032Zm1.848-1.847a1.553,1.553,0,0,0-2.507,1.754c-.18.139-.348.283-.507.431a1.557,1.557,0,0,0-1.956,2.4,1.466,1.466,0,0,0,.13.106c-.114.252-.209.484-.288.7a1.551,1.551,0,0,0-.715,2.987l-.036.222c-.018.116-.036.235-.055.352a1.555,1.555,0,0,0-1.114,2.655,1.533,1.533,0,0,0,.559.354q-.072.273-.148.5a1.551,1.551,0,0,0-1.8,2.331,2.562,2.562,0,0,1-.451.193A1.537,1.537,0,0,0,9.57,21.3a1.558,1.558,0,0,0-2.2,0,1.536,1.536,0,0,0-.4.707c-.151-.052-.3-.105-.44-.159a1.547,1.547,0,0,0-2.509-1.614c-.127-.128-.252-.262-.372-.4a1.547,1.547,0,0,0-.039-2.153,1.554,1.554,0,0,0-1.386-.388,4.657,4.657,0,0,1-.162-.633,1.536,1.536,0,0,0,.648-.381,1.558,1.558,0,0,0,0-2.2,1.54,1.54,0,0,0-.711-.4c.022-.173.048-.343.076-.51.04,0,.079.011.119.011a1.554,1.554,0,0,0,.845-2.861c.117-.221.232-.422.344-.606A1.556,1.556,0,0,0,5.326,7.3c-.019-.019-.042-.032-.062-.05Q5.5,7,5.738,6.776A1.55,1.55,0,0,0,8.1,4.824l.317-.217.161-.11c.027.033.05.068.08.1a1.551,1.551,0,0,0,2.583-1.549q.275-.125.545-.234A1.549,1.549,0,0,0,14.656,1.9q.319-.07.585-.108a1.551,1.551,0,0,0,3.066.1,4.3,4.3,0,0,1,.507.16,1.563,1.563,0,0,0-.094.519,1.549,1.549,0,0,0,2.533,1.2c.067.08.132.166.192.249a1.422,1.422,0,0,0-.155.126,1.558,1.558,0,0,0,0,2.2,1.537,1.537,0,0,0,.893.435,3.925,3.925,0,0,1-.091.622,1.555,1.555,0,0,0-1.793.286,1.54,1.54,0,0,0-.437.914c-.171-.038-.346-.081-.533-.138A1.547,1.547,0,0,0,18.891,7.185Zm3.894,10.132a.079.079,0,0,1-.062.029l-.24,0,0-.327a.251.251,0,0,0-.25-.249h0a.25.25,0,0,0-.248.252l0,.326-.333,0-.01-1.819a.251.251,0,0,0-.25-.249h0a.25.25,0,0,0-.249.252l.01,1.819-.332,0-.005-.677a.25.25,0,0,0-.25-.248h0a.25.25,0,0,0-.248.252l.005.676h-.241a.078.078,0,0,1-.061-.028A.077.077,0,0,1,20,17.277l.759-3.693,1.238-.007L22.8,17.25A.081.081,0,0,1,22.785,17.317Zm-.651-4.7,0,.46-1.536.009,0-.46a.768.768,0,0,1,.764-.772h.005a.766.766,0,0,1,.767.763Zm.013-3.078a1.055,1.055,0,1,1,.31-.747A1.057,1.057,0,0,1,22.147,9.538Z"
              fill="#aa767c"
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
          <Svg width={24} height={24} viewBox="0 0 256 256">
            <Path
              d="M128,216S28,160,28,92A52,52,0,0,1,128,72h0A52,52,0,0,1,228,92C228,160,128,216,128,216Z"
              stroke="#4b1818" // Border color
              strokeWidth={2} // Border width
              stroke-linecap="round"
              fill="#b83f3f"
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
            color={selectedColor}
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
              stroke="#29342a"
              strokeWidth={3}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="12"
            />
            <Path
              d="M24,192a8,8,0,0,0,8,8H96a32,32,0,0,1,32,32V88A32,32,0,0,0,96,56H32a8,8,0,0,0-8,8Z"
              fill="#406757"
              stroke="#29342a"
              strokeWidth={3}
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
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>حديث</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            {/* Gray Border */}
            <Path
              d="M9 3V18H12V3H9"
              stroke="none" // Border color
              strokeWidth={2} // Border width
              strokeLinecap="round"
              fill="#90b494" // No fill for the border
            />

            {/* Blue Fill */}
            <Path
              d="M12 5L16 18L19 17L15 4L12 5"
              fill="#545775" // Blue fill color
            />

            {/* Gray Border */}
            <Path
              d="M5 5V18H8V5H5"
              stroke="none" // Border color
              strokeWidth={2} // Border width
              strokeLinecap="round"
              fill="#718f94" // No fill for the border
            />

            {/* Gray Border */}
            <Path
              d="M3 19V21H21V19H3Z"
              stroke="none" // Border color
              strokeWidth={2} // Border width
              strokeLinecap="round"
              fill="#634c3d" // No fill for the border
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
          <Svg
            viewBox="0 0 100 100"
            width={24} height={24} 
          >
              <Path d="M14.237,85.308l1.759,0.3c7.219,1.23,14.494,1.002,21.623-0.676l1.667-0.393c4.478-9.573,5.064-17.415,1.855-24.63   c-0.78-1.731-0.701-3.768,0.213-5.443c4.714-9.006,7.908-21.502,6.089-23.849c-0.024-0.031-0.064-0.067-0.12-0.1L40.445,45.92   c-0.281,0.629-0.899,1.003-1.547,1.003c-0.23,0-0.465-0.047-0.689-0.148c-0.854-0.381-1.237-1.382-0.855-2.236l7.307-16.365   c0,0,0.001-0.001,0.001-0.001c0-0.001,0-0.002,0.001-0.003l1.035-2.301c0.161-1.535-0.026-2.679-0.547-3.317   c-0.248-0.304-0.612-0.52-1.073-0.669L32.878,44.232c-0.296,0.592-0.894,0.935-1.514,0.935c-0.255,0-0.514-0.058-0.757-0.18   c-0.836-0.419-1.174-1.436-0.755-2.271l11.772-23.488c0.012-0.023,0.028-0.042,0.041-0.064c0.009-0.017,0.013-0.036,0.023-0.053   c0.809-1.34,0.361-2.927-0.5-3.802c-1.014-1.021-2.366-1.045-3.651-0.121c0.148,1.183,0.081,2.2-0.652,3.718   c-0.691,1.429-11.971,23.993-12.451,24.953c-0.297,0.593-0.895,0.936-1.515,0.936c-0.255,0-0.513-0.058-0.756-0.179   c-0.836-0.418-1.175-1.435-0.757-2.271c0.117-0.235,11.75-23.503,12.431-24.912c0.459-0.949,0.452-1.264,0.248-2.452   c-0.275-0.745-0.828-1.224-1.576-1.341c-1.124-0.175-2.377,0.494-3.335,1.797c-5.811,7.892-10.076,15.555-13.493,22.08   c0.907,3.958,1.456,11.283,1.837,17.336l0.05,0.787c0.11,1.708,1.385,2.368,3.318,3.181l0.114,0.048   c2.685,1.131,5.974,3.701,6.848,6.673c0.264,0.897-0.249,1.838-1.146,2.102c-0.159,0.047-0.32,0.069-0.478,0.069   c-0.732,0-1.406-0.478-1.623-1.216c-0.506-1.719-2.945-3.679-4.915-4.509l-0.112-0.047c-1.919-0.807-5.13-2.158-5.384-6.083   l-0.05-0.794c-0.231-3.666-0.842-13.394-1.886-17.316c-0.388-1.303-1.136-2.963-2.504-3.529c-1.033-0.428-2.264-0.155-3.322,0.285   c0.901,11.275,0.946,19.941-1.267,30.079c-0.347,1.592-0.12,3.264,0.64,4.709L14.237,85.308z" 
                              stroke="#86673f" // Border color
              strokeWidth={3} // Border width
              stroke-linecap="round"
              fill="#e0ac69"
              />
              <Path d="M58.859,59.909c-3.209,7.215-2.622,15.058,1.855,24.63l1.667,0.393c7.129,1.678,14.405,1.906,21.623,0.676l1.759-0.3   l8.438-16.013c0.76-1.444,0.987-3.116,0.64-4.709c-2.213-10.138-2.168-18.805-1.267-30.079c-1.059-0.44-2.289-0.713-3.322-0.285   c-1.368,0.566-2.116,2.225-2.504,3.529c-1.044,3.922-1.656,13.651-1.886,17.316l-0.05,0.794c-0.254,3.925-3.465,5.276-5.384,6.083   l-0.112,0.047c-1.969,0.83-4.409,2.789-4.915,4.509c-0.217,0.738-0.892,1.216-1.623,1.216c-0.158,0-0.319-0.023-0.478-0.069   c-0.897-0.264-1.41-1.205-1.146-2.102c0.875-2.972,4.163-5.542,6.848-6.673l0.114-0.048c1.932-0.813,3.208-1.473,3.318-3.181   l0.05-0.787c0.381-6.054,0.93-13.378,1.837-17.336c-3.417-6.525-7.681-14.188-13.493-22.08c-0.959-1.303-2.212-1.972-3.335-1.797   c-0.747,0.117-1.301,0.596-1.576,1.341c-0.204,1.187-0.211,1.503,0.248,2.452c0.681,1.409,12.313,24.677,12.431,24.912   c0.418,0.836,0.079,1.853-0.757,2.271c-0.243,0.121-0.501,0.179-0.756,0.179c-0.62,0-1.219-0.343-1.515-0.936   c-0.48-0.96-11.76-23.524-12.451-24.953c-0.734-1.518-0.8-2.535-0.652-3.718c-1.285-0.924-2.637-0.9-3.651,0.121   c-0.861,0.875-1.309,2.461-0.5,3.802c0.01,0.017,0.014,0.036,0.023,0.053c0.013,0.022,0.029,0.041,0.041,0.064l11.772,23.488   c0.419,0.835,0.081,1.853-0.755,2.271c-0.243,0.122-0.502,0.18-0.757,0.18c-0.62,0-1.218-0.343-1.514-0.935L55.922,21.883   c-0.461,0.149-0.825,0.365-1.073,0.669c-0.52,0.639-0.708,1.783-0.547,3.317l1.035,2.301c0,0.001,0,0.002,0.001,0.003   c0,0,0.001,0.001,0.001,0.001l7.307,16.365c0.381,0.854-0.002,1.855-0.855,2.236c-0.224,0.1-0.459,0.148-0.689,0.148   c-0.647,0-1.266-0.374-1.547-1.003l-6.878-15.403c-0.056,0.033-0.097,0.07-0.12,0.1c-1.819,2.347,1.375,14.843,6.089,23.849   C59.561,56.14,59.639,58.178,58.859,59.909z"
                            stroke="#86673f" // Border color
              strokeWidth={3} // Border width
              stroke-linecap="round"
              fill="#e0ac69" />
          </Svg>
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
            color={selectedColor}
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
            <Circle
              cx="12"
              cy="12"
              r="3"
              fill={systemTheme
                    ? Appearance.getColorScheme() === 'dark'
                    ?"#454545" : "#e9e9ea"
                    :selectedTheme === 'dark' ? "#454545" : "#e9e9ea"}
            ></Circle>
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
            color={selectedColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.buttonText}>الابلاغ عن مشكلة</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path
              d="M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z"
              fill="#fff"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
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
            color: "#f2b784",
            fontFamily: "ScheherazadeNew",
          },
        ]}
      ></Text>
    </View>
  );
};

export default Menu;
