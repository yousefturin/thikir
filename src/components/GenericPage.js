import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback ,
} from "react-native";

const GenericPage = ({ route }) => {
  const { item } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(0);
  const [count, setCount] = useState(0);
  const ControlPaneBackgroundImage = require("../../assets/HeaderBackground.jpg");

  useEffect(() => {
    // Find the maximum height based on the character length of subItemDescription
    let maxHeight = 150; // Default height for descriptions with less than or equal to 1000 characters
    const subItemDescription = item.subItems[currentIndex].subItemDescription;

    // Remove non-printable characters and control characters
    const sanitizedDescription = subItemDescription.replace(/[^ -~]+/g, "");

    console.log(
      "sanitized subItemDescription length is:",
      sanitizedDescription.length
    );

    if (sanitizedDescription.length > 30) {
      maxHeight = 450;
    }

    setMaxDescriptionHeight(maxHeight);
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
      Vibration.vibrate(50); // Vibrate for 50 milliseconds when the button is pressed
      setCount(0);
    }
  };

  const prevSubItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
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
      <View style={[styles.rectangle, { height: maxDescriptionHeight + 100 }]}>
        <Text style={styles.title}>
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
                <Text>
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
    backgroundColor: "#E2F0F4",
    padding: 20,
  },
  controlPan: {
    flex: 1,
    justifyContent:'flex-end',
    marginBottom:40,
    margin:-20,
  },
  circularButton: {
    width: 70,
    height: 70,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: 'black',
    backgroundColor: "#E2F0F4",
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height:'50%',
    width:'35%',
    padding: 20,
    backgroundColor: "#023B4F",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  textcount:{
    textAlign:'center',
    color:'white',
    fontSize:20,
  },
  rectangle: {
    backgroundColor: "#023B4F", // Background color of the rectangle
    borderRadius: 10, // Border radius for the rectangle
    alignItems: "center",
    justifyContent: "space-between", // Distribute content evenly
    paddingTop: 60,
    paddingBottom: 30,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20, // Adjust the font size as needed
    textAlign: "center",
    color: "white",
  },
  description: {
    fontSize: 11, // Adjust the font size as needed
    textAlign: "center",
    color: "white",
  },
  ControlPaneBackground: {
    flexDirection:'row',
    height: 130,
    resizeMode: "cover", // or 'stretch' or 'contain'
    justifyContent:'space-evenly',
    alignItems:'center'
  },
});

export default GenericPage;
