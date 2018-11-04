<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  import { mapMutations } from "vuex"
  export default {
    methods: {
      ...mapMutations([
        "carInit",
        "getAddress"
      ])
    },
    created () {
      this.getAddress();
      this.carInit();
    }
  }
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import '~vux/src/styles/close.less';
@import './assets/icon/iconfont.css';
html,body,#app {
  height: 100%;
  width: 100%;
}
.weui-toast{
  min-height: 0;
}
</style>
