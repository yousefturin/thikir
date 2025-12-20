import { AzanTimeSectionProps } from "@/screens/home/components/AzanTimeSection";
import { getLocales } from 'expo-localization';
import Format from "./Format";

class Extract {
    // Define which prayer times are actual obligatory prayers
    private static readonly ACTUAL_PRAYERS = ['FAJR', 'DHUHR', 'ASR', 'MAGHRIB', 'ISHA'];

    static NextAzanIndex(azanTimes: AzanTimeSectionProps["azanTimes"]): number {
        try {
            if (!azanTimes || azanTimes.length === 0) {
                return 0;
            }

            const currentTime = this.CurrentTime();
            const currentMinutes = Format.TimeToMinutes(currentTime);

            // Filter to only include actual prayer times, not reference times like Sunrise, Sunset, etc.
            for (let i = 0; i < azanTimes.length; i++) {
                const azanTime = azanTimes[i];
                if (!azanTime || !azanTime.time || !azanTime.value) {
                    continue;
                }

                // Only consider actual obligatory prayers for "next azan"
                if (!this.ACTUAL_PRAYERS.includes(azanTime.value)) {
                    continue;
                }

                const azanMinutes = Format.TimeToMinutes(azanTime.time);
                if (azanMinutes > currentMinutes) {
                    return i;
                }
            }

            // If no prayer found for today, return the first actual prayer (for next day)
            // Find the first actual prayer in the list
            for (let i = 0; i < azanTimes.length; i++) {
                const azanTime = azanTimes[i];
                if (azanTime?.title && this.ACTUAL_PRAYERS.includes(azanTime.title)) {
                    return i;
                }
            }

            return 0;
        } catch (error) {
            console.error("Error finding next azan:", error);
            return 0;
        }
    }
    static CurrentTime(): string {
        try {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
        } catch (error) {
            console.error("Error getting current time:", error);
            return "00:00";
        }
    }
    static RemainingMinutes(azanTime: string): number {
        try {
            const currentTime = this.CurrentTime();
            const currentMinutes = Format.TimeToMinutes(currentTime);
            const azanMinutes = Format.TimeToMinutes(azanTime);

            let remainingMinutes = azanMinutes - currentMinutes;

            // If azan time has passed today, calculate for next day
            if (remainingMinutes <= 0) {
                remainingMinutes = 24 * 60 + remainingMinutes;
            }

            return Math.max(0, remainingMinutes);
        } catch (error) {
            console.error("Error calculating remaining minutes:", error);
            return 0;
        }
    }
    static IsArabic(text: string): boolean {
        const arabicRegex = /[\u0600-\u06FF]/;
        return arabicRegex.test(text);
    }
    static DefaultLanguage() {
        const DeviceLanguage = getLocales()[0].languageCode;

        switch (DeviceLanguage) {
            case 'en':
                return 'en';
            case 'tr':
                return 'tr';
            case 'az':
                return 'az';
            default:
                return 'en';
        }
    }
}
export default Extract;