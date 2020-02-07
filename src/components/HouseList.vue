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
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'house-list',
  components: {
    Card,
  },
  props: {
    houses: { type: Array, default: () => [] },
    page: { type: Number, default: 1 },
  },
};
</script>

<style scoped>
.card {
  margin: 5px;
}
</style>
