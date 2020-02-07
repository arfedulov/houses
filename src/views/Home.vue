<template>
  <div>
    <search @search:submit="search" class="search-field" />
    <house-list
      :houses="houses"
      @house-list:load-page="loadPage"
      :page="page"
    />
    <paginator @paginator:load-more="loadNextPage" />
  </div>
</template>

<script>
import HouseList from '@/components/HouseList.vue';
import Search from '@/components/Search.vue';
import Paginator from '@/components/Paginator.vue';
import API from '@/services/api';

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
  data() {
    return {
      houses: [],
      page: 1,
      city: '',
    };
  },
  async created() {
    this.loadPage(this.page);
  },
  components: {
    HouseList,
    Search,
    Paginator,
  },
  methods: {
    async loadPage(page) {
      if (!this.city) {
        return;
      }
      const data = await API.getHouses(this.city, page);
      this.page = page;
      this.houses = dedupeListings([...this.houses, ...data.houses]);
    },
    loadNextPage() {
      this.loadPage(this.page + 1);
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
