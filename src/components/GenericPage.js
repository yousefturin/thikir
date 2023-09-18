import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration, ScrollView } from 'react-native';

const GenericPage = ({ route }) => {
  const { item } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(0);

  
  useEffect(() => {
    // Find the maximum height based on the character length of subItemDescription
    let maxHeight = 150; // Default height for descriptions with less than or equal to 1000 characters
    const subItemDescription = item.subItems[currentIndex].subItemDescription;
  
    // Remove non-printable characters and control characters
    const sanitizedDescription = subItemDescription.replace(/[^ -~]+/g, '');
  
    console.log("sanitized subItemDescription length is:", sanitizedDescription.length);
    
    if (sanitizedDescription.length > 30) {
      maxHeight = 450;
    }
  
    setMaxDescriptionHeight(maxHeight);
  }, [item.subItems, currentIndex]);

  const nextSubItem = () => {
    if (currentIndex < item.subItems.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      Vibration.vibrate(50); // Vibrate for 50 milliseconds when the button is pressed
    }
  };

  const prevSubItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={nextSubItem}
        disabled={currentIndex === item.subItems.length - 1}
      >
        {/* Display the current index and total length of sub-items */}
        <Text>
          {currentIndex + 1}/{item.subItems.length}
        </Text>
      </TouchableOpacity>

      <View style={[styles.rectangle, { height: maxDescriptionHeight + 100 }]}>
        <Text style={styles.title}>{item.subItems[currentIndex].subItemName}</Text>
        <Text style={styles.description}>
          {item.subItems[currentIndex].subItemDescription}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  button: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  rectangle: {
    backgroundColor: '#023B4F', // Background color of the rectangle
    borderRadius: 10, // Border radius for the rectangle
    alignItems: 'center',
    justifyContent: 'space-between', // Distribute content evenly
    paddingTop: 60,
    paddingBottom: 30,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20, // Adjust the font size as needed
    textAlign: 'center',
    color: 'white',
  },
  description: {
    fontSize: 11, // Adjust the font size as needed
    textAlign: 'center',
    color: 'white',
  },
});

export default GenericPage;
