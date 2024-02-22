
import AsyncStorage from "@react-native-async-storage/async-storage";

const OffsetSingleton = {
    async getOffsetStatus() {

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
                return { offsetSuccess: true };
            } else {
                return { offsetSuccess: true, offsetData: JSON.parse(status) };
            }
        } catch (error) {
            console.error("Error getting location", error);
            return { offsetSuccess: false, error };
        }
    },
};

export default OffsetSingleton;