<template>
  <div>
    <input type="text" v-model="value" />
    <button @click="submit">search</button>
  </div>
</template>

<script>
export const EVENTS = {
  SUBMIT: 'search:submit',
};
export default {
  name: 'search',
  data() {
    return {
      value: '',
    };
  },
  methods: {
    submit() {
      this.$emit(EVENTS.SUBMIT, this.value);
    },
  },
};
</script>
