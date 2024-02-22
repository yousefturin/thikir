// AzanService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPrayerTimes } from '../API/GETAzanTime';
const AzanService = {
    async checkAndFetchPrayerTimes(latitude, longitude, currentDay, currentMonth, currentYear) {
        // console.log("=============================================")
        // console.log("The Received day :", currentDay)
        // console.log("The Received month :", currentMonth)
        // console.log("The Received year :", currentYear)
        // console.log("The Received Location array data:", latitude, longitude)

        try {
            // Check if location and date need to be saved
            // console.log("Check if location and date need to be saved")
            const storedLocation = await AsyncStorage.getItem("storedLocation");
            try {
                if (!storedLocation) {
                    // console.log("No stored location was found, new one is saved")
                    await this.saveLocation(latitude, longitude);
                } else {
                    const { latitude: storedLatitude, longitude: storedLongitude } = JSON.parse(storedLocation);
                    // console.log("The stored longitude:", storedLongitude)
                    // console.log("The stored latitude:", storedLatitude)
                }

                const storedDate = await AsyncStorage.getItem("storedDate");

                try {
                    if (!storedDate) {
                        // console.log("No stored date was found, new one is saved")
                        await this.saveDate(currentDay, currentMonth, currentYear);
                    } else {
                        const { day: storedDay, month: storedMonth, year: storedYear } = JSON.parse(storedDate);

                        // console.log("The stored day:", storedDay)
                        // console.log("The stored month:", storedMonth)
                        // console.log("The stored year:", storedYear)
                    }

                    // Check if API call needs to be made
                    // console.log("Check if API call needs to be made")
                    const storedPrayingCalender = await AsyncStorage.getItem("prayer_times");
                    try {
                        if (!storedPrayingCalender) {
                            // console.log("Yes no stored calender is found")
                            await this.fetchAndSetPrayerTimes(currentYear, latitude, longitude);
                            return await this.filterAndSetStoredTimings(currentMonth, currentYear, currentDay);
                        } else {
                            // console.log("calender is found")
                            // console.log("Check if paras are same or api needs to be called")
                            // console.log("=============================================")
                            const { latitude: storedLatitude, longitude: storedLongitude } = JSON.parse(storedLocation);
                            const { day: storedDay, month: storedMonth, year: storedYear } = JSON.parse(storedDate);

                            // console.log("The stored day:", storedDay)
                            // console.log("The stored month:", storedMonth)
                            // console.log("The stored year:", storedYear)

                            const roundedLatitude = parseFloat(latitude.toFixed(2));
                            const roundedLongitude = parseFloat(longitude.toFixed(2));
                            const roundedStoredLatitude = parseFloat(storedLatitude.toFixed(2));
                            const roundedStoredLongitude = parseFloat(storedLongitude.toFixed(2));

                            // console.log("The stored latitude:", roundedStoredLatitude)
                            // console.log("The stored longitude:", roundedStoredLongitude)
                            // console.log("The obtained latitude:", roundedLatitude)
                            // console.log("The obtained longitude:", roundedLongitude)
                            // console.log("=============================================")
                            if (
                                roundedLatitude !== roundedStoredLatitude ||
                                roundedLongitude !== roundedStoredLongitude ||
                                currentYear !== storedYear
                            ) {
                                // console.log("values are not the same API call needs to be done")
                                await this.saveLocation(latitude, longitude);
                                await this.fetchAndSetPrayerTimes(currentYear, latitude, longitude);
                                return await this.filterAndSetStoredTimings(currentMonth, currentYear, currentDay);
                            } else {
                                // console.log("values are the same API call is not needed")
                                return await this.filterAndSetStoredTimings(currentMonth, currentYear, currentDay);
                            }
                        }

                    } catch (error) {
                        console.error("Error reading storedDate:", error);
                    }

                } catch (error) {
                    console.error("Error reading storedDate:", error);
                }

            } catch (error) {
                console.error("Error reading storedLocation:", error);
            }
        } catch (error) {
            console.error("Error checking and fetching prayer times", error);
            return null; // Return null in case of error
        }
    },

    async saveLocation(latitude, longitude) {
        // Implementation of saveLocation
        // console.log("=============================================")
        // console.log("Location is being saved...")
        // console.log("=============================================")
        try {
            // console.log(latitude, longitude)
            await AsyncStorage.setItem(
                "storedLocation",
                JSON.stringify({ latitude, longitude })
            );
            // console.log("=============================================")
            // console.log("Location is saved...")
            // console.log("=============================================")
        } catch (error) {
            console.error("Error saving location", error);
        }
    },

    async saveDate(currentDay, currentMonth, currentYear) {
        // Implementation of saveDate
        // console.log("=============================================")
        // console.log("Date is being saved...")
        // console.log("=============================================")
        try {
            // console.log(currentDay, currentMonth, currentYear)
            await AsyncStorage.setItem(
                "storedDate",
                JSON.stringify({
                    day: currentDay,
                    month: currentMonth,
                    year: currentYear,
                })
            );
            // console.log("=============================================")
            // console.log("Date is saved...")
            // console.log("=============================================")
        } catch (error) {
            console.error("Error saving date", error);
        }
    },

    async fetchAndSetPrayerTimes(yearToBeFetched, latitudeToBeFetched, longitudeToBeFetched) {
        // Implementation of fetchAndSetPrayerTimes
        // console.log("=============================================")
        // console.log("Fetch API was called")
        // console.log("=============================================")
        // console.log("The year to be fetched:", yearToBeFetched)
        // console.log("The latitude to be fetched:", latitudeToBeFetched)
        // console.log("The longitude to be fetched:", longitudeToBeFetched)
        try {
            // console.log(yearToBeFetched, latitudeToBeFetched, longitudeToBeFetched)
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
                // console.log("The filtered day :", currentDay)
                // console.log("The filtered month:", storedMonth)
                // console.log("The filtered year:", storedYear);
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
                    // console.log("Stored timings set successfully:");
                    return newPrayerTimes
                } else {
                    // console.log("No prayer times found for stored date");
                }
            } else {
                // console.log("Error: Data is not in the expected format");
            }
        } catch (error) {
            console.error("Error filtering and setting stored timings", error);
        }
    }


};

export default AzanService;
