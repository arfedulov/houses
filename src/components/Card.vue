<template>
  <b-card align="center">
    {{title}}
    <button
      @click="toggleFavorite"
    >{{isFavorite ? 'remove from favorite' : 'add to favorite'}}</button>
  </b-card>
</template>

<script>
export const EVENTS = {
  ADD_TO_FAVORITE: 'card:add-to-favorite',
  REMOVE_FROM_FAVORITE: 'card:remove-from-favorite',
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
  },
};
</script>
