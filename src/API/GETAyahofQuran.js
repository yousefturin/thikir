const fetchRandomVerse = async () => {
  try {
    const randomAyah = Math.floor(Math.random() * 6236) + 1; // Generate a random ayah number between 1 and 6236

    const editionForVerse = 'Ben.asad';

    const apiUrlVerse = `http://api.alquran.cloud/v1/ayah/${randomAyah}/${editionForVerse}`;
    const response = await fetch(apiUrlVerse);
    const editionForTafser = 'ar.muyassar';
    const apiUrlTafser = `http://api.alquran.cloud/v1/ayah/${randomAyah}/${editionForTafser}`;
    const responseTafser = await fetch(apiUrlTafser);

    if (!response.ok && !responseTafser.ok) {
      throw new Error('Failed to fetch data for Verse');
    }

    const tafsirResponse = await responseTafser.json(); 
    const data = await response.json();

    if (data?.data?.text && tafsirResponse?.data?.text) {
      // Extract the surah name and ayah number from the response
      const surahName = data.data.surah.name;
      const ayahNumber = data.data.numberInSurah;
      const verseText = data.data.text;
      const tafsirText = tafsirResponse.data.text; 
      return {
        surahName,
        ayahNumber,
        verseText,
        tafsirText, 
      };
    } else {
      throw new Error('Invalid response data structure');
    }
  } catch (error) {
    console.error('Error fetching Quranic verse:', error);
    return {
      surahName: 'Error',
      ayahNumber: 'Error',
      verseText: 'Error fetching Quranic verse.',
      tafsirText: 'Error fetching a Tafsir verse',
    };
  }
};

export { fetchRandomVerse };
