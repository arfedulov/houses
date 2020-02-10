<template>
  <house-list
    :houses="houses"
    @house-list:add-house-to-favorite="addFavoriteHouse"
    @house-list:remove-house-from-favorite="removeFromFavoriteHouse"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import HouseList from '@/components/HouseList.vue';

export default {
  name: 'favorite',
  components: {
    HouseList,
  },
  computed: {
    ...mapState({
      houses: state => state.houses.filter(house => house.isFavorite),
    }),
  },
  methods: {
    ...mapMutations([
      'addFavoriteHouse',
      'removeFromFavoriteHouse',
    ]),
  },
};
</script>
