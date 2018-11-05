<template>
  <div id="reister">
    <group :gutter="0">
      <x-input title="phone" v-model="phone" :max="11" type="tel" is-type="china-mobile" placeholder="填写手机号码"
               ref="phone">
        <span class="iconfont icon-ai-phone" slot="label" style="padding-right:10px;display:block;color: #666"></span>
      </x-input>
      <x-input title="验证码" class="weui-vcode" v-model="code" :plain="true" ref="code"  :min="6" :max="6"
               placeholder="填写验证码" >
      <span class="iconfont icon-securityCode-b" slot="label"
            style="padding-right:10px;display:block;color: #666"></span>
        <x-button slot="right" type="primary" mini :plain="true" @click.native="getcode">{{msg}}</x-button>
      </x-input>
    </group>
    <div class="button-box">
      <x-button :gradients="[ '#FF7500', '#FF9500']" @click.native="register">完成</x-button>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, XButton} from 'vux'

  export default {
    name: "reigster",
    components: {
      Group,
      XInput,
      XButton
    },
    data() {
      return {
        phone: "",
        code: "",
        codeType: (value) => {
          return this.$methods.checkType.check(value, 'code') ? {valid: true} : {valid: false, msg: '验证码为6位纯数字'}
        },
        time: 60,
        msg: '发送验证码'
      }
    },
    methods: {
      getcode() {
        if (!this.$refs.phone.valid) {
          this.$vux.toast.show({
            type: 'cancel',
            text: '请填写手机号',
            width: '3em',
            position: 'middle',
            isShowMask: true
          })
          return false
        }
        if (this.time != 60) {
          return
        } else {
          var data = {
            mobile: this.phone,
            type: 3,
          }
          this.$axios.post(this.$baseUrl + '/toolcate/sendSmsLogin', this.$qs.stringify({
            data: this.$base64.encode(JSON.stringify(data))
          })).then(result => {
            var res = JSON.parse(this.$base64.decode(result.data))
            if (res.code == 10000) {
              this.$vux.toast.show({
                type: 'text',
                text: '发送成功',
                width: '3em',
                position: 'top',
                isShowMask: true
              })
              this.count()
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                text: res.message,
                width: '3em',
                position: 'middle',
                isShowMask: true
              })
            }
          })
        }
      },
      count() {
        var timer = null;
        timer = setInterval(() => {
          if (this.time != 0) {
            this.time--
            this.msg = this.time + "s再次获取"
          } else {
            clearInterval(timer)
            timer = null
            this.time = 60
            this.msg = "发送验证码"
          }
        }, 1000)
      },
      register() {
        if (this.$refs.phone.valid && this.$refs.code.valid) {
          var formdata = this.$base64.encode(JSON.stringify({
            mobile: this.phone,
            code: this.code
          }))
          this.$axios.post(this.$baseUrl + '/per/register', this.$qs.stringify({
            data: formdata
          })).then(result => {
            var res = JSON.parse(this.$base64.decode(result.data))
            if (res.code == 10000) {
              this.$vux.toast.show({
                text: '注册成功',
                width: '3em',
                position: 'middle',
                isShowMask: true
              })
              setTimeout(() => {
                this.$router.push({
                  path: 'login'
                })
              }, 3000)
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                text: res.message,
                width: '3em',
                position: 'middle',
                isShowMask: true
              })
            }
          })
        } else {
          this.$vux.toast.show({
            type: 'cancel',
            text: "请填写正确信息",
            width: '3em',
            position: 'middle',
            isShowMask: true
          })
        }
      }
    }
  };
</script>

<style scoped lang="less">
  .weui-btn_plain-primary {
    border-color: #ff9900;
    color: #ff9900;
  }

  .button-box {
    padding: 0.5rem 0.4rem;
  }
</style>
