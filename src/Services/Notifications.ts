import * as Notifications from "expo-notifications";
import { useAzanStore } from "stores/azanStore";
import type { PrayerName } from "@/types/azanTypes";

const DAYS_AHEAD = 7;
const SCHEDULE_KEY = "AZAN_SCHEDULED_V1";

let isScheduling = false;

export async function scheduleAzansRolling(
    latitude: number,
    longitude: number,
    prayerSet: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
) {
    if (isScheduling) return;
    isScheduling = true;

    try {
        const store = useAzanStore.getState();

        // ⛔ HARD GUARD — prevents rescheduling on every reload
        const alreadyScheduled =
            store.cacheMetadata?.lastFetched &&
            store.cacheMetadata?.[SCHEDULE_KEY];

        if (alreadyScheduled) return;

        // Ensure yearly data exists (ONCE)
        await store.fetchYearlyPrayerTimes(
            latitude,
            longitude,
            new Date().getFullYear()
        );

        const { yearlyData, applyUserOffsets } = useAzanStore.getState();
        if (!yearlyData) return;

        await Notifications.cancelAllScheduledNotificationsAsync();

        const now = new Date();

        for (let d = 0; d < DAYS_AHEAD; d++) {
            const date = new Date(now);
            date.setDate(now.getDate() + d);

            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            const key = `${day}-${month}-${year}`;

            const allDays = Object.values(yearlyData.data).flat();
            const dayData = allDays.find(
                (x: any) => x.date.gregorian.date === key
            );
            if (!dayData) continue;

            const baseTimes = [
                { title: "Fajr", time: dayData.timings.Fajr },
                { title: "Dhuhr", time: dayData.timings.Dhuhr },
                { title: "Asr", time: dayData.timings.Asr },
                { title: "Maghrib", time: dayData.timings.Maghrib },
                { title: "Isha", time: dayData.timings.Isha },
            ].filter((p) => prayerSet.includes(p.title as PrayerName));

            const finalTimes = applyUserOffsets(
                baseTimes.map((p) => ({
                    title: p.title,
                    time: p.time.split(" ")[0],
                    value: p.title.toUpperCase(),
                })) as any
            );

            for (const prayer of finalTimes) {
                const [h, m] = prayer.time.split(":").map(Number);

                const triggerDate = new Date(date);
                triggerDate.setHours(h, m, 0, 0);

                if (triggerDate <= now) continue;

                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: `${prayer.title} Azan`,
                        body: "It is time for prayer",
                        sound: "azan.wav",
                        categoryIdentifier: "AZAN_CATEGORY",
                    },
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.DATE,
                        date: triggerDate,
                    },
                });

            }
        }

        // ✅ Persist guard flag
        useAzanStore.setState((state) => ({
            cacheMetadata: {
                ...state.cacheMetadata!,
                [SCHEDULE_KEY]: true,
            },
        }));
    } finally {
        isScheduling = false;
    }
}
