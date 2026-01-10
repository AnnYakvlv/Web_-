import { getFromStorage, saveToStorage } from '../utils.js';
import { STORAGE_KEYS } from '../constants.js';

export function getCart() {
  return getFromStorage(STORAGE_KEYS.CART, []);
}

export function saveCart(cart) {
  return saveToStorage(STORAGE_KEYS.CART, cart);
}

export function clearCart() {
  localStorage.removeItem(STORAGE_KEYS.CART);
  return [];
}