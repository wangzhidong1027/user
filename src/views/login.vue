<template>
  <div id="login">
    <group :gutter="0">
      <x-input title="phone" v-model="phone" :max="11" type="tel" is-type="china-mobile" ref="phone"
               placeholder="填写手机号" required>
        <span class="iconfont icon-ai-phone" slot="label" style="padding-right:10px;display:block;color: #666"></span>
      </x-input>
      <x-input title="code" v-model="code" ref="code" :min="6" :max="6" placeholder="填写验证码" required>
          <span class="iconfont icon-securityCode-b" slot="label"
                style="padding-right:10px;display:block;color: #666"></span>
        <x-button slot="right" type="primary" mini :plain="true" @click.native="getcode">{{msg}}</x-button>
      </x-input>
    </group>
    <div class="button-box">
      <x-button :gradients="[ '#FF7500', '#FF9500']" @click.native="login">登录</x-button>
      <div class="link">
        <router-link name="li" to="/reigster">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Tab,
    TabItem,
    XInput,
    XButton,
    Group
  } from "vux"

  export default {
    name: "Login",
    components: {
      Tab,
      TabItem,
      XButton,
      XInput,
      Group
    },
    data() {
      return {
        phone: '',
        password: '',
        code: '',
        msg: '发送验证码',
        time: 60
      };
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
          });
          return false
        }
        if (this.time != 60) {
          return false;
        } else {
          // this.$axios.post(this.$baseUrl + '/per/login', this.$qs.stringify({
          // 	data: this.phone
          // })).then(result => {
          // 	var res = JSON.parse(this.$base64.decode(result.data))
          // 	if (res.code == 10000) {
          this.$vux.toast.show({
            type: 'text',
            text: '发送成功',
            width: '3em',
            position: 'top',
            isShowMask: true
          });
          this.count();
          // 	} else {
          // 		this.$vux.toast.show({
          // 			type: 'cancel',
          // 			text: res.message,
          // 			width: '3em',
          // 			position: 'middle',
          // 			isShowMask: true
          // 		})
          // 	}
          // })
        }
      },
      count() {
        let timer = null;
        timer = setInterval(() => {
          if (this.time != 0) {
            this.time--;
            this.msg = this.time + "s再次获取";
          } else {
            clearInterval(timer);
            timer = null;
            this.time = 60;
            this.msg = "发送验证码";
          }
        }, 1000);
      },
      submit(data) {
        this.$axios.post(this.$baseUrl + '/per/login', this.$qs.stringify({
          data: data
        })).then(result => {
          const res = JSON.parse(this.$base64.decode(result.data))
          if (res.code == 10000) {
            localStorage.setItem('Token', res.data)
            this.$vux.toast.show({
              text: "登录成功",
              width: "3em",
              position: "middle",
              isShowMask: true
            });
            setTimeout(() => {
              this.$router.push({
                path: 'me'
              });
            }, 3000);
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
      },
      login() {
        if (this.$refs.phone.valid && this.$refs.code.valid) {
          let formdata = this.$base64.encode(JSON.stringify({mobile: this.phone, code: this.code}));
          this.submit(formdata);
        } else {
          this.$vux.toast.show({
            type: "cancel",
            text: "请填写正确信息",
            width: "3em",
            position: "middle",
            isShowMask: true
          });
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~vux/src/styles/center.less";

  .button-box {
    padding: 0.3rem;
    padding-top: 0.5rem;
  }

  .link {
    padding-top: 0.3rem;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    a {
      color: rgb(255, 153, 0);
    }
  }

  .weui-btn_plain-primary {
    border-color: #ff9900;
    color: #ff9900;
  }
</style>
