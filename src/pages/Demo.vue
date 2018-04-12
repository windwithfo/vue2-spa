<style lang="less">
  @import '../assets/css/demo';

  p {
    font-size: 14px;
  }
</style>

<template>
  <div id="demo">
    <p>一些Demo</p>
    <p>count: {{pageData.count}}</p>
    <mt-button type="primary" @click="add">add</mt-button>
    <mt-button type="primary" @click="init">10</mt-button>
    <mt-button type="primary" @click="toast">toast</mt-button>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import fetch     from 'isomorphic-fetch';
  
  export default {
    data() {
      return {
        pageData: this.$store.state.home
      };
    },
    created() {
      this.$setSEO({
        title: 'Demo'
      });
      fetch('/mock/errorCode.json').then((response) => {
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
    },
    methods: {
      add() {
        this.$store.commit('add');
      },
      init() {
        this.$store.dispatch('getData', 11);
      },
      toast() {
        Toast('toast');
      }
    }
  };
</script>
