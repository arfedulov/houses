<template>
  <b-input-group prepend="search">
    <b-form-input type="text" v-model="value" placeholder="city" />
    <b-input-group-append>
      <b-button @click="submit">search</b-button>
    </b-input-group-append>
  </b-input-group>
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
