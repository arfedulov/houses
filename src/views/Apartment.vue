<template>
  <div class="container">
    <h1>{{apartment.title}}</h1>
    <b-img v-show="apartment.imageUrl" :src="apartment.imageUrl" />
    <div class="info">
      <div>
        price: {{apartment.price}}
      </div>
      <div>
        bedrooms: {{apartment.bedrooms}}
      </div>
      <div>
        keywords: {{apartment.keywords}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'apartment-view',
  props: {
    title: { type: String, required: true },
  },
  computed: {
    ...mapState({
      houses: state => state.houses,
    }),
    apartment() {
      return this.houses.find(house => house.title === this.title);
    },
    items() {
      return [
        { name: 'price', value: this.apartment.price },
      ];
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 30em;
  margin: auto;
}
.info .row {
  display: flex;
  justify-content: space-around;
}
</style>
