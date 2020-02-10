const ITEM_KEY = 'favorite-house-titles';

export default {
  getHouses: () => {
    const titles = localStorage.getItem(ITEM_KEY);
    return titles ? JSON.parse(titles) : [];
  },
  addFavorite: (title) => {
    const titles = JSON.parse(localStorage.getItem(ITEM_KEY) || '[]');
    localStorage.setItem(ITEM_KEY, JSON.stringify(Array.from(new Set([...titles, title]))));
  },
  removeFavorite: (title) => {
    const titles = JSON.parse(localStorage.getItem(ITEM_KEY) || '[]');
    localStorage.setItem(ITEM_KEY, JSON.stringify(titles.filter(t => t !== title)));
  },
};
