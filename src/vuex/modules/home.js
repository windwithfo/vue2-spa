import fetch from 'isomorphic-fetch';

const state = {
  count: 0,
  msg: ''
};

const mutations = {
  add(state) {
    // 变更状态
    state.count++;
  },
  setCount(state, count) {
    state.count = count;
  }
};
const actions = {
  async getData({ commit }, num) {
    console.log(num);
    const ret = await fetch('/static/mock/errorCode.json')
      .then((response) => response.json());
    commit('setCount', ret.count);
  }
};
const getters = {
  count: (state) => {
    return state.count;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
