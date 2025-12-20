import { useQuery } from "@tanstack/react-query"
import { duaData } from "db/db_dua";

const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const getDailyRandomNumber = () => {
    const dayOfYear = getDayOfYear();
    // Use day of year as seed for consistent daily randomness
    const seed = dayOfYear % 52; // 52 duas (53-1, excluding id 1)
    return seed + 2; // Ensure we get IDs from 2-53
};

const getDuaOfTheDay = async () => {
    try {
        const randomId = getDailyRandomNumber();
        const name = duaData.find(
            (item) => item.id === randomId
        );
        return name;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return duaData[1];
    }
}

export const useDuaOfTheDay = () => {
    const today = new Date().toDateString(); // This ensures query key changes daily

    return useQuery({
        queryKey: ["dua-of-the-day", today],
        queryFn: () => getDuaOfTheDay(),
        retry: 3,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
    })
}