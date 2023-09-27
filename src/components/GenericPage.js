import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { handleShare } from "../utils/shareUtils";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useTheme } from '../context/ThemContex'; 
import { GenericStyles } from '../context/commonStyles';

const GenericPage = ({ route }) => {
    const { isDarkMode } = useTheme();

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
          color: "#be915a",
      },
      ControlPaneBackground: {
          shadowColor: "white",
      },
      horizontalLine: {
        borderColor: "#f2f2f6",
      },
  

  });

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
        color: "#be915a",
    },
    ControlPaneBackground: {
        shadowColor: "black",
    },
    horizontalLine: {
      borderColor: "#151515",
    },

  });
  const styles = {
    ...GenericStyles,
    container: {
      ...GenericStyles.container,
      ...isDarkMode ? darkStyles.container : lightStyles.container, 
    },
    containerforshare: {
      ...GenericStyles.containerforshare, 
      ...isDarkMode ? darkStyles.containerforshare : lightStyles.containerforshare,
    },
    circularButton: {
      ...GenericStyles.circularButton, 
      ...isDarkMode ? darkStyles.circularButton : lightStyles.circularButton,
    },
    button: {
        ...GenericStyles.button, 
        ...isDarkMode ? darkStyles.button : lightStyles.button,
      },
      textcount: {
        ...GenericStyles.textcount, 
        ...isDarkMode ? darkStyles.textcount : lightStyles.textcount,
      },
      rectangle: {
        ...GenericStyles.rectangle, 
        ...isDarkMode ? darkStyles.rectangle : lightStyles.rectangle,
      },
      title: {
        ...GenericStyles.title, 
        ...isDarkMode ? darkStyles.title : lightStyles.title,
      },
      description: {
        ...GenericStyles.description, 
        ...isDarkMode ? darkStyles.description : lightStyles.description,
      },
      InfoReptTimeIndex: {
        ...GenericStyles.InfoReptTimeIndex, 
        ...isDarkMode ? darkStyles.InfoReptTimeIndex : lightStyles.InfoReptTimeIndex,
      },
      InfoReptTime: {
        ...GenericStyles.InfoReptTime, 
        ...isDarkMode ? darkStyles.InfoReptTime : lightStyles.InfoReptTime,
      },
      ControlPaneBackground: {
        ...GenericStyles.ControlPaneBackground, 
        ...isDarkMode ? darkStyles.ControlPaneBackground : lightStyles.ControlPaneBackground,
      },
      horizontalLine: {
        ...GenericStyles.horizontalLine, 
        ...isDarkMode ? darkStyles.horizontalLine : lightStyles.horizontalLine,
      },
  };
    const { item } = route.params;
    const [count, setCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(0);
    const [MaxFontSizeDescription, setMaxFontSizeDescription] = useState(0);
    const [maxpaddingHorizontal, setMaxpaddingHorizontal] = useState(0);
    const [maxPadding, setMaxPadding] = useState(0);
    const [isLongPress, setIsLongPress] = useState(false);
    const ControlPaneBackgroundImage = isDarkMode
    ? require("../../assets/HeaderBackground.jpg") // Dark theme background image source
    : require("../../assets/HeaderBackgroundLight.jpg"); // Light theme background image source
    const viewRef = React.useRef();

    const Share = async () => {
        await handleShare(viewRef.current);
    };

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
        let maxHeight = 170;
        let MaxFontSize = 20;
        let maxPadding = 60;
        let maxpaddingHorizontal = 20;

        if (sanitizedDescription.length > 1000) {
            maxHeight = 450;
            MaxFontSize = 16;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        } else if (sanitizedDescription.length > 700) {
            maxHeight = 350;
            MaxFontSize = 17;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        } else if (sanitizedDescription.length > 600) {
            maxHeight = 300;
            MaxFontSize = 17;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        } else if (sanitizedDescription.length > 500) {
            maxHeight = 300;
            MaxFontSize = 17;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        } else if (sanitizedDescription.length > 400) {
            maxHeight = 250;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        } else if (sanitizedDescription.length > 300) {
            maxHeight = 220;
            maxpaddingHorizontal = 10;
            maxPadding = 30;
        } else if (sanitizedDescription.length > 290) {
            maxHeight = 350;
            maxpaddingHorizontal = 10;
            maxPadding = 30;
        } else if (sanitizedDescription.length > 200) {
            maxpaddingHorizontal = 10;
            maxPadding = 30;
        } else if (sanitizedName.length > 200) {
            maxHeight = 200;
            MaxFontSize = 17;
            maxPadding = 30;
            maxpaddingHorizontal = 10;
        }
        console.log(maxHeight, MaxFontSize, maxPadding, maxpaddingHorizontal);
        setMaxDescriptionHeight(maxHeight);
        setMaxFontSizeDescription(MaxFontSize);
        setMaxPadding(maxPadding);
        setMaxpaddingHorizontal(maxpaddingHorizontal);
    }, [item.subItems, currentIndex]);

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

    let pressTimeout;
    let startX = 0; // Initial X-coordinate of the touch
    let isSwiping = false; // Track if a swipe occurred

    const handleContainerPressIn = (e) => {
        pressTimeout = setTimeout(() => {
            setIsLongPress(true); // Detect long press
        }, 1000); // Adjust the duration as needed for your long press
        startX = e.nativeEvent.pageX; // Store the initial X-coordinate
    };

    const handleContainerPressOut = (e) => {
        clearTimeout(pressTimeout); // Clear the timeout on release
        const endX = e.nativeEvent.pageX; // Get the final X-coordinate
        const swipeDistance = Math.abs(endX - startX); // Calculate the distance moved

        if (!isSwiping && swipeDistance < 10) {
            // Only increment the count if it's not a swipe (adjust the threshold as needed)
            incrementCount();
        }

        setIsLongPress(false); // Reset the long press flag
        isSwiping = false; // Reset the swipe flag
    };

    const handleSwipe = () => {
        isSwiping = true;
    };

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
            {/*this line needs a fix for the last thikir to run the count */}
            <View style={styles.container}>
                <View style={styles.containerforshare}>
                    <View
                        ref={viewRef}
                        style={[
                            styles.rectangle,
                            {
                                height: maxDescriptionHeight + 100,
                                padding: maxPadding,
                                paddingHorizontal: maxpaddingHorizontal,
                            },
                        ]}
                    >
                        <Text style={[styles.title, { fontSize: MaxFontSizeDescription }]}>
                            {item.subItems[currentIndex].subItemName}
                        </Text>
                        <View style={styles.horizontalLine} />
                        <Text style={styles.description}>
                            {item.subItems[currentIndex].subItemDescription}
                        </Text>
                        <Text style={styles.InfoReptTimeIndex}>
                            الذكر{" "}
                            <Text style={[{ color: "#be915a" }]}>{currentIndex + 1}</Text> من{" "}
                            <Text style={[{ color: "#be915a" }]}>{item.subItems.length}</Text>
                        </Text>
                        <Text style={styles.InfoReptTime}>
                            {item.subItems[currentIndex].repTime}
                        </Text>
                        <TouchableOpacity onPress={Share} style={styles.shareButton}>
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
                                <Text style={styles.textcount}>الذكر التالي</Text>
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
                                <Text style={styles.textcount}>الذكر السابق</Text>
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
