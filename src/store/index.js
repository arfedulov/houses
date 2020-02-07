import Vue from 'vue';
import Vuex from 'vuex';
import API from '@/services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    houses: [],
    favoriteHouses: [],
  },
  mutations: {
    loadHouses(state, houses) {
      state.houses = houses;
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
        context.commit('loadHouses', houses);
      }
    },
  },
  modules: {
  },
});
