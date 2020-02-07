<template>
  <div>
    <search class="search-field" @search:submit="search" />
    <house-list
      :houses="houses"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import HouseList from '@/components/HouseList.vue';
import Search from '@/components/Search.vue';
// import Paginator from '@/components/Paginator.vue';

export default {
  name: 'home',
  components: {
    HouseList,
    Search,
    // Paginator,
  },
  data() {
    return {
      page: 1,
      city: '',
    };
  },
  computed: mapState({
    houses: state => state.houses,
  }),
  mounted() {
    this.loadPage(this.page);
  },
  methods: {
    ...mapActions([
      'loadHouses',
    ]),
    ...mapMutations([
      'clearHouses',
    ]),
    async loadPage(page) {
      if (!this.city) {
        return;
      }
      await this.loadHouses(this.city, page);
      this.page = page;
    },
    search(value) {
      this.clearData();
      this.city = value;
      this.loadPage(this.page);
    },
    clearData() {
      this.page = 1;
      this.clearHouses();
    },
  },
};
</script>

<style scoped>
.search-field {
  max-width: 30em;
  margin: 10px auto;
}
</style>
