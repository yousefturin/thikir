import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
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

const GenericPage = ({ route }) => {
    const { selectedTheme } = useTheme();
    const { selectedFont } = useFont();
    const { selectedColor } = useColor();
    const systemTheme = selectedTheme === "system";
    const { state, convertToEasternArabicNumerals } = useNumberContext();
    const { selectedLanguage } = useLanguage();

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

    //#region
    const { item, itemIndex } = route.params;
    const [count, setCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [MaxFontSizeDescription, setMaxFontSizeDescription] = useState(0);
    const [maxpaddingHorizontal, setMaxpaddingHorizontal] = useState(0);
    const [maxPadding, setMaxPadding] = useState(0);
    const [isLongPress, setIsLongPress] = useState(false);
    const [isTranslation, setIsTranslation] = useState(false);

    const handleButtonPressTranslation = () => {
        setIsTranslation(!isTranslation);
    };
    const ControlPaneBackgroundImage = getColorForTheme(
        {
            dark: require("../../assets/Images/HeaderBackground.jpg"),
            light: require("../../assets/Images/HeaderBackgroundLight.jpg"),
        },
        selectedTheme,
        systemTheme
    );
    const viewRef = React.useRef();
    //#endregion

    const Share = async () => {
        await handleShare(viewRef.current);
    };

    //#region DisplayViewStyle base on character length
    useEffect(() => {
        // Find the maximum height based on the character length of subItemDescription
        const subItemName = item.subItems[currentIndex].subItemDescription;
        const subItemDescription = item.subItems[currentIndex].subItemName;
        // Remove non-printable characters and control characters
        const sanitizedDescription =
            selectedLanguage != "Arabic"
                ? subItemDescription
                : subItemDescription.replace(/[-~]+/g, "");
        const sanitizedName =
            selectedLanguage != "Arabic"
                ? subItemName
                : subItemName.replace(/[-~]+/g, "");
        console.log(
            "sanitized subItemDescription length is:",
            sanitizedDescription.length
        );
        console.log("sanitized sanitizedName length is:", sanitizedName.length);
        let MaxFontSize = 20;
        let maxPadding = 60;
        let maxpaddingHorizontal = 20;

        if (sanitizedDescription.length > 1000) {
            MaxFontSize = 16;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        } else if (sanitizedDescription.length > 700) {
            MaxFontSize = 17;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        } else if (sanitizedDescription.length > 600) {
            MaxFontSize = 17;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        } else if (sanitizedDescription.length > 500) {
            MaxFontSize = 17;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        } else if (sanitizedDescription.length > 400) {
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        } else if (sanitizedDescription.length > 300) {
            maxpaddingHorizontal = 10;
            maxPadding = 30;
        } else if (sanitizedDescription.length > 290) {
            maxpaddingHorizontal = 10;
            maxPadding = 30;
        } else if (sanitizedDescription.length > 200) {
            maxpaddingHorizontal = 10;
            maxPadding = 30;
        } else if (sanitizedName.length > 200) {
            MaxFontSize = 17;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        }
        console.log(MaxFontSize, maxPadding, maxpaddingHorizontal);
        setMaxFontSizeDescription(MaxFontSize);
        setMaxPadding(maxPadding);
        setMaxpaddingHorizontal(maxpaddingHorizontal);
    }, [item.subItems, currentIndex]);
    //#endregion

    //#region navigationBetweenSubitems
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

    let pressTimeout;
    let startX = 0; // Initial X-coordinate of the touch
    let startY = 0; // Initial Y-coordinate of the touch
    let isSwiping = false; // Track if a swipe occurred

    //#region pressControl for long/short
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

        if (!isSwiping && swipeDistanceX < 10 && swipeDistanceY < 10) {
            // Only increment the count if it's not a swipe (adjust the threshold as needed)
            incrementCount();
        }

        setIsLongPress(false); // Reset the long press flag
        isSwiping = false; // Reset the swipe flag
    };

    const handleSwipe = () => {
        isSwiping = true;
    };
    //#endregion

    const [isFilled, setIsFilled] = useState(false);

    //#region buttonToFavController
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
            onResponderMove={handleSwipe}
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
                                            fontSize: MaxFontSizeDescription,
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
                                        style={[styles.TranslationDescription, { fontSize: 14 ,textAlign:"left",}]}
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
                                                fontSize: 14,
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
                                { paddingBottom: 50, paddingTop: 10 },
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
                                style={[styles.InfoReptTimeIndex, { fontFamily: "Montserrat" }]}
                            >
                                No:{" "}
                                <Text
                                    allowFontScaling={false}
                                    style={[{ color: selectedColor }]}
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
                                    style={[{ color: selectedColor }]}
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
                                style={[styles.InfoReptTimeIndex, { fontFamily: "AmiriFont" }]}
                            >
                                الذكر{" "}
                                <Text
                                    allowFontScaling={false}
                                    style={[{ color: selectedColor }]}
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
                                    style={[{ color: selectedColor }]}
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
                                    strokeWidth={2}
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
                                <Text style={[styles.dot, { color: selectedColor }]}>
                                    &#8226;
                                </Text>
                                <Text style={[styles.dot, { color: selectedColor }]}>
                                    &#8226;
                                </Text>
                                <Text style={[styles.dot, { color: selectedColor }]}>
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
                                    { borderColor: selectedColor, position: "relative" },
                                ]}
                            >
                                {/*next button here button here*/}
                                <FontAwesomeIcon
                                    name="angle-left"
                                    size={24}
                                    color="#454545"
                                    style={[
                                        styles.icon,
                                        {
                                            position: "absolute",
                                            left: selectedLanguage != "Arabic" ? 10 : 15,
                                            top: "45%",
                                        },
                                    ]}
                                />
                                {selectedLanguage != "Arabic" ? (
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.textcount,
                                            {
                                                fontFamily: "Montserrat",
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
                            <View style={[styles.button, { borderColor: selectedColor }]}>
                                {/*back button here*/}
                                {selectedLanguage != "Arabic" ? (
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.textcount,
                                            {
                                                fontFamily: "Montserrat",
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
                                            },
                                        ]}
                                    >
                                        الذكر السابق
                                    </Text>
                                )}

                                <FontAwesomeIcon
                                    name="angle-right"
                                    size={24}
                                    color="#454545"
                                    style={[
                                        styles.icon,
                                        {
                                            position: "absolute",
                                            right: selectedLanguage != "Arabic" ? 10 : 15,
                                            top: "45%",
                                        },
                                    ]}
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
