import dedupeHouses from '@/utils/dedupeHouses';

const ITEM_KEY = 'favorite-houses';

const getHouses = () => {
  const houses = localStorage.getItem(ITEM_KEY);
  return houses ? JSON.parse(houses) : [];
};

const addFavorite = (house) => {
  const houses = JSON.parse(localStorage.getItem(ITEM_KEY) || '[]');
  houses.push(house);
  const normalized = dedupeHouses(houses).map(h => ({ ...h, isFavorite: true }));
  localStorage.setItem(ITEM_KEY, JSON.stringify(normalized));
};

const removeFavorite = (title) => {
  const houses = JSON.parse(localStorage.getItem(ITEM_KEY) || '[]');
  const updated = houses.filter(house => house.title !== title);
  localStorage.setItem(ITEM_KEY, JSON.stringify(updated));
};

export default {
  getHouses,
  addFavorite,
  removeFavorite,
};
