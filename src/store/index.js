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
    favoriteHouses: [],
  },
  mutations: {
    loadHouses(state, houses) {
      state.houses = houses;
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
    async loadHouses(context, city, page) {
      const houses = await API.getHouses(city, page);
      if (houses) {
        context.commit('loadHouses', dedupeListings(houses));
      }
    },
  },
  modules: {
  },
});
