/**
 * @file vue enter
 * @author windwithfo(windwithfo@yeah.net)
 */

// add mint-ui components
import 'component/config';

import Vue    from 'vue';
import app    from './app.vue';
import store  from './store';
import router from './router';

new Vue({
  router,
  store,
  render: (h) => h(app)
}).$mount('#app');
