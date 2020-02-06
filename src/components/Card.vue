<template>
  <b-card align="center">
    {{title}}
  </b-card>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: { type: String, required: true },
  },
};
</script>
