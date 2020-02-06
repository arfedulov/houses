<template>
  <div>
    <search @search:submit="search" class="search-field" />
    <house-list
      :houses="houses"
      @house-list:load-page="loadPage"
      :page="page"
    />
  </div>
</template>

<script>
import HouseList from '@/components/HouseList.vue';
import Search from '@/components/Search.vue';
import API from '@/services/api';
// import MOCK_API from '@/services/mockApi';

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
    'house-list': HouseList,
    search: Search,
  },
  methods: {
    async loadPage(page) {
      if (!this.city) {
        return;
      }
      const data = await API.getHouses(this.city, page);
      this.page = page;
      this.houses = [...this.houses, ...data.houses];
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
