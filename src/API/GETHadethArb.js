

const fetchRandomVerseFromFile = async () => {
  try {
    const jsonContent = require('../db/db_HADITH.json');

    const data = jsonContent;

    const randomIndex = Math.floor(Math.random() * data.length);
    const randomVerse = data[randomIndex];

    if (randomVerse.ID && randomVerse.HADITH && randomVerse.REF) {
      return {
        ID: randomVerse.ID,
        HADITH: randomVerse.HADITH,
        REF: randomVerse.REF,
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
    };
  }
};

export { fetchRandomVerseFromFile };
