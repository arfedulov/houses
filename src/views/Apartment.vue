<template>
  <div>
    <h1>{{apartment.title}}</h1>
    <img :src="apartment.imageUrl" />
    <div>
      price: {{apartment.price}}
    </div>
    <div>
      bedrooms: {{apartment.bedrooms}}
    </div>
    <div>keywords: {{apartment.keywords}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'apartment-view',
  props: {
    title: { type: String, required: true },
  },
  computed: {
    ...mapState({
      apartment: state => state.houses.find(house => house.title === this.title),
    }),
  },
};
</script>
