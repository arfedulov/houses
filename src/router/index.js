import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Favorite from '@/views/Favorite.vue';
import Apartment from '@/views/Apartment.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite,
  },
  {
    path: '/apartment/:title',
    name: 'apartment',
    component: Apartment,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
