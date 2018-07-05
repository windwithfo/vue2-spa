<template lang="pug">
  #demo
    p 一些Demo
    p count: {{ count }}
    mt-button(type="primary" @click="add") add
    mt-button(type="primary" @click="init") 10
    mt-button(type="primary" @click="toast") toast
</template>

<script lang="ts">
  import { Toast } from 'mint-ui';
  import fetch     from 'isomorphic-fetch';

  import {
    Vue,
    Component
  } from 'vue-property-decorator';

  import {
    State
  } from 'vuex-class';

  @Component
  export default class extends Vue {
    @State count;

    arr = [
      1,
      2,
    ];

    obj = {
      name: 'name',
      type: 1,
    };

    created() {
      fetch('static/mock/errorCode.json').then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        // body to json
        return response.json();
      }).then((json) => {
        // success callback
        console.log(json);
      }, (error) => {
        // error callback
        console.log(error);
      });
    }

    add() {
      this.$store.commit('add');
    }

    init() {
      this.$store.dispatch('getData', { count: 11 });
    }

    toast() {
      Toast('toast');
    }
  }
</script>

<style lang="less">
  @import '../assets/style/demo';

  p {
    font-size: 14px;
  }
</style>
