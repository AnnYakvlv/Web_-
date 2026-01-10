// modules/menu/renderMenu.js
import { getDishImage } from '../dishImages.js';
import { addToCart } from '../cart/index.js';

export function renderMenu(items) {
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
      <div class="menu-item-info">
        <p class="time">Время: ${item.time} мин</p>
        <a href="#" class="dish-info-link" data-id="${item.id}">
          Состав
        </a>
      </div>
      <button class="add-to-cart-btn" data-id="${item.id}">Добавить в корзину</button>
    </div>
  `).join('');
  
  // Добавляем обработчики событий для кнопок "Добавить в корзину"
  menuContainer.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    const itemId = parseInt(btn.dataset.id);
    const item = items.find(i => i.id === itemId);
    if (item) {
      btn.addEventListener('click', () => {
        addToCart(item);
        document.dispatchEvent(new CustomEvent('cartUpdated'));
      });
    }
  });
  
  // Обработчики для ссылок "Состав" будут добавлены в dishDetails.js
}