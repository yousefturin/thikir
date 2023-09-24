import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThikirAlarmScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      title: 'أذكار النوم',
      body: 'حان وقت أذكار النوم',
      id: 'thikir_sleep',
    },
    {
      title: 'أذكار الاستيقاظ من النوم',
      body: 'حان وقت أذكار الاستيقاظ من النوم',
      id: 'thikir_wakeup',
    },
    {
      title: 'أذكار الصباح',
      body: 'حان وقت أذكار الصباح',
      id: 'thikir_morning',
    },
    {
      title: 'أذكار المساء',
      body: 'حان وقت أذكار المساء',
      id: 'thikir_evening',
    },
  ]);

  useEffect(() => {
    // Request notification permissions when the component mounts
    requestNotificationPermissions();

    // Load the saved alarm times from storage
    loadAlarmTimes();
  }, []);

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      console.log('Notification permissions granted');
    } else {
      console.log('Notification permissions denied');
    }
  };

  const showDatePicker = (notification) => {
    setSelectedNotification(notification);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    hideDatePicker();

    // Update the selected notification with the chosen date
    const updatedNotifications = notifications.map((notification) =>
      notification.id === selectedNotification.id
        ? { ...notification, date }
        : notification
    );

    setNotifications(updatedNotifications);

    // Schedule the updated notifications
    scheduleNotifications(updatedNotifications);

    // Save the updated alarm times to storage
    saveAlarmTimes(updatedNotifications);
  };

  const scheduleNotifications = async (notificationsToSchedule) => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    for (const notification of notificationsToSchedule) {
      if (notification.date) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: notification.title,
            body: notification.body,
            sound: 'default',
            vibrate: [0, 250, 250, 250],
          },
          trigger: {
            hour: notification.date.getHours(),
            minute: notification.date.getMinutes(),
            repeats: true, // Repeat the notification every day
          },
          categoryId: 'alarm',
        });

        console.log(`Notification for ${notification.title} scheduled.`);
      }
    }
  };

  const saveAlarmTimes = async (notificationsToSave) => {
    try {
      const alarmTimes = {};
      for (const notification of notificationsToSave) {
        if (notification.date) {
          alarmTimes[notification.id] = notification.date.toString();
        }
      }
      await AsyncStorage.setItem('alarmTimes', JSON.stringify(alarmTimes));
      console.log('Alarm times saved.');
    } catch (error) {
      console.error('Error saving alarm times:', error);
    }
  };

  const loadAlarmTimes = async () => {
    try {
      const storedTimesJSON = await AsyncStorage.getItem('alarmTimes');
      if (storedTimesJSON) {
        const storedTimes = JSON.parse(storedTimesJSON);
        const updatedNotifications = notifications.map((notification) => ({
          ...notification,
          date: storedTimes[notification.id]
            ? new Date(storedTimes[notification.id])
            : null,
        }));

        // Schedule the notifications with the loaded times
        scheduleNotifications(updatedNotifications);
      }
    } catch (error) {
      console.error('Error loading alarm times:', error);
    }
  };

  return (
    <View>
      <Text>Thikir Alarm Screen</Text>
      {notifications.map((notification) => (
        <TouchableOpacity
          key={notification.id}
          onPress={() => showDatePicker(notification)}
        >
          <Text>Select {notification.title} Time</Text>
        </TouchableOpacity>
      ))}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        date={
          selectedNotification
            ? selectedNotification.date || getDefaultTime(selectedNotification.id)
            : new Date()
        }
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {selectedNotification && selectedNotification.date && (
        <Text>
          Selected Time: {selectedNotification.date.toString()}
        </Text>
      )}
    </View>
  );
};

const getDefaultTime = (notificationId) => {
  // Define default times for each notification based on their IDs
  const defaultTimes = {
    thikir_sleep: new Date().setHours(23, 0, 0, 0),
    thikir_wakeup: new Date().setHours(6, 0, 0, 0),
    thikir_morning: new Date().setHours(7, 0, 0, 0),
    thikir_evening: new Date().setHours(18, 0, 0, 0),
  };

  return new Date(defaultTimes[notificationId]) || new Date();
};

export default ThikirAlarmScreen;
