import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import { useColor } from "../context/ColorContext";
import { ThikirAlarmStyles } from "../Styles/commonStyles";
import { useNumberContext } from "../context/NumberContext";
import { useLanguage } from "../context/LanguageContext";
import { Appearance } from "react-native";
import ThikirAlarmComponents from "../components/ThikirAlarmComponents"
import { updatePrayerTimings } from "../screens/azanScreen"

const { width } = Dimensions.get("window");

const ThikirAlarmScreen = () => {
  const { selectedTheme } = useTheme();
  const { selectedColor } = useColor();
  const { selectedLanguage } = useLanguage();
  const { state, convertToEasternArabicNumerals } = useNumberContext();
  const systemTheme = selectedTheme === "system";
  const [storedTimings, setStoredTimings] = useState(null)

  //#region LightTheme
  const lightTheme = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6",
    },
    notificationContainer: {
      backgroundColor: "#fefffe",
    },
    title: {
      color: "#000",
    },
    horizontalLine: {
      borderColor: "rgba(198, 198, 200, 0.45)",
    },
    wrapperButton:{
      backgroundColor: "#fefffe",
      shadowColor: "gray",
    }
  });
  //#endregion

  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    container: {
      backgroundColor: "#050505",
    },
    notificationContainer: {
      backgroundColor: "#1C1C1E",
    },
    title: {
      color: "#dddddd",
    },
    horizontalLine: {
      borderColor: "rgba(84, 84, 84, 0.45)",
    },
    wrapperButton:{
      backgroundColor: "#1C1C1E",
      shadowColor: "black",
    }
  });
  //#endregion

  const themeStyles = systemTheme
    ? Appearance.getColorScheme() === "dark"
      ? darkTheme
      : lightTheme
    : selectedTheme === "dark"
      ? darkTheme
      : lightTheme;

  //#region ArabicLanguage
  const ArabicLanguage = StyleSheet.create({
    notificationContainer: {
      flexDirection: "row-reverse",
    },
    horizontalLine: {
      marginRight: 20,
      overflow: "hidden",
    },
    leftContent: {
      alignItems: "flex-end",
    },
    rightContent: {
      alignItems: "flex-start",
      paddingLeft: 10,
    },
    title: {
      textAlign: "right",
      marginRight: 10,
    },
    time: {
      marginRight: 10,
      textAlign: "right",
    },
  });
  //#endregion

  //#region EnglishLanguage
  const EnglishLanguage = StyleSheet.create({
    notificationContainer: {
      flexDirection: "row",
    },
    horizontalLine: {
      marginLeft: 20,
      overflow: "hidden",
    },
    leftContent: {
      alignItems: "flex-start",
    },
    rightContent: {
      alignItems: "flex-end",
      paddingRight: 10,
    },
    title: {
      textAlign: "left",
      marginLeft: 10,
    },
    time: {
      marginLeft: 10,
      textAlign: "left",
    },
  });
  //#endregion

  //#region StyleMapping
  const styles = {
    ...ThikirAlarmStyles,
    container: {
      ...ThikirAlarmStyles.container,
      ...(selectedTheme === "dark"
        ? themeStyles.container
        : themeStyles.container),
    },
    notificationContainer: {
      ...ThikirAlarmStyles.notificationContainer,
      ...(selectedTheme === "dark"
        ? themeStyles.notificationContainer
        : themeStyles.notificationContainer),
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.notificationContainer
        : ArabicLanguage.notificationContainer),
    },
    title: {
      ...ThikirAlarmStyles.title,
      ...(selectedTheme === "dark" ? themeStyles.title : themeStyles.title),
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.title
        : ArabicLanguage.title),
    },
    horizontalLine: {
      ...ThikirAlarmStyles.horizontalLine,
      ...(selectedTheme === "dark"
        ? themeStyles.horizontalLine
        : themeStyles.horizontalLine),
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.horizontalLine
        : ArabicLanguage.horizontalLine),
    },
    leftContent: {
      ...ThikirAlarmStyles.leftContent,
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.leftContent
        : ArabicLanguage.leftContent),
    },
    rightContent: {
      ...ThikirAlarmStyles.rightContent,
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.rightContent
        : ArabicLanguage.rightContent),
    },
    time: {
      ...ThikirAlarmStyles.time,
      ...(selectedLanguage != "Arabic"
        ? EnglishLanguage.time
        : ArabicLanguage.time),
    },
    wrapperButton: {
      ...ThikirAlarmStyles.wrapperButton,
      ...(selectedTheme === "dark"
        ? themeStyles.wrapperButton
        : themeStyles.wrapperButton),
    },
  };
  //#endregion

  //#region notification structure
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      title: ThikirAlarmComponents.remembranceTitleAndBody(selectedLanguage).thikirSleepTranslationTitle,
      body: ThikirAlarmComponents.remembranceTitleAndBody(selectedLanguage).thikirSleepTranslationBody,
      id: "thikir_sleep",
      isActive: true,
    },
    {
      title: ThikirAlarmComponents.remembranceTitleAndBody(selectedLanguage).thikirWakeupTranslationTitle,
      body: ThikirAlarmComponents.remembranceTitleAndBody(selectedLanguage).thikirWakeupTranslationBody,
      id: "thikir_wakeup",
      isActive: true,
    },
    {
      title: ThikirAlarmComponents.remembranceTitleAndBody(selectedLanguage).thikirMorningTranslationTitle,
      body: ThikirAlarmComponents.remembranceTitleAndBody(selectedLanguage).thikirMorningTranslationBody,
      id: "thikir_morning",
      isActive: true,
    },
    {
      title: ThikirAlarmComponents.remembranceTitleAndBody(selectedLanguage).thikirEveningTranslationTitle,
      body: ThikirAlarmComponents.remembranceTitleAndBody(selectedLanguage).thikirEveningTranslationBody,
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
    if (Platform.OS === "android") {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus === "granted") {
          console.log("Notification permissions granted");
        }
      } else {
        console.log("Notification permissions denied");
      }
    } else {
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
    saveNotificationData(updatedNotifications, flag = "supplications");
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

  //#region display datepicker
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
    saveNotificationData(updatedNotifications, flag = "supplications");
  };

  //#endregion

  //#region loadStatesAlarmTimeAndNotifications
  const loadNotificationStatesAndAlarmTimes = async () => {
    try {
      const storedDataJSON = await AsyncStorage.getItem("supplicationsNotificationData");
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

  //#region handleCancelNotification
  const cancelNotification = async (notificationId) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log(`Notification for ${notificationId} canceled.`);
  };
  //#endregion

  //#region handleSaveNotificationData
  const saveNotificationData = async (notificationsToSave, flag) => {
    try {
      const notificationData = {};
      for (const notification of notificationsToSave) {
        notificationData[notification.id] = {
          isActive: notification.isActive,
          date: notification.date ? notification.date.toString() : flag === "supplications" ? getDefaultTime(notification.id, flag = "supplications") : getDefaultTime(notification.id, flag = "azan"),
        };
      }
      if (flag === "supplications") {
        await AsyncStorage.setItem(
          "supplicationsNotificationData",
          JSON.stringify(notificationData)
        );
        console.log("Supplications Notification data saved.");
      } if (flag === "azan") {
        await AsyncStorage.setItem(
          "azanNotificationData",
          JSON.stringify(notificationData)
        );
        console.log("Azan Notification data saved.");
      }
    } catch (error) {
      console.error("Error saving notification data:", error);
    }
  };
  //#endregion

  //#region DisplayBorderRadiusBasedOnItemCount
  const renderBorderRadius = (index, flag) => {
    let itemCount

    if (flag === "supplications") {
      itemCount = notifications.length;
    } else if (flag === "azan") {
      itemCount = prayerNotifications.length;
    }

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

  const [prayerNotifications, setPrayerNotifications] = useState([
    {
      title:
        ThikirAlarmComponents.azanTitleAndBody(selectedLanguage).azanFajrTitle,
      body: ThikirAlarmComponents.azanTitleAndBody(selectedLanguage)
        .azanFajrBodyText,
      id: "Fajr_Prayer",
      isActive: false,
    },
    {
      title:
        ThikirAlarmComponents.azanTitleAndBody(selectedLanguage).azanDhuhrTitle,
      body: ThikirAlarmComponents.azanTitleAndBody(selectedLanguage)
        .azanDhuhrBodyText,
      id: "Dhuhr_Prayer",
      isActive: false,
    },
    {
      title:
        ThikirAlarmComponents.azanTitleAndBody(selectedLanguage).azanAsrTitle,
      body: ThikirAlarmComponents.azanTitleAndBody(selectedLanguage)
        .azanAsrBodyText,
      id: "Asr_Prayer",
      isActive: false,
    },
    {
      title:
        ThikirAlarmComponents.azanTitleAndBody(selectedLanguage)
          .azanMaghrebTitle,
      body: ThikirAlarmComponents.azanTitleAndBody(selectedLanguage)
        .azanMaghrebBodyText,
      id: "Maghreb_Prayer",
      isActive: false,
    },
    {
      title:
        ThikirAlarmComponents.azanTitleAndBody(selectedLanguage).azanIshaTitle,
      body: ThikirAlarmComponents.azanTitleAndBody(selectedLanguage)
        .azanIshaBodyText,
      id: "Isha_Prayer",
      isActive: false,
    },
  ]);

  //#region toggleAlarm
  const toggleAzan = async (newValue, notificationData) => {
    try {
      setSelectedNotification(notificationData);
      const updatedNotifications = prayerNotifications.map((notification) =>
        notification.id === notificationData.id
          ? { ...notification, isActive: newValue }
          : notification
      );

      setPrayerNotifications(updatedNotifications);

      const selectedNotification = updatedNotifications.find(
        (n) => n.id === notificationData.id
      );
      console.log(
        `Selected ${selectedNotification.id} isActive:`,
      );
      console.log(formatTime(selectedNotification.date))
      if (selectedNotification.date && selectedNotification.isActive) {
        // If a time is picked and the toggle is active, schedule the notification
        await scheduleNotification(notificationData.id, selectedNotification);
        console.log(`Alarm for ${selectedNotification.id} activated.`);
      } else {
        // If the toggle is manually switched to inactive, cancel the notification

        await cancelNotification(notificationData.id);
        console.log(`Alarm for ${selectedNotification.id} deactivated.`);
      }

      // Save the updated notification state to storage
      saveNotificationData(updatedNotifications, flag = "azan");
    } catch (error) {
      console.error("Error toggle azan:", error);
    }
  };
  //#endregion

  const fetchData = async () => {
    // Fetch stored prayer times
    try {
      const storedPrayerTimes = await AsyncStorage.getItem(
        "prayer_times_of_day"
      );
      const storedPrayerOffset = await AsyncStorage.getItem(
        "offset_time_prayer"
      );
      const storedDataJSON = await AsyncStorage.getItem("azanNotificationData");
      if (storedDataJSON) {
        setFetchedData(JSON.parse(storedDataJSON))
      }
      if (storedPrayerTimes && storedPrayerOffset) {
        setStoredTimings(
          updatePrayerTimings(
            JSON.parse(storedPrayerTimes),
            JSON.parse(storedPrayerOffset)
          )
        );
      }
    } catch (error) {
      console.error("Error fetching prayer data:", error);
    }
  }
  const [fetchedData, setFetchedData] = useState(null)

  const setFetchedPrayerTimings = async () => {
    const notificationIdMap = {
      Fajr_Prayer: 'Fajr',
      Dhuhr_Prayer: 'Dhuhr',
      Asr_Prayer: 'Asr',
      Maghreb_Prayer: 'Maghrib',
      Isha_Prayer: 'Isha',
    };

    // Iterate over all notifications
    const updatedNotifications = prayerNotifications.map(notification => {
      const storedTimingKey = notificationIdMap[notification.id];
      if (storedTimings && storedTimingKey && storedTimings.hasOwnProperty(storedTimingKey)) {
        // If the timing exists in storedTimings, use it
        const storedTime = storedTimings[storedTimingKey];
        const [hours, minutes] = storedTime.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        // Update the notification's date and isActive property\
        if (fetchedData) {
          const savedData = fetchedData[notification.id];
          const storedDate = savedData ? new Date(savedData.date) : null;
          const isActive = savedData ? savedData.isActive : false;
          if (!storedDate || date.getTime() !== storedDate.getTime()) {
            return { ...notification, date, isActive };
          }
          return { ...notification, date, isActive };
        }
        return { ...notification, date };
      }
      // If the timing doesn't exist in storedTimings, return the original notification
      return notification;
    });
    saveNotificationData(updatedNotifications, flag = "azan")
    setFetchedData(updatedNotifications)
    // Update all notifications with the new timings
    setPrayerNotifications(updatedNotifications);
    // Schedule notifications for active notifications
    for (const prayerNotifications of updatedNotifications) {
      if (prayerNotifications.isActive && prayerNotifications.date) {
        await scheduleNotification(prayerNotifications.id, prayerNotifications);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (storedTimings !== null) {
      setFetchedPrayerTimings();
    }
  }, [storedTimings]);

  return (
    <View style={styles.container}>
      <View style={[styles.wrapHeaderText, { alignItems: selectedLanguage != "Arabic" ? "flex-start" : "flex-end", }]}>
        <Text style={styles.HeaderTextColor}>{selectedLanguage != "Arabic" ? "Supplications" : "الأذكار"}</Text>
      </View>
      {notifications.map((notification, index) => (
        <View key={notification.id} style={[styles.wrapperButton, renderBorderRadius(index, flag = "supplications"),]}>
          <TouchableOpacity
            style={[styles.notificationContainer, renderBorderRadius(index, flag = "supplications")]}
            onPress={() => showDatePicker(notification)}
            activeOpacity={0.7}
          >
              <View style={styles.leftContent}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  allowFontScaling={false}
                  style={[
                    styles.title,
                    {
                      fontFamily:
                        selectedLanguage != "Arabic"
                          ? "Montserrat"
                          : "ScheherazadeNewBold",
                    },
                  ]}
                >
                  {notification.title}
                </Text>
                <Text allowFontScaling={false} style={styles.time}>
                  {
                    (TimeToDisplay = state.isArabicNumbers
                      ? convertToEasternArabicNumerals(
                        notification.date
                          ? formatTime(notification.date)
                          : formatTime(
                            getDefaultTime(notification.id, flag = "supplications")
                          ).toString()
                      )
                      : notification.date
                        ? formatTime(notification.date)
                        : formatTime(getDefaultTime(notification.id, flag = "supplications")).toString())
                  }
                </Text>
              </View>
              {/* <View style={styles.middleContent}></View> */}
              <View style={styles.rightContent}>
                <Switch
                  value={notification.isActive}
                  onValueChange={() =>
                    toggleAlarm(notification.id, !notification.isActive)
                  }
                  thumbColor={notification.isActive ? "#fefffe" : "#fefffe"}
                  trackColor={{ true: selectedColor, false: "#454545" }}
                />
              </View>
          </TouchableOpacity>
          {index < notifications.length - 1 && (
              <View style={styles.horizontalLine} />
            )}
        </View>
      ))}
      
      <View style={[styles.wrapHeaderText, { alignItems: selectedLanguage != "Arabic" ? "flex-start" : "flex-end", }]}>
        <Text style={styles.HeaderTextColor}>{selectedLanguage != "Arabic" ? "Azan" : "أذان"}</Text>
      </View>
      {prayerNotifications.map((notification, index) => (
        <View key={notification.id} style={[styles.wrapperButton, renderBorderRadius(index, flag = "azan"),]}>
          <View style={[styles.notificationContainer, renderBorderRadius(index, flag = "azan")]}>
            <View style={styles.leftContent}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                allowFontScaling={false}
                style={[
                  styles.title,
                  {
                    fontFamily:
                      selectedLanguage != "Arabic"
                        ? "Montserrat"
                        : "ScheherazadeNewBold",
                  },
                ]}
              >
                {notification.title}
              </Text>
              <Text allowFontScaling={false} style={styles.time}>
                {notification.date
                  ? formatTime(notification.date)
                  : formatTime(getDefaultTime(notification.id, flag = "azan")).toString()}

              </Text>
            </View>
            <View style={styles.rightContent}>
              <Switch
                value={notification.isActive}
                onValueChange={() =>
                  toggleAzan(!notification.isActive, notification)
                }
                thumbColor={notification.isActive ? "#fefffe" : "#fefffe"}
                trackColor={{ true: selectedColor, false: "#454545" }}
              />
            </View>
          </View>
          {index < prayerNotifications.length - 1 && (
            <View style={styles.horizontalLine} />
          )}
        </View>
      ))}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        date={
          selectedNotification
            ? selectedNotification.date ||
            getDefaultTime(selectedNotification.id, flag = "supplications")
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

//#region GetDefaultTimeOfNotifications
const getDefaultTime = (notificationId, flag) => {
  // Define default times for each notification based on their IDs
  let defaultTimes;
  if (flag === "supplications") {
    defaultTimes = {
      thikir_sleep: new Date().setHours(23, 0, 0, 0),
      thikir_wakeup: new Date().setHours(6, 0, 0, 0),
      thikir_morning: new Date().setHours(7, 0, 0, 0),
      thikir_evening: new Date().setHours(18, 0, 0, 0),
    };
  } if (flag === "azan") {
    defaultTimes = {
      Fajr_Prayer: new Date().setHours(6, 0, 0, 0),
      Dhuhr_Prayer: new Date().setHours(13, 0, 0, 0),
      Asr_Prayer: new Date().setHours(16, 0, 0, 0),
      Maghreb_Prayer: new Date().setHours(18, 0, 0, 0),
      Isha_Prayer: new Date().setHours(20, 0, 0, 0),
    };
  }

  return new Date(defaultTimes[notificationId]);
};
//#endregion



export default ThikirAlarmScreen;
