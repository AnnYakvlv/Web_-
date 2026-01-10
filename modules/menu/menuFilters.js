import { CATEGORIES } from '../constants.js';

export function filterByCategory(items, category) {
  if (category === CATEGORIES.ALL) {
    return items;
  }
  return items.filter(item => item.category === category);
}