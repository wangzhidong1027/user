<template>
  <div class="invite">
    <div class="outside">
      <div>
        <img :src="goodinfo.images" alt="">
      </div>
      <div class="membership">
        <router-link to="/membership" tag="a" class="toa">开通即视为同意<span>《中能源超级会员服务协议》</span></router-link>
      </div>
      <div class="box">
        <group :gutter="0">
          <x-input v-model="mobile" placeholder="请输入手机号或会员账号" type="tel" is-type="china-mobile" required
                   ref="mobile"></x-input>
        </group>
        <group >
          <x-button :gradients="[ '#FF7500', '#FF9500']" @click.native="buy">{{goodinfo.price}}元购买会员</x-button>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, XButton} from "vux"
  import {mapMutations} from "vuex"

  export default {
    components: {
      Group,
      XInput,
      XButton
    },
    name: "invitePage",
    data() {
      return {
        mobile: '',
        goodinfo: ''
      }
    },
    methods: {
      ...mapMutations([
        "getOpenid"
      ]),
      wxpay(b) {
        var that = this
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', b,
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
          });
      },
      buy() {
        if (!this.$refs.mobile.valid) {
          return false
        }
        if (!localStorage.getItem("openid")) {
          this.$vux.toast.show({
            type: 'cancel',
            text: '签名错误，请点击右上角刷新页面',
            position: 'middle',
            isShowMask: true
          })
          return
        }
        this.$vux.loading.show()
        var data = {
          mobile: this.mobile,
          gid: this.$route.params.gid,
          type: this.$route.params.type,
          no: this.$route.params.no,
          openid: localStorage.getItem("openid")
        }
        data = this.$base64.encode(JSON.stringify(data))
        if (this.$route.params.type == 3) {
          this.$axios.post(this.$baseUrl + '/per/createorderesm', this.$qs.stringify({
            data: data
          })).then(result => {
            var res = JSON.parse(this.$base64.decode(result.data))
            if (res.code == 10000) {
              this.$vux.loading.hide()
              this.wxpay(res.data)
            } else {
              this.$vux.toast.show({
                type: "cancel",
                text: res.message,
                position: "middle",
                isShowMask: true
              });
            }
          })
        }else{
          this.$axios.post(this.$baseUrl + '/per/createordersm', this.$qs.stringify({
            data: data
          })).then(result => {
            var res = JSON.parse(this.$base64.decode(result.data))
            if (res.code == 10000) {
              this.$vux.loading.hide()
              this.wxpay(res.data)
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
    },
    created() {
      this.getOpenid(this.$base64.encode(location.href + "?openid="))
      var data = {
        id: this.$route.params.gid
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

<style lang="less">
  .weui-loading_toast weui-toast {
    width: 100px;
  }

  .invite {
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .outside {
      img {
        width: 100%;
        display: block;
      }
      .membership {
        background: #333333;
        text-align: center;
        width: 100%;
        line-height: 1rem;
        .toa {
          color: #d0cac0;
          span {
            color: rgb(255, 149, 0);
          }
        }
      }
    }
    .box {
      box-sizing: border-box;
      width: 100%;
      padding: 0 0.75rem;
      background: #333333;
      padding-bottom: 50px;
    }
  }
</style>
