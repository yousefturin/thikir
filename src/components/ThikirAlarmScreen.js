import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch,  StyleSheet,Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from 'expo-haptics';



const windowWidth = Dimensions.get('window').width;




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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
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
  
  const renderBorderRadius = (index) => {
    const itemCount = notifications.length;
    if (index === 0) {
      return {         
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      };
    } else if (index === itemCount - 1) {
      return { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 };
    }
    return {}; // Default: no border radius
  };

  return (
    <View style={styles.container}>
      {notifications.map((notification, index) => (
        <React.Fragment key={notification.id}>
          <TouchableOpacity
            onPress={() => showDatePicker(notification)}
            activeOpacity={0.7}
          >
            <View style={[styles.notificationContainer,renderBorderRadius(index),]}>
              <View style={styles.leftContent}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.time}>
                  {notification.date
                    ? formatTime(notification.date)
                    : formatTime(getDefaultTime(notification.id))}
                </Text>
              </View>
              <View style={styles.middleContent}></View>
              <View style={styles.rightContent}>
                <Switch
                  value={notification.isActive}
                  onValueChange={() =>
                    toggleAlarm(notification.id, !notification.isActive)
                  }
                />
              </View>
            </View>
            {index < notifications.length - 1 && (
            <View style={styles.horizontalLineWrapper} />
          )}
          </TouchableOpacity>
        </React.Fragment>
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
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    paddingTop: 40,
    alignItems: "center",
  },
  notificationContainer: {
    flexDirection: 'row-reverse',
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#262626",
    shadowColor: "#262626",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    width: '91%',
    height: 60,
    paddingHorizontal: 10,
  },
  leftContent: {
    flexDirection: "column",
    flex: 2,
    alignItems: "flex-end",
  },
  middleContent: {
    flex: 1,
  },
  rightContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  title: {
    color: "#dddddd",
    textAlign: "right",
    fontSize: 18,
    marginRight: 10,
    fontFamily: "ScheherazadeNewBold",
  },
  time: {
    color: "#777",
    marginRight: 10,
    textAlign: "right",
  },
  horizontalLineWrapper: {
    borderBottomWidth: 1,
    borderColor: "#262626",
    marginLeft: windowWidth > 600 ? 610 : 350,
  },
});
export default ThikirAlarmScreen;
