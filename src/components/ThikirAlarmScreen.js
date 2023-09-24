import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Notifications from 'expo-notifications';

const ThikirAlarmScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Request notification permissions when the component mounts
    requestNotificationPermissions();
    
    // Customize notification handling for foreground notifications
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,  // Show the notification while the app is in the foreground
        shouldPlaySound: false, // You can set this to true to play sound for foreground notifications
      }),
    });
  }, []);

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      console.log('Notification permissions granted');
    } else {
      console.log('Notification permissions denied');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();

    // Schedule the notification based on the selected date/time
    scheduleNotification(date);
  };

  const scheduleNotification = async (date) => {
    const trigger = date - Date.now(); // Calculate the delay in milliseconds
  
    if (trigger > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'أذكار الصباح',
          body: 'وقت اذكار الصباح قد حان',
          sound: 'default',
          vibrate: [0, 250, 250, 250],
        },
        trigger: {
          seconds: Math.floor(trigger / 1000),
        },
        categoryId: 'alarm',
      });
  
      console.log('Notification scheduled.');
    } else {
      console.log('Selected time is in the past. No notification scheduled.');
    }
  };

  return (
    <View>
      <Text>Thikir Alarm Screen</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <Text>Select Alarm Time</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {selectedDate && <Text>Selected Time: {selectedDate.toString()}</Text>}
    </View>
  );
};

export default ThikirAlarmScreen;
