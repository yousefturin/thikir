class Format {
    static TimeRemaining(totalMinutes: number): {
        timeValue: number;
        timeUnit: 'minute' | 'hour' | 'now';
    } {
        if (totalMinutes <= 0) {
            return {
                timeValue: null,
                timeUnit: 'now',
            };
        }

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (hours === 0) {
            return {
                timeValue: minutes,
                timeUnit: 'minute',
            };
        } else {
            return {
                timeValue: hours,
                timeUnit: 'hour',
            };
        }
    }
    static TimeToMinutes(timeStr: string): number {
        try {
            if (!timeStr || typeof timeStr !== "string") {
                throw new Error("Invalid time string");
            }

            const timeParts = timeStr.split(":");
            if (timeParts.length !== 2) {
                throw new Error("Time string must be in HH:MM format");
            }

            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10);

            if (
                isNaN(hours) ||
                isNaN(minutes) ||
                hours < 0 ||
                hours > 23 ||
                minutes < 0 ||
                minutes > 59
            ) {
                throw new Error("Invalid time values");
            }

            return hours * 60 + minutes;
        } catch (error) {
            console.error("Error converting time to minutes:", error, "Time:", timeStr);
            return 0;
        }
    }
    static GroupSupplicationsByCategory<T extends { category: string }>(items: T[]) {
        // Group items by category
        const grouped = items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {} as Record<string, T[]>);

        // Convert to SectionList format
        return Object.keys(grouped).map(category => ({
            category: category,
            data: grouped[category]
        }));
    }
}
export default Format;