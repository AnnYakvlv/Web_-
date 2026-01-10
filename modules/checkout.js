// modules/checkout.js
import { clearCart } from './cart/index.js';
import { formatTime, calculateOrderTime, generateOrderId, getFromStorage, saveToStorage } from './utils.js';
import { showNotification } from './notifications.js';

export function initCheckoutModal() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const modalCloseBtn = checkoutModal?.querySelector('.modal-close');
  const modalCancelBtn = checkoutModal?.querySelector('.modal-cancel-btn');
  const confirmOrderBtn = document.getElementById('confirmOrder');
  
  if (!checkoutBtn || !checkoutModal) return;
  
  checkoutBtn.addEventListener('click', openCheckoutModal);
  
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCheckoutModal);
  }
  
  if (modalCancelBtn) {
    modalCancelBtn.addEventListener('click', closeCheckoutModal);
  }
  
  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', confirmOrder);
  }
  
  // Клик вне модального окна
  window.addEventListener('click', (event) => {
    if (event.target === checkoutModal) {
      closeCheckoutModal();
    }
  });
  
  // Закрытие по клавише ESC
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && checkoutModal.classList.contains('show')) {
      closeCheckoutModal();
    }
  });
}

function openCheckoutModal() {
  const checkoutModal = document.getElementById('checkoutModal');
  const cart = getFromStorage('cart', []);
  
  if (cart.length === 0) {
    showNotification('Корзина пуста! Добавьте товары перед оформлением заказа.', 'warning');
    return;
  }
  
  fillOrderData(cart);
  checkoutModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const checkoutModal = document.getElementById('checkoutModal');
  checkoutModal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

function fillOrderData(cart) {
  const orderItemsList = document.getElementById('orderItemsList');
  const modalTotalPrice = document.getElementById('modalTotalPrice');
  const modalTotalTime = document.getElementById('modalTotalTime');
  const orderComment = document.getElementById('orderComment');
  
  if (!orderItemsList || !modalTotalPrice || !modalTotalTime) return;
  
  orderItemsList.innerHTML = '';
  
  const groupedItems = {};
  let totalPrice = 0;
  
  cart.forEach(item => {
    if (!groupedItems[item.id]) {
      groupedItems[item.id] = { ...item, quantity: 1 };
    } else {
      groupedItems[item.id].quantity += 1;
    }
    totalPrice += item.price;
  });
  
  Object.values(groupedItems).forEach(item => {
    const itemTotalPrice = item.price * item.quantity;
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name} × ${item.quantity}</span>
      <span>${itemTotalPrice} руб.</span>
    `;
    orderItemsList.appendChild(li);
  });
  
  modalTotalPrice.textContent = `${totalPrice} руб.`;
  
  const realisticTime = calculateOrderTime(cart);
  const formattedTime = formatTime(realisticTime);
  
  modalTotalTime.textContent = formattedTime;
  
  if (orderComment) {
    orderComment.value = '';
  }
}

function confirmOrder() {
  const cart = getFromStorage('cart', []);
  const orderComment = document.getElementById('orderComment');
  const comment = orderComment ? orderComment.value.trim() : '';
  
  if (cart.length === 0) {
    showNotification('Ошибка: корзина пуста!', 'error');
    return;
  }
  
  const order = {
    id: generateOrderId(),
    date: new Date().toLocaleString('ru-RU'),
    items: [...cart],
    comment: comment || 'Без комментариев',
    total: cart.reduce((sum, item) => sum + item.price, 0),
    status: 'pending'
  };
  
  saveOrder(order);
  clearCart();
  closeCheckoutModal();
  
  showNotification(`Заказ #${order.id} успешно оформлен!`, 'success');
}

function saveOrder(order) {
  try {
    const orders = getFromStorage('orders', []);
    orders.push(order);
    saveToStorage('orders', orders);
    return true;
  } catch (error) {
    console.error('Ошибка сохранения заказа:', error);
    return false;
  }
}