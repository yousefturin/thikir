import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import { handleShare } from "../Service/ShareService";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "../context/ThemeContext";
import { useFont } from "../context/FontContext";
import { useColor } from "../context/ColorContext";
import { useNumberContext } from "../context/NumberContext";
import { useLanguage } from "../context/LanguageContext";
import { GenericStyles } from "../Styles/commonStyles";
import Svg, { Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getColorForTheme } from "../utils/themeUtils";
import SvgComponent from "../../assets/Svg/svgComponents";
import initializeScalingUtils from "../utils/core/NormalizeSize"

const GenericPage = ({ route }) => {
    
    const viewRef = React.useRef();
    const { moderateScale } = initializeScalingUtils(Dimensions);
    const { selectedTheme } = useTheme();
    const { selectedFont } = useFont();
    const { selectedColor } = useColor();
    const systemTheme = selectedTheme === "system";
    const { state, convertToEasternArabicNumerals } = useNumberContext();
    const { selectedLanguage } = useLanguage();


    const { item, itemIndex } = route.params;
    const [count, setCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLongPress, setIsLongPress] = useState(false);
    const [isTranslation, setIsTranslation] = useState(false);


    const ControlPaneBackgroundImage = getColorForTheme(
        {
            dark: require("../../assets/Images/HeaderBackground.jpg"),
            light: require("../../assets/Images/HeaderBackgroundLight.jpg"),
        },
        selectedTheme,
        systemTheme
    );

    //#region LightTheme
    const lightTheme = StyleSheet.create({
        container: {
            backgroundColor: "#f2f2f6",
        },
        containerforshare: {
            backgroundColor: "#f2f2f6",
        },
        circularButton: {
            borderColor: "#151515",
            backgroundColor: "#fefffe",
            shadowColor: "gray",
        },
        button: {
            backgroundColor: "#fefffe",
            borderColor: "#151515",
            shadowColor: "gray",
        },
        textcount: {
            textAlign: "center",
            color: "#000",
        },
        rectangle: {
            backgroundColor: "#fefffe",
            shadowColor: "gray",
        },
        title: {
            color: "#000",
        },
        description: {
            color: "#767676",
        },
        InfoReptTimeIndex: {
            color: "#767676",
        },
        InfoReptTime: {
            color: "#f2b784",
        },
        ControlPaneBackground: {},
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
        containerforshare: {
            backgroundColor: "#151515",
        },
        circularButton: {
            borderColor: "#151515",
            backgroundColor: "#242424",
            shadowColor: "black",
        },
        button: {
            backgroundColor: "#242424",
            borderColor: "#151515",
            shadowColor: "black",
        },
        textcount: {
            textAlign: "center",
            color: "white",
        },
        rectangle: {
            backgroundColor: "#242424",
            shadowColor: "black",
        },
        title: {
            color: "white",
        },
        description: {
            color: "#767676",
        },
        InfoReptTimeIndex: {
            color: "#767676",
        },
        InfoReptTime: {
            color: "#f2b784",
        },
        ControlPaneBackground: {},
        horizontalLine: {
            borderColor: "#151515",
        },
    });
    //#endregion

    const themeStyles = getColorForTheme(
        { dark: darkTheme, light: lightTheme },
        selectedTheme,
        systemTheme
    );

    //#region StyleMapping
    const styles = {
        ...GenericStyles,
        container: {
            ...GenericStyles.container,
            ...(selectedTheme === "dark"
                ? themeStyles.container
                : themeStyles.container),
        },
        containerforshare: {
            ...GenericStyles.containerforshare,
            ...(selectedTheme === "dark"
                ? themeStyles.containerforshare
                : themeStyles.containerforshare),
        },
        circularButton: {
            ...GenericStyles.circularButton,
            ...(selectedTheme === "dark"
                ? themeStyles.circularButton
                : themeStyles.circularButton),
        },
        button: {
            ...GenericStyles.button,
            ...(selectedTheme === "dark" ? themeStyles.button : themeStyles.button),
        },
        textcount: {
            ...GenericStyles.textcount,
            ...(selectedTheme === "dark"
                ? themeStyles.textcount
                : themeStyles.textcount),
        },
        rectangle: {
            ...GenericStyles.rectangle,
            ...(selectedTheme === "dark"
                ? themeStyles.rectangle
                : themeStyles.rectangle),
        },
        title: {
            ...GenericStyles.title,
            ...(selectedTheme === "dark" ? themeStyles.title : themeStyles.title),
        },
        description: {
            ...GenericStyles.description,
            ...(selectedTheme === "dark"
                ? themeStyles.description
                : themeStyles.description),
        },
        InfoReptTimeIndex: {
            ...GenericStyles.InfoReptTimeIndex,
            ...(selectedTheme === "dark"
                ? themeStyles.InfoReptTimeIndex
                : themeStyles.InfoReptTimeIndex),
        },
        InfoReptTime: {
            ...GenericStyles.InfoReptTime,
            ...(selectedTheme === "dark"
                ? themeStyles.InfoReptTime
                : themeStyles.InfoReptTime),
        },
        ControlPaneBackground: {
            ...GenericStyles.ControlPaneBackground,
            ...(selectedTheme === "dark"
                ? themeStyles.ControlPaneBackground
                : themeStyles.ControlPaneBackground),
        },
        horizontalLine: {
            ...GenericStyles.horizontalLine,
            ...(selectedTheme === "dark"
                ? themeStyles.horizontalLine
                : themeStyles.horizontalLine),
        },
    };
    //#endregion


    const handleButtonPressTranslation = () => {
        setIsTranslation(!isTranslation);
    };

    const Share = async () => {
        await handleShare(viewRef.current);
    };

    //#region  Counting Disable
    useEffect(() => {
        if (count >= item.subItems[currentIndex].count) {
            if (currentIndex < item.subItems.length - 1) {
                nextSubItem();
            } else {
                // If it's the last subItem, disable counting
                setCount(item.subItems[currentIndex].count);
            }
        }
    }, [count, currentIndex, item.subItems]);
    //#endregion

    //#region navigationBetweenSubitems
    const nextSubItem = () => {
        if (currentIndex < item.subItems.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setCount(0);
        }
    };
    const prevSubItem = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setCount(0);
        }
    };

    const incrementCount = () => {
        if (!isLongPress) {
            setCount((prevCount) => prevCount + 1);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
    };
    //#endregion

    //#region pressControl for long/short

    let pressTimeout;
    let startX = 0; // Initial X-coordinate of the touch
    let startY = 0; // Initial Y-coordinate of the touch

    const handleContainerPressIn = (e) => {
        pressTimeout = setTimeout(() => {
            setIsLongPress(true); // Detect long press
        }, 1000);
        startX = e.nativeEvent.pageX; // Store the initial X-coordinate
        startY = e.nativeEvent.pageY; // Store the initial Y-coordinate
    };

    const handleContainerPressOut = (e) => {
        clearTimeout(pressTimeout); // Clear the timeout on release
        const endX = e.nativeEvent.pageX; // Get the final X-coordinate
        const endY = e.nativeEvent.pageY; // Get the final Y-coordinate
        const swipeDistanceX = Math.abs(endX - startX); // Calculate the horizontal distance moved
        const swipeDistanceY = Math.abs(endY - startY); // Calculate the vertical distance moved

        if (swipeDistanceX < 10 && swipeDistanceY < 10) {
            // Only increment the count if it's not a swipe (adjust the threshold as needed)
            incrementCount();
        }

        setIsLongPress(false); // Reset the long press flag
    };

    //#endregion

    //#region buttonToFavController
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        // Load the button state from AsyncStorage when the component mounts
        async function loadButtonState() {
            try {
                const savedState = await AsyncStorage.getItem("buttonState");
                if (savedState !== null) {
                    const parsedState = JSON.parse(savedState);
                    setIsFilled(parsedState[itemIndex] || false);
                }
            } catch (error) {
                console.error("Error loading button state from AsyncStorage:", error);
            }
        }

        loadButtonState();
    }, [itemIndex]); // Load button state whenever itemIndex changes

    const handleButtonPress = async () => {
        // Toggle the button state
        const updatedState = !isFilled;
        setIsFilled(updatedState);

        // Load the existing button state from AsyncStorage
        try {
            const savedState = await AsyncStorage.getItem("buttonState");
            let updatedButtonState = savedState ? JSON.parse(savedState) : [];

            // Update the state for the specific itemIndex
            updatedButtonState[itemIndex] = updatedState;

            // Store the updated button state in AsyncStorage
            await AsyncStorage.setItem(
                "buttonState",
                JSON.stringify(updatedButtonState)
            );
        } catch (error) {
            console.error("Error storing button state in AsyncStorage:", error);
        }
    };
    //#endregion

    return (
        <TouchableWithoutFeedback
            onPressIn={handleContainerPressIn}
            onPressOut={handleContainerPressOut}
            disabled={
                currentIndex === item.subItems.length - 1 &&
                count >= item.subItems[currentIndex].count
            }
        >
            <View style={styles.container}>
                <View style={styles.containerforshare}>
                    <View
                        ref={viewRef}
                        style={[
                            styles.rectangle,
                            {
                                // padding: maxPadding,
                                paddingHorizontal: 10,
                            },
                        ]}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <TouchableOpacity activeOpacity={1}>
                                <Text
                                    style={[
                                        styles.title,
                                        {
                                            fontSize: moderateScale(16),
                                            fontFamily:
                                                selectedLanguage === "English" &&
                                                    selectedFont === "ScheherazadeNew"
                                                    ? "Montserrat"
                                                    : selectedLanguage === "English" &&
                                                        selectedFont === "MeQuran"
                                                        ? "TimesRoman"
                                                        : selectedLanguage === "English" &&
                                                            selectedFont === "Hafs"
                                                            ? "lexend"
                                                            : selectedFont,
                                            textAlign:
                                                selectedLanguage != "Arabic" ? "left" : "center",
                                        },
                                    ]}
                                >
                                    {
                                        (subItemNameToDisplay = state.isArabicNumbers
                                            ? convertToEasternArabicNumerals(
                                                item.subItems[currentIndex].subItemName.toString()
                                            )
                                            : item.subItems[currentIndex].subItemName.toString())
                                    }
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                        {selectedLanguage != "Arabic" ? (
                            <View style={[styles.horizontalLine, { paddingTop: 5,marginBottom:5 }]} />
                        ) : null}
                        {selectedLanguage != "Arabic" ? (
                            
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{
                                        paddingVertical: 5,
                                        alignItems:"center",
                                        flexDirection: "row", 
                                        width:"100%",
                                        justifyContent:"flex-start"
                                    }}
                                    onPress={handleButtonPressTranslation}
                                    >
                                    <View style={{ width:"5%"}}>
                                    <SvgComponent svgKey="TranslationSVG" />    
                                    </View>
                                    <Text
                                        style={[styles.TranslationDescription, { fontSize: moderateScale(14) ,textAlign:"left",}]}
                                    >
                                        Translation
                                    </Text>
                                </TouchableOpacity>
                           
                        ) : null}
                        {selectedLanguage != "Arabic" ? (
                            <ScrollView
                                contentContainerStyle={[
                                    styles.scrollContainerDescription,
                                    { display: isTranslation ? "flex" : "none" },
                                ]}
                                showsVerticalScrollIndicator={false}
                            >
                                <TouchableOpacity activeOpacity={1}>
                                    <Text
                                        style={[
                                            styles.description,
                                            {
                                                fontSize: moderateScale(14),
                                                textAlign:
                                                    selectedLanguage != "arabic" ? "left" : "center",
                                                fontFamily:
                                                    selectedLanguage === "English" &&
                                                        selectedFont === "ScheherazadeNew"
                                                        ? "Montserrat"
                                                        : selectedLanguage === "English" &&
                                                            selectedFont === "MeQuran"
                                                            ? "TimesRoman"
                                                            : selectedLanguage === "English" &&
                                                                selectedFont === "Hafs"
                                                                ? "lexend"
                                                                : selectedFont,
                                            },
                                        ]}
                                    >
                                        {
                                            (subItemDescriptionToDisplay = state.isArabicNumbers
                                                ? convertToEasternArabicNumerals(
                                                    item.subItems[
                                                        currentIndex
                                                    ].subItemTranslation.toString()
                                                )
                                                : item.subItems[
                                                    currentIndex
                                                ].subItemTranslation.toString())
                                        }
                                    </Text>
                                </TouchableOpacity>
                            </ScrollView>
                        ) : null}
                        <View style={[styles.horizontalLine, { paddingTop: 5 }]} />

                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.description,
                                { paddingBottom: 50, paddingTop: 10 ,fontSize: moderateScale(9)},
                            ]}
                        >
                            {
                                (subItemDescriptionToDisplay = state.isArabicNumbers
                                    ? convertToEasternArabicNumerals(
                                        item.subItems[currentIndex].subItemDescription.toString()
                                    )
                                    : item.subItems[currentIndex].subItemDescription.toString())
                            }
                        </Text>
                        {selectedLanguage != "Arabic" ? (
                            <Text
                                allowFontScaling={false}
                                style={[styles.InfoReptTimeIndex, { fontFamily: "Montserrat",fontSize: moderateScale(11) }]}
                            >
                                No:{" "}
                                <Text
                                    allowFontScaling={false}
                                    style={[{ color: selectedColor ,fontSize: moderateScale(11)}]}
                                >
                                    {
                                        (indexToDisplay = state.isArabicNumbers
                                            ? convertToEasternArabicNumerals(
                                                (currentIndex + 1).toString()
                                            )
                                            : (currentIndex + 1).toString())
                                    }
                                </Text>
                                {"  "}
                                Of:{" "}
                                <Text
                                    allowFontScaling={false}
                                    style={[{ color: selectedColor,fontSize: moderateScale(11) }]}
                                >
                                    {
                                        (totalItemsToDisplay = state.isArabicNumbers
                                            ? convertToEasternArabicNumerals(
                                                item.subItems.length.toString()
                                            )
                                            : item.subItems.length.toString())
                                    }
                                </Text>
                            </Text>
                        ) : (
                            <Text
                                allowFontScaling={false}
                                style={[styles.InfoReptTimeIndex, { fontFamily: "AmiriFont",fontSize: moderateScale(11) }]}
                            >
                                الذكر{" "}
                                <Text
                                    allowFontScaling={false}
                                    style={[{ color: selectedColor,fontSize: moderateScale(11) }]}
                                >
                                    {
                                        (indexToDisplay = state.isArabicNumbers
                                            ? convertToEasternArabicNumerals(
                                                (currentIndex + 1).toString()
                                            )
                                            : (currentIndex + 1).toString())
                                    }
                                </Text>{" "}
                                من{" "}
                                <Text
                                    allowFontScaling={false}
                                    style={[{ color: selectedColor ,fontSize: moderateScale(11)}]}
                                >
                                    {
                                        (totalItemsToDisplay = state.isArabicNumbers
                                            ? convertToEasternArabicNumerals(
                                                item.subItems.length.toString()
                                            )
                                            : item.subItems.length.toString())
                                    }
                                </Text>
                            </Text>
                        )}
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.InfoReptTime,
                                {
                                    color: selectedColor,
                                    fontFamily:
                                        selectedLanguage != "Arabic" ? "Montserrat" : "AmiriFont",
                                    fontSize: moderateScale(11)
                                },
                            ]}
                        >
                            {item.subItems[currentIndex].repTime}
                        </Text>
                        <TouchableOpacity
                            onPress={handleButtonPress}
                            style={styles.FavButton}
                            activeOpacity={1}
                        >
                            <Svg width={24} height={24} viewBox="0 0 256 256">
                                <Path
                                    d="M128,216S28,160,28,92A52,52,0,0,1,128,72h0A52,52,0,0,1,228,92C228,160,128,216,128,216Z"
                                    stroke={isFilled ? "#b83f3f" : "#7e2a2a"}
                                    strokeWidth={5}
                                    stroke-linecap="round"
                                    fill={isFilled ? "#b83f3f" : "transparent"}
                                />
                            </Svg>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={Share}
                            style={styles.shareButton}
                            activeOpacity={1}
                        >
                            <View style={styles.dotContainer}>
                                <Text style={[styles.dot, { color: selectedColor ,fontSize: moderateScale(20)}]}>
                                    &#8226;
                                </Text>
                                <Text style={[styles.dot, { color: selectedColor,fontSize: moderateScale(20) }]}>
                                    &#8226;
                                </Text>
                                <Text style={[styles.dot, { color: selectedColor,fontSize: moderateScale(20) }]}>
                                    &#8226;
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.controlPan}>
                    <ImageBackground
                        source={ControlPaneBackgroundImage}
                        style={styles.ControlPaneBackground}
                    >
                        <TouchableWithoutFeedback
                            onPress={selectedLanguage != "Arabic" ? prevSubItem : nextSubItem}
                            disabled={
                                selectedLanguage != "Arabic"
                                    ? currentIndex === item.subItems.length + 1 &&
                                    count >= item.subItems[currentIndex].count
                                    : currentIndex === item.subItems.length - 1 &&
                                    count >= item.subItems[currentIndex].count
                            }
                        >
                            <View
                                style={[
                                    styles.button,
                                    { borderColor: selectedColor,height:moderateScale(60),width:moderateScale(130),alignItems:"center"},
                                ]}
                            >
                                {/*next button here button here*/}
                                <FontAwesomeIcon
                                    name="angle-left"
                                    size={moderateScale(24)}
                                    color="#454545"
                                    style={{marginRight:selectedLanguage != "Arabic"? moderateScale(5):moderateScale(20)}}
                                />
                                {selectedLanguage != "Arabic" ? (
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.textcount,
                                            {
                                                fontFamily: "Montserrat",
                                                fontSize: moderateScale(17)
                                            },
                                        ]}
                                    >
                                        Back Thikir
                                    </Text>
                                ) : (
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.textcount,
                                            {
                                                fontFamily: "AmiriFont",
                                                fontSize: moderateScale(17)
                                            },
                                        ]}
                                    >
                                        الذكر التالي
                                    </Text>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                        {/* Display the circular count */}
                        <TouchableWithoutFeedback
                            onPress={incrementCount}
                            disabled={
                                currentIndex === item.subItems.length - 1 &&
                                count >= item.subItems[currentIndex].count
                            }
                        >
                            <View
                                style={[styles.circularButton, { borderColor: selectedColor }]}
                            >
                                <Text
                                    style={[
                                        styles.textcount,
                                        {
                                            fontFamily:
                                                selectedLanguage != "Arabic"
                                                    ? "Montserrat"
                                                    : "ScheherazadeNew",
                                                    fontSize: moderateScale(17)
                                        },
                                    ]}
                                >
                                    {
                                        (countDisplay = state.isArabicNumbers
                                            ? convertToEasternArabicNumerals(count.toString())
                                            : count.toString())
                                    }
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={selectedLanguage != "Arabic" ? nextSubItem : prevSubItem}
                            disabled={
                                currentIndex === item.subItems.length + 1 &&
                                count >= item.subItems[currentIndex].count
                            }
                        >
                         <View
                                style={[
                                    styles.button,
                                    { borderColor: selectedColor,height:moderateScale(60),width:moderateScale(130),alignItems:"center"},
                                ]}
                            >
                                {/*back button here*/}
                                {selectedLanguage != "Arabic" ? (
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.textcount,
                                            {
                                                fontFamily: "Montserrat",
                                                fontSize: moderateScale(17)
                                            },
                                        ]}
                                    >
                                        Next Thikir
                                    </Text>
                                ) : (
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.textcount,
                                            {
                                                fontFamily: "AmiriFont",
                                                fontSize: moderateScale(17)
                                            },
                                        ]}
                                    >
                                        الذكر السابق
                                    </Text>
                                )}

                                <FontAwesomeIcon
                                    name="angle-right"
                                    size={moderateScale(24)}
                                    color="#454545"
                                    style={{marginLeft:selectedLanguage != "Arabic"? moderateScale(5):moderateScale(20)}}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </ImageBackground>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default GenericPage;
