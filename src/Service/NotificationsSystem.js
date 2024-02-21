import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as BackgroundFetch from "expo-background-fetch";
import { View, Text, Switch } from "react-native-animatable";
import { useNumberContext } from "../context/NumberContext";
import { ThikirAlarmStyles } from "../Styles/commonStyles";
import * as Notifications from "expo-notifications";
import { useLanguage } from "../context/LanguageContext";
import { useColor } from "../context/ColorContext";
import ThikirAlarmComponents from "../components/ThikirAlarmComponents";

const NotificationsSystem = () => {
    const { selectedLanguage } = useLanguage();
    const { selectedColor } = useColor();
    const [selectedNotification, setSelectedNotification] = useState(null);

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
    const toggleAzan = (newValue, notificationData) => {
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
            "Selected Notification isActive:",
            selectedNotification.isActive
        );

        // if (selectedNotification.date && selectedNotification.isActive) {
        // // If a time is picked and the toggle is active, schedule the notification
        // await scheduleNotification(notificationData.id, selectedNotification);
        // console.log(`Alarm for ${selectedNotification.id} activated.`);
        // } else {
        // // If the toggle is manually switched to inactive, cancel the notification

        // await cancelNotification(notificationData.id);
        // console.log(`Alarm for ${selectedNotification.id} deactivated.`);
        // }

        // // Save the updated notification state to storage
        // saveNotificationData(updatedNotifications);
    };
    //#endregion

    return (
        <>
            {prayerNotifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                    <View style={[ThikirAlarmStyles.notificationContainer]}>
                        <View style={ThikirAlarmStyles.leftContent}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                allowFontScaling={false}
                                style={[
                                    ThikirAlarmStyles.title,
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
                            <Text allowFontScaling={false} style={ThikirAlarmStyles.time}>
                                {notification.date
                                    ? formatTime(notification.date)
                                    : formatTime(getDefaultTimeAzan(notification.id)).toString()}
                            </Text>
                        </View>
                        <View style={ThikirAlarmStyles.rightContent}>
                            <Switch
                                value={notification.isActive}
                                onValueChange={() =>
                                    toggleAzan(!notification.isActive, notification)
                                }
                                thumbColor={notification.isActive ? "#fefffe" : "#fefffe"}
                                trackColor={{ false: selectedColor, false: "#454545" }}
                            />
                        </View>
                    </View>
                    {index < prayerNotifications.length - 1 && (
                        <View style={ThikirAlarmStyles.horizontalLineWrapper} />
                    )}
                </React.Fragment>
            ))}
        </>
    );
};
export default NotificationsSystem;

//#region GetDefaultTimeOfNotifications
const getDefaultTimeAzan = (notificationId) => {
    // Define default times for each notification based on their IDs
    const defaultTimes = {
        Fajr_Prayer: new Date().setHours(6, 0, 0, 0),
        Dhuhr_Prayer: new Date().setHours(13, 0, 0, 0),
        Asr_Prayer: new Date().setHours(16, 0, 0, 0),
        Maghreb_Prayer: new Date().setHours(18, 0, 0, 0),
        Isha_Prayer: new Date().setHours(20, 0, 0, 0),
    };
    return new Date(defaultTimes[notificationId]) || new Date();
};
//#endregion
