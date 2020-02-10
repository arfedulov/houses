<template>
  <b-button block class="show-more-btn" @click="loadMore">show more</b-button>
</template>

<script>
export const EVENTS = {
  LOAD_MORE: 'paginator:load-more',
};

export default {
  name: 'paginator',
  methods: {
    loadMore() {
      this.$emit(EVENTS.LOAD_MORE);
    },
  },
};
</script>

<style scoped>
.show-more-btn {
  margin: 10px auto;
  max-width: 10em;
}
</style>
