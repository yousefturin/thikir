import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Animated,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import locationSingleton from "../Service/LocationSingletonService";
import OffsetSingleton from "../Service/OffsetDataSingletonService";
import AzanService from "../Service/AzanService";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { AzanScreenStyle } from "../Styles/commonStyles";
import { useNumberContext } from "../context/NumberContext";
import { getColorForTheme } from "../utils/themeUtils";
import  AzanComponents  from "../components/AzanComponents";

const AzanScreen = () => {
  const { selectedTheme } = useTheme();
  // const { selectedColor } = useColor();
  const { selectedLanguage } = useLanguage();
  const systemTheme = selectedTheme === "system";
  const { state, convertToEasternArabicNumerals } = useNumberContext(); 

  const NumberPickerTheme = getColorForTheme(
    { dark: "#fff", light: "#000" },
    selectedTheme,
    systemTheme
  );
  const horizontalLineTheme = getColorForTheme(
    { dark: "#262626", light: "#f2f2f6" },
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
      backgroundColor: "#f2f2f6",
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
      backgroundColor: "#262626",
      shadowColor: "black",
    },
    time: {
      color: "#f2f2f6",
    },
    nextPrayerText: {
      color: "#666",
    },
    dateContainerWrapper: {
      backgroundColor: "#262626",
      shadowColor: "black",
    },
    date: {
      color: "#666",
    },
    prayerContainer: {
      backgroundColor: "#262626",
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
      backgroundColor: "#151515",
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

  //#region ArabicLanguage
  // const ArabicLanguage = StyleSheet.create({
  //   button: {
  //     flexDirection: "row",
  //     fontFamily: "ScheherazadeNew",
  //   },
  //   buttonText: {
  //     textAlign: "right",
  //     marginLeft: 30,
  //     fontFamily: "ScheherazadeNew",
  //   },
  //   icon: {
  //     transform: [{ rotate: 0  + "deg" }],
  //     marginLeft: 20,
  //   },
  //   horizontalLine: {
  //     marginLeft: width > 600 ? 610 : 350,
  //   },
  //   emptyMessageText:{
  //     fontFamily: "ScheherazadeNew",
  //   }
  // });
  //#endregion

  //#region EnglishLanguage
  // const EnglishLanguage = StyleSheet.create({
  //   button: {
  //     flexDirection:"row-reverse",
  //   },
  //   buttonText: {
  //     textAlign: "left",
  //     marginRight: 30,
  //     fontFamily: "Montserrat",
  //   },
  //   icon: {
  //     transform: [{ rotate: 180  + "deg" }],
  //     marginRight: 20,
  //   },
  //   horizontalLine: {
  //     marginRight: width > 600 ? 610 : 350,
  //   },
  //   emptyMessageText:{
  //     fontFamily: "Montserrat",
  //   }
  // });
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
        if (storedPrayerTimes && storedPrayerOffset) {
          setStoredTimings(
            updatePrayerTimings(
              removeUnwantedTimes(JSON.parse(storedPrayerTimes)),
              JSON.parse(storedPrayerOffset)
            )
          );
        } else {
          setStoredTimings(removeUnwantedTimes(JSON.parse(storedPrayerTimes)));
        }

        const currentDate = new Date();
        const dateInfo = getDateInfo(currentDate);
        const { currentDay, currentMonthText, currentMonth, currentYear } =
          dateInfo;
        setDay(currentDay);
        setMonthText(currentMonthText);
        setMonth(currentMonth);
        setYear(currentYear);

        const hijriDateInfo = getHijriDateInfo(currentDate);
        const { hijriDay, hijriMonth, hijriYear } = hijriDateInfo;
        setHijriDay(hijriDay);
        setHijriMonth(hijriMonth);
        setHijriYear(hijriYear);

        // Fetch current Offset data
        await OffsetSingleton.getOffsetStatus();

        // Fetch current location
        const location = await locationSingleton.getLocation();
        if (location) {
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
            setStoredTimings(
              updatePrayerTimings(
                cleanedPrayerTimes,
                JSON.parse(storedPrayerOffset)
              )
            );
          } else {
            setStoredTimings(cleanedPrayerTimes);
          }
          // Store updated prayer times
          await AsyncStorage.setItem(
            "prayer_times_of_day",
            JSON.stringify(cleanedPrayerTimes)
          );
        } else {
          console.log("Location permission not granted");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  //#endregion

  //#region Calculate Time Left and next Prayer
  useEffect(() => {
    if (storedTimings) {
      let nextPrayer = null;
      let nextPrayerTime = null;
      let minTimeDiff = Infinity;
      for (const [prayer, time] of Object.entries(storedTimings)) {
        const [hours, minutes] = time.split(":").map(Number);
        const prayerTime = new Date(currentTime);
        prayerTime.setHours(hours, minutes, 0, 0);
        let  timeDiff = prayerTime - currentTime;
       
        if (timeDiff < 0) {
          timeDiff += 24 * 60 * 60 * 1000; // Add time for a full day
        } 

        if (timeDiff > 0 && timeDiff < minTimeDiff) {
          nextPrayer = prayer;
          minTimeDiff = timeDiff;
          nextPrayerTime = time;
        }
      }
      // console.log(nextPrayer,formatTime(minTimeDiff),nextPrayerTime)
      setNextPrayer(nextPrayer);
      setNextPrayerTime(nextPrayerTime);
      setTimeLeft(formatTime(minTimeDiff));
    }
  }, [storedTimings,currentTime]);
  //#endregion

  //#region adding offset timings to stored timings
  const updatePrayerTimings = (storedTimings, storedPrayerOffset) => {
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

      // Adjust hours if they exceed 24 or are negative
      updatedHours = (updatedHours + 24) % 24; // Adding 24 to handle negative values and ensuring positive hours

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

  //#region changing minutes change state
  const [storedTimingsUpdated, setStoredTimingsUpdated] = useState(false);

  //#region update stored timings and trigger re-render
  const updateStoredTimings = (storedPrayerTimes, existingData) => {
    // Fetch stored prayer times
    console.log("offset data :", existingData);
    const updatedTimings = updatePrayerTimings(
      removeUnwantedTimes(JSON.parse(storedPrayerTimes)),
      JSON.parse(existingData)
    );
    console.log("Updated Timings:", updatedTimings); // Log the updated timings

    // Update stored timings state
    setStoredTimings(updatedTimings);
    setStoredTimingsUpdated(true);
    console.log("Stored Timings Updated:", updatedTimings);
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
          console.log(
            `${newData}. Existing data exists, updated the prayer data.`
          );
        } else {
          // If prayer doesn't exist, add it to the existing data
          parsedData[prayer] = selectedTime;
          newData = JSON.stringify(parsedData);
          console.log(
            `${newData}. Existing data exists, added the prayer data.`
          );
        }
      } else {
        // If no existing data, set newData to the new data only
        newData = JSON.stringify(dataToStore);
        console.log(
          `${newData}. No existing data, set newData to the new data only.`
        );
      }

      // Save the updated data to AsyncStorage
      await AsyncStorage.setItem("offset_time_prayer", newData);
      console.log("Data saved to AsyncStorage successfully.");

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
        dark:  ["hsl(0, 0%, 29.8%)", "hsl(0, 0%, 17.8%)"],
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
            <AzanComponents.NextPrayerInfoArabic nextPrayer={nextPrayer} timeLeft={timeLeft} selectedLanguage={selectedLanguage}/>
          )}

          <Text style={styles.time}>
          {state.isArabicNumbers
                                ? convertToEasternArabicNumerals(nextPrayerTime)
                                : nextPrayerTime}</Text>
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
                <AzanComponents.DateInfoEnglish monthText={monthText} day={day} year={year} />
              ) : (
                <AzanComponents.DateInfoArabic monthText={monthText} day={day} year={year} />
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
                <AzanComponents.DateHijriInfoEnglish dayHijri={dayHijri} monthHijri={monthHijri} yearTextHijri={yearTextHijri} />
              ) : (
                <AzanComponents.DateHijriInfoArabic dayHijri={dayHijri} monthHijri={monthHijri} yearTextHijri={yearTextHijri} />
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
                    onPress={() => {
                      setActivePicker(prayer);
                    }}
                  >
                    {/* Background */}
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
                      >
                        <View style={styles.pikerContainerWrapper}>
                          <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={handleCloseModal}
                          />
                          <View style={styles.pikerContainer}>
                          <Text style={[{color:"#666",fontFamily:"Montserrat",margin:5,paddingTop:10,paddingLeft:10}]}>{prayer} Precaution</Text>
                            <Picker
                              selectedValue={selectedMinutes[prayer]}
                              onValueChange={(minutes) =>
                                handleMinutesChange(prayer, minutes)
                              }
                              mode="dropdown"
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
                            <Button title="Cancel" onPress={handleCloseModal} />
                          </View>
                        </View>
                      </Modal>
                    </Modal>

                    {/* Prayer Item */}
                    <View
                      style={[
                        styles.prayerItem,
                        prayer === nextPrayer ? styles.prayerDecorator : null,
                        selectedLanguage !== "Arabic"
                        ?{flexDirection:"row"}:{flexDirection:"row-reverse"}
                      ]}
                    >
                      <Text
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

