<template>
  <house-list :houses="houses" :page="page" />
</template>

<script>
import HouseList from '@/components/HouseList.vue';
import API from '@/services/api';

export default {
  name: 'home',
  data() {
    return {
      houses: [
        { title: 'aaa' },
        { title: 'bbb' },
        { title: 'ccc' },
      ],
      page: 1,
    };
  },
  async created() {
    const data = await API.getHouses('london');
    this.houses = data.houses;
  },
  components: {
    'house-list': HouseList,
  },
};
</script>
