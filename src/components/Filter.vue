<template>
  <div class="filter">
    <h2>filters</h2>
    <b-form-checkbox v-model="showAll">show all</b-form-checkbox>
    <div>
      <label for="priceFrom">price from</label>
      <b-form-input id="priceFrom" type="number" v-model="priceFrom" />
    </div>
    <div>
      <label for="priceTo">price to</label>
      <b-form-input id="priceTo" type="number" v-model="priceTo" />
    </div>
    <div>
      <label for="bedroomsFrom">bedrooms from</label>
      <b-form-input id="bedroomsFrom" type="number" v-model="bedroomsFrom" />
    </div>
    <div>
      <label for="bedroomsTo">bedrooms to</label>
      <b-form-input id="bedroomsTo" type="number" v-model="bedroomsTo" />
    </div>
    <b-form-checkbox v-model="hasImage">with image</b-form-checkbox>
    <b-button class="apply-btn" @click="applyFilters">apply</b-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'house-filter',
  data() {
    return {
      showAll: true,
      priceFrom: 0,
      priceTo: 0,
      bedroomsFrom: 0,
      bedroomsTo: 0,
      hasImage: false,
    };
  },
  computed: {
    filters() {
      return {
        showAll: this.showAll,
        priceFrom: this.priceFrom,
        priceTo: this.priceTo,
        bedroomsFrom: this.bedroomsFrom,
        bedroomsTo: this.bedroomsTo,
        hasImage: this.hasImage,
      };
    },
  },
  methods: {
    ...mapMutations([
      'filterHouses',
    ]),
    applyFilters() {
      this.filterHouses(this.filters);
    },
  },
};
</script>

<style scoped>
.filter {
  display: flex;
  flex-direction: column;
  width: 10em;
}
.apply-btn {
  margin-top: 10px;
}
</style>
