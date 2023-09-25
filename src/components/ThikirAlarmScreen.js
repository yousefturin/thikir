import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThikirAlarmScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      title: "أذكار النوم",
      body: "حان وقت أذكار النوم",
      id: "thikir_sleep",
      isActive: true,
    },
    {
      title: "أذكار الاستيقاظ من النوم",
      body: "حان وقت أذكار الاستيقاظ من النوم",
      id: "thikir_wakeup",
      isActive: true,
    },
    {
      title: "أذكار الصباح",
      body: "حان وقت أذكار الصباح",
      id: "thikir_morning",
      isActive: true,
    },
    {
      title: "أذكار المساء",
      body: "حان وقت أذكار المساء",
      id: "thikir_evening",
      isActive: true,
    },
  ]);

  useEffect(() => {
    requestNotificationPermissions();
    loadNotificationStatesAndAlarmTimes();
  }, []);

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === "granted") {
      console.log("Notification permissions granted");
    } else {
      console.log("Notification permissions denied");
    }
  };

  const toggleAlarm = async (notificationId, newValue) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, isActive: newValue }
        : notification
    );

    setNotifications(updatedNotifications);

    const selectedNotification = updatedNotifications.find(
      (n) => n.id === notificationId
    );
    console.log(
      "Selected Notification isActive:",
      selectedNotification.isActive
    );

    if (selectedNotification.date && selectedNotification.isActive) {
      // If a time is picked and the toggle is active, schedule the notification
      await scheduleNotification(notificationId, selectedNotification);
      console.log(`Alarm for ${selectedNotification.id} activated.`);
    } else {
      // If the toggle is manually switched to inactive, cancel the notification
      await cancelNotification(notificationId);
      console.log(`Alarm for ${selectedNotification.id} deactivated.`);
    }

    // Save the updated notification state to storage
    saveNotificationData(updatedNotifications);
  };

  const scheduleNotification = async (notificationId, selectedNotification) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: selectedNotification.title,
        body: selectedNotification.body,
        sound: "default",
        vibrate: [0, 250, 250, 250],
      },
      trigger: {
        hour: selectedNotification.date.getHours(),
        minute: selectedNotification.date.getMinutes(),
        repeats: true, // Repeat the notification every day
      },
      identifier: notificationId,
      categoryId: "alarm",
    });
    console.log(`Notification for ${notificationId} scheduled.`);
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

    // Update the selected notification with the chosen date and set isActive to true
    const updatedNotifications = notifications.map((notification) =>
      notification.id === selectedNotification.id
        ? { ...notification, date, isActive: true }
        : notification
    );

    setNotifications(updatedNotifications);

    // Schedule the updated notifications only if the toggle is active
    if (selectedNotification.isActive) {
      await scheduleNotification(selectedNotification.id, selectedNotification);
    }

    // Save the updated alarm times to storage
    saveNotificationData(updatedNotifications);
  };

  const loadNotificationStatesAndAlarmTimes = async () => {
    try {
      const storedDataJSON = await AsyncStorage.getItem("notificationData");
      const storedData = storedDataJSON ? JSON.parse(storedDataJSON) : {};

      const updatedNotifications = notifications.map((notification) => {
        const savedData = storedData[notification.id];
        const date = savedData ? new Date(savedData.date) : null;
        const isActive = savedData ? savedData.isActive : false;
        return { ...notification, date, isActive };
      });

      setNotifications(updatedNotifications); // Update the state

      // Schedule notifications for active notifications
      for (const notification of updatedNotifications) {
        if (notification.isActive && notification.date) {
          await scheduleNotification(notification.id, notification);
        }
      }
    } catch (error) {
      console.error("Error loading notification data:", error);
    }
  };

  const cancelNotification = async (notificationId) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log(`Notification for ${notificationId} canceled.`);
  };

  const saveNotificationData = async (notificationsToSave) => {
    try {
      const notificationData = {};
      for (const notification of notificationsToSave) {
        notificationData[notification.id] = {
          isActive: notification.isActive,
          date: notification.date ? notification.date.toString() : null,
        };
      }
      await AsyncStorage.setItem(
        "notificationData",
        JSON.stringify(notificationData)
      );
      console.log("Notification data saved.");
    } catch (error) {
      console.error("Error saving notification data:", error);
    }
  };


  return (
    <View>
      {notifications.map((notification) => (
        <View
          key={notification.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <TouchableOpacity onPress={() => showDatePicker(notification)}>
              <Text>Select {notification.title} Time</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 10 }}>
              {notification.date
                ? formatTime(notification.date)
                : formatTime(getDefaultTime(notification.id))}
            </Text>
            <Switch
              value={notification.isActive}
              onValueChange={() =>
                toggleAlarm(notification.id, !notification.isActive)
              }
            />
          </View>
        </View>
      ))}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        date={
          selectedNotification
            ? selectedNotification.date ||
            getDefaultTime(selectedNotification.id)
            : new Date()
        }
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const formatTime = (time) => {
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
