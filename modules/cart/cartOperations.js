import { getCart, saveCart } from './cartState.js';

export function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
  return cart;
}

export function removeOneFromCart(id) {
  let cart = getCart();
  const lastIndex = [...cart].reverse().findIndex(item => item.id === id);
  
  if (lastIndex !== -1) {
    const actualIndex = cart.length - 1 - lastIndex;
    cart.splice(actualIndex, 1);
  }
  
  saveCart(cart);
  return cart;
}

export function addOneToCart(id, menuItems) {
  const cart = getCart();
  const itemToAdd = menuItems.find(item => item.id === id);
  
  if (itemToAdd) {
    cart.push({ ...itemToAdd });
  }
  
  saveCart(cart);
  return cart;
}

export function removeAllFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  return cart;
}

export function getGroupedCart() {
  const cart = getCart();
  const grouped = {};
  
  cart.forEach(item => {
    if (!grouped[item.id]) {
      grouped[item.id] = { ...item, quantity: 1 };
    } else {
      grouped[item.id].quantity += 1;
    }
  });
  
  return Object.values(grouped);
}

export function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price, 0);
}