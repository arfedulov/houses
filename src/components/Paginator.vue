<template>
  <div class="paginator">
    <b-button :disabled="!hasPrev" @click="loadPrevPage">prev page</b-button>
    <span class="currentPage">{{currentPage}}</span>
    <b-button :disabled="!hasNext" @click="loadNextPage">next page</b-button>
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
    items: { type: Number, required: true },
    itemsPerPage: { type: Number, required: true },
    totalItems: { type: Number, required: true },
  },
  computed: {
    hasPrev() {
      return this.currentPage > 1;
    },
    hasNext() {
      const loaded = this.currentPage * this.itemsPerPage;
      return (this.totalItems - loaded) > 0;
    },
  },
  methods: {
    loadMore() {
      this.$emit(EVENTS.LOAD_MORE);
    },
    loadPage(page) {
      if (page && page !== this.currentPage) {
        this.$emit(EVENTS.LOAD_PAGE, page);
      }
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
.paginator {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.currentPage {
  margin: 0 10px;
}
</style>
