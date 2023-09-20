import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Vibration,
    ImageBackground,
    TouchableWithoutFeedback,
} from "react-native";

const GenericPage = ({ route }) => {
    const { item } = route.params;
    const [count, setCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(0);
    const [MaxFontSizeDescription, setMaxFontSizeDescription] = useState(0);
    const [maxpaddingHorizontal, setMaxpaddingHorizontal] = useState(0);
    const [maxPadding, setMaxPadding] = useState(0);
    const ControlPaneBackgroundImage = require("../../assets/HeaderBackground.jpg");

    useEffect(() => {
        // Find the maximum height based on the character length of subItemDescription
        let maxHeight = 150; // Default height for descriptions with less than or equal to 1000 characters
        let MaxFontSize = 20;
        let maxPadding = 60;
        let maxpaddingHorizontal= 20;
        const subItemDescription = item.subItems[currentIndex].subItemName;

        // Remove non-printable characters and control characters
        const sanitizedDescription = subItemDescription.replace(/[-~]+/g, "");

        console.log(
            "sanitized subItemDescription length is:",
            sanitizedDescription.length
        );

        if (sanitizedDescription.length > 1200) {
            maxHeight = 450;
            MaxFontSize = 16;
            maxPadding = 30; 
            maxpaddingHorizontal = 10;
        }
        else if (sanitizedDescription.length > 700) {
            maxHeight = 450;
            MaxFontSize = 16;
            maxPadding =40; 
            maxpaddingHorizontal = 10;
        }
      
        else if (sanitizedDescription.length > 600) {
            maxHeight = 250;
            MaxFontSize = 17;
            maxPadding =50; 
        }
        else if (540 >sanitizedDescription.length > 504) {
            maxHeight = 220;
            MaxFontSize = 17;
            maxPadding =40; 
        }
        else if (sanitizedDescription.length > 500) {
            maxHeight = 350;
            MaxFontSize = 17;
            maxPadding =20; 
        }
        else if (sanitizedDescription.length > 500) {
            maxHeight = 250;
            MaxFontSize = 17;
        }
        else if (sanitizedDescription.length > 400) {
            maxHeight = 200;
            MaxFontSize = 17;
            maxPadding =35; 
        }
        else if (sanitizedDescription.length > 350) {
            maxHeight = 180;
            MaxFontSize = 17;
            maxPadding =40; 
        }
        else if (sanitizedDescription.length > 210) {
            maxHeight = 140;
            MaxFontSize = 17;
            maxPadding =40; 
        }
        else if (sanitizedDescription.length > 200) {
            maxHeight = 160;
            MaxFontSize = 17;
            maxPadding =40; 
        }

        setMaxDescriptionHeight(maxHeight);
        setMaxFontSizeDescription(MaxFontSize);
        setMaxPadding(maxPadding);
        setMaxpaddingHorizontal(maxpaddingHorizontal);
    }, [item.subItems, currentIndex]);


    useEffect(() => {
        // Check if the count has reached the specified value
        if (count >= item.subItems[currentIndex].count) {
            // If the count reaches the specified value, trigger nextSubItem
            nextSubItem();
        }
    }, [count, currentIndex, item.subItems]);

    const nextSubItem = () => {
        if (currentIndex < item.subItems.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            Vibration.vibrate(150); 
            setCount(0);
        }
    };



    const incrementCount = () => {
        setCount((prevCount) => prevCount + 1);
        Vibration.vibrate(80);
    };

    const handleContainerPress = () => {
        // Increment count when anywhere inside the container is pressed
        incrementCount();
    };


    return (
        <TouchableWithoutFeedback
            onPress={handleContainerPress}
            disabled={currentIndex === item.subItems.length - 1}>
            <View style={styles.container}>
                <View style={[styles.rectangle, { height: maxDescriptionHeight + 100 ,padding:maxPadding,paddingHorizontal:maxpaddingHorizontal}]}>
                    <Text style={[styles.title, { fontSize: MaxFontSizeDescription }]}>
                        {item.subItems[currentIndex].subItemName}
                    </Text>
                    <Text style={styles.description}>
                        {item.subItems[currentIndex].subItemDescription}
                    </Text>
                </View>
                <View style={styles.controlPan}>
                    <ImageBackground
                        source={ControlPaneBackgroundImage}
                        style={styles.ControlPaneBackground}
                    >
                        <TouchableWithoutFeedback
                            onPress={nextSubItem}
                            disabled={currentIndex === item.subItems.length - 1}
                        >
                            <View style={styles.button}>
                                {/* Display the current index and total length of sub-items */}
                                <Text style={styles.textcount}>
                                    الذكر {currentIndex + 1} من {item.subItems.length}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {/* Display the circular count */}
                        <TouchableWithoutFeedback
                            onPress={incrementCount}
                            disabled={currentIndex === item.subItems.length - 1}>
                            <View style={styles.circularButton}>
                                <Text style={styles.textcount}>
                                    {count}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.button}>
                            <Text style={styles.textcount}>
                                {item.subItems[currentIndex].repTime}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#151515",
        padding: 20,
    },
    controlPan: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40,
        margin: -20,
    },
    circularButton: {
        width: 70,
        height: 70,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: '#151515',
        backgroundColor: "#262626",
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: '50%',
        width: '35%',
        padding: 14,
        backgroundColor: "#262626",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#151515',
    },
    textcount: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: 'ScheherazadeNew'
    },
    rectangle: {
        backgroundColor: "#262626", // Background color of the rectangle
        borderRadius: 10, // Border radius for the rectangle
        alignItems: "center",
        justifyContent: "space-between", // Distribute content evenly
        paddingBottom: 30,
        padding: 50,
        marginTop: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    title: {
        textAlign: "center",
        color: "white",
        fontFamily: 'ScheherazadeNew'
    },
    description: {
        fontSize: 11, // Adjust the font size as needed
        textAlign: "center",
        color: "#767676",
        fontFamily: 'AmiriFont'
    },
    ControlPaneBackground: {
        flexDirection: 'row',
        height: 130,
        resizeMode: "cover", // or 'stretch' or 'contain'
        justifyContent: 'space-evenly',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
});

export default GenericPage;
