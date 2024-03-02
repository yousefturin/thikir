import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { captureRef } from 'react-native-view-shot';

import { DuaVerseStyles } from "../Styles/commonStyles";
import initializeScalingUtils from '../utils/core/NormalizeSize';
import { getColorForTheme } from '../utils/themeUtils';


// Function to generate modified JSX content and capture it
export const generateAndCaptureJsx = async ({ selectedTheme, selectedFont, selectedLanguage, state, convertToEasternArabicNumerals, Translation, MainText, RefTranslation, Ref, flag }) => {
    const systemTheme = selectedTheme === "system";
    const { moderateScale } = initializeScalingUtils(Dimensions);
    //#region LightTheme
    const lightTheme = StyleSheet.create({
        container: {
            backgroundColor: "#f2f2f6",
        },
        rectangle: {
            backgroundColor: "#fefffe",
            shadowColor: "gray",
        },
        title: {
            color: "#000",
        },
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
        rectangle: {
            backgroundColor: "#242424",
            shadowColor: "black",
        },
        title: {
            color: "#fff",
        },
        horizontalLine: {
            borderColor: "#151515",
        },
    });
    //#endregion
    //#region selectedFont
    const HafsFont = StyleSheet.create({
        title: {
            fontFamily: "Hafs",
        },
    });
    const ScheherazadeNewFont = StyleSheet.create({
        title: {
            fontFamily: "ScheherazadeNew",
        },
    });
    const MeQuranFont = StyleSheet.create({
        title: {
            fontFamily: "MeQuran",
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
        ...DuaVerseStyles,
        container: {
            ...DuaVerseStyles.container,
            ...(selectedTheme === "dark"
                ? themeStyles.container
                : themeStyles.container),
        },
        rectangle: {
            ...DuaVerseStyles.rectangle,
            ...(selectedTheme === "dark"
                ? themeStyles.rectangle
                : themeStyles.rectangle),
        },
        title: {
            ...DuaVerseStyles.title,
            ...(selectedTheme === "dark" ? themeStyles.title : themeStyles.title),
            ...(selectedFont === "MeQuran"
                ? MeQuranFont.title
                : selectedFont === "ScheherazadeNew"
                    ? ScheherazadeNewFont.title
                    : HafsFont.title),
        },
        horizontalLine: {
            ...DuaVerseStyles.horizontalLine,
            ...(selectedTheme === "dark"
                ? themeStyles.horizontalLine
                : themeStyles.horizontalLine),
        },
    };
    //#endregion

    try {
        let modifiedJsx
        if (flag.toLowerCase() === "duaascreen") {

            modifiedJsx = (
                <View  style={DuaVerseStyles.container}>
                    <View style={DuaVerseStyles.rectangle}>
                        <ScrollView
                            contentContainerStyle={DuaVerseStyles.scrollContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <Text style={DuaVerseStyles.title}>{MainText}</Text>
                            <View style={DuaVerseStyles.horizontalLine} />
                            <Text style={DuaVerseStyles.translation}>{Translation}</Text>
                            <Text style={DuaVerseStyles.description}>{Ref}</Text>
                        </ScrollView>
                    </View>
                </View>
            );
        }
        else if (flag.toLowerCase() === "hadith") {
            modifiedJsx = (
                <View style={styles.container}>
                    <View style={[styles.rectangle, textStyle]}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <Text
                                style={[
                                    styles.title,
                                    textStyle,
                                    {
                                        textAlign: selectedLanguage != "Arabic" ? "left" : "center",
                                        fontFamily:
                                            selectedLanguage === "English" &&
                                                selectedFont === "ScheherazadeNew"
                                                ? "Montserrat"
                                                : selectedLanguage === "English" &&
                                                    selectedFont === "MeQuran"
                                                    ? "TimesRoman"
                                                    : selectedLanguage === "English" && selectedFont === "Hafs"
                                                        ? "lexend"
                                                        : selectedFont,
                                    },
                                ]}
                            >
                                {selectedLanguage != "Arabic"
                                    ? (HadithToDisplay = state.isArabicNumbers
                                        ? convertToEasternArabicNumerals(Translation.toString())
                                        : Translation.toString())
                                    : (HadithToDisplay = state.isArabicNumbers
                                        ? convertToEasternArabicNumerals(MainText.toString())
                                        : MainText.toString())}
                            </Text>
                            <View style={styles.horizontalLine} />
                            <Text style={[styles.description]}>
                                {selectedLanguage != "Arabic"
                                    ? (REFToDisplay = state.isArabicNumbers
                                        ? convertToEasternArabicNumerals(RefTranslation.toString())
                                        : RefTranslation.toString())
                                    : (REFToDisplay = state.isArabicNumbers
                                        ? convertToEasternArabicNumerals(Ref.toString())
                                        : Ref.toString())}
                            </Text>
                        </ScrollView>
                    </View>
                </View>
            );
        }


        // Capture the modified JSX content as an image
        const uri = await captureRef(modifiedJsx, {
            format: 'png',
            quality: 1.0,
        });

        return uri;
    } catch (error) {
        console.error('Error generating and capturing JSX:', error);
        throw error;
    }
};