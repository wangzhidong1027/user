<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

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
