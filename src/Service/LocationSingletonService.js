import * as Location from "expo-location";

const locationSingleton = {
    location: null,
    async getLocation() {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return { locationSuccess: false, error: "Permission denied" };
            }
            const { coords } = await Location.getCurrentPositionAsync({});
            // Compare with cached location
            if (this.location && this.location.latitude === coords.latitude && this.location.longitude === coords.longitude) {
                return { locationSuccess: true, location: this.location };
            } else {
                this.location = coords;
                return { locationSuccess: true, location: this.location };
            }
        } catch (error) {
            console.error("Error getting location", error);
            return { locationSuccess: false, error };
        }
    },
};

export default locationSingleton;