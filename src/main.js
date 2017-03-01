/**
 * @file vue enter
 * @author windwithfo(windwithfo@yeah.net)
 */

import App         from './App';
import SEO         from 'plugin/SEO';
import VueResource from 'vue-resource';
import router      from './router/router';

System.import('vue').then((Vue) => {
    // add mint-ui components
    require('component/config');

    // global css
    System.import('./assets/css/common.less');

    Vue.config.debug = false;

    // add reference
    Vue.use(SEO);
    Vue.use(VueResource);

    const app = new Vue({
        router,
        ...App
    });

    app.$mount('#app');
}, (e) => {
    console.log(e);
    console.log('error on main.js with vue import');
});
