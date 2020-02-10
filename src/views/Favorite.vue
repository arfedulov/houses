<template>
  <house-list
    :houses="houses"
    @house-list:add-house-to-favorite="addFavoriteHouse"
    @house-list:remove-house-from-favorite="removeFromFavoriteHouse"
    @house-list:go-to-apartment="goToApartment"
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
      houses: state => state.favoriteHouses,
    }),
  },
  methods: {
    ...mapMutations([
      'addFavoriteHouse',
      'removeFromFavoriteHouse',
    ]),
    goToApartment(title) {
      this.$router.push({
        name: 'apartment', params: { title },
      });
    },
  },
};
</script>
