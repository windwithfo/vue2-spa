/**
 * @file vue enter
 * @author windwithfo(windwithfo@yeah.net)
 */

// add mint-ui components
import 'babel-polyfill';
import 'component/config';
import Vue         from 'vue';
import App         from './App';
import SEO         from 'plugin/SEO';
import VueResource from 'vue-resource';
import store       from './vuex/store';
import router      from './router/router';

// global css
import('./assets/css/common.less');

Vue.config.debug = false;

// add reference
Vue.use(SEO);
Vue.use(VueResource);

const app = new Vue({
  router,
  store,
  ...App
});

app.$mount('#app');
