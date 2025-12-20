import { SvgKey } from "@/utils/SvgComponent";

export interface PrayerTime {
    value: Uppercase<PrayerName>; //key for the offset to be used internally
    title: string;
    time: string;
    svgKey?: SvgKey;
    description?: string;
}

export interface PrayerTimings {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
    Imsak: string;
    Midnight: string;
    Firstthird: string;
    Lastthird: string;
    [key: string]: string; // For any other prayer times
}

export type PrayerName =
    | 'FAJR'
    | 'SUNRISE'
    | 'DHUHR'
    | 'ASR'
    | 'SUNSET'
    | 'MAGHRIB'
    | 'ISHA'
    | 'IMSAK'
    | 'MIDNIGHT'
    | 'FIRSTTHIRD'
    | 'LASTTHIRD';

export const PRAYER_SETS = {
    // Just the 5 main obligatory prayers
    MAIN_FIVE: ['FAJR', 'DHUHR', 'ASR', 'MAGHRIB', 'ISHA'] as PrayerName[],

    // Main prayers + sunrise/sunset for timing reference
    WITH_SUN_TIMES: ['FAJR', 'SUNRISE', 'DHUHR', 'ASR', 'SUNSET', 'MAGHRIB', 'ISHA'] as PrayerName[],

    ALL_WITHOUT_THIRDS: ['IMSAK', 'FAJR', 'SUNRISE', 'DHUHR', 'ASR', 'MAGHRIB', 'ISHA', "MIDNIGHT"] as PrayerName[],

    // All available prayer times
    ALL: ['IMSAK', 'FAJR', 'SUNRISE', 'DHUHR', 'ASR', 'SUNSET', 'MAGHRIB', 'ISHA', 'FIRSTTHIRD', 'MIDNIGHT', 'LASTTHIRD'] as PrayerName[],

    // Custom sets for specific needs
    NIGHT_PRAYERS: ['MAGHRIB', 'ISHA', 'MIDNIGHT', 'FIRSTTHIRD', 'LASTTHIRD'] as PrayerName[],
    DAY_PRAYERS: ['FAJR', 'SUNRISE', 'DHUHR', 'ASR', 'SUNSET'] as PrayerName[]
} as const;

export interface PrayerDayData {
    date: {
        gregorian: {
            date: string; // Format: "DD-MM-YYYY"
        };
    };
    timings: PrayerTimings;
}

export interface PrayerCalendarResponse {
    data: Record<string, PrayerDayData[]>; // API returns object with month keys, not array
}
export interface Location {
    latitude: number;
    longitude: number;
}

export interface CacheMetadata {
    location: Location;
    year: number;
    lastFetched: number; // timestamp
}

export interface UserPrayerOffsets {
    [key: string]: number; // Allow any prayer name with offset
}