import { formatTime, calculateOrderTime } from './utils.js';
import { getDishImage } from './dishImages.js';
import { 
  getCart, 
  addToCart, 
  addOneToCart, 
  removeOneFromCart, 
  removeAllFromCart,
  clearCart,
  getGroupedCart,
  getCartTotal
} from './cart.js';
import { menuItems } from '../data/menuItems.js';

export function renderMenu(items = menuItems) {
  const menuContainer = document.getElementById('menuContainer') || document.getElementById('menu');
  if (!menuContainer) return;
  
  menuContainer.innerHTML = items.map(item => `
    <div class="menu-item">
      ${getDishImage(item.name) ? `
        <div class="dish-image-container">
          <img src="${getDishImage(item.name)}" alt="${item.name}" class="dish-image">
        </div>
      ` : ''}
      <div class="menu-item-header">
        <h3>${item.name}</h3>
        <p class="price">${item.price} руб.</p>
      </div>
      <p class="time">Время: ${item.time} мин</p>
      <button data-id="${item.id}">Добавить в корзину</button>
    </div>
  `).join('');
  
  // Добавляем обработчики событий
  menuContainer.querySelectorAll('button[data-id]').forEach(btn => {
    const itemId = parseInt(btn.dataset.id);
    const item = items.find(i => i.id === itemId);
    if (item) {
      btn.addEventListener('click', () => {
        addToCart(item);
        renderCart();
      });
    }
  });
}

export function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartSummary = document.querySelector('.cart-summary');
  if (!cartItems) return;
  
  const groupedItems = getGroupedCart();
  
  if (groupedItems.length === 0) {
    cartItems.innerHTML = '<li class="empty-cart-message">Корзина пуста</li>';
  } else {
    cartItems.innerHTML = groupedItems.map(item => `
      <li class="cart-item">
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <div class="cart-item-quantity">
            <span>${item.quantity} шт.</span>
          </div>
        </div>
        <div class="cart-item-details">
          <span class="cart-item-total">${item.price * item.quantity} руб.</span>
          <div class="cart-item-actions">
            <button class="cart-item-add-one" data-id="${item.id}">+1</button>
            <button class="cart-item-remove-one" data-id="${item.id}">-1</button>
            <button class="cart-item-remove" data-id="${item.id}">Удалить</button>
          </div>
        </div>
      </li>
    `).join('');
    
    // Добавляем обработчики
    cartItems.querySelectorAll('.cart-item-add-one').forEach(btn => {
      btn.addEventListener('click', () => {
        addOneToCart(parseInt(btn.dataset.id), menuItems);
        renderCart();
      });
    });
    
    cartItems.querySelectorAll('.cart-item-remove-one').forEach(btn => {
      btn.addEventListener('click', () => {
        removeOneFromCart(parseInt(btn.dataset.id));
        renderCart();
      });
    });
    
    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        removeAllFromCart(parseInt(btn.dataset.id));
        renderCart();
      });
    });
  }
  
  // Обновляем итоговую информацию
  const cart = getCart();
  const realisticTime = calculateOrderTime(cart);
  const formattedTime = formatTime(realisticTime);
  const totalPrice = getCartTotal(cart);
  
  if (cartSummary) {
    cartSummary.innerHTML = `
      <div class="cart-totals">
        <div class="cart-total-row">
          <span>Примерное время приготовления:</span>
          <span id="totalTime">${formattedTime}</span>
        </div>
        <div class="cart-total-row">
          <span>Итого к оплате:</span>
          <span class="cart-total-price">${totalPrice} руб.</span>
        </div>
      </div>
    `;
  }
}

export { clearCart };