
import AsyncStorage from "@react-native-async-storage/async-storage";

const OffsetSingleton = {
    async getOffsetStatus() {
        console.log("=============================================")
        console.log("I am starting the Singleton case for offsetData");
        const offsetData = {
            "Fajr":"0",
            "Sunrise":"0",
            "Dhuhr":"0",
            "Asr":"0",
            "Maghrib":"0",
            "Isha":"0"
        };
        try {
            const status = await AsyncStorage.getItem("offset_time_prayer");
            if (!status) {
                // Set initial offset data if not found in AsyncStorage
                await AsyncStorage.setItem("offset_time_prayer", JSON.stringify(offsetData));
                console.log("Offset data initialized in AsyncStorage");
                return;
            } else {
                // Return the offset data if found in AsyncStorage
                console.log("Offset data found in AsyncStorage");
                return JSON.parse(status);
            }
        } catch (error) {
            console.error("Error getting location", error);
            return null; // Return null if there's an error
        }
    },
};

export default OffsetSingleton;