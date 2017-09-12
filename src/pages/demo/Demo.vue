<style lang="less">
  @import '../../assets/css/common';

  p {
    font-size: 14px;
  }
</style>

<template>
  <div id="demo">
    <p>一些Demo</p>
    <p>count: {{pageData.count}}</p>
    <button @click="add">add</button>
    <button @click="init">10</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageData: this.$store.state.home
      };
    },
    created() {
      this.$setSEO({
        title: 'demo'
      });
      // this.$http.get('/mock/errorCode').then((response) => {
      //   // success callback
      //   console.log(response);
      // }, (response) => {
      //   // error callback
      //   console.log(response);
      // });
    },
    methods: {
      add() {
        this.$store.commit('add');
      },
      init() {
        this.$store.dispatch('getData', 11);
      }
    }
  };
</script>
