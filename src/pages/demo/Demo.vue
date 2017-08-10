<style lang="less">
  @import '../../assets/css/common';

  p {
    font-size: 14px;
  }
</style>

<template>
  <div id="demo">
  <p>一些Demo</p>
  </div>
</template>

<script>
  export default {
    created() {
      this.$setSEO({
        title: 'demo'
      });
      this.$http.get('/mock/errorCode').then((response) => {
        // success callback
        console.log(response);
      }, (response) => {
        // error callback
        console.log(response);
      });
    }
  };
</script>
