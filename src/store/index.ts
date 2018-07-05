
/**
 * @file store入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

import Vue  from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

/** 插件注册 */
Vue.use(Vuex);

/** 创建store */
const store = new Vuex.Store({
  strict: true,
  state: {
    env: '',
    count: 0
  },
  mutations: {
    setEnv: (state, payload) => {
      Object.assign(state, payload);
    },
    add: (state) => {
      state.count += 1;
    },
    setCount: (state, payload) => {
      Object.assign(state, payload);
    }
  },
  actions: {
    getData({ commit }, payload) {
      commit('setCount', payload);
    }
  },
  // 子模块
  modules: {
    user
  }
});

export default store;
