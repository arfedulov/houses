<template>
  <div>
    <div>
      <card
        v-for="house of houses"
        :key="house.title"
        :title="house.title"
        :is-favorite="house.isFavorite"
        class="card"
        @card:add-to-favorite="addHouseToFavorite"
        @card:remove-from-favorite="removeHouseFromFavorite"
        @card:go-to-details="goToApartment"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';

export const EVENTS = {
  ADD_HOUSE_TO_FAVORITE: 'house-list:add-house-to-favorite',
  REMOVE_HOUSE_FROM_FAVORITE: 'house-list:remove-house-from-favorite',
  GO_TO_APARTMENT: 'house-list:go-to-apartment',
};

export default {
  name: 'house-list',
  components: {
    Card,
  },
  props: {
    houses: { type: Array, default: () => [] },
  },
  methods: {
    addHouseToFavorite(title) {
      const house = this.houses.find(h => h.title === title);
      this.$emit(EVENTS.ADD_HOUSE_TO_FAVORITE, house);
    },
    removeHouseFromFavorite(title) {
      this.$emit(EVENTS.REMOVE_HOUSE_FROM_FAVORITE, title);
    },
    goToApartment(title) {
      this.$emit(EVENTS.GO_TO_APARTMENT, title);
    },
  },
};
</script>

<style scoped>
.card {
  margin: 5px;
}
</style>
