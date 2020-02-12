import Vue from 'vue';
import Vuex from 'vuex';
import apiService from '@/services/api';
import favoriteHousesService from '@/services/favoriteHouses';
import filterHouses from '@/utils/filterHouses';
import dedupeHouses from '@/utils/dedupeHouses';

Vue.use(Vuex);

const addFavoriteProp = (houses) => {
  const favorite = favoriteHousesService.getHouses();
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

/** Convert prop names from the format api uses to app format. */
const mapPropsFromApi = houses => houses.reduce((acc, house) => {
  const renamed = {};
  Object.keys(house).forEach((key) => {
    if (API_PROPS_TO_APP_MAP.has(key)) {
      renamed[API_PROPS_TO_APP_MAP.get(key)] = house[key];
    } else {
      renamed[key] = house[key];
    }
  });
  acc.push(renamed);
  return acc;
}, []);

export default new Vuex.Store({
  state: {
    allHouses: [],
    favoriteHouses: favoriteHousesService.getHouses(),
    currentPage: 1,
    totalItems: 0,
    filters: {
      showAll: true,
      priceFrom: 0,
      priceTo: 0,
      bedroomsFrom: 0,
      bedroomsTo: 0,
      hasImage: false,
    },
  },
  getters: {
    houses: state => filterHouses(state.allHouses, state.filters),
  },
  mutations: {
    filterHouses(state, filters) {
      state.filters = filters;
    },
    loadPageData(state, { houses, currentPage, totalItems }) {
      state.allHouses = mapPropsFromApi(addFavoriteProp(houses));
      state.currentPage = currentPage;
      state.totalItems = totalItems;
    },
    clearHouses(state) {
      state.allHouses = [];
    },
    addFavoriteHouse(state, favoriteHouse) {
      favoriteHousesService.addFavorite(favoriteHouse);
      state.allHouses = state.allHouses.reduce((acc, house) => {
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
      favoriteHousesService.removeFavorite(title);
      state.allHouses = state.allHouses.reduce((acc, house) => {
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
      const pageData = await apiService.getHousesPage(city, page);
      if (pageData) {
        context.commit('loadPageData', {
          houses: dedupeHouses(pageData.houses),
          currentPage: pageData.page,
          totalItems: pageData.totalItems,
        });
      }
    },
  },
  modules: {
  },
});
