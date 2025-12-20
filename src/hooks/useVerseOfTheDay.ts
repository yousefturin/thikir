import { useQuery } from "@tanstack/react-query";

export interface VerseData {
    verseName: string;
    verseNameEn: string;
    verseNumber: number;
    verseText: string;
    meaning: string;
}

interface ApiResponse {
    data: {
        text: string;
        numberInSurah: number;
        surah: {
            name: string;
            englishName: string;
        };
    };
}

const EDITIONS = {
    VERSE: 'Ben.asad',
    ARABIC_MEANING: 'ar.muyassar',
    ENGLISH_MEANING: 'en.sahih',
} as const;

const TOTAL_AYAHS = 6236;

const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const getDailyverseNumber = () => {
    const dayOfYear = getDayOfYear();
    // Use day of year to get consistent daily ayah
    return (dayOfYear % TOTAL_AYAHS) + 1;
};

const fetchApiData = async (verseNumber: number, edition: string): Promise<ApiResponse> => {
    const apiUrl = `https://api.alquran.cloud/v1/ayah/${verseNumber}/${edition}`;
    // eslint-disable-next-line no-undef
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch data for edition: ${edition}`);
    }

    return response.json();
};

const fetchVerseOfTheDay = async (lang: string): Promise<VerseData> => {
    try {
        const verseNumber = getDailyverseNumber();

        // Fetch all data in parallel
        const [verseResponse, arabicMeaningResponse, englishMeaningResponse] = await Promise.all([
            fetchApiData(verseNumber, EDITIONS.VERSE),
            fetchApiData(verseNumber, EDITIONS.ARABIC_MEANING),
            fetchApiData(verseNumber, EDITIONS.ENGLISH_MEANING),
        ]);

        // Validate responses
        if (!verseResponse?.data?.text || !arabicMeaningResponse?.data?.text || !englishMeaningResponse?.data?.text) {
            throw new Error('Invalid response data structure');
        }

        return {
            verseName: verseResponse.data.surah.name,
            verseNameEn: verseResponse.data.surah.englishName,
            verseNumber: verseResponse.data.numberInSurah,
            verseText: verseResponse.data.text,
            meaning: lang === "ar" ? arabicMeaningResponse.data.text : englishMeaningResponse.data.text,
        };
    } catch (error) {
        console.error('Error fetching Quranic verse:', error);

        // Return fallback data instead of throwing
        return {
            verseName: 'Error',
            verseNameEn: 'Error',
            verseNumber: 0,
            verseText: 'Error fetching Quranic verse.',
            meaning: 'Error fetching meaning',
        };
    }
};

export const useVerseOfTheDay = (lang) => {
    const today = new Date().toDateString();

    return useQuery({
        queryKey: ["verse-of-the-day", today],
        queryFn: () => fetchVerseOfTheDay(lang),
        retry: 3,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
    });
};