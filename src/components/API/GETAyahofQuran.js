const fetchRandomVerse = async () => {
    try {
        const randomAyah = Math.floor(Math.random() * 6236) + 1; // Generate a random ayah number between 1 and 6236 
        const edition = 'Ben.asad'; 
        
        const apiUrl = `http://api.alquran.cloud/v1/ayah/${randomAyah}/${edition}`;
        const response = await fetch(apiUrl);
  
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
  
        if (data?.data?.text) {
            return data.data.text; // Access the text directly from the response
        } else {
            throw new Error('Invalid response data structure');
        }
    } catch (error) {
        console.error('Error fetching Quranic verse:', error);
        return 'Error fetching Quranic verse.';
    }
};

export { fetchRandomVerse };
