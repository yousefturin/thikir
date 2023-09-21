import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRandomDuaFromFile } from "../API/GETDuaArbEn";
import { handleShare } from "../utils/shareUtils";

const CACHE_KEY = "randomVerseCache";
const CACHE_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

const DUAVerseScreen = ({ navigation }) => {
    const [DUA, setDUA] = useState("");
    const [REF, setREF] = useState("");
    const [TRAN, setTRAN] = useState("");
    const [verseTextLength, setVerseTextLength] = useState(0);
    const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(150);
    const [maxFontSizeDescription, setMaxFontSizeDescription] = useState(20);
    const [maxPadding, setMaxPadding] = useState(60);
    const [maxpaddingHorizontal, setMaxpaddingHorizontal] = useState(20);
    const viewRef = React.useRef();

    const Share = async () => {
        await handleShare(viewRef.current);
    };

    useEffect(() => {
        // Check if cached verse exists and if it's not expired
        async function getCachedVerseHadith() {
            try {
                const cachedData = await AsyncStorage.getItem(CACHE_KEY);
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    const {
                        DUA: cachedDUA,
                        TRAN: cachedTRAN,
                        REF: cachedREF,
                        timestamp,
                    } = parsedData;
                    const currentTime = new Date().getTime();
                    if (currentTime - timestamp <= CACHE_EXPIRATION_TIME) {
                        // Use the cached verse if it's not expired
                        setDUA(cachedDUA);
                        setTRAN(cachedTRAN);
                        setREF(cachedREF);
                        // Calculate the length of the cached verse text and control styles
                        const length = cachedDUA.length;
                        setVerseTextLength(length);
                        controlStyle(length);
                        return;
                    }
                }
                // Fetch a new random verse if no cached verse or it's expired
                getRandomVerse();
            } catch (error) {
                console.error("Error getting cached verse:", error);
                // Fetch a new random verse if there's an error with AsyncStorage
                getRandomVerse();
            }
        }

        getCachedVerseHadith();
    }, []);

    const getRandomVerse = async () => {
        try {
            const {
                DUA: fetchedDUA,
                TRAN: fetchedTRAN,
                REF: cachedREF,
            } = await fetchRandomDuaFromFile();
            // Set the fetched verse and related information in the component state
            setDUA(fetchedDUA);
            setTRAN(fetchedTRAN);
            setREF(cachedREF);
            // Calculate the length of the fetched verse text and control styles
            const length = fetchedDUA.length;
            setVerseTextLength(length);
            controlStyle(length);
            // Cache the fetched verse and related information along with the current timestamp
            const currentTime = new Date().getTime();
            const dataToCache = JSON.stringify({
                DUA: fetchedDUA,
                TRAN: fetchedTRAN,
                REF: cachedREF,
                timestamp: currentTime,
            });
            await AsyncStorage.setItem(CACHE_KEY, dataToCache);
        } catch (error) {
            // Handle any errors that may occur during the API call
            console.error("Error fetching random verse:", error);
        }
    };
    const controlStyle = (verseTextLength) => {
        let maxHeight = 550;
        let MaxFontSize = 20;
        let maxPadding = 30;
        let maxpaddingHorizontal = 20;

        if (verseTextLength > 1200) {
            maxHeight = 450;
            MaxFontSize = 16;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        } else if (verseTextLength < 100) {
            maxHeight = 650;
            MaxFontSize = 27;
            maxPadding = 30;
            maxpaddingHorizontal = 20;
        }
        setMaxDescriptionHeight(maxHeight);
        setMaxFontSizeDescription(MaxFontSize);
        setMaxPadding(maxPadding);
        setMaxpaddingHorizontal(maxpaddingHorizontal);
    };

    const textStyle = {
        fontSize: maxFontSizeDescription,
        maxHeight: maxDescriptionHeight,
        padding: maxPadding,
        paddingHorizontal: maxpaddingHorizontal,
    };
    return (
        <View ref={viewRef} style={styles.container}>
            <View style={[styles.rectangle, textStyle]}>
                <Text style={[styles.title, textStyle]}>{DUA}</Text>
                <View style={styles.horizontalLine} />
                <Text style={styles.translation}>{TRAN}</Text>
                <Text style={styles.description}>{REF}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Menu")}
                    style={styles.shareButton}
                ></TouchableOpacity>
                <TouchableOpacity onPress={Share} style={styles.shareButton}>
                    <View style={styles.dotContainer}>
                        <Text style={styles.dot}>&#8226;</Text>
                        <Text style={styles.dot}>&#8226;</Text>
                        <Text style={styles.dot}>&#8226;</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#151515",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 120,
    },
    rectangle: {
        backgroundColor: "#262626",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        width: "90%",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
        position: "relative",
    },
    title: {
        textAlign: "center",
        color: "white",
        fontFamily: "ScheherazadeNew",
    },
    translation: {
        marginBottom: 30,
        fontSize: 11,
        textAlign: "center",
        color: "#767676",
        fontFamily: "AmiriFont",
    },
    description: {
        fontSize: 11,
        textAlign: "center",
        color: "#767676",
        fontFamily: "AmiriFont",
    },
    shareButton: {
        position: "absolute",
        top: 10, // Adjust the top value to position the button as desired
        left: 13, // Adjust the left value to position the button as desired
    },
    dotContainer: {
        flexDirection: "row",
    },
    dot: {
        position: "absolute",
        top: 7, // Adjust the top value to position the button as desired
        left: 10, // Adjust the left value to position the button as desired
    },
    dotContainer: {
        flexDirection: "row",
    },
    dot: {
        color: "#be915a",
        fontSize: 20,
        fontWeight: "700",
        marginHorizontal: 1, // Adjust the margin to control spacing between dots
    },
    horizontalLine: {
        borderBottomWidth: 1,
        borderColor: "#151515",
        width: '100%',
        marginBottom: 5,

    },
});

export default DUAVerseScreen;
