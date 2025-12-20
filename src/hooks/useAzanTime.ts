import { useEffect, useState } from "react";
import { useAzanStore } from "../stores/azanStore";
import type { PrayerTime, PrayerName } from "../types/azanTypes";

interface UseAzanTimeParams {
    latitude: number;
    longitude: number;
    enabled?: boolean;
    prayerSet?: PrayerName[]; // Allow custom prayer selection
}

interface UseAzanTimeResult {
    data: PrayerTime[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    clearCache: () => void;
    setUserOffset: (prayer: string, offset: number) => void;
    userOffsets: Record<string, number>;
}

export const useAzanTime = ({
    latitude,
    longitude,
    enabled = true,
    prayerSet
}: UseAzanTimeParams): UseAzanTimeResult => {
    const {
        getTodaysPrayerTimes,
        todaysPrayerTimes,
        isLoading,
        error,
        clearCache,
        setUserOffset,
        userOffsets,
        dataVersion,
    } = useAzanStore();

    const [localError, setLocalError] = useState<string | null>(null);
    const [customPrayerTimes, setCustomPrayerTimes] = useState<PrayerTime[] | null>(null);
    const [lastDataVersion, setLastDataVersion] = useState<number>(0);

    // Check if we're using a custom prayer set (not the default main 5)
    const isDefaultPrayerSet = !prayerSet || (
        prayerSet.length === 5 &&
        prayerSet.includes('FAJR') &&
        prayerSet.includes('DHUHR') &&
        prayerSet.includes('ASR') &&
        prayerSet.includes('MAGHRIB') &&
        prayerSet.includes('ISHA')
    );

    const refetch = async () => {
        if (!latitude || !longitude) {
            setLocalError("Invalid coordinates");
            return;
        }

        try {
            setLocalError(null);
            const today = new Date();
            const result = await getTodaysPrayerTimes(today, latitude, longitude, prayerSet);

            // Store custom prayer times separately if not using default set
            if (!isDefaultPrayerSet) {
                setCustomPrayerTimes(result);
            }
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Unknown error';
            console.error("Hook: Error in refetch:", errorMsg);
            setLocalError(errorMsg);
        }
    };

    useEffect(() => {
        if (enabled && latitude && longitude) {
            refetch();
        }
    }, [latitude, longitude, enabled, prayerSet]); // Add prayerSet as dependency

    // Detect when dataVersion changes (offsets updated) and refresh all data
    useEffect(() => {
        if (enabled && latitude && longitude && dataVersion !== lastDataVersion) {
            setLastDataVersion(dataVersion);
            if (dataVersion > 0) { // Skip initial load
                // Clear custom prayer times to force refresh
                setCustomPrayerTimes(null);
                refetch();
            }
        }
    }, [dataVersion, enabled, latitude, longitude, lastDataVersion]);

    // Auto-refetch when cached data is cleared (e.g., when offsets change)
    useEffect(() => {
        if (enabled && latitude && longitude && !isLoading) {
            // For default prayer set, refetch when todaysPrayerTimes becomes null
            if (isDefaultPrayerSet && !todaysPrayerTimes) {
                refetch();
            }
            // For custom prayer sets, refetch when customPrayerTimes becomes null
            else if (!isDefaultPrayerSet && !customPrayerTimes) {
                refetch();
            }
        }
    }, [todaysPrayerTimes, customPrayerTimes, enabled, latitude, longitude, isDefaultPrayerSet, isLoading]);

    // Return appropriate data based on whether we're using default or custom prayer set
    const data = isDefaultPrayerSet ? todaysPrayerTimes : customPrayerTimes;

    return {
        data,
        isLoading,
        error: error || localError,
        refetch,
        clearCache,
        setUserOffset,
        userOffsets,
    };
};

// Backward compatibility - keeping the old hook name
export const useNameAzanTime = (latitude: number, longitude: number) => {
    return useAzanTime({ latitude, longitude });
};

// Export prayer sets for easy access
export { PRAYER_SETS } from '../types/azanTypes';
