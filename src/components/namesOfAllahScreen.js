import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    StatusBar,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "../context/ThemContex";
import { useColor } from "../context/ColorContext";
import { HomeStyles } from "../context/commonStyles";
import { Appearance } from "react-native";


const NamesOfAllahScreen = ({ navigation }) => {
    const jsonContent = require('../db/db_namesOfAllah.json');
    const items = jsonContent

    const { selectedTheme } = useTheme();
    const { selectedColor, setColor } = useColor();
    const systemTheme = selectedTheme === "system";


    //#region LightTheme
    const lightTheme = StyleSheet.create({
        pageContainer: {
            backgroundColor: "#f2f2f6",
        },
        container: {
            backgroundColor: "#f2f2f6",
        },
        TextMid: {
            color: "#000",
        },
        button: {
            backgroundColor: "#fefffe",
            shadowColor: "white",
        },
        buttonText: {
            color: "#000",
        },
        iconWrapper: {
            shadowColor: "white",
        },
        horizontalLine: {
            borderColor: "#fefffe",
        },
        containerSearchMode: {
            backgroundColor: "#f2f2f6",
        },
        searchBarContainer: {
            backgroundColor: "#f2f2f6",
        },
        searchBarInputContainer: {
            backgroundColor: "#fefffe",
            shadowColor: "white",
        },
        searchBarInput: {
            backgroundColor: "#fefffe",
            color: "#dddddd",
        },
        buttonGrid: {
            shadowColor: "white",
        },
        squareButton: {
            backgroundColor: "#fefffe",
        },
        buttonTextTop: {
            color: "#000",
        },
        iconTop: {
            color: "#f2b784",
        },
    });
    //#endregion

    //#region DarkTheme
    const darkTheme = StyleSheet.create({
        pageContainer: {
            backgroundColor: "#151515",
        },
        container: {
            backgroundColor: "#151515",
        },
        TextMid: {
            color: "#fff",
        },
        button: {
            backgroundColor: "#262626",
            shadowColor: "black",
        },
        buttonText: {
            color: "#fff",
        },
        iconWrapper: {
            shadowColor: "black",
        },
        horizontalLine: {
            borderColor: "#262626",
        },
        containerSearchMode: {
            backgroundColor: "#151515",
        },
        searchBarContainer: {
            backgroundColor: "#151515",
        },
        searchBarInputContainer: {
            backgroundColor: "#262626",
            shadowColor: "black",
        },
        searchBarInput: {
            backgroundColor: "#262626",
            color: "#dddddd",
        },
        buttonGrid: {
            shadowColor: "black",
        },
        squareButton: {
            backgroundColor: "#262626",
        },
        buttonTextTop: {
            color: "#dddddd",
        },
        iconTop: {
            color: "#f2b784",
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

    //#region StylesMapping
    const styles = {
        ...HomeStyles,
        pageContainer: {
            ...HomeStyles.pageContainer,
            ...(selectedTheme === "dark"
                ? themeStyles.pageContainer
                : themeStyles.pageContainer),
        },
        container: {
            ...HomeStyles.container,
            ...(selectedTheme === "dark"
                ? themeStyles.container
                : themeStyles.container),
        },
        TextMid: {
            ...HomeStyles.TextMid,
            ...(selectedTheme === "dark" ? themeStyles.TextMid : themeStyles.TextMid),
        },
        buttonText: {
            ...HomeStyles.buttonText,
            ...(selectedTheme === "dark"
                ? themeStyles.buttonText
                : themeStyles.buttonText), // Override button background color
        },
        button: {
            ...HomeStyles.button,
            ...(selectedTheme === "dark" ? themeStyles.button : themeStyles.button), // Override button background color
        },
        iconWrapper: {
            ...HomeStyles.iconWrapper,
            ...(selectedTheme === "dark"
                ? themeStyles.iconWrapper
                : themeStyles.iconWrapper), // Override button background color
        },
        horizontalLine: {
            ...HomeStyles.horizontalLine,
            ...(selectedTheme === "dark"
                ? themeStyles.horizontalLine
                : themeStyles.horizontalLine), // Override button background color
        },
        containerSearchMode: {
            ...HomeStyles.containerSearchMode,
            ...(selectedTheme === "dark"
                ? themeStyles.containerSearchMode
                : themeStyles.containerSearchMode), // Override button background color
        },
        searchBarContainer: {
            ...HomeStyles.searchBarContainer,
            ...(selectedTheme === "dark"
                ? themeStyles.searchBarContainer
                : themeStyles.searchBarContainer), // Override button background color
        },
        searchBarInputContainer: {
            ...HomeStyles.searchBarInputContainer,
            ...(selectedTheme === "dark"
                ? themeStyles.searchBarInputContainer
                : themeStyles.searchBarInputContainer), // Override button background color
        },
        searchBarInput: {
            ...HomeStyles.searchBarInput,
            ...(selectedTheme === "dark"
                ? themeStyles.searchBarInput
                : themeStyles.searchBarInput), // Override button background color
        },
        buttonGrid: {
            ...HomeStyles.buttonGrid,
            ...(selectedTheme === "dark"
                ? themeStyles.buttonGrid
                : themeStyles.buttonGrid), // Override button background color
        },
        squareButton: {
            ...HomeStyles.squareButton,
            ...(selectedTheme === "dark"
                ? themeStyles.squareButton
                : themeStyles.squareButton), // Override button background color
        },
        buttonTextTop: {
            ...HomeStyles.buttonTextTop,
            ...(selectedTheme === "dark"
                ? themeStyles.buttonTextTop
                : themeStyles.buttonTextTop), // Override button background color
        },
        iconTop: {
            ...HomeStyles.iconTop,
            ...(selectedTheme === "dark" ? themeStyles.iconTop : themeStyles.iconTop), // Override button background color
        },
    };
    //#endregion

    //#region Style baed on index
    const renderBorderRadius = (index) => {
        const itemCount = items.length;

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
        return {};
    };
    //#endregion


    return (
        <View style={styles.pageContainer}>
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    { justifyContent: "flex-start", paddingTop: 40 },
                ]}
                contentOffset={{ x: 0, y: 0 }}
            >
                {items.map((item, index) => (
                    <View key={item.name}>
                        <TouchableOpacity
                            style={[styles.button, renderBorderRadius(index),]}
                            onPress={() =>
                                navigation.navigate("namesOfAllahGenericPage", {
                                    name: item.name,
                                    item: item,
                                    itemIndex: index,
                                })
                            }
                            activeOpacity={0.7}
                        >
                            <View style={styles.iconWrapper}>
                                <FontAwesomeIcon
                                    name="angle-left"
                                    size={24}
                                    color={selectedColor}
                                    style={styles.icon}
                                />
                            </View>
                            <View style={styles.nameWrapper}>
                                <Text style={[styles.buttonText]}>{item.name}</Text>
                            </View>
                            <View style={styles.imageWrapper}>
                                {/* Image component */}
                                <Image style={styles.image} />
                            </View>
                        </TouchableOpacity>
                        {index !== items.length - 1 && (
                            <View style={styles.horizontalLine} />
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );

};

export default NamesOfAllahScreen;