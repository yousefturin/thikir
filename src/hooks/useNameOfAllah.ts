import { useQuery } from "@tanstack/react-query"
import { namesOfAllah } from "@/db/namesOfAllah";

const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const getDailyRandomNumber = () => {
    const dayOfYear = getDayOfYear();
    // Use day of year as seed for consistent daily randomness
    const seed = dayOfYear % 91; // 91 names (92-1, excluding id 1)
    return seed + 2; // Ensure we get IDs from 2-92
};

const getNameOfAllah = async () => {
    try {
        const randomId = getDailyRandomNumber();
        const name = namesOfAllah.find(
            (item) => item.id === randomId
        );
        return name;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return namesOfAllah[1];
    }
}

export const useNameOfAllah = () => {
    const today = new Date().toDateString(); // This ensures query key changes daily

    return useQuery({
        queryKey: ["name-of-allah", today],
        queryFn: () => getNameOfAllah(),
        retry: 3,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
    })
}
