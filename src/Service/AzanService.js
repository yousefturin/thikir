// AzanService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPrayerTimes } from '../API/GETAzanTime';
const AzanService = {
    async checkAndFetchPrayerTimes(latitude, longitude, currentDay, currentMonth, currentYear) {
        try {
            // Check if location and date need to be saved
            let storedLocation = await AsyncStorage.getItem("storedLocationAzan");
            try {
                if (!storedLocation) {
                    storedLocation = await this.saveLocation(latitude, longitude);
                } 

                let storedDate = await AsyncStorage.getItem("storedDate");
                try {
                    if (!storedDate) {

                        storedDate = await this.saveDate(currentDay, currentMonth, currentYear);
                    }

                    // Check if API call needs to be made
                    const storedPrayingCalender = await AsyncStorage.getItem("prayer_times");
                    try {
                        if (!storedPrayingCalender) {

                            await this.fetchAndSetPrayerTimes(currentYear, latitude, longitude);
                            return await this.filterAndSetStoredTimings(currentMonth, currentYear, currentDay);
                        } else {

                            const { latitude: storedLatitude, longitude: storedLongitude } = JSON.parse(storedLocation);
                            const { day: storedDay, month: storedMonth, year: storedYear } = JSON.parse(storedDate);

                            const roundedLatitude = parseFloat(latitude.toFixed(2));
                            const roundedLongitude = parseFloat(longitude.toFixed(2));
                            const roundedStoredLatitude = parseFloat(storedLatitude.toFixed(2));
                            const roundedStoredLongitude = parseFloat(storedLongitude.toFixed(2));

                            if (
                                roundedLatitude !== roundedStoredLatitude ||
                                roundedLongitude !== roundedStoredLongitude ||
                                currentYear !== storedYear
                            ) {

                                await this.saveLocation(latitude, longitude);
                                await this.fetchAndSetPrayerTimes(currentYear, latitude, longitude);
                                return await this.filterAndSetStoredTimings(currentMonth, currentYear, currentDay);
                            } else {

                                return await this.filterAndSetStoredTimings(currentMonth, currentYear, currentDay);
                            }
                        }

                    } catch (error) {
                        console.error("Error reading storedPrayingCalender:", error);
                    }

                } catch (error) {
                    console.error("Error reading storedDate:", error);
                }

            } catch (error) {
                console.error("Error reading storedLocation:", error);
            }
        } catch (error) {
            console.error("Error checking and fetching prayer times", error);
            return null; 
        }
    },

    async saveLocation(latitude, longitude) {
        try {
            return await AsyncStorage.setItem(
                "storedLocationAzan",
                JSON.stringify({ latitude, longitude })
            );
        } catch (error) {
            console.error("Error saving location", error);
        }
    },

    async saveDate(currentDay, currentMonth, currentYear) {
        try {
            return await AsyncStorage.setItem(
                "storedDate",
                JSON.stringify({
                    day: currentDay,
                    month: currentMonth,
                    year: currentYear,
                })
            );
        } catch (error) {
            console.error("Error saving date", error);
        }
    },

    async fetchAndSetPrayerTimes(yearToBeFetched, latitudeToBeFetched, longitudeToBeFetched) {
        // Implementation of fetchAndSetPrayerTimes
        try {
            await fetchPrayerTimes(yearToBeFetched, latitudeToBeFetched, longitudeToBeFetched);
        } catch (error) {
            console.error("Error fetching and setting prayer times", error);
        }
    },

    async filterAndSetStoredTimings(storedMonth, storedYear, currentDay) {
        try {
            // Retrieve and parse data from AsyncStorage
            const jsonData = await AsyncStorage.getItem('prayer_times');
            const parsedData = JSON.parse(jsonData);

            // Check if parsedData is an object and contains the expected structure
            if (parsedData && parsedData.data && typeof parsedData.data === "object") {
                const data = Object.values(parsedData.data).flat();
                // Filter data based on stored date
                const paddedStoredDay = String(currentDay).padStart(2, '0');
                const paddedStoredMonth = String(storedMonth).padStart(2, '0');
                const formattedDate = `${paddedStoredDay}-${paddedStoredMonth}-${storedYear}`;
                const prayerTimes = data.filter(entry => {
                    const entryDate = entry.date.gregorian.date;
                    return entryDate === formattedDate;
                });
                if (prayerTimes.length > 0) {
                    const newPrayerTimes = prayerTimes[0].timings;
                    // console.log("The data for today is:", newPrayerTimes)
                    await AsyncStorage.setItem('prayer_times_of_day', JSON.stringify(newPrayerTimes));
                    return newPrayerTimes
                } else {
                    console.log("No prayer times found for stored date");
                }
            } else {
                console.log("Error: Data is not in the expected format");
            }
        } catch (error) {
            console.error("Error filtering and setting stored timings", error);
        }
    }


};

export default AzanService;
