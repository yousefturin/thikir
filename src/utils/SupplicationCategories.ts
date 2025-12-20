// Category utilities for filtering and display
export const SUPPLICATION_CATEGORIES = {
  PROPHET_RELATED: 'Prophet Related',
  MORNING_SUPPLICATIONS: 'Morning Supplications',
  EVENING_AND_NIGHT_SUPPLICATIONS: 'Evening & Night Supplications',
  PRAYER_RELATED: 'Prayer Related',
  ABLUTION_AND_PURIFICATION: 'Ablution & Purification',
  HEALTH_AND_SICKNESS: 'Health & Sickness',
  TRAVEL_AND_TRANSPORTATION: 'Travel & Transportation',
  FOOD_AND_DRINK: 'Food & Drink',
  WEATHER_AND_NATURAL_EVENTS: 'Weather & Natural Events',
  PROTECTION_AND_SAFETY: 'Protection & Safety',
  CLOTHING_AND_APPEARANCE: 'Clothing & Appearance',
  HOME_AND_FAMILY: 'Home & Family',
  GREETINGS_AND_SOCIAL: 'Greetings & Social',
  DEATH_AND_AFTERLIFE: 'Death & Afterlife',
  FORGIVENESS_AND_REPENTANCE: 'Forgiveness & Repentance',
  GRATITUDE_AND_PRAISE: 'Gratitude & Praise',
  DIFFICULTY_AND_HARDSHIP: 'Difficulty & Hardship',
  BUSINESS_AND_WORK: 'Business & Work',
  LEARNING_AND_KNOWLEDGE: 'Learning & Knowledge',
  DUA_AND_REMEMBRANCE: 'Dua & Remembrance',
  PILGRIMAGE_AND_RELIGIOUS_ACTS: 'Pilgrimage & Religious Acts',
  DREAMS_AND_OMENS: 'Dreams & Omens',
  EMOTIONS_AND_REACTIONS: 'Emotions & Reactions',
  GENERAL: 'General'
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
