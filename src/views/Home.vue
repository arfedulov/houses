<template>
  <div>
    <search class="search-field" @search:submit="search" />
    <house-list
      :houses="houses"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import HouseList from '@/components/HouseList.vue';
import Search from '@/components/Search.vue';
// import Paginator from '@/components/Paginator.vue';

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

export default {
  name: 'home',
  components: {
    HouseList,
    Search,
    // Paginator,
  },
  data() {
    return {
      page: 1,
      city: '',
    };
  },
  computed: mapState({
    houses: state => state.houses,
  }),
  mounted() {
    this.loadPage(this.page);
  },
  methods: {
    ...mapActions([
      'loadHouses',
    ]),
    async loadPage(page) {
      if (!this.city) {
        return;
      }
      await this.loadHouses(this.city, page);
      this.page = page;
      this.houses = dedupeListings(this.houses);
    },
    search(value) {
      this.clearData();
      this.city = value;
      this.loadPage(this.page);
    },
    clearData() {
      this.page = 1;
      this.houses = [];
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
