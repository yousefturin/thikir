

const fetchRandomVerseFromFile = async () => {
  try {
    const jsonContent = require('../db/db_HADITH.json');

    const data = jsonContent;

    const randomIndex = Math.floor(Math.random() * data.length);
    const randomVerse = data[randomIndex];

    if (randomVerse.ID && randomVerse.HADITH && randomVerse.REF && randomVerse.TRANSLATION &&randomVerse.REF_TRANSLATION ) {
      return {
        ID: randomVerse.ID,
        HADITH: randomVerse.HADITH,
        REF: randomVerse.REF,
        TRANSLATION: randomVerse.TRANSLATION,
        REF_TRANSLATION:randomVerse.REF_TRANSLATION
      };
    } else {
      throw new Error('Invalid JSON data structure');
    }
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return {
      ID: 'Error',
      HADITH: 'Error',
      REF: 'Error reading JSON file.',
      TRANSLATION:'Error',
      REF_TRANSLATION:'Error',
    };
  }
};

export { fetchRandomVerseFromFile };
