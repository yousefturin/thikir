import React from "react";
import { Text } from "react-native";

import { AzanScreenStyle } from "../Styles/commonStyles";
import { useNumberContext } from "../context/NumberContext";

class AzanComponents extends React.Component {
  
  NextPrayerInfoEnglish = ({ nextPrayer, timeLeft }) => {
    const { state, convertToEasternArabicNumerals } = useNumberContext();
    return (
      <Text allowFontScaling={false} style={AzanScreenStyle.nextPrayerText}>
        <Text allowFontScaling={false} style={[{ fontFamily: "MontserratBold",fontSize:20 }]}>{nextPrayer}</Text> in{" "}
        {timeLeft.hours !== 0 && (
          <>
            <Text allowFontScaling={false}  style={[{ fontFamily: "MontserratBold",fontSize:20 }]}>
              {state.isArabicNumbers
                ? convertToEasternArabicNumerals(timeLeft.hours.toString())
                : timeLeft.hours.toString()}
            </Text>
            <Text allowFontScaling={false}  style={[{ fontSize:20 }]}> hours</Text>
            <Text allowFontScaling={false} style={[{ fontSize:20 }]}>, </Text>
          </>
        )}
        {timeLeft.minutes !== 0 && (
          <>
            <Text  allowFontScaling={false} style={[{ fontFamily: "MontserratBold",fontSize:20  }]}>
              {state.isArabicNumbers
                ? convertToEasternArabicNumerals(timeLeft.minutes.toString())
                : timeLeft.minutes.toString()}
            </Text>
            <Text allowFontScaling={false} style={[{ fontSize:20 }]} > minutes</Text>
          </>
        )}
      </Text>
    );
  };

  NextPrayerInfoArabic = ({ nextPrayer, timeLeft, selectedLanguage }) => {
    const { state, convertToEasternArabicNumerals } = useNumberContext();
    return (
      <Text allowFontScaling={false}  style={AzanScreenStyle.nextPrayerText}>
        أذان{" "}
        <Text  allowFontScaling={false} style={[{ fontFamily: "MontserratBold",fontSize:20  }]}>
          {selectedLanguage !== "Arabic"
            ? { nextPrayer } // Display English prayer name
            : this.mapPrayerNameToArabic(nextPrayer)}
        </Text>{" "}
        بعد{" "}
        {timeLeft.hours !== 0 && (
          <>
            <Text allowFontScaling={false}   style={[{ fontFamily: "MontserratBold",fontSize:20  }]}>
              {state.isArabicNumbers
                ? convertToEasternArabicNumerals(timeLeft.hours.toString())
                : timeLeft.hours.toString()}
            </Text>
            {timeLeft.hours === 1 ? (
              <Text allowFontScaling={false} style={[{ fontSize:20 }]} > ساعة </Text>
            ) : timeLeft.hours === 2 ? (
              <Text allowFontScaling={false} style={[{ fontSize:20 }]} > ساعتان </Text>
            ) : (
              <Text allowFontScaling={false} style={[{ fontSize:20 }]} > ساعات </Text>
            )}
          </>
        )}
        {timeLeft.minutes !== 0 && (
          <>
            <Text allowFontScaling={false} style={[{ fontSize:20 }]} >,</Text>
            <Text allowFontScaling={false}  style={[{ fontFamily: "MontserratBold",fontSize:20 }]}>
              {state.isArabicNumbers
                ? convertToEasternArabicNumerals(timeLeft.minutes.toString())
                : timeLeft.minutes.toString()}
            </Text>
            <Text allowFontScaling={false}  style={[{ fontSize:20 }]}> دقيقة</Text>
          </>
        )}
      </Text>
    );
  };

  DateInfoArabic = ({ monthText, day, year }) => {
    const { state, convertToEasternArabicNumerals } = useNumberContext();
    return (
      <Text  allowFontScaling={false} style={AzanScreenStyle.date}>
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
      <Text  allowFontScaling={false} style={AzanScreenStyle.date}>
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
      <Text  allowFontScaling={false} style={AzanScreenStyle.date}>
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
      <Text  allowFontScaling={false} style={AzanScreenStyle.date}>
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
    return null;
  }
}

export default new AzanComponents();
