<template lang="pug">
  #app
    router-view
</template>

<script lang="ts">
  import {
    Vue,
    Component
  } from 'vue-property-decorator';

  @Component
  export default class extends Vue {}
</script>

<style lang="less">
  @import './assets/style/common';
  @import './assets/style/mixin';

  #app {
    font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
	}
</style>
