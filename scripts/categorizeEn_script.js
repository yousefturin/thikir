const fs = require('fs');

// Define categories with their keywords and patterns (in priority order)
// Higher priority categories are checked first to avoid conflicts
const categories = {
    'Prophet Related': [
        'prophet', 'muhammad', 'messenger', 'rasul', 'nabi', 'sunnah', 'prophetic', 'hadith'
    ],
    'Morning Supplications': [
        'waking up', 'morning', 'dawn', 'sunrise', 'fajr'
    ],
    'Evening & Night Supplications': [
        'evening', 'night', 'sleep', 'going to bed', 'before sleeping', 'nightfall', 'sunset', 'maghrib', 'isha'
    ],
    'Prayer Related': [
        'prayer', 'mosque', 'call to prayer', 'adhan', 'athan', 'salah', 'namaz', 'praying', 'prostration', 'sujud', 'ruku', 'tashahhud', 'qunoot', 'witr'
    ],
    'Ablution & Purification': [
        'ablution', 'wudu', 'toilet', 'undressing', 'purification', 'bathroom', 'washing'
    ],
    'Health & Sickness': [
        'sick', 'illness', 'pain', 'fever', 'injury', 'medicine', 'doctor', 'healing', 'health', 'cure', 'disease'
    ],
    'Travel & Transportation': [
        'travel', 'journey', 'vehicle', 'riding', 'airplane', 'ship', 'car', 'mount', 'entering vehicle', 'transport', 'lodging', 'stopping'
    ],
    'Food & Drink': [
        'eating', 'drinking', 'food', 'meal', 'before eating', 'after eating', 'hunger', 'thirst', 'feast', 'breaking fast', 'fasting'
    ],
    'Weather & Natural Events': [
        'rain', 'thunder', 'lightning', 'wind', 'storm', 'weather', 'cloud', 'snow', 'earthquake', 'clear skies', 'crescent moon', 'sighting'
    ],
    'Protection & Safety': [
        'protection', 'refuge', 'safety', 'evil', 'satan', 'harm', 'danger', 'fear', 'worry', 'calamity', 'enemy', 'authority'
    ],
    'Clothing & Appearance': [
        'garment', 'wearing', 'clothes', 'dress', 'new garment', 'mirror', 'appearance'
    ],
    'Home & Family': [
        'home', 'house', 'entering home', 'leaving home', 'family', 'children', 'spouse', 'household'
    ],
    'Greetings & Social': [
        'greeting', 'meeting', 'farewell', 'visiting', 'guest', 'friend', 'people', 'gathering', 'assembly', 'condolence', 'sneezes', 'angry', 'kafir'
    ],
    'Death & Afterlife': [
        'death', 'deceased', 'funeral', 'grave', 'afterlife', 'judgment day', 'dying', 'cemetery'
    ],
    'Forgiveness & Repentance': [
        'forgiveness', 'repentance', 'sin', 'mercy', 'pardon', 'asking forgiveness', 'istighfar', 'tawbah'
    ],
    'Gratitude & Praise': [
        'gratitude', 'praise', 'thanks', 'blessing', 'favor', 'alhamdulillah', 'subhanallah', 'grateful'
    ],
    'Difficulty & Hardship': [
        'difficulty', 'hardship', 'trouble', 'problem', 'distress', 'anxiety', 'debt', 'burden'
    ],
    'Business & Work': [
        'work', 'business', 'job', 'trade', 'market', 'money', 'earning', 'livelihood', 'employment'
    ],
    'Learning & Knowledge': [
        'learning', 'knowledge', 'study', 'reading', 'wisdom', 'understanding', 'education', 'teaching'
    ],
    'Dua & Remembrance': [
        'remembrance', 'dhikr', 'supplication', 'dua', 'invocation', 'recitation'
    ],
    'Pilgrimage & Religious Acts': [
        'talbiyah', 'black stone', 'hajj', 'umrah', 'pilgrimage', 'kaaba', 'mecca', 'medina', 'aaarafah', 'arafah', 'sacred site', 'mashaar', 'jamarat', 'pebble', 'throwing', 'slaughtering', 'sacrifice'
    ],
    'Dreams & Omens': [
        'dream', 'good dream', 'bad dream', 'omens', 'ascribing', 'seeing'
    ],
    'Emotions & Reactions': [
        'amazement', 'delight', 'pleasant news', 'startled', 'news', 'shaytans', 'obstinate', 'deception'
    ],
    'General': [] // Catch-all for items that don't fit other categories
};

// Function to categorize based on name (first match wins - no duplicates)
function categorizeItem(name) {
    const lowerName = name.toLowerCase();

    // Check categories in order of priority (Prophet Related first, General last)
    for (const [category, keywords] of Object.entries(categories)) {
        if (category === 'General') continue; // Skip general category for now

        for (const keyword of keywords) {
            if (lowerName.includes(keyword.toLowerCase())) {
                return category; // Return first match to ensure no duplicates
            }
        }
    }

    return 'General'; // Default for uncategorized items
}

