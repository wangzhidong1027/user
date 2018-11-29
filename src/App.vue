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
        "getAddress",
        "getUserInfo"
      ]),
      getinfo() {
        this.$axios.post(this.$baseUrl + "/per/getuser", this.$qs.stringify({})).then(
          result => {
            var res = JSON.parse(this.$base64.decode(result.data));
            if (res.code === 10000) {
              localStorage.setItem("memberNo",res.data.memberNo)
              this.getUserInfo(res.data)
            } else {
              localStorage.clear()
              this.$vux.toast.show({
                type: "cancel",
                text: res.message,
                position: "middle",
                isShowMask: true
              })
            }
          });
      },
    },
    created () {
      this.getAddress();
      this.carInit();
      if(localStorage.getItem("Token")){
        this.getinfo()
      }
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
img {
  position: relative;
}
img::after {
  content: "";
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
