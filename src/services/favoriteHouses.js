const ITEM_KEY = 'favorite-houses';

export default {
  getHouses: () => {
    const houses = localStorage.getItem(ITEM_KEY);
    return houses ? JSON.parse(houses) : [];
  },
  addFavorite: (house) => {
    const houses = JSON.parse(localStorage.getItem(ITEM_KEY) || '[]');
    localStorage.setItem(ITEM_KEY, JSON.stringify(Array.from(new Set([...houses, house]))));
  },
  removeFavorite: (title) => {
    const titles = JSON.parse(localStorage.getItem(ITEM_KEY) || '[]');
    localStorage.setItem(ITEM_KEY, JSON.stringify(titles.filter(t => t !== title)));
  },
};
