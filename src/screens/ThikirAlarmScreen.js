import React, { useEffect, useState } from "react";

  import { View, Text, TouchableOpacity, Switch, StyleSheet, Platform, Dimensions,} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from '../context/ThemeContext';
import { useColor } from '../context/ColorContext';
import { ThikirAlarmStyles } from '../Styles/commonStyles';
import { useNumberContext } from '../context/NumberContext';
import { useLanguage } from "../context/LanguageContext";
import { Appearance } from 'react-native';
const {width} = Dimensions.get("window");

const ThikirAlarmScreen = () => {
  const { selectedTheme } = useTheme();
  const { selectedColor } = useColor();
  const { selectedLanguage } = useLanguage();
  const { state, convertToEasternArabicNumerals } = useNumberContext(); 
  const systemTheme = selectedTheme === 'system'; 
  //#region LightTheme
  const lightTheme = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6",
    },
    notificationContainer: {
      backgroundColor: "#fefffe",
      shadowColor: "gray", 
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
  const darkTheme = StyleSheet.create({
    container: {
      backgroundColor: "#151515",
    },
    notificationContainer: {
      backgroundColor: "#262626",
      shadowColor: "black", 
    },
    title: {
      color: "#dddddd",
    },
    horizontalLineWrapper: {
      borderColor: "#262626",
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
    //#region ArabicLanguage
    const ArabicLanguage = StyleSheet.create({
      notificationContainer: {
        flexDirection: "row-reverse",
      },
      horizontalLineWrapper: {
        marginLeft: width > 600 ? 610 : 350,
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
      horizontalLineWrapper: {
        marginRight: width > 600 ? 610 : 350,
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
      ...selectedTheme === 'dark' ? themeStyles.container : themeStyles.container,
    },
    notificationContainer: {
      ...ThikirAlarmStyles.notificationContainer,
      ...selectedTheme  === 'dark'? themeStyles.notificationContainer : themeStyles.notificationContainer,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.notificationContainer : ArabicLanguage.notificationContainer )
    },
    title: {
      ...ThikirAlarmStyles.title,
      ...selectedTheme  === 'dark'? themeStyles.title : themeStyles.title,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.title : ArabicLanguage.title )
    },
    horizontalLineWrapper: {
      ...ThikirAlarmStyles.horizontalLineWrapper,
      ...selectedTheme  === 'dark'? themeStyles.horizontalLineWrapper : themeStyles.horizontalLineWrapper,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.horizontalLineWrapper : ArabicLanguage.horizontalLineWrapper )
    },
    leftContent:{
      ...ThikirAlarmStyles.leftContent,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.leftContent : ArabicLanguage.leftContent )
    },
    rightContent:{
      ...ThikirAlarmStyles.rightContent,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.rightContent : ArabicLanguage.rightContent )
    },
    time:{
      ...ThikirAlarmStyles.time,
      ...(selectedLanguage != "Arabic" ? EnglishLanguage.time : ArabicLanguage.time )
    },
  };
  //#endregion
  const thikirSleepTranslationTitle = selectedLanguage != "Arabic" ? "Sleeping Remembrance" : "أذكار النوم";
  const thikirWakeupTranslationTitle = selectedLanguage != "Arabic" ? "Waking up Remembrance" :  "أذكار الاستيقاظ من النوم";
  const thikirMorningTranslationTitle = selectedLanguage != "Arabic" ? "Morning Remembrance" :"أذكار الصباح";
  const thikirEveningTranslationTitle = selectedLanguage != "Arabic" ? "Evening Remembrance" : "أذكار المساء";


  const thikirSleepTranslationBody = selectedLanguage != "Arabic" ? "In Your name my Lord, I lie down and in Your name I rise, so if You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You do so with Your righteous servants." :
    "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِن أَمْسَكْتَ نَفْسِي فارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا، بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ";
  const thikirWakeupTranslationBody = selectedLanguage != "Arabic" ? "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection." :
    "الْحَمْدُ للَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا، وَإِلَيْهِ النُّشُورُ";
  const thikirMorningTranslationBody = selectedLanguage != "Arabic" ? "O Allah, by your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection." :
    "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا ، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ";
  const thikirEveningTranslationBody = selectedLanguage != "Arabic" ? "O Allah, what blessing I or any of Your creation have risen upon, is from You alone, without partner, so for You is all praise and unto You all thanks." :
    "اللَّهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير";
  //#region notification structure
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      title: thikirSleepTranslationTitle,
      body: thikirSleepTranslationBody,
      id: "thikir_sleep",
      isActive: true,
    },
    {
      title: thikirWakeupTranslationTitle,
      body: thikirWakeupTranslationBody ,
      id: "thikir_wakeup",
      isActive: true,
    },
    {
      title: thikirMorningTranslationTitle,
      body: thikirMorningTranslationBody ,
      id: "thikir_morning",
      isActive: true,
    },
    {
      title: thikirEveningTranslationTitle,
      body: thikirEveningTranslationBody,
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
                <Text   numberOfLines={1}
                        ellipsizeMode="tail" 
                        allowFontScaling={false} style={[styles.title,{fontFamily: selectedLanguage!= "Arabic" ? "Montserrat" : "ScheherazadeNewBold"}]}>{notification.title}</Text>
                <Text allowFontScaling={false} style={styles.time}>
                    {TimeToDisplay = state.isArabicNumbers
                    ? convertToEasternArabicNumerals(notification.date
                    ? formatTime(notification.date)
                    : formatTime(getDefaultTime(notification.id)).toString())
                    : notification.date
                    ? formatTime(notification.date)
                    : formatTime(getDefaultTime(notification.id)).toString()}
                </Text>
              </View>
              {/* <View style={styles.middleContent}></View> */}
              <View style={styles.rightContent}>
                <Switch
                  value={notification.isActive}
                  onValueChange={() =>
                    toggleAlarm(notification.id, !notification.isActive)
                  }
                  thumbColor={notification.isActive ? '#fefffe' : '#fefffe'}
                  trackColor={{ true: selectedColor, false: '#454545' }}
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
