<template>
  <div class="vip">
    <div class="outside">
      <div class="imgbox">
        <img :src="goodinfo.images" alt="">
        <div class="membership">
          <router-link to="/membership" tag="a" class="toa">开通即视为同意<span>《中能源超级会员服务协议》</span></router-link>
        </div>
      </div>
    </div>
    <div class="bottom">
      <x-button :gradients="[ '#FF7500', '#FF9500']" @click.native="dredge">支付{{goodinfo.price | formatMoney}}元开通会员</x-button>
    </div>
  </div>
</template>

<script>
  import {XButton} from "vux"
  import {mapMutations} from "vuex"

  export default {
    name: "dredgeVIP",
    components: {
      XButton
    },
    data() {
      return {
        goodinfo: {}
      }
    },
    methods: {
      ...mapMutations([
        "getOpenid"
      ]),
      dredge() {
        if (!localStorage.getItem("Token")) {
          this.$vux.confirm.show({
            content: '您还未登录',
            showCancelButton: false,
            onConfirm: () => {
              this.$router.push({
                path: '/login'
              })
            }
          })
          return
        }
        if(!localStorage.getItem("openid")){
          this.$vux.toast.show({
            type: 'cancel',
            text: '签名错误，请点击右上角刷新页面',
            position: 'middle',
            isShowMask: true
          })
          return
        }
        this.$vux.loading.show()
        var that = this
        var data = {
          gid: this.$route.params.id,
          openid: localStorage.getItem("openid")
        }
        data = this.$base64.encode(JSON.stringify(data))
        this.$axios.post(this.$baseUrl + '/per/createorder', this.$qs.stringify({
          data: data
        })).then(result => {
          var res = JSON.parse(this.$base64.decode(result.data))
          if (res.code == 10000) {
            this.$vux.loading.hide()
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', res.data,
              function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  that.$vux.confirm.show({
                    content: '恭喜您，已成为会员，赶快登录享受优惠吧！',
                    showCancelButton: false,
                    onConfirm: () => {
                      this.$router.push({
                        path: '/me'
                      })
                    }
                  })
                }
              })
          }else{
            this.$vux.toast.show({
              type: "cancel",
              text: res.message,
              position: "middle",
              isShowMask: true
            });
          }
        })
      }
    },
    created() {
      this.getOpenid(this.$base64.encode(location.href + "?openid="))
      var data = {
        id: this.$route.params.id
      }
      this.$axios.post(this.$baseUrl + '/per/goodinfo', this.$qs.stringify({
        data: this.$base64.encode(JSON.stringify(data))
      })).then(result => {
        var res = JSON.parse(this.$base64.decode(result.data))
        if (res.code == 10000) {
          this.goodinfo = res.data
        } else {
          this.$vux.toast.show({
            type: "cancel",
            text: res.message,
            position: "middle",
            isShowMask: true
          });
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .vip {
    height: 100%;
    width: 100%;
    background: #f5f5f5;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .outside{
      flex: 1;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .imgbox {
      width: 100%;
      position: relative;
      img {
        display: block;
        width: 100%;
      }
    }
    .bottom {
      width: 100%;
    }
    .membership{
      position: absolute;
      bottom: 10px;
      left: 0;
      text-align: center;
      width: 100%;
      .toa{
        color: #d0cac0;
        span{
          color: rgb(255, 149, 0);
        }
      }
    }
  }
</style>
