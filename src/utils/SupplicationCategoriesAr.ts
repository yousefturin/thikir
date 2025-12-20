// Category utilities for filtering and display
       export const SUPPLICATION_CATEGORIES = {
         متعلق_بالنبي_ﷺ: 'متعلق بالنبي ﷺ',
  أذكار_الصباح: 'أذكار الصباح',
  أذكار_المساء_والليل: 'أذكار المساء والليل',
  متعلق_بالصلاة: 'متعلق بالصلاة',
  الوضوء_والطهارة: 'الوضوء والطهارة',
  الصحة_والمرض: 'الصحة والمرض',
  السفر_والتنقل: 'السفر والتنقل',
  الطعام_والشراب: 'الطعام والشراب',
  الطقس_والظواهر_الطبيعية: 'الطقس والظواهر الطبيعية',
  الحماية_والسلامة: 'الحماية والسلامة',
  اللباس_والمظهر: 'اللباس والمظهر',
  البيت_والأسرة: 'البيت والأسرة',
  التحيات_والعلاقات_الاجتماعية: 'التحيات والعلاقات الاجتماعية',
  الموت_والآخرة: 'الموت والآخرة',
  المغفرة_والتوبة: 'المغفرة والتوبة',
  الشكر_والحمد: 'الشكر والحمد',
  الشدائد_والكرب: 'الشدائد والكرب',
  العمل_والتجارة: 'العمل والتجارة',
  العلم_والتعلم: 'العلم والتعلم',
  الدعاء_والذكر: 'الدعاء والذكر',
  الحج_والعبادات: 'الحج والعبادات',
  الأحلام_والرؤى: 'الأحلام والرؤى',
  المشاعر_وردود_الفعل: 'المشاعر وردود الفعل',
  عام: 'عام'
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
       