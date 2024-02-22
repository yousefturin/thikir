import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    ScrollView,
    Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import {
    Swipeable,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Svg, Path, Circle } from "react-native-svg";
import * as Animatable from "react-native-animatable";
import { TasbehScreenStyle } from "../Styles/commonStyles";
import { useTheme } from "../context/ThemeContext";
import { useColor } from "../context/ColorContext";
import { useLanguage } from "../context/LanguageContext";
import { Appearance } from "react-native";
import { useNumberContext } from "../context/NumberContext";
import { getColorForTheme } from "../utils/themeUtils"

const defaultNames = [
    { name: "سبحان الله وبحمده", count: 0, thikir: [] },
    { name: "اللهم صل على نبينا محمد", count: 0, thikir: [] },
    { name: "استغفر الله واتوب اليه", count: 0, thikir: [] },
];

const TasbihScreen = () => {
    const [count, setCount] = useState(0);
    const [names, setNames] = useState([]);
    const [isNameListVisible, setIsNameListVisible] = useState(false);
    const [newName, setNewName] = useState("");
    const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(true);
    const [isLongPress, setIsLongPress] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [selectedNameIndex, setSelectedNameIndex] = useState(0);
    const [isContainerVisible, setContainerVisible] = useState(false);
    const inputRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollViewRef = useRef(null);
    const { state, convertToEasternArabicNumerals } = useNumberContext();

    const { selectedTheme } = useTheme();
    const { selectedColor } = useColor();
    const { selectedLanguage } = useLanguage();
    const systemTheme = selectedTheme === "system";
    
    const keyboardTheme = getColorForTheme({ dark: "dark", light: "light" }, selectedTheme, systemTheme);
    const backgroundSwapDisplay = getColorForTheme(
        { dark: "#242424", light: "#fefffe" },
        selectedTheme,
        systemTheme
      );


    //#region ArabicLanguage
    const ArabicLanguage = StyleSheet.create({
        CloseBtnModePage: {
            position: "absolute",
            bottom: 45,
            left: 25,
        },
    });
    //#endregion

    //#region EnglishLanguage
    const EnglishLanguage = StyleSheet.create({
        CloseBtnModePage: {
            position: "absolute",
            bottom: 45,
            right: 25,
    },
    });
    //#endregion

    //#region LightTheme
    const lightTheme = StyleSheet.create({
        container: {
            backgroundColor: "#f2f2f6",
        },
        circle: {
            backgroundColor: "#fefffe",
            shadowColor: "gray", 
        },
        countValue: {
            color: "#000",
        },
        thikirNameDispalyBtn: {
            backgroundColor: "#fefffe",
            shadowColor: "gray", 
        },
        pickThikirText: {
            color: "#000",
        },
        ModalTopNotch: {
            backgroundColor: "#fefffe",
            shadowColor: "gray", 
        },
        addNewThikirModalContainer: {
            backgroundColor: "#f2f2f6",
        },
        buttonThikirDisplayInModal: {
            backgroundColor: "#fefffe",
        },
        newThikirTextInModal: {
            color: "#000",
        },
        inputTextContainerInModa: {
            color: "#000",
            backgroundColor: "#fefffe",
            shadowColor: "gray", 
        },
        rectangle: {
            backgroundColor: "#f2f2f6",
        },
        separator: {
            borderColor: "#f2f2f6",
        },
        itemText: {
            color: "#000",
        },
        modaldisplay: {
            shadowColor: "gray", 
        }
    });
    //#endregion

    //#region DarkTheme
    const darkTheme = StyleSheet.create({
        container: {
            backgroundColor: "#151515",
        },
        circle: {
            backgroundColor: "#242424",
            shadowColor: "black", 
        },
        countValue: {
            color: "#fff",
        },
        thikirNameDispalyBtn: {
            backgroundColor: "#242424",
            shadowColor: "black", 
        },
        pickThikirText: {
            color: "#fff",
        },
        ModalTopNotch: {
            backgroundColor: "#242424",
            shadowColor: "black", 
        },
        addNewThikirModalContainer: {
            backgroundColor: "#151515",
        },
        buttonThikirDisplayInModal: {
            backgroundColor: "#242424",
        },
        newThikirTextInModal: {
            color: "#fff",
        },
        inputTextContainerInModa: {
            color: "#fff",
            backgroundColor: "#242424",
            shadowColor: "black", 
        },
        rectangle: {
            backgroundColor: "#151515",
        },
        separator: {
            borderColor: "#151515",
        },
        itemText: {
            color: "#fff",
        },
        modaldisplay: {
            shadowColor: "black", 
        }
    });
    //#endregion


    const themeStyles = getColorForTheme({ dark: darkTheme, light: lightTheme },selectedTheme,systemTheme);

    //#region StyleMapping
    const styles = {
        ...TasbehScreenStyle,
        container: {
            ...TasbehScreenStyle.container,
            ...(selectedTheme === "dark"
                ? themeStyles.container
                : themeStyles.container),
        },
        circle: {
            ...TasbehScreenStyle.circle,
            ...(selectedTheme === "dark" ? themeStyles.circle : themeStyles.circle),
        },
        countValue: {
            ...TasbehScreenStyle.countValue,
            ...(selectedTheme === "dark"
                ? themeStyles.countValue
                : themeStyles.countValue),
        },
        thikirNameDispalyBtn: {
            ...TasbehScreenStyle.thikirNameDispalyBtn,
            ...(selectedTheme === "dark"
                ? themeStyles.thikirNameDispalyBtn
                : themeStyles.thikirNameDispalyBtn),
        },
        pickThikirText: {
            ...TasbehScreenStyle.pickThikirText,
            ...(selectedTheme === "dark"
                ? themeStyles.pickThikirText
                : themeStyles.pickThikirText),
        },
        ModalTopNotch: {
            ...TasbehScreenStyle.ModalTopNotch,
            ...(selectedTheme === "dark"
                ? themeStyles.ModalTopNotch
                : themeStyles.ModalTopNotch),
        },
        addNewThikirModalContainer: {
            ...TasbehScreenStyle.addNewThikirModalContainer,
            ...(selectedTheme === "dark"
                ? themeStyles.addNewThikirModalContainer
                : themeStyles.addNewThikirModalContainer),
        },
        buttonThikirDisplayInModal: {
            ...TasbehScreenStyle.buttonThikirDisplayInModal,
            ...(selectedTheme === "dark"
                ? themeStyles.buttonThikirDisplayInModal
                : themeStyles.buttonThikirDisplayInModal),
        },
        newThikirTextInModal: {
            ...TasbehScreenStyle.newThikirTextInModal,
            ...(selectedTheme === "dark"
                ? themeStyles.newThikirTextInModal
                : themeStyles.newThikirTextInModal),
        },
        inputTextContainerInModa: {
            ...TasbehScreenStyle.inputTextContainerInModa,
            ...(selectedTheme === "dark"
                ? themeStyles.inputTextContainerInModa
                : themeStyles.inputTextContainerInModa),
        },
        rectangle: {
            ...TasbehScreenStyle.rectangle,
            ...(selectedTheme === "dark"
                ? themeStyles.rectangle
                : themeStyles.rectangle),
        },
        separator: {
            ...TasbehScreenStyle.separator,
            ...(selectedTheme === "dark"
                ? themeStyles.separator
                : themeStyles.separator),
        },
        itemText: {
            ...TasbehScreenStyle.itemText,
            ...(selectedTheme === "dark"
                ? themeStyles.itemText
                : themeStyles.itemText),
        },
        CloseBtnModePage:{
            ...TasbehScreenStyle.CloseBtnModePage,
            ...(selectedLanguage != "Arabic" ? EnglishLanguage.CloseBtnModePage : ArabicLanguage.CloseBtnModePage )
        },
        modaldisplay:{
            ...TasbehScreenStyle.modaldisplay,
            ...(selectedLanguage != "Arabic" ? EnglishLanguage.modaldisplay : ArabicLanguage.modaldisplay )
        },
    };
    //#endregion

    // Add an onScroll event handler to the ScrollView to track scrolling
    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY > 0) {
            setIsScrolling(true);
        } else {
            setIsScrolling(false);
        }
    };

    const renderBorderRadius = (index) => {
        const itemCount = names.length;
        if (itemCount === 1) {
            return {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            };
        } else if (index === 0) {
            return {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            };
        } else if (index === itemCount - 1) {
            return {
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            };
        }
        else {
            if (isDeleteButtonVisible) {
                if (index === 0) {
                    return {
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    };
                } else if (index === itemCount - 1) {
                    return {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    };
                }
            }
        }
        return {};
    };

    //#region LoadData
    useEffect(() => {
        // Load data from AsyncStorage when the component mounts
        const loadAsyncData = async () => {
            try {
                const savedNames = await AsyncStorage.getItem("names");
                if (savedNames) {
                    setNames(JSON.parse(savedNames));
                } else {
                    setNames(defaultNames);
                }

                const savedCount = await AsyncStorage.getItem("count");
                if (savedCount) {
                    setCount(parseInt(savedCount));
                } else {
                    setCount(0);
                }

                const savedSelectedNameIndex = await AsyncStorage.getItem(
                    "selectedNameIndex"
                );
                if (savedSelectedNameIndex) {
                    setSelectedNameIndex(parseInt(savedSelectedNameIndex));
                } else {
                    setSelectedNameIndex(0);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        loadAsyncData();
    }, []);
    //#endregion

    //#region SaveData
    useEffect(() => {
        // Save data to AsyncStorage whenever names, count, or selectedNameIndex change
        const saveAsyncData = async () => {
            try {
                await AsyncStorage.setItem("names", JSON.stringify(names));
                await AsyncStorage.setItem("count", count.toString());
                await AsyncStorage.setItem(
                    "selectedNameIndex",
                    selectedNameIndex.toString()
                );
            } catch (error) {
                console.error("Error saving data:", error);
            }
        };

        saveAsyncData();
    }, [names, count, selectedNameIndex]);
    //#endregion

    //#region handleIncrement and animation
    const handleIncrement = () => {
        if (!isLongPress) {
            const updatedNames = [...names];
            updatedNames[selectedNameIndex].count++;
            setNames(updatedNames);
            setCount(updatedNames[selectedNameIndex].count);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

            animateCircle();
        }
    };
    //#endregion

    //#region Circle animation
    const animateCircle = () => {
        // Reset the animation value
        animation.setValue(0);

        Animated.timing(animation, {
            toValue: 1,
            duration: 900, // Adjust the duration as needed
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {
            // Animation complete
            animation.setValue(0); // Reset the animation value
        });
    };
    //#endregion

    //#region handleReset
    const handleReset = () => {
        const updatedNames = [...names];
        updatedNames[selectedNameIndex].count = 0;
        setNames(updatedNames);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setCount(0);
    };
    //#endregion

    //#region OpenListName
    const openNameList = () => {
        setIsNameListVisible(true);
    };
    //#endregion

    //#region SelectName
    const selectName = (index) => {
        if (names.length === 1 && selectedNameIndex === 0) {
            return; // Prevent swiping when there's only one original name
        }

        setSelectedNameIndex(index);
        setCount(names[index].count);
        setIsNameListVisible(false);
    };
    //#endregion

    const handleButtonPress = () => {
        setIsNameListVisible(false);
    };
    const toggleContainer = () => {
        setContainerVisible(!isContainerVisible);
    };
    const renderButtonCloseModal = () => {
        if (Platform.OS === "android") {
            return (
                <TouchableOpacity
                    onPress={handleButtonPress}
                    style={
                        styles.CloseBtnModePage}
                >
                
                    <View
                        style={{
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text allowFontScaling={false} style={styles.ThikirNewText}>
                            {selectedLanguage != "Arabic"?"Close":"أغلاق"}
                            
                        </Text>
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 512 512"
                            style={styles.ThikirNewText}
                        >
                            <Path
                                d="M48,256c0,114.87,93.13,208,208,208s208-93.13,208-208S370.87,48,256,48,48,141.13,48,256Zm224-80.09L208.42,240H358v32H208.42L272,336.09,249.3,358.63,147.46,256,249.3,153.37Z"
                                fill="currentColor"
                            />
                        </Svg>
                    </View>
                </TouchableOpacity>
            );
        } else {
            // Return null for iOS 
            return null;
        }
    };
    //#region AddName
    const addName = () => {
        if (newName) {
            const updatedNames = [...names, { name: newName, count: 0, thikir: [] }];
            setNames(updatedNames);
            setSelectedNameIndex(updatedNames.length - 1);
            setNewName("");
            setIsDeleteButtonVisible(true);
            toggleContainer(); // Hide the container after adding the name
        }
    };
    //#endregion

    //#region DeleteName
    const deleteName = (index) => {
        const updatedNames = [...names];
        updatedNames.splice(index, 1);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Medium);

        if (updatedNames.length === 0) {
            // All names are deleted, set count to 0
            setCount(0);
        } else if (updatedNames.length === 1) {
            // Only one name left, enable swipe and set selected index to 0
            setSelectedNameIndex(0);
            setIsDeleteButtonVisible(true);
            setCount(updatedNames[0].count);
        } else {
            // Check if the selected index needs to be updated
            if (index === selectedNameIndex) {
                setSelectedNameIndex(0);
                setCount(updatedNames[0].count);
            }
        }

        setNames(updatedNames);
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
            handleIncrement();
        }

        setIsLongPress(false); // Reset the long press flag
        isSwiping = false; // Reset the swipe flag
    };
    const Separator = () => <View style={styles.separator} />;

    const handleSwipe = () => {
        isSwiping = true;
    };
    //#endregion

    useEffect(() => {
        animateCircle();
    }, []);

    return (
        <TouchableWithoutFeedback
            onPressIn={handleContainerPressIn}
            onPressOut={handleContainerPressOut}
            onResponderMove={handleSwipe}
            disabled={!names[selectedNameIndex]}
        >
            <View style={styles.container}>
                <View style={styles.resetBtn}>
                    <TouchableOpacity disabled={!names[selectedNameIndex]} onPress={handleReset}>
                        <Svg
                            height="24"
                            viewBox="0 0 21 21"
                            width="24"
                            style={[{ margin: 20 }]}
                        >
                            <Path
                                d="m12.5 1.5c2.4138473 1.37729434 4 4.02194088 4 7 0 4.418278-3.581722 8-8 8s-8-3.581722-8-8 3.581722-8 8-8"
                                fill="none"
                                fill-rule="evenodd"
                                strokeWidth={2}
                                stroke={selectedColor}
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                transform="translate(2 2)"
                            />
                            <Path
                                d="m12.5 5.5v-4h4"
                                fill="none"
                                fill-rule="evenodd"
                                stroke={selectedColor}
                                strokeWidth={2}
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                transform="translate(2 2)"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={styles.wrapercountValue}>
                    <View style={styles.circleContainer}>
                        {/* Original Circle */}
                        <View style={styles.circle}>
                            <Text allowFontScaling={false} style={styles.countValue}>
                                {
                                    (NumberCountMainToDisplay = state.isArabicNumbers
                                        ? convertToEasternArabicNumerals(count.toString())
                                        : count.toString())
                                }
                            </Text>
                        </View>

                        {/* Animated Circle (Duplica) */}
                        <Animated.View
                            style={[
                                styles.duplica,
                                {
                                    opacity: animation,
                                    transform: [
                                        {
                                            scale: animation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [1, 1.8],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Svg width="200" height="200" viewBox="0 0 200 200">
                                <Circle
                                    cx="101"
                                    cy="101"
                                    r="98"
                                    fill="transparent"
                                    stroke={selectedColor}
                                    strokeWidth="2"
                                    strokeOpacity={1}
                                />
                            </Svg>
                        </Animated.View>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.thikirNameDispalyBtn}
                    onPress={() => {
                        openNameList();
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                    }}
                >
                    <Text
                        allowFontScaling={false}
                        style={[styles.thikirNameDispaly, { color: selectedColor }]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {names[selectedNameIndex] && names[selectedNameIndex].name
                            ? names[selectedNameIndex].name
                            : "اختار الذكر"}
                    </Text>
                </TouchableOpacity>

                <Modal
                    visible={isNameListVisible}
                    animationType="slide"
                    transparent={false}
                    presentationStyle="formSheet"
                    statusBarTranslucent={false}
                    onRequestClose={() => {
                        setIsNameListVisible(false);
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                    }}
                > 
                    <View style={styles.container}>
                        <Text allowFontScaling={false} style={[styles.pickThikirText,{fontFamily:selectedLanguage != "Arabic"?"Montserrat":"ScheherazadeNewBold"}]}>
                            {selectedLanguage != "Arabic"?"Select a Supplication":"اختيار الذكر"}
                        </Text>
                        <View style={styles.ModalTopNotch} />
                        {selectedLanguage != "Arabic"?(                        
                            <TouchableOpacity
                            onPress={() => {
                                toggleContainer();
                                setTimeout(() => {
                                    inputRef.current.focus();
                                }, 100);
                            }}
                            style={{
                                position: "absolute",
                                bottom: 45,
                                left: 25,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 512 512"
                                    style={styles.ThikirNewText}
                                >
                                    <Path
                                        d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm96,224H272v80H240V272H160V240h80V160h32v80h80Z"
                                        fill="currentColor"
                                    />
                                </Svg>
                                <Text allowFontScaling={false} style={styles.ThikirNewText}>
                                        New Supplication
                                </Text>
                            </View>
                        </TouchableOpacity>
                        ):(
                        <TouchableOpacity
                            onPress={() => {
                                toggleContainer();
                                setTimeout(() => {
                                    inputRef.current.focus();
                                }, 100);
                            }}
                            style={{
                                position: "absolute",
                                bottom: 45,
                                right: 25,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text allowFontScaling={false} style={styles.ThikirNewText}>
                                  ذكر جديد
                                </Text>
                                <Svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 512 512"
                                    style={styles.ThikirNewText}
                                >
                                    <Path
                                        d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm96,224H272v80H240V272H160V240h80V160h32v80h80Z"
                                        fill="currentColor"
                                    />
                                </Svg>
                            </View>
                        </TouchableOpacity>
                        )}

                        {renderButtonCloseModal()}
                        <View style={styles.rectangle}>
                            <View style={styles.modaldisplay}>
                                <ScrollView
                                    style={{ borderRadius: 10 }}
                                    ref={scrollViewRef}
                                    onScroll={handleScroll}
                                >
                                    {names.map((item, index) => (
                                        <GestureHandlerRootView  key={item.name}>
                                            <Swipeable
                                                renderRightActions={(dragX) =>
                                                    isDeleteButtonVisible ? (
                                                        <DeleteButton
                                                            onDelete={() => deleteName(index)}
                                                            dragX={dragX}
                                                        />
                                                    ) : null
                                                }
                                                containerStyle={[renderBorderRadius(index),{ backgroundColor:backgroundSwapDisplay}]}
                                                overshootRight={false}
                                                onSwipeableWillOpen={() => {
                                                    Haptics.notificationAsync(
                                                        Haptics.NotificationFeedbackType.Success
                                                    );
                                                }}
                                                onSwipeableWillClose={() => {
                                                    Haptics.notificationAsync(
                                                        Haptics.NotificationFeedbackType.Error
                                                    );
                                                }}
                                            >
                                                <TouchableWithoutFeedback
                                                    onPress={() => selectName(index)}
                                                    activeOpacity={0.8}
                                                >
                                                    <View
                                                        style={[
                                                            styles.buttonThikirDisplayInModal,
                                                            renderBorderRadius(index),
                                                            
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[styles.itemText]}
                                                            numberOfLines={1}
                                                            ellipsizeMode="tail"
                                                        >
                                                            {item.name}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.itemCount,
                                                                { color: selectedColor },
                                                            ]}
                                                            numberOfLines={1}
                                                            ellipsizeMode="tail"
                                                        >
                                                            {
                                                                (itemCountMainToDisplay = state.isArabicNumbers
                                                                    ? convertToEasternArabicNumerals(
                                                                        item.count.toString()
                                                                    )
                                                                    : item.count.toString())
                                                            }
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                {index < names.length - 1 && (
                                                    <View
                                                        key={`separator-${index}`}
                                                        style={styles.separator}
                                                    />
                                                )}
                                            </Swipeable>
                                        </GestureHandlerRootView>
                                    ))}
                                </ScrollView>
                            </View>
                            <View>
                                <Modal
                                    transparent={true}
                                    animationType="fade"
                                    visible={isContainerVisible}
                                    onRequestClose={toggleContainer}
                                >
                                    <TouchableOpacity
                                        style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                                        onPress={toggleContainer}
                                        activeOpacity={1}
                                    >
                                        <Animatable.View
                                            animation={
                                                isContainerVisible ? "slideInUp" : "fadeOutDown"
                                            }
                                            style={{
                                                flex: 1,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: 20,
                                                paddingBottom: 70,
                                            }}
                                        >
                                            <View style={styles.addNewThikirModalContainer}>
                                                <Text style={[styles.newThikirTextInModal,{fontFamily:selectedLanguage != "Arabic"?"Montserrat":"ScheherazadeNewBold"}]}>
                                                    {selectedLanguage != "Arabic"?"New Supplication":"ذكر جديد"}
                                                </Text>
                                                <TextInput
                                                    ref={inputRef}
                                                    value={newName}
                                                    onChangeText={setNewName}
                                                    onSubmitEditing={addName}
                                                    keyboardAppearance={keyboardTheme}
                                                    style={styles.inputTextContainerInModa}
                                                />
                                            </View>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                </Modal>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

const DeleteButton = ({ onDelete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const { selectedLanguage } = useLanguage();
    const handleDelete = () => {
        onDelete();
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#ff453a",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "left",
            }}
            activeOpacity={0.2}
            onPress={handleDelete}
        >
            <Text style={{ padding: 10, color: "#fff" }}>{selectedLanguage != "Arabic"?"Delete":"حذف"}</Text>
        </TouchableOpacity>
    );
};

export default TasbihScreen;
