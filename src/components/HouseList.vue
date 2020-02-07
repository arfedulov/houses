<template>
  <div>
    <div>
      <card
        class="card"
        v-for="house of houses"
        :key="house.title"
        :title="house.title"
      />
    </div>
    <b-button block class="show-more-btn" @click="loadNextPage">show more</b-button>
  </div>
</template>

<script>
import Card from './Card.vue';

export const EVENTS = {
  LOAD_PAGE: 'house-list:load-page',
};
export default {
  name: 'house-list',
  components: {
    Card,
  },
  props: {
    houses: Array,
    page: Number,
  },
  methods: {
    loadNextPage() {
      this.$emit(EVENTS.LOAD_PAGE, this.page + 1);
    },
  },
};
</script>

<style scoped>
.show-more-btn {
  margin: 10px auto;
  max-width: 10em;
}
.card {
  margin: 5px;
}
</style>
