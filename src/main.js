/**
 * @file vue enter
 * @author windwithfo(windwithfo@yeah.net)
 */

import 'babel-polyfill';
// add mint-ui components
import 'component/config';
import Vue    from 'vue';
import App    from './App';
import SEO    from 'plugin/SEO';
import store  from './vuex/store';
import router from './router/router';

Vue.config.debug = false;

// global css
import('./assets/css/common.less');

// add reference
Vue.use(SEO);

const app = new Vue({
  router,
  store,
  ...App
});

app.$mount('#app');
