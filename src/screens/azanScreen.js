import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Animated,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import locationSingleton from "../Service/LocationSingletonService";
import OffsetSingleton from "../Service/OffsetDataSingletonService";
import AzanService from "../Service/AzanService";
import { useTheme } from "../context/ThemeContext";
import { useColor } from "../context/ColorContext";
import { useLanguage } from "../context/LanguageContext";
import { AzanScreenStyle } from "../Styles/commonStyles";
import { useNumberContext } from "../context/NumberContext";
import { getColorForTheme } from "../utils/themeUtils";
import AzanComponents from "../components/AzanComponents";

const AzanScreen = () => {
  const { selectedTheme } = useTheme();
  const { selectedColor } = useColor();
  const { selectedLanguage } = useLanguage();
  const systemTheme = selectedTheme === "system";
  const { state, convertToEasternArabicNumerals } = useNumberContext();

  const NumberPickerTheme = getColorForTheme(
    { dark: "#fff", light: "#000" },
    selectedTheme,
    systemTheme
  );
  const horizontalLineTheme = getColorForTheme(
    { dark: "#242424", light: "#f2f2f6" },
    selectedTheme,
    systemTheme
  );

  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [monthText, setMonthText] = useState(null);
  const [year, setYear] = useState(null);

  const [dayHijri, setHijriDay] = useState(null);
  const [monthHijri, setHijriMonth] = useState(null);
  const [yearTextHijri, setHijriYear] = useState(null);

  const [storedTimings, setStoredTimings] = useState(null);

  const [nextPrayerTime, setNextPrayerTime] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [timeFormatCheck, setTimeFormatCheck] = useState(null);

  //#region LightTheme
  const lightTheme = StyleSheet.create({
    container: {
      backgroundColor: "#f2f2f6",
    },
    nextPrayerContainer: {
      backgroundColor: "#fefffe",
      shadowColor: "gray",
    },
    time: {
      color: "#000",
    },
    nextPrayerText: {
      color: "#666",
    },
    dateContainerWrapper: {
      backgroundColor: "#fefffe",
      shadowColor: "gray",
    },
    date: {
      color: "#666",
    },
    prayerContainer: {
      backgroundColor: "#fefffe",
      shadowColor: "gray",
    },
    prayerName: {
      color: "#000",
    },
    prayerTime: {
      color: "#666",
    },
    boldPrayer: {
      color: "#000",
    },
    boldTime: {
      color: "#000",
    },
    prayerDecorator: {
      backgroundColor: selectedColor,
      shadowColor: "gray",
    },
    noTimings: {
      color: "#666",
    },
    horizontalLine: {
      borderColor: "#f2f2f6",
    },
    pikerContainer: {
      backgroundColor: "#fefffe",
    },
    pickerCancelBtn: {
      backgroundColor: "#fefffe",
    },
  });
  //#endregion

  //#region DarkTheme
  const darkTheme = StyleSheet.create({
    container: {
      backgroundColor: "#151515",
    },
    nextPrayerContainer: {
      backgroundColor: "#242424",
      shadowColor: "black",
    },
    time: {
      color: "#f2f2f6",
    },
    nextPrayerText: {
      color: "#666",
    },
    dateContainerWrapper: {
      backgroundColor: "#242424",
      shadowColor: "black",
    },
    date: {
      color: "#666",
    },
    prayerContainer: {
      backgroundColor: "#242424",
      shadowColor: "black",
    },
    prayerName: {
      color: "#f2f2f6",
    },
    prayerTime: {
      color: "#666",
    },
    boldPrayer: {
      color: "#f2f2f6",
    },
    boldTime: {
      color: "#f2f2f6",
    },
    prayerDecorator: {
      backgroundColor: selectedColor,
      shadowColor: "black",
    },
    noTimings: {
      color: "#666",
    },
    horizontalLine: {
      borderColor: "#151515",
    },
    pikerContainer: {
      backgroundColor: "#151515",
    },
    pickerCancelBtn: {
      backgroundColor: "#151515",
    },
  });
  //#endregion

  const themeStyles = getColorForTheme(
    { dark: darkTheme, light: lightTheme },
    selectedTheme,
    systemTheme
  );

  //#region StyleMapping
  const styles = {
    ...AzanScreenStyle,
    container: {
      ...AzanScreenStyle.container,
      ...(selectedTheme === "dark"
        ? themeStyles.container
        : themeStyles.container),
    },
    nextPrayerContainer: {
      ...AzanScreenStyle.nextPrayerContainer,
      ...(selectedTheme === "dark"
        ? themeStyles.nextPrayerContainer
        : themeStyles.nextPrayerContainer),
    },
    time: {
      ...AzanScreenStyle.time,
      ...(selectedTheme === "dark" ? themeStyles.time : themeStyles.time),
    },
    nextPrayerText: {
      ...AzanScreenStyle.nextPrayerText,
      ...(selectedTheme === "dark"
        ? themeStyles.nextPrayerText
        : themeStyles.nextPrayerText),
    },
    dateContainerWrapper: {
      ...AzanScreenStyle.dateContainerWrapper,
      ...(selectedTheme === "dark"
        ? themeStyles.dateContainerWrapper
        : themeStyles.dateContainerWrapper),
    },
    date: {
      ...AzanScreenStyle.date,
      ...(selectedTheme === "dark" ? themeStyles.date : themeStyles.date),
    },
    prayerContainer: {
      ...AzanScreenStyle.prayerContainer,
      ...(selectedTheme === "dark"
        ? themeStyles.prayerContainer
        : themeStyles.prayerContainer),
    },
    prayerName: {
      ...AzanScreenStyle.prayerName,
      ...(selectedTheme === "dark"
        ? themeStyles.prayerName
        : themeStyles.prayerName),
    },
    prayerTime: {
      ...AzanScreenStyle.prayerTime,
      ...(selectedTheme === "dark"
        ? themeStyles.prayerTime
        : themeStyles.prayerTime),
    },
    boldPrayer: {
      ...AzanScreenStyle.boldPrayer,
      ...(selectedTheme === "dark"
        ? themeStyles.boldPrayer
        : themeStyles.boldPrayer),
    },
    boldTime: {
      ...AzanScreenStyle.boldTime,
      ...(selectedTheme === "dark"
        ? themeStyles.boldTime
        : themeStyles.boldTime),
    },
    prayerDecorator: {
      ...AzanScreenStyle.prayerDecorator,
      ...(selectedTheme === "dark"
        ? themeStyles.prayerDecorator
        : themeStyles.prayerDecorator),
    },
    noTimings: {
      ...AzanScreenStyle.noTimings,
      ...(selectedTheme === "dark"
        ? themeStyles.noTimings
        : themeStyles.noTimings),
    },
    horizontalLine: {
      ...AzanScreenStyle.horizontalLine,
      ...(selectedTheme === "dark"
        ? themeStyles.horizontalLine
        : themeStyles.horizontalLine),
    },
    pikerContainer: {
      ...AzanScreenStyle.pikerContainer,
      ...(selectedTheme === "dark"
        ? themeStyles.pikerContainer
        : themeStyles.pikerContainer),
    },
    pickerCancelBtn: {
      ...AzanScreenStyle.pickerCancelBtn,
      ...(selectedTheme === "dark"
        ? themeStyles.pickerCancelBtn
        : themeStyles.pickerCancelBtn),
    },
  };
  //#endregion

  //#region Update the current time
  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  //#endregion

  //#region getDateInfo
  function getDateInfo(date) {
    const monthsEnglish = new Intl.DateTimeFormat("en-US", {
      month: "long",
    });

    const monthsArabic = new Intl.DateTimeFormat("ar-JO", {
      month: "long",
    });

    const LanguageStateMonthDisplay =
      selectedLanguage != "Arabic" ? monthsEnglish : monthsArabic;

    const currentDay = date.getDate();

    const currentMonthText = LanguageStateMonthDisplay.format(date);

    const currentMonth = date.getMonth() + 1;

    const currentYear = date.getFullYear();

    setDay(currentDay);
    setMonthText(currentMonthText);
    setMonth(currentMonth);
    setYear(currentYear);

    return {
      currentDay: currentDay,
      currentMonthText: currentMonthText,
      currentMonth: currentMonth,
      currentYear: currentYear,
    };
  }
  //#endregion

  //#region getHijriDateInfo
  function getHijriDateInfo(date) {
    const hijriFormatterEnglish = new Intl.DateTimeFormat(
      "en-US-u-ca-islamic",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    const hijriFormatterArabic = new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const LanguageStateMonthDisplay =
      selectedLanguage != "Arabic"
        ? hijriFormatterEnglish
        : hijriFormatterArabic;

    const hijriDateString = LanguageStateMonthDisplay.format(date);

    const [hijriDay, hijriMonth, hijriYear] = hijriDateString.split(" ");

    setHijriDay(hijriDay);
    setHijriMonth(hijriMonth);
    setHijriYear(hijriYear);

    return {
      hijriDay: hijriDay,
      hijriMonth: hijriMonth,
      hijriYear: hijriYear,
    };
  }
  //#endregion

  //#region formatTime
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return { hours, minutes };
  };
  //#endregion

  //#region removeUnwantedTimes
  const removeUnwantedTimes = (prayerTimes) => {
    const cleanedPrayerTimes = { ...prayerTimes };

    Object.keys(cleanedPrayerTimes).forEach((key) => {
      cleanedPrayerTimes[key] = prayerTimes[key].replace(/\s*\([^)]*\)/g, "");
    });

    delete cleanedPrayerTimes.Lastthird;

    delete cleanedPrayerTimes.Imsak;

    delete cleanedPrayerTimes.Firstthird;

    delete cleanedPrayerTimes.Midnight;

    delete cleanedPrayerTimes.Sunset;

    return cleanedPrayerTimes;
  };
  //#endregion

  //#region Entry Point
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stored prayer times
        const storedPrayerTimes = await AsyncStorage.getItem(
          "prayer_times_of_day"
        );
        const storedPrayerOffset = await AsyncStorage.getItem(
          "offset_time_prayer"
        );
        // Data exist and is being Fetch from Async
        // Only will work after first install
        if (
          storedPrayerTimes &&
          storedPrayerOffset &&
          timeFormatCheck === false
        ) {
          // This part of code is not and will not be refactored,
          //  because the way react deals with useEffect, it will make the data on render blemish
          setStoredTimings(
            timeConvertFrom24To12(
              updatePrayerTimings(
                removeUnwantedTimes(JSON.parse(storedPrayerTimes)),
                JSON.parse(storedPrayerOffset)
              )
            )
          );
        }
        if (
          storedPrayerTimes &&
          storedPrayerOffset &&
          timeFormatCheck === true
        ) {
          setStoredTimings(
            updatePrayerTimings(
              removeUnwantedTimes(JSON.parse(storedPrayerTimes)),
              JSON.parse(storedPrayerOffset)
            )
          );
        }

        const currentDate = new Date();
        let dateInfo = {}
        try {
          dateInfo = getDateInfo(currentDate);
        } catch (error) {
          console.error("Error getting data:", error);
        }
        const { currentDay, currentMonth, currentYear } = dateInfo;

        try {
          getHijriDateInfo(currentDate);
        } catch (error) {
          console.error("Error getting hijri data:", error);
        }

        // Fetch current Offset data
        try {
          const { offsetSuccess } = await OffsetSingleton.getOffsetStatus();
          if (offsetSuccess) {
          try {
            const {locationSuccess, location} = await locationSingleton.getLocation();

            if (locationSuccess && location ) {
              const { latitude, longitude } = location;

              // Fetch prayer times using current location
              const prayerTimes = await AzanService.checkAndFetchPrayerTimes(
                latitude,
                longitude,
                currentDay,
                currentMonth,
                currentYear
              );

              const cleanedPrayerTimes = removeUnwantedTimes(prayerTimes);

              if (storedPrayerTimes && storedPrayerOffset) {
                let updatedTimings = updatePrayerTimings(
                  cleanedPrayerTimes,
                  JSON.parse(storedPrayerOffset)
                );

                if (timeFormatCheck === false) {
                  updatedTimings = timeConvertFrom24To12(updatedTimings);
                  setStoredTimings(updatedTimings);
                }
              } else {
                let cleanedPrayerTimesUpdate = cleanedPrayerTimes;

                if (timeFormatCheck === false) {
                  cleanedPrayerTimesUpdate = timeConvertFrom24To12(
                    cleanedPrayerTimesUpdate
                  );
                  setStoredTimings(cleanedPrayerTimesUpdate);
                }
                setStoredTimings(cleanedPrayerTimesUpdate);
              }
              try {
                // Store updated prayer times
                await AsyncStorage.setItem(
                  "prayer_times_of_day",
                  JSON.stringify(cleanedPrayerTimes)
                );
              } catch (error) {
                console.error("Error storing prayer data:", error);
              }
            } else {
              console.log("Location permission not granted");
            }




          } catch (error) {
            console.error("Error getting location data:", error);
          }

        }

        } catch (error) {
          console.error("Error getting offset data:", error);
        }
        // Fetch current location
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const localProperties = Localization.getCalendars()[0];
    setTimeFormatCheck(localProperties.uses24hourClock);

    fetchData();
  }, [timeFormatCheck]);
  //#endregion

  //#region Calculate Time Left and next Prayer
  useEffect(() => {
    if (storedTimings) {
      let nextPrayer = null;
      let nextPrayerTime = null;
      let minTimeDiff = Infinity;
      for (const [prayer, time] of Object.entries(storedTimings)) {
        let [hoursStr, minutesStr, period] = time.split(/:| /);
        let hours = parseInt(hoursStr);
        let minutes = parseInt(minutesStr);

        const prayerTime = new Date(currentTime);

        if (!timeFormatCheck) {
          // 12-hour system
          if (period === "PM" && hours !== 12) {
            hours += 12;
          } else if (period && period === "AM" && hours === 12) {
            hours = 0;
          }
        }
        prayerTime.setHours(hours, minutes, 0, 0);
        let timeDiff = prayerTime - currentTime;

        if (timeDiff < 0) {
          timeDiff += 24 * 60 * 60 * 1000; // Add time for a full day
        }

        if (timeDiff > 0 && timeDiff < minTimeDiff) {
          nextPrayer = prayer;
          minTimeDiff = timeDiff;
          nextPrayerTime = time;
        }
      }
      setNextPrayer(nextPrayer);
      setNextPrayerTime(nextPrayerTime);
      setTimeLeft(formatTime(minTimeDiff));
    }
  }, [storedTimings, currentTime]);
  //#endregion



  //#region Offset Timings change state
  const [activePicker, setActivePicker] = useState(null);
  const [selectedMinutes, setSelectedMinutes] = useState({});

  //#region Offset Timings change state to be displayed in the picker
  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("offset_time_prayer");
        if (storedData) {
          setSelectedMinutes(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Error fetching stored data:", error);
      }
    };

    fetchStoredData();
  }, []);
  //#endregion

  const [storedTimingsUpdated, setStoredTimingsUpdated] = useState(false);

  //#region update stored timings and trigger re-render
  const updateStoredTimings = (storedPrayerTimes, existingData) => {
    // Fetch stored prayer times

    let updatedTimings = updatePrayerTimings(
      removeUnwantedTimes(JSON.parse(storedPrayerTimes)),
      JSON.parse(existingData)
    );
    if (timeFormatCheck === false) {
      updatedTimings = timeConvertFrom24To12(updatedTimings);
    }
    // Update stored timings state
    setStoredTimings(updatedTimings);
    setStoredTimingsUpdated(true);
  };
  //#endregion

  //#region  Call updateStoredTimings whenever any of the pickers are changed
  const handleMinutesChange = (prayer, minutes) => {
    setSelectedMinutes((prevSelectedMinutes) => ({
      ...prevSelectedMinutes,
      [prayer]: minutes,
    }));
  };
  //#endregion

  //#region  storedTimingsUpdated to conditionally render components
  useEffect(() => {
    if (storedTimingsUpdated) {
      // Reset stored timings updated state

      setStoredTimingsUpdated(false);
    }
  }, [storedTimingsUpdated]);
  //#endregion

  //#region closing Modal handler
  const handleCloseModal = () => {
    setActivePicker(null);
  };
  //#endregion

  //#region saving offset timings into AsyncStorage
  const handleConfirm = async (prayer) => {
    setActivePicker(null);
    const selectedTime = selectedMinutes[prayer];
    const dataToStore = { [prayer]: selectedTime };

    try {
      // Retrieve existing data from AsyncStorage
      const existingData = await AsyncStorage.getItem("offset_time_prayer");
      let newData;

      // Check if existing data exists
      if (existingData) {
        // Parse existing data from JSON
        const parsedData = JSON.parse(existingData);

        // Check if the prayer already exists in the stored data
        if (parsedData.hasOwnProperty(prayer)) {
          // If prayer exists, update its value with the newer data
          parsedData[prayer] = selectedTime;
          newData = JSON.stringify(parsedData);
        } else {
          // If prayer doesn't exist, add it to the existing data
          parsedData[prayer] = selectedTime;
          newData = JSON.stringify(parsedData);
        }
      } else {
        // If no existing data, set newData to the new data only
        newData = JSON.stringify(dataToStore);
      }

      // Save the updated data to AsyncStorage
      await AsyncStorage.setItem("offset_time_prayer", newData);

      const newDataFetch = await AsyncStorage.getItem("offset_time_prayer");
      const storedPrayerTimes = await AsyncStorage.getItem(
        "prayer_times_of_day"
      );

      updateStoredTimings(storedPrayerTimes, newDataFetch);
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };
  //#endregion

  //#endregion

  //#region animation
  const [animatedValue] = useState(new Animated.Value(0));
  const AnimationBackgroundTheme = getColorForTheme(
    {
      dark: ["hsl(0, 0%, 29.8%)", "hsl(0, 0%, 17.8%)"],
      light: ["hsl(0, 0%, 94.9%)", "hsl(0, 0%, 90.2%)"],
    },
    selectedTheme,
    systemTheme
  );
  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  const backgroundColorInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: AnimationBackgroundTheme,
  });
  //#endregion

  return (
    <View style={styles.container}>
      {nextPrayer !== null ? (
        <View style={styles.nextPrayerContainer}>
          {selectedLanguage != "Arabic" ? (
            <AzanComponents.NextPrayerInfoEnglish
              nextPrayer={nextPrayer}
              timeLeft={timeLeft}
              selectedLanguage={selectedLanguage}
            />
          ) : (
            <AzanComponents.NextPrayerInfoArabic
              nextPrayer={nextPrayer}
              timeLeft={timeLeft}
              selectedLanguage={selectedLanguage}
            />
          )}

          <Text style={styles.time}
            allowFontScaling={false} >
            {state.isArabicNumbers
              ? convertToEasternArabicNumerals(nextPrayerTime)
              : nextPrayerTime}
          </Text>
        </View>
      ) : (
        <View style={styles.nextPrayerContainer}>
          <Animated.View
            style={[
              styles.skeletonNextPrayerText,
              { backgroundColor: backgroundColorInterpolation },
            ]}
          />
          <Animated.View
            style={[
              styles.skeletonTime,
              { backgroundColor: backgroundColorInterpolation },
            ]}
          />
        </View>
      )}

      <View style={styles.dateContainer}>
        <View style={styles.dateContainerWrapper}>
          {day && monthText && year ? (
            <>
              {selectedLanguage != "Arabic" ? (
                <AzanComponents.DateInfoEnglish
                  monthText={monthText}
                  day={day}
                  year={year}
                />
              ) : (
                <AzanComponents.DateInfoArabic
                  monthText={monthText}
                  day={day}
                  year={year}
                />
              )}
            </>
          ) : (
            <Animated.View
              style={[
                styles.skeletonDate,
                { backgroundColor: backgroundColorInterpolation },
              ]}
            />
          )}
        </View>
        <View style={styles.dateContainerWrapper}>
          {dayHijri && monthHijri && yearTextHijri ? (
            <>
              {selectedLanguage != "Arabic" ? (
                <AzanComponents.DateHijriInfoEnglish
                  dayHijri={dayHijri}
                  monthHijri={monthHijri}
                  yearTextHijri={yearTextHijri}
                />
              ) : (
                <AzanComponents.DateHijriInfoArabic
                  dayHijri={dayHijri}
                  monthHijri={monthHijri}
                  yearTextHijri={yearTextHijri}
                />
              )}
            </>
          ) : (
            <Animated.View
              style={[
                styles.skeletonDate,
                { backgroundColor: backgroundColorInterpolation },
              ]}
            />
          )}
        </View>
      </View>

      <View style={[styles.prayerContainer]}>
        {storedTimings !== null && Object.keys(storedTimings).length !== 0
          ? Object.entries(storedTimings).map(
            ([prayer, time], index, array) => (
              <View key={prayer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setActivePicker(prayer);
                  }}
                >
                  {/* Background */}
                  {Platform.OS === "android" ? (
                    <>
                      <Modal
                        visible={activePicker === prayer}
                        animationType="fade"
                        transparent={true}
                        style={{
                          zIndex: 1000, // Higher zIndex for parent modal
                        }}
                      >
                        <View
                          style={[
                            {
                              flex: 1,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                            },
                          ]}
                        ></View>
                      </Modal>
                      <Modal
                        visible={activePicker === prayer}
                        animationType="slide"
                        transparent={true}
                        style={[
                          {
                            flex: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 2000,
                          },
                        ]}
                      >
                        <View style={styles.pikerContainerWrapper}>
                          <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={handleCloseModal}
                          />
                          <View style={styles.pikerContainer}>
                            <Text
                              allowFontScaling={false}
                              style={[
                                {
                                  color: "#666",
                                  fontFamily: "Montserrat",
                                  margin: 5,
                                  paddingTop: 10,
                                  paddingLeft: 10,
                                },
                              ]}
                            >
                              {prayer} Precaution
                            </Text>
                            <Picker
                              selectedValue={selectedMinutes[prayer]}
                              onValueChange={(minutes) =>
                                handleMinutesChange(prayer, minutes)
                              }
                              mode="dialog"
                            >
                              {Array.from(
                                { length: 61 },
                                (_, index) => index - 30
                              ).map((minute) => (
                                <Picker.Item
                                  key={minute}
                                  label={minute}
                                  value={minute}
                                  color={NumberPickerTheme}
                                  style={{
                                    color: "#252525",
                                    fontSize: 28,
                                  }}
                                />
                              ))}
                            </Picker>
                            <View
                              style={[
                                styles.horizontalLine,
                                { borderColor: horizontalLineTheme },
                              ]}
                            />
                            <View style={styles.pickerConfirmBtn}>
                              <Button
                                title="Confirm"
                                onPress={() => handleConfirm(prayer)}
                              />
                            </View>
                          </View>
                          <View style={styles.pickerCancelBtn}>
                            <Button
                              title="Cancel"
                              onPress={handleCloseModal}
                            />
                          </View>
                        </View>
                      </Modal>
                    </>
                  ) : (
                    <>
                      <Modal
                        visible={activePicker === prayer}
                        animationType="fade"
                        transparent={true}
                      >
                        <View
                          style={[
                            {
                              flex: 1,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                            },
                          ]}
                        ></View>

                        <Modal
                          visible={activePicker === prayer}
                          animationType="slide"
                          transparent={true}
                          style={[
                            {
                              flex: 1,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                            },
                          ]}
                        >
                          <View style={styles.pikerContainerWrapper}>
                            <TouchableOpacity
                              style={{ flex: 1 }}
                              onPress={handleCloseModal}
                            />
                            <View style={styles.pikerContainer}>
                              <Text
                                allowFontScaling={false}
                                style={[
                                  {
                                    color: "#666",
                                    fontFamily: "Montserrat",
                                    margin: 5,
                                    paddingTop: 10,
                                    paddingLeft: 10,
                                  },
                                ]}
                              >
                                {prayer} Precaution
                              </Text>
                              <Picker
                                selectedValue={selectedMinutes[prayer]}
                                onValueChange={(minutes) =>
                                  handleMinutesChange(prayer, minutes)
                                }
                                mode="dialog"
                              >
                                {Array.from(
                                  { length: 61 },
                                  (_, index) => index - 30
                                ).map((minute) => (
                                  <Picker.Item
                                    key={minute}
                                    label={minute}
                                    value={minute}
                                    color={NumberPickerTheme}
                                    style={{
                                      color: "#252525",
                                      fontSize: 28,
                                    }}
                                  />
                                ))}
                              </Picker>
                              <View
                                style={[
                                  styles.horizontalLine,
                                  { borderColor: horizontalLineTheme },
                                ]}
                              />
                              <View style={styles.pickerConfirmBtn}>
                                <Button
                                  title="Confirm"
                                  onPress={() => handleConfirm(prayer)}
                                />
                              </View>
                            </View>
                            <View style={styles.pickerCancelBtn}>
                              <Button
                                title="Cancel"
                                onPress={handleCloseModal}
                              />
                            </View>
                          </View>
                        </Modal>
                      </Modal>
                    </>
                  )}
                  {/* Prayer Item */}
                  <View
                    style={[
                      styles.prayerItem,
                      prayer === nextPrayer ? styles.prayerDecorator : null,
                      selectedLanguage !== "Arabic"
                        ? { flexDirection: "row" }
                        : { flexDirection: "row-reverse" },
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.prayerName,
                        prayer === nextPrayer ? styles.boldPrayer : null,
                      ]}
                    >
                      {selectedLanguage !== "Arabic"
                        ? prayer // Display English prayer name
                        : AzanComponents.mapPrayerNameToArabic(prayer)}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.prayerTime,
                        prayer === nextPrayer ? styles.boldTime : null,
                      ]}
                    >
                      {state.isArabicNumbers
                        ? convertToEasternArabicNumerals(time.toString())
                        : time.toString()}
                    </Text>
                  </View>
                  {index !== array.length - 1 && (
                    <View style={styles.horizontalLine} />
                  )}
                </TouchableOpacity>
              </View>
            )
          )
          : Array.from({ length: 6 }).map((_, index) => (
            <View key={index}>
              {/* Prayer Item */}
              <View style={[styles.skeletonPrayerItem]}>
                <Animated.View
                  style={[
                    styles.skeletonPrayerName,
                    { backgroundColor: backgroundColorInterpolation },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.skeletonPrayerTime,
                    { backgroundColor: backgroundColorInterpolation },
                  ]}
                />
              </View>
              {index !== 5 && <View style={styles.horizontalLine} />}
            </View>
          ))}
      </View>
    </View>
  );
};

