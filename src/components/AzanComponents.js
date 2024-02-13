import React from "react";
import { Text } from "react-native";

import { AzanScreenStyle } from "../Styles/commonStyles";
import { useNumberContext } from "../context/NumberContext";

class AzanComponents extends React.Component {
  
  NextPrayerInfoEnglish = ({ nextPrayer, timeLeft }) => {
    const { state, convertToEasternArabicNumerals } = useNumberContext();
    return (
      <Text style={AzanScreenStyle.nextPrayerText}>
        Next prayer:{" "}
        <Text style={[{ fontFamily: "MontserratBold" }]}>{nextPrayer}</Text> in{" "}
        {timeLeft.hours !== 0 && (
          <>
            <Text style={[{ fontFamily: "MontserratBold" }]}>
              {state.isArabicNumbers
                ? convertToEasternArabicNumerals(timeLeft.hours.toString())
                : timeLeft.hours.toString()}
            </Text>
            <Text> hours</Text>
            <Text>, </Text>
          </>
        )}
        {timeLeft.minutes !== 0 && (
          <>
            <Text style={[{ fontFamily: "MontserratBold" }]}>
              {state.isArabicNumbers
                ? convertToEasternArabicNumerals(timeLeft.minutes.toString())
                : timeLeft.minutes.toString()}
            </Text>
            <Text> minutes</Text>
          </>
        )}
      </Text>
    );
  };

  NextPrayerInfoArabic = ({ nextPrayer, timeLeft, selectedLanguage }) => {
    const { state, convertToEasternArabicNumerals } = useNumberContext();
    return (
      <Text style={AzanScreenStyle.nextPrayerText}>
        أذان{" "}
        <Text style={[{ fontFamily: "MontserratBold" }]}>
          {selectedLanguage !== "Arabic"
            ? { nextPrayer } // Display English prayer name
            : this.mapPrayerNameToArabic(nextPrayer)}
        </Text>{" "}
        بعد{" "}
        {timeLeft.hours !== 0 && (
          <>
            <Text style={[{ fontFamily: "MontserratBold" }]}>
              {state.isArabicNumbers
                ? convertToEasternArabicNumerals(timeLeft.hours.toString())
                : timeLeft.hours.toString()}
            </Text>
            {timeLeft.hours === 1 ? (
              <Text> ساعة </Text>
            ) : timeLeft.hours === 2 ? (
              <Text> ساعتان </Text>
            ) : (
              <Text> ساعات </Text>
            )}
          </>
        )}
        {timeLeft.minutes !== 0 && (
          <>
            <Text>,</Text>
            <Text style={[{ fontFamily: "MontserratBold" }]}>
              {state.isArabicNumbers
                ? convertToEasternArabicNumerals(timeLeft.minutes.toString())
                : timeLeft.minutes.toString()}
            </Text>
            <Text> دقيقة</Text>
          </>
        )}
      </Text>
    );
  };

  DateInfoArabic = ({ monthText, day, year }) => {
    const { state, convertToEasternArabicNumerals } = useNumberContext();
    return (
      <Text style={AzanScreenStyle.date}>
        {state.isArabicNumbers
          ? convertToEasternArabicNumerals(day.toString())
          : day.toString()}{" "}
        {monthText}،{" "}
        {state.isArabicNumbers
          ? convertToEasternArabicNumerals(year.toString())
          : year.toString()}
      </Text>
    );
  };

  DateInfoEnglish = ({ monthText, day, year }) => {
    const { state, convertToEasternArabicNumerals } = useNumberContext();
    return (
      <Text style={AzanScreenStyle.date}>
        {" "}
        {monthText}{" "}
        {state.isArabicNumbers
          ? convertToEasternArabicNumerals(day.toString())
          : day.toString()}
        ,{" "}
        {state.isArabicNumbers
          ? convertToEasternArabicNumerals(year.toString())
          : year.toString()}
      </Text>
    );
  };

  DateHijriInfoArabic = ({ dayHijri, monthHijri, yearTextHijri }) => {
    const { state, convertToEasternArabicNumerals } = useNumberContext();
    return (
      <Text style={AzanScreenStyle.date}>
        {state.isArabicNumbers
            ? convertToEasternArabicNumerals(dayHijri.toString())
            : dayHijri.toString()}{" "}

          {monthHijri}{" "}
        {state.isArabicNumbers
            ? convertToEasternArabicNumerals(yearTextHijri.toString())
            : yearTextHijri.toString()}
    </Text>
    );
  };

  DateHijriInfoEnglish = ({ dayHijri, monthHijri, yearTextHijri }) => {
    const { state, convertToEasternArabicNumerals } = useNumberContext();
    return (
      <Text style={AzanScreenStyle.date}>
        {state.isArabicNumbers
            ? convertToEasternArabicNumerals(dayHijri.toString())
            : dayHijri.toString()}{" "}

          {monthHijri}{" "}
        {state.isArabicNumbers
            ? convertToEasternArabicNumerals(yearTextHijri.toString())
            : yearTextHijri.toString()}
    </Text>
    );
  };

  mapPrayerNameToArabic = (englishPrayerName) => {
    const englishToArabicMap = {
      Asr: "العصر",
      Dhuhr: "الظهر",
      Fajr: "الفجر",
      Isha: "العشاء",
      Maghrib: "المغرب",
      Sunrise: "الشروق",
    };
    return englishToArabicMap[englishPrayerName] || englishPrayerName;
  };

  render() {
    return null; // Or any other render logic if needed
  }
}

export default new AzanComponents();
