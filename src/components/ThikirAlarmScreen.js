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

    // Schedule the daily recurring notification based on the selected time
    scheduleDailyRecurringNotification(date);
  };

  const scheduleDailyRecurringNotification = async (date) => {
    // Get the selected time (hour and minute)
    const selectedHour = date.getHours();
    const selectedMinute = date.getMinutes();

    // Get the current date
    const currentDate = new Date();

    // Set the time of the selected date to the selected hour and minute
    const scheduledDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), selectedHour, selectedMinute);

    // Calculate the delay until the next occurrence of the scheduled time
    let trigger = scheduledDate.getTime() - Date.now();

    if (trigger <= 0) {
      // If the selected time has already passed today, schedule it for tomorrow
      trigger += 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'أذكار الصباح',
        body: 'اذكر الله في صباحك وابدأ يومك بالخير والبركة. الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
        sound: 'default',
        vibrate: [0, 250, 250, 250],
      },
      trigger: {
        milliseconds: trigger,
        repeats: true, // Set the notification to repeat daily
      },
      categoryId: 'alarm',
    });

    console.log('Recurring daily notification scheduled.');
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
