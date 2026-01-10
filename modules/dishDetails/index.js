// modules/dishDetails/index.js
// Просто экспортируем функцию инициализации

export function initDishDetails() {
  // Добавляем обработчики клика на ссылки "Состав"
  document.addEventListener('click', handleInfoLinkClick);
}

function handleInfoLinkClick(e) {
  // Проверяем, кликнули ли на ссылку "Состав"
  const infoLink = e.target.closest('.dish-info-link');
  if (!infoLink) return;
  
  e.preventDefault(); // Предотвращаем стандартное поведение
  
  const itemId = parseInt(infoLink.dataset.id);
  if (!itemId) return;
  
  // Импортируем и вызываем показ деталей
  import('./dishDetailsModal.js').then(module => {
    module.showDishDetails(itemId);
  }).catch(error => {
    console.error('Ошибка загрузки модуля деталей:', error);
  });
}