<template lang="pug">
  .levelSelect(v-show="rootFlag")
    .selected(v-show="selectedFlag && result.text.length > 0")
      template(v-for="(item, index) in result.text")
        span(v-html="item" :key="index")
        i.iconfont.icon(v-if="index !== result.text.length - 1" :key="index") &#xe60e;
    .levelBox.bgfff
      ul.level
        li(v-for="(item, index) in filter" @click="check(index)" :key="index")
          span(v-html="item.text")
          i.icon.iconfont &#xe65a;
    .level2(v-show="level2Flag")
      .level2Scroll.bgfff
        .title
          p(v-html="nodeText2")
          i.icon.iconfont(@click="close(2)") &#xe65b;
          li(v-for="(item, index) in nodes2" @click="check2(index, level)" :key="index")
            span(v-html="item.text")
            i.icon.iconfont &#xe65a;
    .level3"(v-show="level3Flag")
      .level3Scroll.bgfff
        .title
          p(v-html="nodeText3")
          i.icon.iconfont(@click="close(3)") &#xe65b;
          li(v-for="(item, index) in nodes3" @click="check3(index, level)" :key="index")
            span(v-html="item.text")
            i.icon.iconfont &#xe65a;
</template>

<script>
  import {
    Vue,
    Prop,
    Component
  } from 'vue-property-decorator';

  /**
   * @param Array filter 3级数据
   * @param =string filter.type [jump|close] 选择完成后处理方式
   * @param =string filter.url 当filter.type为jump时的跳转地址
   * @param =stirng value 当filter.type为close时给父级的回传值对象
   */
  export default class extends Vue {
    name = 'levelSelect';

    @Prop filter;
    @Prop value;

    selectedFlag = false;
    rootFlag = true;
    level2Flag = false;
    level3Flag = false;
    nodeText2 = '';
    nodeText3 = '';
    level = 1;
    nodes2 = [];
    nodes3 = [];
    result = {
      text: [],
      value: []
    };

    check(index) {
      if (this.filter[index].subItem && this.filter[index].subItem.length > 0) {
        this.nodeText2 = this.filter[index].text;
        this.nodes2 = this.filter[index].subItem;
        this.level2Flag = true;
        let domLevelHeight = document.querySelector('.levelBox').style.height;
        document.querySelector('.level2').style.height = domLevelHeight;
        document.querySelector('.level2Scroll').style.height = domLevelHeight;
        this.level++;
        this.result.text.push(this.nodeText2);
        this.result.value.push(this.filter[index].value);
      }
      else {
        let val = this.filter[index].value;
        this.levelEnd(val);
      }
    }

    check2(index) {
      if (this.nodes2[index].subItem && this.filter[index].subItem.length > 0) {
        this.nodeText3 = this.nodes2[index].text;
        this.nodes3 = this.nodes2[index].subItem;
        this.level3Flag = true;
        let domLevelHeight = document.querySelector('.levelBox').style.height;
        document.querySelector('.level3').style.height = domLevelHeight;
        document.querySelector('.level3Scroll').style.height = domLevelHeight;
        this.level++;
        this.result.text.push(this.nodeText3);
        this.result.value.push(this.nodes2[index].value);
      }
      else {
        let val = this.nodes2[index].value;
        this.result.value.push(val);
        this.levelEnd(val);
      }
    }

    check3(index) {
      let val = this.nodes3[index].value;
      this.result.text.push(this.nodes3[index].text);
      this.result.value.push(val);
      this.levelEnd(val);
    }

    close(level) {
      this['level' + level + 'Flag'] = false;
      this.level--;
      this.result.text.pop();
      this.result.value.pop();
    }

    levelEnd(val) {
      if (this.filter.type === 'jump') {
        let url = '';
        if (this.filter.homeType === 'mcc') {
          url = this.filter.url + this.result.value.join('-') + '/'
          + encodeURIComponent(this.result.text.join(','));
          this.reset();
        }
        else if (this.filter.homeType === 'search') {
          url = this.filter.url + this.result.value.join('-').split('-')[2];
        }
        window.location.href = url;
      }
      if (this.filter.type === 'close') {
        this.reset();
        this.result.value.push(val);
        this.$parent[this.value] = this.result;
        this.rootFlag = false;
      }
    }

    reset() {
      this.rootFlag = true;
      this.level2Flag = false;
      this.level3Flag = false;
      this.nodeText2 = '';
      this.nodeText3 = '';
      this.level = 1;
      this.result.text = [];
      this.result.value = [];
    }
  }
</script>

<style lang="less">
  @import '../assets/style/mixin';

  .levelSelect {
    position: relative;

    .selected {
      height: 50px;
      line-height: 50px;
      .fs(16);
      color: @fc_9;
      text-indent: 10px;

      i {
        margin: 0 20px;
      }
    }

    .levelBox {
      position: relative;
      z-index: 1;
      overflow-y: scroll;
    }

    .level2Scroll,
    .level3Scroll {
      overflow-y: scroll;
    }

    .level2,
    .level3,
    ul {
      .bg(#fff);
      color: @fc_3;
      font-size: @fs_14;
      line-height: 29px;
      position: relative;
      z-index: 1;

      a {
        color: @fc_3;
      }

      i {
        color: #dadada;
      }

      li {
        .flex('all');
        padding: 10px;
        border-bottom: solid 1px #dadada;

        &:hover {
          color: #fd7468;
        }
      }
    }

    p {
      padding: 0 10px;
      color: #fd7468;
    }

    .level2,
    .level3 {
      position: absolute;
      width: 85%;
      min-height: auto;
      .bg(rgba(0, 0, 0, .5));
      padding-left: 15%;
      top: 0;
      z-index: 2;

      .title {
        .flex('all');
        .bg(#edf1f2);
        padding: 10px 10px 10px 0;
        border-bottom: solid 1px #dadada;

        i {
          color: #fd7468;
        }
      }

      li {
        padding: 10px 10px 10px 20px;
      }

      i {
        margin-right: 10px;
      }
    }

    .level3 {
      padding-left: 30%;
      width: 70%;
      z-index: 3;
    }
  }
</style>
