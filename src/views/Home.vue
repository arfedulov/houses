<template>
  <div>
    <search class="search-field" @search:submit="search" />
    <house-list
      :houses="houses"
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
import { mapActions, mapState, mapMutations } from 'vuex';
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
    ...mapState({
      houses: state => state.houses,
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
  },
};
</script>

<style scoped>
.search-field {
  max-width: 30em;
  margin: 10px auto;
}
</style>
