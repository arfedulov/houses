import Vue from 'vue';
import Vuex from 'vuex';
// import API from '@/services/api';
import API from '@/services/mockApi';
import FAVORITE_HOUSES from '@/services/favoriteHouses';
import filterHouses from '@/utils/filterHouses';

Vue.use(Vuex);

const dedupeListings = (listings) => {
  const usedTitles = new Set();
  const deduped = [];

  listings.forEach((house) => {
    if (!usedTitles.has(house.title)) {
      deduped.push(house);
      usedTitles.add(house.title);
    }
  });
  return deduped;
};

const addFavoriteProp = (houses) => {
  const favorite = FAVORITE_HOUSES.getHouses();
  return houses.reduce((acc, house) => {
    const isFavorite = favorite.map(h => h.title).includes(house.title);
    acc.push({ ...house, isFavorite });
    return acc;
  }, []);
};

const API_PROPS_TO_APP_MAP = new Map(Object.entries({
  img_url: 'imageUrl',
  title: 'title',
  price: 'price',
  price_currency: 'currency',
  bedroom_number: 'bedrooms',
  keywords: 'keywords',
}));

const mapPropsFromApi = houses => houses.reduce((acc, house) => {
  const h = {};
  Object.keys(house).forEach((key) => {
    if (API_PROPS_TO_APP_MAP.has(key)) {
      h[API_PROPS_TO_APP_MAP.get(key)] = house[key];
    } else {
      h[key] = house[key];
    }
  });
  acc.push(h);
  return acc;
}, []);

export default new Vuex.Store({
  state: {
    houses: [],
    favoriteHouses: FAVORITE_HOUSES.getHouses(),
    currentPage: 1,
    totalItems: 0,
  },
  mutations: {
    filterHouses(state, filters) {
      state.houses = filterHouses(state.houses, filters);
    },
    loadPageData(state, { houses, currentPage, totalItems }) {
      state.houses = mapPropsFromApi(addFavoriteProp(houses));
      state.currentPage = currentPage;
      state.totalItems = totalItems;
    },
    clearHouses(state) {
      state.houses = [];
    },
    addFavoriteHouse(state, favoriteHouse) {
      FAVORITE_HOUSES.addFavorite(favoriteHouse);
      state.houses = state.houses.reduce((acc, house) => {
        let h = house;
        if (house.title === favoriteHouse.title) {
          h = { ...house, isFavorite: true };
        }
        acc.push(h);
        return acc;
      }, []);
      state.favoriteHouses = [...state.favoriteHouses, { ...favoriteHouse, isFavorite: true }];
    },
    removeFromFavoriteHouse(state, title) {
      FAVORITE_HOUSES.removeFavorite(title);
      state.houses = state.houses.reduce((acc, house) => {
        let h = house;
        if (house.title === title) {
          h = { ...house, isFavorite: false };
        }
        acc.push(h);
        return acc;
      }, []);
      state.favoriteHouses = state.favoriteHouses.filter(house => house.title !== title);
    },
  },
  actions: {
    async loadHouses(context, { city, page }) {
      const pageData = await API.getHousesPage(city, page);
      if (pageData) {
        context.commit('loadPageData', {
          houses: dedupeListings(pageData.houses),
          currentPage: pageData.page,
          totalItems: pageData.totalItems,
        });
      }
    },
  },
  modules: {
  },
});
