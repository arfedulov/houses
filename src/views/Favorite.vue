<template>
  <house-list
    :houses="houses"
  />
</template>

<script>
import { mapState } from 'vuex';
import HouseList from '@/components/HouseList.vue';

export default {
  name: 'favorite',
  components: {
    HouseList,
  },
  computed: {
    ...mapState({
      houses: state => state.favoriteHouses,
    }),
  },
};
</script>
