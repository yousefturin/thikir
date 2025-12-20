import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from '../utils/zustandAsyncStorage';
import type {
    PrayerCalendarResponse,
    PrayerTime,
    CacheMetadata,
    UserPrayerOffsets,
    PrayerDayData,
    PrayerName,
} from '../types/azanTypes';

interface AzanStore {
    // Cached data
    yearlyData: PrayerCalendarResponse | null;
    cacheMetadata: CacheMetadata | null;
    todaysPrayerTimes: PrayerTime[] | null;
    dataVersion: number; // Incremented when offsets change to force refreshes

    // Loading states
    isLoading: boolean;
    error: string | null;

    // User customizations (for future feature)
    userOffsets: UserPrayerOffsets;

    // Actions
    fetchYearlyPrayerTimes: (latitude: number, longitude: number, year: number) => Promise<void>;
    getTodaysPrayerTimes: (date: Date, latitude: number, longitude: number, prayerSet?: PrayerName[]) => Promise<PrayerTime[]>;
    shouldRefetchData: (latitude: number, longitude: number, year: number) => boolean;
    applyUserOffsets: (times: PrayerTime[]) => PrayerTime[];
    setUserOffset: (prayer: string, offset: number) => void;
    clearCache: () => void;
}

const CACHE_DURATION = 1000 * 60 * 60 * 24 * 30; // 30 days
const LOCATION_PRECISION = 2; // decimal places for location comparison

const roundLocation = (coord: number): number =>
    parseFloat(coord.toFixed(LOCATION_PRECISION));

const formatTime = (timeString: string): string => {
    // Remove timezone suffix if present (e.g., "05:30 (+03)" -> "05:30")
    return timeString.split(' ')[0];
};

