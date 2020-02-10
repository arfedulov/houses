<template>
  <b-pagination
    :current-page="currentPage"
    :per-page="itemsPerPage"
    :total-rows="totalItems"
    align="center"
    limit="3"
    @input="loadPage"
  />
</template>

<script>
export const EVENTS = {
  LOAD_PAGE: 'paginator:load-page',
};

export default {
  name: 'paginator',
  props: {
    currentPage: { type: Number, required: true },
    items: { type: Number, required: true },
    itemsPerPage: { type: Number, required: true },
    totalItems: { type: Number, required: true },
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
