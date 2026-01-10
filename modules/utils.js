// modules/utils.js - ОБНОВЛЕННАЯ ВЕРСИЯ
export function formatTime(totalMinutes) {
  if (totalMinutes === 0) return "0 минут";
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours === 0) {
    return `${minutes} ${getMinutesText(minutes)}`;
  } else if (minutes === 0) {
    return `${hours} ${getHoursText(hours)}`;
  } else {
    return `${hours} ${getHoursText(hours)} ${minutes} ${getMinutesText(minutes)}`;
  }
}

function getHoursText(hours) {  // ← сделать НЕ экспортируемой
  if (hours % 10 === 1 && hours % 100 !== 11) return "час";
  if (hours % 10 >= 2 && hours % 10 <= 4 && 
      (hours % 100 < 10 || hours % 100 >= 20)) return "часа";
  return "часов";
}

function getMinutesText(minutes) {  // ← сделать НЕ экспортируемой
  if (minutes % 10 === 1 && minutes % 100 !== 11) return "минута";
  if (minutes % 10 >= 2 && minutes % 10 <= 4 && 
      (minutes % 100 < 10 || minutes % 100 >= 20)) return "минуты";
  return "минут";
}

export function calculateOrderTime(dishes) {
  if (!dishes || dishes.length === 0) return 0;
  
  if (dishes.length === 1) {
    return dishes[0].time + 5;
  }
  
  const maxTime = Math.max(...dishes.map(item => item.time));
  const buffer = dishes.length <= 2 ? 5 : 
                 dishes.length <= 4 ? 8 : 10;
  
  return maxTime + buffer;
}

export function generateOrderId() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

// ДОБАВЬТЕ эти функции:
export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Ошибка сохранения в localStorage (${key}):`, error);
    return false;
  }
}

export function getFromStorage(key, defaultValue = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Ошибка чтения из localStorage (${key}):`, error);
    return defaultValue;
  }
}