export const useAzanStore = create<AzanStore>()(
    persist(
        (set, get) => ({
            // Initial state
            yearlyData: null,
            cacheMetadata: null,
            todaysPrayerTimes: null,
            dataVersion: 0,
            isLoading: false,
            error: null,
            userOffsets: {
                IMSAK: 0,
                FAJR: 0,
                SUNRISE: 0,
                DHUHR: 0,
                ASR: 0,
                SUNSET: 0,
                MAGHRIB: 0,
                ISHA: 0,
                FIRSTTHIRD: 0,
                MIDNIGHT: 0,
                LASTTHIRD: 0,
            },

            // Check if we need to refetch data
            shouldRefetchData: (latitude: number, longitude: number, year: number) => {
                const { cacheMetadata, yearlyData } = get();

                // Always refetch if no valid data exists
                if (!yearlyData || !yearlyData.data || typeof yearlyData.data !== 'object' || Object.keys(yearlyData.data).length === 0) {
                    return true;
                }

                if (!cacheMetadata) {
                    return true;
                }

                // Check if cache is expired
                const now = Date.now();
                if (now - cacheMetadata.lastFetched > CACHE_DURATION) {
                    return true;
                }

                // Check if location changed significantly
                const roundedLat = roundLocation(latitude);
                const roundedLng = roundLocation(longitude);
                const cachedLat = roundLocation(cacheMetadata.location.latitude);
                const cachedLng = roundLocation(cacheMetadata.location.longitude);

                if (roundedLat !== cachedLat || roundedLng !== cachedLng) {
                    return true;
                }

                // Check if year changed
                if (year !== cacheMetadata.year) {
                    return true;
                }
                return false;
            },

            // Fetch yearly prayer times from API
            fetchYearlyPrayerTimes: async (latitude: number, longitude: number, year: number) => {
                const { shouldRefetchData } = get();

                if (!shouldRefetchData(latitude, longitude, year)) {
                    return;
                }

                set({ isLoading: true, error: null });

                try {
                    const apiUrl = `https://api.aladhan.com/v1/calendar/${year}?latitude=${latitude}&longitude=${longitude}&method=3`;
                    // eslint-disable-next-line no-undef
                    const response = await fetch(apiUrl);

                    if (!response.ok) {
                        throw new Error(`API call failed with status: ${response.status}`);
                    }

                    const data: PrayerCalendarResponse = await response.json();

                    const newCacheMetadata: CacheMetadata = {
                        location: { latitude, longitude },
                        year,
                        lastFetched: Date.now(),
                    };

                    set({
                        yearlyData: data,
                        cacheMetadata: newCacheMetadata,
                        isLoading: false,
                        error: null
                    });

                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                    set({
                        isLoading: false,
                        error: errorMessage
                    });
                    console.error('Error fetching prayer times:', error);
                    throw error;
                }
            },

            // Get today's prayer times (with automatic fetching if needed)
            getTodaysPrayerTimes: async (date: Date, latitude: number, longitude: number, prayerSet?: PrayerName[]) => {
                const { fetchYearlyPrayerTimes, applyUserOffsets } = get();
                const year = date.getFullYear();


                // Ensure we have data
                await fetchYearlyPrayerTimes(latitude, longitude, year);

                const updatedState = get();

                if (!updatedState.yearlyData) {
                    throw new Error('Failed to fetch prayer times data');
                }

                // Find today's data in the yearly calendar
                const day = date.getDate();
                const month = date.getMonth() + 1; // JS months are 0-based

                const paddedDay = String(day).padStart(2, '0');
                const paddedMonth = String(month).padStart(2, '0');
                const formattedDate = `${paddedDay}-${paddedMonth}-${year}`;


                // Flatten all months data to find the specific day - FIXED: API returns object, not array
                const allDaysData = Object.values(updatedState.yearlyData.data).flat() as PrayerDayData[];

                const todayData = allDaysData.find((dayData: PrayerDayData) =>
                    dayData.date.gregorian.date === formattedDate
                );


                if (!todayData) {
                    console.error('No prayer times found for date:', formattedDate);
                    throw new Error(`No prayer times found for date: ${formattedDate}`);
                }

                // Create all available prayer times with SVG mappings
                const allAvailablePrayerTimes: PrayerTime[] = [
                    { value: "IMSAK", title: "azanNames.IMSAK", time: formatTime(todayData.timings.Imsak), svgKey: "CloudyMoon", description: "The time to stop eating before the dawn fast begins" },
                    { value: "FAJR", title: "azanNames.FAJR", time: formatTime(todayData.timings.Fajr), svgKey: "Dawn", description: "A prayer performed just before sunrise." },
                    { value: "SUNRISE", title: "azanNames.SUNRISE", time: formatTime(todayData.timings.Sunrise), svgKey: "Sunrise", description: "The time when the sun rises above the horizon." },
                    { value: "DHUHR", title: "azanNames.DHUHR", time: formatTime(todayData.timings.Dhuhr), svgKey: "Sun", description: "A prayer after the sun passes its highest point." },
                    { value: "ASR", title: "azanNames.ASR", time: formatTime(todayData.timings.Asr), svgKey: "CloudySun", description: "A prayer in the late afternoon, before sunset." },
                    { value: "SUNSET", title: "azanNames.SUNSET", time: formatTime(todayData.timings.Sunset), svgKey: "Sunset", description: "The time when the sun sets below the horizon." },
                    { value: "MAGHRIB", title: "azanNames.MAGHRIB", time: formatTime(todayData.timings.Maghrib), svgKey: "Dawn", description: "A prayer just after the sun sets." },
                    { value: "ISHA", title: "azanNames.ISHA", time: formatTime(todayData.timings.Isha), svgKey: "CloudyMoon", description: "A prayer in the night, after twilight disappears." },
                    { value: "FIRSTTHIRD", title: "azanNames.FIRSTTHIRD", time: formatTime(todayData.timings.Firstthird), svgKey: "Moon", description: "The first third of the night, after Isha prayer." },
                    { value: "MIDNIGHT", title: "azanNames.MIDNIGHT", time: formatTime(todayData.timings.Midnight), svgKey: "Moon", description: "The middle of the night, halfway between sunset and sunrise." },
                    { value: "LASTTHIRD", title: "azanNames.LASTTHIRD", time: formatTime(todayData.timings.Lastthird), svgKey: "Moon", description: "The last third of the night, before dawn." },
                ];

                // Filter based on prayerSet parameter, or use default 5 main prayers
                const requestedPrayers = prayerSet || ['FAJR', 'DHUHR', 'ASR', 'MAGHRIB', 'ISHA'];
                const basePrayerTimes = allAvailablePrayerTimes.filter(prayer =>
                    requestedPrayers.includes(prayer.value as PrayerName)
                );

                const finalPrayerTimes = applyUserOffsets(basePrayerTimes);

                // Only cache the result if it's the default prayer set (main 5)
                // This prevents different prayer sets from overwriting each other in cache
                if (!prayerSet || (prayerSet.length === 5 && prayerSet.includes('FAJR') && prayerSet.includes('DHUHR') && prayerSet.includes('ASR') && prayerSet.includes('MAGHRIB') && prayerSet.includes('ISHA'))) {
                    set({ todaysPrayerTimes: finalPrayerTimes });
                }

                return finalPrayerTimes;
            },

            // Apply user-defined offsets to prayer times
            applyUserOffsets: (times: PrayerTime[]) => {
                const { userOffsets } = get();

                return times.map(prayer => {
                    const offset = userOffsets[prayer.value] || 0;
                    if (offset === 0) return prayer;

                    // Parse time and apply offset
                    const [hours, minutes] = prayer.time.split(':').map(Number);
                    const totalMinutes = hours * 60 + minutes + offset;

                    // Handle day overflow/underflow
                    const adjustedMinutes = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
                    const newHours = Math.floor(adjustedMinutes / 60);
                    const newMinutes = adjustedMinutes % 60;

                    const formattedTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;

                    return {
                        ...prayer,
                        time: formattedTime
                    };
                });
            },

            // Set individual prayer offset
            setUserOffset: (prayer: string, offset: number) => {
                set((state) => ({
                    userOffsets: {
                        ...state.userOffsets,
                        [prayer]: offset
                    },
                    // Clear all cached prayer times and increment version to force all hooks to refresh
                    todaysPrayerTimes: null,
                    dataVersion: state.dataVersion + 1
                }));
            },

            // Clear all cached data
            clearCache: () => {
                set({
                    yearlyData: null,
                    cacheMetadata: null,
                    todaysPrayerTimes: null,
                    error: null
                });
            },
        }),
        {
            name: 'azan-storageV9',
            storage: createJSONStorage(() => zustandAsyncStorage),
            // Only persist the data we want to cache
            partialize: (state) => ({
                yearlyData: state.yearlyData,
                cacheMetadata: state.cacheMetadata,
                userOffsets: state.userOffsets,
            }),
        }
    )
);