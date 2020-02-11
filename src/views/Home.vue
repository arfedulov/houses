<template>
  <div>
    <search class="search-field" @search:submit="search" />
    <house-list
      :houses="houses"
      @house-list:add-house-to-favorite="addFavoriteHouse"
      @house-list:remove-house-from-favorite="removeFromFavoriteHouse"
      @house-list:go-to-apartment="goToApartment"
    />
    <paginator
      v-show="totalItems"
      :current-page="currentPage"
      :items="itemsOnPage"
      :items-per-page="itemsOnPage"
      :total-items="totalItems"
      @paginator:load-page="loadPage"
    />
  </div>
</template>

<script>
import {
  mapActions, mapState, mapMutations, mapGetters,
} from 'vuex';
import HouseList from '@/components/HouseList.vue';
import Search from '@/components/Search.vue';
import Paginator from '@/components/Paginator.vue';

export default {
  name: 'home',
  components: {
    HouseList,
    Search,
    Paginator,
  },
  data() {
    return {
      city: '',
    };
  },
  computed: {
    ...mapGetters([
      'houses',
    ]),
    ...mapState({
      currentPage: state => state.currentPage,
      totalItems: state => state.totalItems,
    }),
    itemsOnPage() {
      return this.houses.length;
    },
  },
  mounted() {
    this.loadPage(this.currentPage);
  },
  methods: {
    ...mapActions([
      'loadHouses',
    ]),
    ...mapMutations([
      'clearHouses',
      'addFavoriteHouse',
      'removeFromFavoriteHouse',
    ]),
    async loadPage(page) {
      if (!this.city) {
        return;
      }
      await this.loadHouses({ city: this.city, page });
    },
    search(value) {
      this.clearData();
      this.city = value;
      this.loadPage(this.currentPage);
    },
    clearData() {
      this.clearHouses();
    },
    goToApartment(title) {
      this.$router.push({
        name: 'apartment', params: { title },
      });
    },
  },
};
</script>

<style scoped>
.search-field {
  max-width: 30em;
  margin: 10px auto;
}
</style>
