import { formatTime, calculateOrderTime } from '../utils.js';
import { 
  addOneToCart, 
  removeOneFromCart, 
  removeAllFromCart,
  getGroupedCart,
  getCartTotal,
  getCart
} from '../cart/index.js';
import { menuItems } from '../../data/menuItems.js';

export function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartSummary = document.querySelector('.cart-summary');
  if (!cartItems) return;
  
  const groupedItems = getGroupedCart();
  
  if (groupedItems.length === 0) {
    cartItems.innerHTML = '<li class="empty-cart-message">Корзина пуста</li>';
  } else {
    cartItems.innerHTML = groupedItems.map(item => `
      <li class="cart-item" data-id="${item.id}">
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
    
    // Обработчики для кнопок в корзине
    attachCartItemListeners();
  }
  
  updateCartSummary();
}

function attachCartItemListeners() {
  const cartItems = document.getElementById('cartItems');
  
  cartItems.querySelectorAll('.cart-item-add-one').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = parseInt(btn.dataset.id);
      addOneToCart(itemId, menuItems);
      renderCart();
    });
  });
  
  cartItems.querySelectorAll('.cart-item-remove-one').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = parseInt(btn.dataset.id);
      removeOneFromCart(itemId);
      renderCart();
    });
  });
  
  cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = parseInt(btn.dataset.id);
      removeAllFromCart(itemId);
      renderCart();
    });
  });
}

function updateCartSummary() {
  const cartSummary = document.querySelector('.cart-summary');
  if (!cartSummary) return;
  
  const cart = getCart();
  const realisticTime = calculateOrderTime(cart);
  const formattedTime = formatTime(realisticTime);
  const totalPrice = getCartTotal(cart);
  
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