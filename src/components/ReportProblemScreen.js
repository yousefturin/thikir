import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../context/ThemContex';
import { ReportProblemStyles } from '../Styles/commonStyles';
import { Appearance } from 'react-native';

const ReportProblemScreen = () => {
  const { selectedTheme } = useTheme();
  const systemTheme = selectedTheme === 'system';
  //#region LightTheme
  const lightTheme = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6",
    },
    heading: {
      color: '#000',
    },
    input: {
      color: '#000',
      backgroundColor: '#fefffe',
    },
    inputScreenshot: {
      color: '#000',
      backgroundColor: '#fefffe',
    },
  });
  //#endregion
  
  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    container: {
      backgroundColor: "#151515",
    },
    heading: {
      color: '#fff',
    },
    input: {
      color: '#fff',
      backgroundColor: '#262626',
    },
    inputScreenshot: {
      color: '#fff',
      backgroundColor: '#262626',
    },
  });
  //#endregion
  const themeStyles = systemTheme
  ? Appearance.getColorScheme() === 'dark'
    ? darkTheme
    : lightTheme
  : selectedTheme === 'dark'
  ? darkTheme
  : lightTheme;
  //#region StyleMapping
  const styles = {
    ...ReportProblemStyles,
    container: {
      ...ReportProblemStyles.container,
      ...selectedTheme  === 'dark'? themeStyles.container : themeStyles.container,
    },
    heading: {
      ...ReportProblemStyles.heading,
      ...selectedTheme  === 'dark'? themeStyles.heading : themeStyles.heading,
    },
    input: {
      ...ReportProblemStyles.input,
      ...selectedTheme === 'dark' ? themeStyles.input : themeStyles.input,
    },
    inputScreenshot: {
      ...ReportProblemStyles.inputScreenshot,
      ...selectedTheme  === 'dark'? themeStyles.inputScreenshot : themeStyles.inputScreenshot,
    },
  };
  //#endregion
  
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState(null); // Initialize with null, not an empty string
  
  //#region PickImage as screenshot
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
  //#endregion
  
  //#region sentReport
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
  //#endregion

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



export default ReportProblemScreen;
