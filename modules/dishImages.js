// modules/dishImages.js
const DISH_IMAGES = {
  'Ттокпокки': 'https://i.pinimg.com/1200x/e1/37/61/e13761e305b749a4babe1f12d1567c18.jpg',
  'Пибимпаб': 'https://i.pinimg.com/736x/7e/71/a6/7e71a6dcca86c8ec28f522a816e2c30b.jpg',
  'Чапче': 'https://www.918plate.com/wp-content/uploads/2019/09/Japchae-3.jpg',
  'Булочка Пан': 'https://i.pinimg.com/736x/0d/68/d6/0d68d6227532ef26a7608621fb11c3a5.jpg',
  'Айс-Латте': 'https://i.pinimg.com/1200x/0b/5b/3f/0b5b3f90aab1bd6016719e1055a3c36f.jpg',
  'Пульгоги': 'https://i.pinimg.com/736x/09/26/70/092670e1a9223e5a8d7e7b528bda137d.jpg',
  'Якква': 'https://i.pinimg.com/1200x/a2/ee/bd/a2eebd9b86a62d94126b834ae214c053.jpg',
  'Глясе': 'https://i.pinimg.com/1200x/5c/91/8b/5c918bb26305a86f70f099b7cfd18fa3.jpg',
  'Дамплинги': 'https://i.pinimg.com/736x/24/94/49/249449b4759c2fa11e7a47eee794119e.jpg',
};

export function getDishImage(dishName) {
  return DISH_IMAGES[dishName] || null;
}

export const DEFAULT_DISH_IMAGE = 'путь/к/изображению-по-умолчанию.jpg';