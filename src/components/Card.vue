<template>
  <b-card align="center">
    <h2 @click="goToDetails">{{title}}</h2>
    <b-button
      @click="toggleFavorite"
    >{{isFavorite ? 'remove from favorite' : 'add to favorite'}}</b-button>
  </b-card>
</template>

<script>
export const EVENTS = {
  ADD_TO_FAVORITE: 'card:add-to-favorite',
  REMOVE_FROM_FAVORITE: 'card:remove-from-favorite',
  GO_TO_DETAILS: 'card:go-to-details',
};

export default {
  name: 'card',
  props: {
    title: { type: String, required: true },
    isFavorite: { type: Boolean, default: false },
  },
  methods: {
    toggleFavorite() {
      const event = this.isFavorite ? EVENTS.REMOVE_FROM_FAVORITE : EVENTS.ADD_TO_FAVORITE;
      this.$emit(event, this.title);
    },
    goToDetails() {
      this.$emit(EVENTS.GO_TO_DETAILS, this.title);
    },
  },
};
</script>
