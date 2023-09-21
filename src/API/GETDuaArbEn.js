
const fetchRandomDuaFromFile = async () => {
    try {
        const jsonContent = require('../db/db_DUA.json');

        const data = jsonContent;

        const randomIndex = Math.floor(Math.random() * data.length);
        const randomVerse = data[randomIndex];

        if (randomVerse.ID && randomVerse.DUA && randomVerse.TRAN &&  randomVerse.REF) {
            return {
                ID: randomVerse.ID,
                DUA: randomVerse.DUA,
                TRAN: randomVerse.TRAN,
                REF: randomVerse.REF,
            };
        } else {
            throw new Error('Invalid JSON data structure');
        }
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return {
            ID: 'Error',
            DUA: 'Error reading the dua.',
            TRAN: 'Error readign translation.',
            REF: 'Error reading JSON file.',
        };
    }
};

export { fetchRandomDuaFromFile };
