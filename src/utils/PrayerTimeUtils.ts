class PrayerTimeUtils {
    /**
     * Calculate adjusted time by applying offset in minutes
     */
    static calculateAdjustedTime(timeStr: string, offsetMinutes: number): string {
        try {
            const [hours, minutes] = timeStr.split(":").map(Number);

            if (isNaN(hours) || isNaN(minutes)) {
                return timeStr; // Return original if parsing fails
            }

            const totalMinutes = hours * 60 + minutes + offsetMinutes;

            // Handle day overflow/underflow (0-1440 minutes in a day)
            const adjustedMinutes = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
            const newHours = Math.floor(adjustedMinutes / 60);
            const newMinutes = adjustedMinutes % 60;

            return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
        } catch (error) {
            console.error("Error calculating adjusted time:", error);
            return timeStr;
        }
    }

    /**
     * Generate offset picker data from -60 to +60 minutes
     */
    static generateOffsetPickerData(): Array<{ value: string; label: string }> {
        const offsets = [];
        for (let i = -60; i <= 60; i++) {
            const label = i === 0 ? "general.noOffset" : `${i > 0 ? "+" : ""}${i}`;
            offsets.push({ value: i.toString(), label });
        }
        return offsets;
    }

    /**
     * Get offset data for a specific offset value
     */
    static getOffsetData(offset: number): { value: string; label: string } {
        const label = offset === 0 ? "No offset" : `${offset > 0 ? "+" : ""}${offset} min`;
        return { value: offset.toString(), label };
    }

    /**
     * Format offset for display
     */
    static formatOffset(offset: number): string {
        if (offset === 0) return "No offset";
        return `${offset > 0 ? "+" : ""}${offset} minutes`;
    }
}

export default PrayerTimeUtils;