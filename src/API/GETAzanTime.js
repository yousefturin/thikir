import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchPrayerTimes = async ( year, latitude, longitude) => {
    try {
        const apiUrlPrayTiming= `https://api.aladhan.com/v1/calendar/${year}?latitude=${latitude}&longitude=${longitude}&method=1`;
        const response = await fetch(apiUrlPrayTiming);

        if (response.ok) {
            const data = await response.json();
            // Save data to a JSON file
            await saveDataToJsonFile(data);
            console.log("Prayer times data saved to JSON file");
        } else {
            console.error("API call failed with status:", response.status);
        }
    } catch (error) {
        console.error("Error fetching prayer times:", error);
    }
};

const saveDataToJsonFile = async (data) => {
    try {
      await AsyncStorage.setItem('prayer_times', JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  }

export { fetchPrayerTimes };
