// locationSingleton.js
import * as Location from "expo-location";

const locationSingleton = {
    location: null,
    async getLocation() {
        // console.log("=============================================")
        // console.log("I am starting the Singleton case for Location");
        
        if (!this.location) {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    return { locationSuccess: false, error: "Permission denied" };
                }
                const { coords } = await Location.getCurrentPositionAsync({});
                this.location = coords;
                return { locationSuccess: true, location: this.location };
            } catch (error) {
                console.error("Error getting location", error);
                return { locationSuccess: false, error };
            }
        }
        return { locationSuccess: true, location: this.location };
    },
};

export default locationSingleton;