export default AzanScreen;


//#region  convert Time from 24 Base to 12 Base
export const timeConvertFrom24To12 = (timingToBeStored) => {
  for (const [prayer, time] of Object.entries(timingToBeStored)) {
    let [hours, minutes] = time.split(":").map(Number);
    let period = "AM"; // Default period is AM

    if (hours === 0 || hours === 12) {
      period = "AM";
      hours = 12; // 12 AM in 12-hour format
    } else if (hours > 12) {
      period = "PM";
      hours %= 12; // Convert hour to 12-hour format
    } else {
      period = "AM"; // For hours between 1 AM and 11 AM
    }
    hours = (hours % 12 || 12).toString().padStart(2, "0"); // Adding leading zero if necessary
    minutes = minutes.toString().padStart(2, "0");
    timingToBeStored[prayer] = `${hours}:${minutes} ${period}`;
  }
  return timingToBeStored;
};
//#endregion

//#region adding offset timings to stored timings
export const updatePrayerTimings = (storedTimings, storedPrayerOffset) => {
  const updatedTimings = {}; // Initialize an object to store the updated timings
  for (const [prayer, time] of Object.entries(storedTimings)) {
    // Get the offset for the current prayer in minutes
    const offsetString = storedPrayerOffset[prayer];
    const offset = parseInt(offsetString, 10) || 0;

    // Split the time into hours and minutes
    const [hours, minutes] = time.split(":").map(Number);

    // Calculate the updated time
    let updatedHours = hours;
    let updatedMinutes = minutes + offset;

    // Adjust hours and minutes if minutes exceed 60 or are negative
    updatedHours += Math.floor(updatedMinutes / 60);
    updatedMinutes = (updatedMinutes + 1440) % 60; // Adding 1440 to handle negative values and ensuring positive minutes

    // Adjust hours if they exceed (24||12) or are negative
    updatedHours = (updatedHours + 24) % 24;

    // Format the updated time
    const updatedTime = `${String(updatedHours).padStart(2, "0")}:${String(
      updatedMinutes
    ).padStart(2, "0")}`;
    // Store the updated time for the current prayer
    updatedTimings[prayer] = updatedTime;
  }

  // Merge the original timings with the updated timings
  const mergedTimings = { ...storedTimings, ...updatedTimings };
  return mergedTimings;
};
//#endregion