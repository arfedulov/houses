<template>
  <div>
    <input type="checkbox" checked="showAll" @change="applyFilters" />
    <input type="number" value="priceFrom" @change="applyFilters" />
    <input type="number" value="priceTo" @change="applyFilters" />
    <input type="number" value="bedroomsFrom" @change="applyFilters" />
    <input type="number" value="bedroomsTo" @change="applyFilters" />
    <input type="checkbox" checked="hasImage" @change="applyFilters" />
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
  methods: {
    ...mapMutations([
      'filterHouses',
    ]),
    applyFilters() {
      this.filterHouses({
        showAll: this.showAll,
        priceFrom: this.priceFrom,
        priceTo: this.priceTo,
        bedroomsFrom: this.bedroomsFrom,
        bedroomsTo: this.bedroomsTo,
        hasImage: this.hasImage,
      });
    },
  },
};
</script>
