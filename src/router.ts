/**
 * @file router
 * @author windwithfo(windwithfo@yeah.net)
 */

import Vue       from 'vue';
import VueRouter from 'vue-router';

// components
const Demo = () => import('./views/Demo.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'demo',
    component: Demo
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

export default router;
