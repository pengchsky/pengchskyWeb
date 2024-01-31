import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
