// app.js
import { renderMenu, renderCart, clearCart } from './modules/menu/index.js';
import { initCheckoutModal } from './modules/checkout.js';
import { initDishDetails } from './modules/dishDetails/index.js';
import { menuItems } from './data/menuItems.js';

function initTabNavigation() {
  const tabs = document.querySelectorAll('#menuTabs a');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const category = tab.getAttribute('href').replace('#', '');
      
      // Фильтруем меню
      const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
      
      renderMenu(filteredItems);
      
      // Обновляем активную вкладку
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

// Слушаем события обновления корзины
document.addEventListener('cartUpdated', () => {
  renderCart();
});

document.addEventListener('DOMContentLoaded', () => {
  // Первоначальная загрузка
  renderMenu(menuItems);
  renderCart();
  
  // Навигация по вкладкам
  initTabNavigation();
  
  // Кнопка очистки корзины
  const clearCartBtn = document.getElementById('clearCart');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      clearCart();
    });
  }
  
  // Инициализация всех модулей
  initCheckoutModal();
  initDishDetails();
});
