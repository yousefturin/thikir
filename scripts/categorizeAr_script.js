const fs = require('fs');

// Define Arabic categories with keywords (priority order)
const categories = {
    'متعلق بالنبي ﷺ': [
        'والاداب', 'نبي', 'محمد', 'رسول', 'الرسول', 'سنه', 'حديث', 'شفاع'
    ],

    'أذكار الصباح': [
        'صباح', 'استيق', 'فجر', 'شروق', 'طلع'
    ],

    'أذكار المساء والليل': [
        'مساء', 'ليل', 'نوم', 'قبل نوم', 'مغرب', 'عشاء', 'غروب'
    ],

    'متعلق بالصلاة': [
        'صل', 'صلاه',
        'اذان', 'اذن', 'اقامه',
        'ركوع', 'سجود', 'سجد', 'قيام', 'قعد',
        'تشهد', 'قنوت', 'وتر',
        'مسجد', 'مصلي', 'جماعه', 'امام'
    ],

    'الوضوء والطهارة': [
        'وضو', 'طهار', 'اغتسال',
        'خلاء', 'حمام', 'غسل', 'نجاس'
    ],

    'الصحة والمرض': [
        'مرض', 'مريض', 'الم', 'شفا',
        'وجعاً', 'علاج', 'دواء', 'طبيب', 'سقم'
    ],

    'السفر والتنقل': [
        'سفر', 'رحل', 'طريق',
        'ركوب', 'سيار', 'طائر',
        'سفين', 'نزول'
    ],

    'الطعام والشراب': [
        'طعام', 'اكل', 'شرب',
        'جوع', 'عطش', 'افطار', 'صيام'
    ],

    'الطقس والظواهر الطبيعية': [
        'مطر', 'رعد', 'برق',
        'ريح', 'عاصف', 'زلزال',
        'الاستصحاء', 'هلال', 'قمر'
    ],

    'الحماية والسلامة': [
        'حفظ', 'وقاي', 'حماي',
        'شر', 'شيطان', 'اذي',
        'يعوذ', 'خاف', 'يعصم', 'وجعا', 'خطر', 'عدو'
    ],

    'اللباس والمظهر': [
        'لباس', 'ثوب', 'ملبس',
        'لبس', 'مرآه'
    ],

    'البيت والأسرة': [
        'بيت', 'منزل', 'دار',
        'الشياطين', 'اهل', 'اسر', 'زوج', 'ولد'
    ],

    'التحيات والعلاقات الاجتماعية': [
        'سلام', 'تحيه', 'زيار',
        'وداع', 'ضيف', 'مجلس',
        'عطاس', 'غضب'
    ],

    'الموت والآخرة': [
        'موت', 'ميت', 'قبر',
        'جناز', 'اخره', 'قيام'
    ],

    'المغفرة والتوبة': [
        'غفر', 'توب', 'ذنب',
        'استغفار', 'رحمه'
    ],

    'الشكر والحمد': [
        'حمد', 'شكر', 'نعمه',
        'فضل', 'سبح'
    ],

    'الشدائد والكرب': [
        'مصيب', 'بلاء', 'ابتلا',
        'كرب', 'هم', 'حزن',
        'ضيق', 'غم', 'محنت',
        'خشي', 'الفزع', 'دين', 'خوف'
    ],

    'العمل والتجارة': [
        'عمل', 'وظيف', 'تجار',
        'سوق', 'رزق', 'مال', 'كسب'
    ],

    'العلم والتعلم': [
        'علم', 'تعلم', 'قراء',
        'درس', 'فهم', 'حكمه'
    ],

    'الدعاء والذكر': [
        'دعاء', 'ذكر', 'تسبيح',
        'الاستسقاء', 'تهليل', 'تحميد', 'استعاذ'
    ],

    'الحج والعبادات': [
        'حج', 'عمره', 'تلبي',
        'كعبه', 'مكه', 'مدينه',
        'عرف', 'مني', 'جمر',
        'الصائم', 'الاسود', 'حصا', 'ذبح', 'اضحي'
    ],

    'الأحلام والرؤى': [
        'حلم', 'رؤي', 'منام'
    ],

    'المشاعر وردود الفعل': [
        'فرح', 'سرور', 'عجب',
        'سابه', 'اﻟﻤﺠلس', 'يكرهه', 'يسره', 'يسره', 'دهش', 'خبر'
    ],

    'عام': []
};
function normalizeArabic(text) {
    return text
        .replace(/[إأآ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/ؤ/g, 'و')
        .replace(/ئ/g, 'ي')
        .replace(/ّ/g, '')
        .replace(/ً|ٌ|ٍ|َ|ُ|ِ|ْ/g, '');
}

// Categorization function
function categorizeItem(name) {
    const lowerName = normalizeArabic(name.toLowerCase());

    for (const [category, keywords] of Object.entries(categories)) {
        if (category === 'عام') continue;

        for (const keyword of keywords) {
            if (lowerName.includes(keyword)) {
                return category;
            }
        }
    }

    return 'عام';
}

// Main processor
async function processThikirData() {
    try {
        console.log('🚀 Starting Arabic Thikir Categorization...\n');

        const filePath = './src/db/db_thikirAr.ts';
        const fileContent = fs.readFileSync(filePath, 'utf8');

        const itemsMatch = fileContent.match(/export const items = (\[[\s\S]*\]);/);
        if (!itemsMatch) throw new Error('Items array not found');

        const items = new Function('return ' + itemsMatch[1])();


        const categorizedItems = items.map(item => ({
            ...item,
            category: categorizeItem(item.name)
        }));

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
        const outputPath = './src/db/db_thikirAr_categorized.ts';
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

        fs.writeFileSync('./src/utils/SupplicationCategoriesAr.ts', categoryUtilities);

        console.log('🏷️  Category utilities exported to: src/utils/SupplicationCategoriesAr.ts');
        console.log('\n✨ Categorization complete!');
        console.log('\n📋 Next steps:');
        console.log('1. Review the categorization results above');
        console.log('2. Check uncategorized items and adjust keywords if needed');
        console.log('3. Import the categorized data: import { items } from "./src/db/db_thikirAr_categorized"');
        console.log('4. Use category utilities for filtering: import { getItemsByCategory } from "./src/utils/SupplicationCategoriesAr"');

        return categorizedItems;

    } catch (error) {
        console.error('❌ Error processing data:', error.message);
        return null;
    }
}

processThikirData();
