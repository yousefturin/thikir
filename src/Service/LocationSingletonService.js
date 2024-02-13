// locationSingleton.js
import * as Location from "expo-location";

const locationSingleton = {
    location: null,
    async getLocation() {
        console.log("=============================================")
        console.log("I am starting the Singleton case");
        if (!this.location) {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    console.log("Permission to access location was denied");
                    return null; // Return null if permission is not granted
                }
                const { coords } = await Location.getCurrentPositionAsync({});
                this.location = coords;
                console.log("I am starting the Singleton case but leaving");
            } catch (error) {
                console.error("Error getting location", error);
                return null; // Return null if there's an error
            }
        }
        return this.location;
    },
};

export default locationSingleton;
