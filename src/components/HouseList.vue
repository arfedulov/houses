<template>
  <ul>
    <card
      v-for="house of houses"
      :key="house.title"
      :title="house.title"
    />
  </ul>
</template>

<script>
import Card from './Card.vue';

export const EVENTS = {
  LOAD_PAGE: 'house-list:load-page',
};
export default {
  name: 'house-list',
  components: {
    card: Card,
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