// Main function to process the data
async function processThikirData() {
    try {
        console.log('🚀 Starting Thikir Data Categorization...');
        console.log('==========================================\n');

        // Read the original file
        const filePath = './src/db/db_thikirEn.ts';
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Extract the items array
        const itemsMatch = fileContent.match(/export const items = (\[[\s\S]*\]);/);
        if (!itemsMatch) {
            throw new Error('Could not find items array in file');
        }

        // Use Function constructor instead of eval for safety
        const items = new Function('return ' + itemsMatch[1])();

        console.log(`📄 Found ${items.length} items to categorize...\n`);

        // Add categories to each item
        const categorizedItems = items.map(item => ({
            ...item,
            category: categorizeItem(item.name)
        }));

        // Generate statistics
        const categoryStats = {};
        categorizedItems.forEach(item => {
            categoryStats[item.category] = (categoryStats[item.category] || 0) + 1;
        });

        console.log('📊 Categorization Statistics:');
        console.log('===============================');
        Object.entries(categoryStats)
            .sort(([, a], [, b]) => b - a)
            .forEach(([category, count]) => {
                console.log(`${category.padEnd(30)} : ${count} items`);
            });

        console.log(`\n✅ Total items processed: ${categorizedItems.length}`);
        console.log(`🏷️  Total categories used: ${Object.keys(categoryStats).length}`);

        // Show general/uncategorized items for review
        const uncategorized = categorizedItems.filter(item => item.category === 'General');
        if (uncategorized.length > 0) {
            console.log(`\n🔍 General/Uncategorized items (${uncategorized.length}):`);
            console.log('=====================================================');
            uncategorized.slice(0, 15).forEach((item, index) => {
                console.log(`${index + 1}. "${item.name}"`);
            });
            if (uncategorized.length > 15) {
                console.log(`... and ${uncategorized.length - 15} more`);
            }
            console.log('\n💡 Review these items to add relevant keywords for better categorization.');
        }

        // Verify no duplicates (each item should appear in only one category)
        const totalCategorizedCount = Object.values(categoryStats).reduce((sum, count) => sum + count, 0);
        if (totalCategorizedCount === categorizedItems.length) {
            console.log('\n✅ Verification: Each item belongs to exactly one category (no duplicates)');
        } else {
            console.log('\n⚠️  Warning: Category count mismatch - check for duplicate categorization');
        }

        // Create new file content
        const newFileContent = `// ⚠️ AUTO-GENERATED FILE WITH CATEGORIES — DO NOT EDIT ⚠️
export const items = ${JSON.stringify(categorizedItems, null, 2)};

// Category statistics
export const categoryStats = ${JSON.stringify(categoryStats, null, 2)};

// Available categories
export const availableCategories = ${JSON.stringify(Object.keys(categories), null, 2)};

export type SupplicationCategory = ${Object.keys(categories).map(cat => `'${cat}'`).join(' | ')};
`;

        // Write the new file
        const outputPath = './src/db/db_thikirEn_categorized.ts';
        fs.writeFileSync(outputPath, newFileContent);

        console.log(`\n💾 Categorized data saved to: ${outputPath}`);

        // Create category utilities
        const categoryUtilities = `// Category utilities for filtering and display
export const SUPPLICATION_CATEGORIES = {
${Object.keys(categories).map(cat =>
            `  ${cat.toUpperCase().replace(/\s+/g, '_').replace(/&/g, 'AND')}: '${cat}'`
        ).join(',\n')}
} as const;

export type SupplicationCategoryKey = keyof typeof SUPPLICATION_CATEGORIES;

// Helper function to get items by category
export function getItemsByCategory(items: any[], category: string) {
  return items.filter((item: any) => item.category === category);
}

// Helper function to get all categories with item counts
export function getCategoriesWithCounts(items: any[]) {
  const counts: { [key: string]: number } = {};
  items.forEach((item: any) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });
  return counts;
}
`;

        fs.writeFileSync('./src/utils/SupplicationCategories.ts', categoryUtilities);

        console.log('🏷️  Category utilities exported to: src/utils/SupplicationCategories.ts');
        console.log('\n✨ Categorization complete!');
        console.log('\n📋 Next steps:');
        console.log('1. Review the categorization results above');
        console.log('2. Check uncategorized items and adjust keywords if needed');
        console.log('3. Import the categorized data: import { items } from "./src/db/db_thikirEn_categorized"');
        console.log('4. Use category utilities for filtering: import { getItemsByCategory } from "./src/utils/SupplicationCategories"');

        return categorizedItems;

    } catch (error) {
        console.error('❌ Error processing data:', error.message);
        return null;
    }
}

// Run the script
processThikirData();