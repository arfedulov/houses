import Vue from 'vue';
import Vuex from 'vuex';
// import API from '@/services/api';
import API from '@/services/mockApi';

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

export default new Vuex.Store({
  state: {
    houses: [],
    currentPage: 1,
    totalItems: 0,
    favoriteHouses: [],
  },
  mutations: {
    loadHouses(state, houses) {
      state.houses = houses;
    },
    loadPageData(state, { houses, currentPage, totalItems }) {
      state.houses = houses;
      state.currentPage = currentPage;
      state.totalItems = totalItems;
    },
    clearHouses(state) {
      state.houses = [];
    },
    addFavoriteHouse(state, house) {
      if (!state.favoriteHouses.find(h => h.title === house.title)) {
        state.favoriteHouses.push(house);
      }
    },
    removeFromFavoriteHouse(state, title) {
      this.state.favoriteHouses = this.state.favoriteHouses
        .filter(house => house.title !== title);
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
