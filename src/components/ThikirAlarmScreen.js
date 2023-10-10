import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet, Platform  } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemContex';
import { ThikirAlarmStyles } from '../context/commonStyles';

const ThikirAlarmScreen = () => {
  const { selectedTheme } = useTheme();
  //#region LightTheme
  const lightStyles = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6",
    },
    notificationContainer: {
      backgroundColor: "#fefffe",
      shadowColor: "white",
    },
    title: {
      color: "#000",
    },
    horizontalLineWrapper: {
      borderColor: "#fefffe",
    },
  });
  //#endregion

  //#region DarkTheme
  const darkStyles = StyleSheet.create({
    container: {
      backgroundColor: "#151515",
    },
    notificationContainer: {
      backgroundColor: "#262626",
      shadowColor: "#262626",
    },
    title: {
      color: "#dddddd",
    },
    horizontalLineWrapper: {
      borderColor: "#262626",
    },
  });
  //#endregion

  //#region StyleMapping
  const styles = {
    ...ThikirAlarmStyles,
    container: {
      ...ThikirAlarmStyles.container,
      ...selectedTheme === 'dark' ? darkStyles.container : lightStyles.container,
    },
    notificationContainer: {
      ...ThikirAlarmStyles.notificationContainer,
      ...selectedTheme  === 'dark'? darkStyles.notificationContainer : lightStyles.notificationContainer,
    },
    title: {
      ...ThikirAlarmStyles.title,
      ...selectedTheme  === 'dark'? darkStyles.title : lightStyles.title,
    },
    horizontalLineWrapper: {
      ...ThikirAlarmStyles.horizontalLineWrapper,
      ...selectedTheme  === 'dark'? darkStyles.horizontalLineWrapper : lightStyles.horizontalLineWrapper,
    },
  };
  //#endregion
  
  //#region notification structure
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      title: "أذكار النوم",
      body: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِن أَمْسَكْتَ نَفْسِي فارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا، بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
      id: "thikir_sleep",
      isActive: true,
    },
    {
      title: "أذكار الاستيقاظ من النوم",
      body: "الْحَمْدُ للَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا، وَإِلَيْهِ النُّشُورُ",
      id: "thikir_wakeup",
      isActive: true,
    },
    {
      title: "أذكار الصباح",
      body: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا ، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      id: "thikir_morning",
      isActive: true,
    },
    {
      title: "أذكار المساء",
      body: "اللَّهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير",
      id: "thikir_evening",
      isActive: true,
    },
  ]);
  //#endregion

  useEffect(() => {
    requestNotificationPermissions();
    loadNotificationStatesAndAlarmTimes();
  }, []);

  //#region getNotificationPermission
  const requestNotificationPermissions = async () => {
    if (Platform.OS === 'android'){
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if(newStatus ==='granted'){
          console.log("Notification permissions granted");
        }
      } else {
        console.log("Notification permissions denied");
      }
    }else{
      const { status } = await Notifications.requestPermissionsAsync();
    if (status === "granted") {
      console.log("Notification permissions granted");
    } else {
      console.log("Notification permissions denied");
    }
    }
  };
  //#endregion

  //#region toggleAlarm
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
  //#endregion

  //#region scheduleNotifications
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
  //#endregion
  
  //#region display datapicker
  const showDatePicker = (notification) => {
    setSelectedNotification(notification);
    setDatePickerVisibility(true);
  };


  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //#endregion
  
  //#region handleConfirmation
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

  //#endregion
  
  //#region loadStatesOfalarmTimeAndNotifications
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
  //#endregion

  //#region handleCancelNotifaction
  const cancelNotification = async (notificationId) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log(`Notification for ${notificationId} canceled.`);
  };
  //#endregion
    
  //#region handleSaveNotifactiondData
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
  //#endregion
  
  //#region DispalyBorderRadiusBasedOnItemCount
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
    return {}; 
  };
  //#endregion

  return (
    <View style={styles.container}>
      {notifications.map((notification, index) => (
        <React.Fragment key={notification.id}>
          <TouchableOpacity
            onPress={() => showDatePicker(notification)}
            activeOpacity={0.7}
          >
            <View style={[styles.notificationContainer, renderBorderRadius(index),]}>
              <View style={styles.leftContent}>
                <Text allowFontScaling={false} style={styles.title}>{notification.title}</Text>
                <Text allowFontScaling={false} style={styles.time}>
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
                  thumbColor={notification.isActive ? '#fefffe' : '#fefffe'}
                  trackColor={{ true: '#f2b784', false: '#454545' }}
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

//#region FormatTimeForTwoDigits
const formatTime = (time) => {
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
//#endregion

//#region GetDefaulTimeOfNotifications
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
//#endregion

export default ThikirAlarmScreen;
