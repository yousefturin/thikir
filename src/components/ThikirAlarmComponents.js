import React from "react";

class ThikirAlarmComponents extends React.Component {

    remembranceTitleAndBody = (selectedLanguage) => {
        const thikirSleepTranslationTitle =
            selectedLanguage != "Arabic" ? "Sleeping Remembrance" : "أذكار النوم";
        const thikirWakeupTranslationTitle =
            selectedLanguage != "Arabic"
                ? "Waking up Remembrance"
                : "أذكار الاستيقاظ من النوم";
        const thikirMorningTranslationTitle =
            selectedLanguage != "Arabic" ? "Morning Remembrance" : "أذكار الصباح";
        const thikirEveningTranslationTitle =
            selectedLanguage != "Arabic" ? "Evening Remembrance" : "أذكار المساء";

        const thikirSleepTranslationBody =
            selectedLanguage != "Arabic"
                ? "In Your name my Lord, I lie down and in Your name I rise, so if You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You do so with Your righteous servants."
                : "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِن أَمْسَكْتَ نَفْسِي فارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا، بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ";
        const thikirWakeupTranslationBody =
            selectedLanguage != "Arabic"
                ? "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection."
                : "الْحَمْدُ للَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا، وَإِلَيْهِ النُّشُورُ";
        const thikirMorningTranslationBody =
            selectedLanguage != "Arabic"
                ? "O Allah, by your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection."
                : "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا ، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ";
        const thikirEveningTranslationBody =
            selectedLanguage != "Arabic"
                ? "O Allah, what blessing I or any of Your creation have risen upon, is from You alone, without partner, so for You is all praise and unto You all thanks."
                : "اللَّهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير";
        return {
            thikirSleepTranslationTitle: thikirSleepTranslationTitle,
            thikirWakeupTranslationTitle: thikirWakeupTranslationTitle,
            thikirMorningTranslationTitle: thikirMorningTranslationTitle,
            thikirEveningTranslationTitle: thikirEveningTranslationTitle,
            thikirSleepTranslationBody: thikirSleepTranslationBody,
            thikirWakeupTranslationBody: thikirWakeupTranslationBody,
            thikirMorningTranslationBody: thikirMorningTranslationBody,
            thikirEveningTranslationBody: thikirEveningTranslationBody,
        };
    };
    
    azanTitleAndBody = (selectedLanguage) => {
        const azanFajrTitle =
            selectedLanguage !== "Arabic" ? "Azan Fajr" : "أذان الفجر";
        const azanDhuhrTitle =
            selectedLanguage !== "Arabic" ? "Azan Dhuhr" : "أذان الظهر";
        const azanAsrTitle =
            selectedLanguage !== "Arabic" ? "Azan Asr" : "أذان العصر";
        const azanMaghrebTitle =
            selectedLanguage !== "Arabic" ? "Azan Maghreb" : "أذان المغرب";
        const azanIshaTitle =
            selectedLanguage !== "Arabic" ? "Azan Isha" : "أذان العشاء";

        const azanFajrBodyText =
            selectedLanguage !== "Arabic"
                ? "Time for fajr Prayer"
                : "حان وقت صلاة الفجر";
        const azanDhuhrBodyText =
            selectedLanguage !== "Arabic"
                ? "Time for Dhuhr Prayer"
                : "حان وقت صلاة الظهر";
        const azanAsrBodyText =
            selectedLanguage !== "Arabic"
                ? "Time for Asr Prayer"
                : "حان وقت صلاة العصر";
        const azanMaghrebBodyText =
            selectedLanguage !== "Arabic"
                ? "Time for Maghreb Prayer"
                : "حان وقت صلاة المغرب";
        const azanIshaBodyText =
            selectedLanguage !== "Arabic"
                ? "Time for Isha Prayer"
                : "حان وقت صلاة العشاء";

        return {
            azanFajrTitle: azanFajrTitle,
            azanDhuhrTitle: azanDhuhrTitle,
            azanAsrTitle: azanAsrTitle,
            azanMaghrebTitle: azanMaghrebTitle,
            azanIshaTitle: azanIshaTitle,
            azanFajrBodyText: azanFajrBodyText,
            azanDhuhrBodyText: azanDhuhrBodyText,
            azanAsrBodyText: azanAsrBodyText,
            azanMaghrebBodyText: azanMaghrebBodyText,
            azanIshaBodyText: azanIshaBodyText,
        };
    };

    render() {
        return null;
    }
}

export default new ThikirAlarmComponents();
