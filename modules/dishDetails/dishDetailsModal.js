// modules/dishDetails/dishDetailsModal.js
import { getDishImage } from '../dishImages.js';
import { addToCart } from '../cart/index.js';

// Расширенные данные блюд (добавь их в menuItems.js позже)
const dishDetails = {
  1: {
    description: 'Классический корейский рис с овощами, яйцом и острым соусом кочуджан',
    ingredients: ['Рис', 'Свежие овощи', 'Говядина', 'Яйцо', 'Соус кочуджан'],
    spicy: 3,
    calories: 450,
    weight: '350г'
  },
  2: {
    description: 'Пряные рисовые палочки в остром соусе',
    ingredients: ['Рисовые палочки', 'Острый соус', 'Рыбные палочки', 'Зеленый лук'],
    spicy: 4,
    calories: 380,
    weight: '300г'
  },
  3: {
    description: 'Жареная лапша с овощами и говядиной',
    ingredients: ['Стеклянная лапша', 'Говядина', 'Морковь', 'Шпинат', 'Грибы'],
    spicy: 2,
    calories: 420,
    weight: '320г'
  },
  4: {
    description: 'Сладкая корейская булочка с начинкой',
    ingredients: ['Пшеничная мука', 'Красная бобовая паста', 'Сахар'],
    spicy: 0,
    calories: 280,
    weight: '150г'
  },
  5: {
    description: 'Освежающий холодный кофе',
    ingredients: ['Эспрессо', 'Молоко', 'Лед'],
    spicy: 0,
    calories: 120,
    volume: '350мл'
  },
  6: {
    description: 'Маринованная говядина на гриле',
    ingredients: ['Говядина', 'Соевый соус', 'Чеснок', 'Мед'],
    spicy: 2,
    calories: 520,
    weight: '280г'
  },
  7: {
    description: 'Сладкие корейские печенья с медом',
    ingredients: ['Мед', 'Кунжут', 'Рисовая мука'],
    spicy: 0,
    calories: 180,
    weight: '100г'
  },
  8: {
    description: 'Холодный кофе с мороженым',
    ingredients: ['Эспрессо', 'Ванильное мороженое'],
    spicy: 0,
    calories: 210,
    volume: '300мл'
  },
  9: {
    description: 'Корейские пельмени с начинкой, подаются с соевым соусом',
    ingredients: ['Тесто', 'Свинина', 'Капуста', 'Чеснок'],
    spicy: 1,
    calories: 320,
    weight: '250г'
  }
};

export function showDishDetails(itemId) {
  const details = dishDetails[itemId];
  if (!details) return;
  
  // Получаем базовую информацию о блюде
  import('../../data/menuItems.js').then(({ menuItems }) => {
    const item = menuItems.find(dish => dish.id === itemId);
    if (!item) return;
    
    createModal(item, details);
  }).catch(error => {
    console.error('Ошибка загрузки меню:', error);
  });
}

function createModal(item, details) {
  // Удаляем существующее модальное окно если есть
  const existingModal = document.getElementById('dishDetailsModal');
  if (existingModal) existingModal.remove();
  
  const modal = document.createElement('div');
  modal.id = 'dishDetailsModal';
  modal.className = 'dish-details-modal';
  
  modal.innerHTML = createModalHTML(item, details);
  
  document.body.appendChild(modal);
  
  // Добавляем обработчики
  addModalListeners(modal, item);
  
  // Показываем модальное окно
  setTimeout(() => modal.classList.add('show'), 10);
}

function createModalHTML(item, details) {
  return `
    <div class="dish-details-content">
      <div class="dish-details-header">
        <h2>${item.name}</h2>
        <button class="dish-details-close">&times;</button>
      </div>
      <div class="dish-details-body">
        <div class="dish-details-image">
          <img src="${getDishImage(item.name)}" alt="${item.name}">
        </div>
        <div class="dish-details-info">
          <p class="dish-description">${details.description}</p>
          
          <div class="dish-ingredients">
            <h3>Состав:</h3>
            <ul>
              ${details.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>
          
          <div class="dish-characteristics">
            <div class="dish-characteristic">
              <span>Острота:</span>
              <div class="spicy-level">
                ${Array(5).fill(0).map((_, i) => 
                  `<span class="spicy-dot ${i < details.spicy ? 'active' : ''}"></span>`
                ).join('')}
              </div>
            </div>
            
            ${details.calories ? `
              <div class="dish-characteristic">
                <span>Калории:</span>
                <span class="characteristic-value">${details.calories} ккал</span>
              </div>
            ` : ''}
            
            ${details.weight ? `
              <div class="dish-characteristic">
                <span>Вес:</span>
                <span class="characteristic-value">${details.weight}</span>
              </div>
            ` : ''}
            
            ${details.volume ? `
              <div class="dish-characteristic">
                <span>Объем:</span>
                <span class="characteristic-value">${details.volume}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
      <div class="dish-details-footer">
        <div class="dish-price-time">
          <span class="dish-modal-price">${item.price} руб.</span>
          <span class="dish-modal-time">${item.time} мин</span>
        </div>
        <button class="add-from-details" data-id="${item.id}">
          Добавить в корзину
        </button>
      </div>
    </div>
  `;
}

function addModalListeners(modal, item) {
  // Закрытие модального окна
  modal.querySelector('.dish-details-close').addEventListener('click', () => {
    closeModal(modal);
  });
  
  // Добавление в корзину из модального окна
  modal.querySelector('.add-from-details').addEventListener('click', () => {
    addToCart(item);
    showNotification(`${item.name} добавлен в корзину!`);
    closeModal(modal);
    // Обновляем корзину
    document.dispatchEvent(new CustomEvent('cartUpdated'));
  });
  
  // Закрытие по клику вне окна
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
  
  // Закрытие по ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.parentNode) {
      closeModal(modal);
    }
  });
}

function closeModal(modal) {
  modal.classList.remove('show');
  setTimeout(() => {
    if (modal.parentNode) {
      modal.parentNode.removeChild(modal);
    }
  }, 300);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `<span>${message}</span>`;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 2000);
}