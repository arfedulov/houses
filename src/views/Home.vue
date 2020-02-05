<template>
  <house-list :houses="houses" :page="page" />
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
    };
  },
  async created() {
    const data = await MOCK_API.getHouses('london', 1);
    this.houses = data.houses;
  },
  components: {
    'house-list': HouseList,
  },
};
</script>
