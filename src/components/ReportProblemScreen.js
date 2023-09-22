import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import * as ImagePicker from 'expo-image-picker';

const ReportProblemScreen = () => {
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState(null); // Initialize with null, not an empty string

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3], // Adjust aspect ratio as needed
        quality: 1, // Adjust image quality as needed
      });

      if (!result.canceled) {
        // Use the assets array to access selected assets
        if (result.assets && result.assets.length > 0) {
          const selectedImageUri = result.assets[0].uri;
          setScreenshot(selectedImageUri);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const sendReport = async () => {
    try {
      const { status } = await MailComposer.composeAsync({
        recipients: ['yusefturin@gmail.com'], // Replace with your email address
        subject: 'Report a Problem',
        body: `Description: ${description}\nScreenshot: ${screenshot || 'No screenshot attached'}`,
      });

      if (status === 'sent') {
        console.log('Email sent successfully');
        // Optionally, provide user feedback that the report was sent
      } else {
        console.log('Email not sent');
        // Optionally, provide user feedback that the report was not sent
      }
    } catch (error) {
      console.error('Error sending report:', error);
      // Handle the error and provide user feedback
    }
  };

  return (
    <View style={styles.container}>
          <Button title="Send Report" onPress={sendReport} />
      <Text style={styles.heading}>Report a Problem</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the problem in detail..."
        multiline
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholderTextColor="#fff"
      />
      <Button title="Select Screenshot" onPress={pickImage} />

      {screenshot && (
        <View style={styles.inputScreenshot}>
          <Image source={{ uri: screenshot }} style={styles.screenshot} />
        </View>
      )}


    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#151515', // Adjust the background color as needed
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',
  },
  input: {
    color: '#fff',
    backgroundColor: '#262626',
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    height: 120, // Adjust the height as needed
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  inputScreenshot:{
    flex: 0.5,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    textAlign:'center',
    color: '#fff',
    backgroundColor: '#262626',
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    height: 220, // Adjust the height as needed
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  screenshot: {
    padding:20,
    width: 300, // Adjust the width as needed
    height: 250, // Adjust the height as needed
    resizeMode: 'contain', // Adjust the image resizing mode as needed
  },
});

export default ReportProblemScreen;
