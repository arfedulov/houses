<template>
  <house-list :houses="houses" @house-list:load-page="loadPage" :page="page" />
</template>

<script>
import HouseList from '@/components/HouseList.vue';
// import API from '@/services/api';
import MOCK_API from '@/services/mockApi';

export default {
  name: 'home',
  data() {
    return {
      houses: [],
      page: 1,
      city: 'london',
    };
  },
  async created() {
    this.loadPage(this.page);
  },
  components: {
    'house-list': HouseList,
  },
  methods: {
    async loadPage(page) {
      if (!this.city) {
        return;
      }
      const data = await MOCK_API.getHouses(this.city, page);
      this.page = page;
      this.houses = [...this.houses, ...data.houses];
    },
  },
};
</script>
