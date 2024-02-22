const fetchRandomVerse = async () => {
  try {
    const randomAyah = Math.floor(Math.random() * 6236) + 1; // Generate a random ayah number between 1 and 6236

    const editionForVerse = 'Ben.asad';

    const apiUrlVerse = `https://api.alquran.cloud/v1/ayah/${randomAyah}/${editionForVerse}`;
    const response = await fetch(apiUrlVerse);


    const editionForTafserAR = 'ar.muyassar';
    const apiUrlTafserAR = `https://api.alquran.cloud/v1/ayah/${randomAyah}/${editionForTafserAR}`;
    const responseTafserAR = await fetch(apiUrlTafserAR);


    const editionForTafserEn = 'en.sahih';
    const apiUrlTafserEN = `https://api.alquran.cloud/v1/ayah/${randomAyah}/${editionForTafserEn}`
    const responseTafserEN = await fetch(apiUrlTafserEN);



    if (!response.ok && !responseTafserAR.ok && !responseTafserEN.ok) {
      throw new Error('Failed to fetch data for Verse');
    }

    const data = await response.json();
    const tafsirResponseAR = await responseTafserAR.json(); 
    const tafsirResponseEN = await responseTafserEN.json(); 


    if (data?.data?.text && tafsirResponseAR?.data?.text && tafsirResponseEN?.data?.text) {
      // Extract the surah name and ayah number from the response
      const surahName = data.data.surah.name;
      const surahNameEn = data.data.surah.englishName;
      const ayahNumber = data.data.numberInSurah;
      const verseText = data.data.text;
      const tafsirTextAR = tafsirResponseAR.data.text; 
      const tafsirTextEN = tafsirResponseEN.data.text; 
      return {
        surahName,
        surahNameEn,
        ayahNumber,
        verseText,
        tafsirTextAR, 
        tafsirTextEN,
      };
    } else {
      throw new Error('Invalid response data structure');
    }
  } catch (error) {
    console.error('Error fetching Quranic verse:', error);
    return {
      surahName: 'Error',
      surahNameEn: 'Error',
      ayahNumber: 'Error',
      verseText: 'Error fetching Quranic verse.',
      tafsirTextAR: 'Error fetching a Tafsir verse',
      tafsirTextEN:'Error fetching a English Tafsir verse'
    };
  }
};

export { fetchRandomVerse };
