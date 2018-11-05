<template>
  <div class="invite">
    <img :src="goodinfo.images" alt="">
    <div class="box">
      <group>
        <x-input v-model="mobile" placeholder="请输入手机号或会员账号" type="tel" is-type="china-mobile" required
                 ref="mobile"></x-input>
      </group>
      <group>
        <x-button :gradients="[ '#FF7500', '#FF9500']" @click.native="buy">购买会员</x-button>
      </group>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, XButton} from "vux"
  import { mapMutations } from "vuex"

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
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', b,
          function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              this.$vux.confirm.show({
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
        var data = {
          mobile: this.mobile,
          gid: this.$route.params.gid,
          type: this.$route.params.type,
          no: this.$route.params.no,
          openid: localStorage.getItem("openid")
        }
        data = this.$base64.encode(JSON.stringify(data))
        this.$axios.post(this.$baseUrl + '/per/createordersm', this.$qs.stringify({
          data: data
        })).then(result => {
          var res = JSON.parse(this.$base64.decode(result.data))
          if (res.code == 10000) {
            this.wxpay()
          } else {
            this.$vux.confirm.show({
              content: res.message,
              showCancelButton: false,
            })
          }
        })
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
            width: "3em",
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
    position: relative;
    img {
      width: 100%;
      display: block;
    }
    .box {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      padding: 0 0.75rem;
      background: #f8e51c;
      padding-bottom: 20px;
    }
  }
</style>