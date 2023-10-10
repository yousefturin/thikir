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
import { handleShare } from "../utils/shareUtils";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "../context/ThemContex";
import { useFont } from "../context/FontContext";
import { GenericStyles } from "../context/commonStyles";
import Svg, { Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GenericPage = ({ route }) => {
    const { selectedTheme } = useTheme();
    const { selectedFont } = useFont();

    const HafsFont = StyleSheet.create({
        title:{
            fontFamily:"Hafs",
        }
    });
    const ScheherazadeNewFont = StyleSheet.create({
        title:{
            fontFamily:"ScheherazadeNew",
        }
    });
    const MeQuranFont = StyleSheet.create({
        title:{
            fontFamily:"MeQuran",
        }
    });
    //#region LightTheme
    const lightStyles = StyleSheet.create({
        container: {
            backgroundColor: "#f2f2f6",
        },
        containerforshare: {
            backgroundColor: "#f2f2f6",
        },
        circularButton: {
            borderColor: "#151515",
            backgroundColor: "#fefffe",
        },
        button: {
            backgroundColor: "#fefffe",
            borderColor: "#151515",
        },
        textcount: {
            textAlign: "center",
            color: "#000",
        },
        rectangle: {
            backgroundColor: "#fefffe",
            shadowColor: "white",
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
        ControlPaneBackground: {
            shadowColor: "white",
        },
        horizontalLine: {
            borderColor: "#f2f2f6",
        },
    });
    //#endregion

    //#region DarkTheme
    const darkStyles = StyleSheet.create({
        container: {
            backgroundColor: "#151515",
        },
        containerforshare: {
            backgroundColor: "#151515",
        },
        circularButton: {
            borderColor: "#151515",
            backgroundColor: "#262626",
        },
        button: {
            backgroundColor: "#262626",
            borderColor: "#151515",
        },
        textcount: {
            textAlign: "center",
            color: "white",
        },
        rectangle: {
            backgroundColor: "#262626",
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
        ControlPaneBackground: {
            shadowColor: "black",
        },
        horizontalLine: {
            borderColor: "#151515",
        },
    });
    //#endregion

    //#region StyleMapping
    const styles = {
        ...GenericStyles,
        container: {
            ...GenericStyles.container,
            ...(selectedTheme  === 'dark'? darkStyles.container : lightStyles.container),
        },
        containerforshare: {
            ...GenericStyles.containerforshare,
            ...(selectedTheme === 'dark'
                ? darkStyles.containerforshare
                : lightStyles.containerforshare),
        },
        circularButton: {
            ...GenericStyles.circularButton,
            ...(selectedTheme  === 'dark'? darkStyles.circularButton : lightStyles.circularButton),
        },
        button: {
            ...GenericStyles.button,
            ...(selectedTheme  === 'dark'? darkStyles.button : lightStyles.button),
        },
        textcount: {
            ...GenericStyles.textcount,
            ...(selectedTheme === 'dark' ? darkStyles.textcount : lightStyles.textcount),
        },
        rectangle: {
            ...GenericStyles.rectangle,
            ...(selectedTheme === 'dark' ? darkStyles.rectangle : lightStyles.rectangle),
        },
        title: {
            ...GenericStyles.title,
            ...(selectedTheme  === 'dark'? darkStyles.title : lightStyles.title),
            ...(selectedFont === 'MeQuran' ? MeQuranFont.title : (selectedFont === 'ScheherazadeNew' ? ScheherazadeNewFont.title : HafsFont.title)),
        },
        description: {
            ...GenericStyles.description,
            ...(selectedTheme  === 'dark'? darkStyles.description : lightStyles.description),
        },
        InfoReptTimeIndex: {
            ...GenericStyles.InfoReptTimeIndex,
            ...(selectedTheme === 'dark'
                ? darkStyles.InfoReptTimeIndex
                : lightStyles.InfoReptTimeIndex),
        },
        InfoReptTime: {
            ...GenericStyles.InfoReptTime,
            ...(selectedTheme === 'dark' ? darkStyles.InfoReptTime : lightStyles.InfoReptTime),
        },
        ControlPaneBackground: {
            ...GenericStyles.ControlPaneBackground,
            ...(selectedTheme === 'dark'
                ? darkStyles.ControlPaneBackground
                : lightStyles.ControlPaneBackground),
        },
        horizontalLine: {
            ...GenericStyles.horizontalLine,
            ...(selectedTheme === 'dark' ? darkStyles.horizontalLine : lightStyles.horizontalLine),
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
    const ControlPaneBackgroundImage = selectedTheme ==='dark'
        ? require("../../assets/HeaderBackground.jpg")
        : require("../../assets/HeaderBackgroundLight.jpg");
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
        const sanitizedDescription = subItemDescription.replace(/[-~]+/g, "");
        const sanitizedName = subItemName.replace(/[-~]+/g, "");
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
        console.log( MaxFontSize, maxPadding, maxpaddingHorizontal);
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
                                padding: maxPadding,
                                paddingHorizontal: maxpaddingHorizontal,
                            },
                        ]}
                    >
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                    <TouchableOpacity activeOpacity={1}>
                        <Text style={[styles.title, { fontSize: MaxFontSizeDescription }]}>
                        {item.subItems[currentIndex].subItemName}
                        </Text>
                        </TouchableOpacity>
                    </ScrollView>
                    

                        <View style={styles.horizontalLine} />
                        <Text allowFontScaling={false} style={styles.description}>
                            {item.subItems[currentIndex].subItemDescription}
                        </Text>
                        <Text allowFontScaling={false} style={styles.InfoReptTimeIndex}>
                            الذكر{" "}
                            <Text allowFontScaling={false} style={[{ color: "#f2b784" }]}>
                                {currentIndex + 1}
                            </Text>{" "}
                            من{" "}
                            <Text allowFontScaling={false} style={[{ color: "#f2b784" }]}>
                                {item.subItems.length}
                            </Text>
                        </Text>
                        <Text allowFontScaling={false} style={styles.InfoReptTime}>
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
                        <TouchableOpacity onPress={Share} style={styles.shareButton} activeOpacity={1}>
                            <View style={styles.dotContainer}>
                                <Text style={styles.dot}>&#8226;</Text>
                                <Text style={styles.dot}>&#8226;</Text>
                                <Text style={styles.dot}>&#8226;</Text>
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
                            onPress={nextSubItem}
                            disabled={
                                currentIndex === item.subItems.length - 1 &&
                                count >= item.subItems[currentIndex].count
                            }
                        >
                            <View style={[styles.button]}>
                                {/*next button here button here*/}
                                <FontAwesomeIcon
                                    name="angle-left"
                                    size={24}
                                    color="#454545"
                                    style={styles.icon}
                                />
                                <Text allowFontScaling={false} style={styles.textcount}>
                                    الذكر التالي
                                </Text>
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
                            <View style={styles.circularButton}>
                                <Text style={styles.textcount}>{count}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={prevSubItem}
                            disabled={
                                currentIndex === item.subItems.length + 1 &&
                                count >= item.subItems[currentIndex].count
                            }
                        >
                            <View style={styles.button}>
                                {/*back button here*/}
                                <Text allowFontScaling={false} style={styles.textcount}>
                                    الذكر السابق
                                </Text>
                                <FontAwesomeIcon
                                    name="angle-right"
                                    size={24}
                                    color="#454545"
                                    style={styles.icon}
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
