<template>
  <!-- <b-pagination :current-page="currentPage" @input="loadPage" /> -->
  <div>
    <button @click="loadPrevPage">prev</button>
    <div>{{currentPage}}</div>
    <button @click="loadNextPage">next</button>
  </div>
</template>

<script>
export const EVENTS = {
  LOAD_PAGE: 'paginator:load-page',
};

export default {
  name: 'paginator',
  props: {
    currentPage: { type: Number, required: true },
  },
  methods: {
    loadMore() {
      this.$emit(EVENTS.LOAD_MORE);
    },
    loadPage(page) {
      this.$emit(EVENTS.LOAD_PAGE, page);
    },
    loadNextPage() {
      this.loadPage(this.currentPage + 1);
    },
    loadPrevPage() {
      this.loadPage(this.currentPage - 1);
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
