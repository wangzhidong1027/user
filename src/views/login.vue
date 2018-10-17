<template>
    <div id="login">
        <tab active-color="#ff9900">
            <tab-item selected @on-item-click="onItemClick">密码登录</tab-item>
            <tab-item @on-item-click="onItemClick">短信登录</tab-item>
        </tab>
        <div v-show="showIndex === 0">
            <group :gutter="0">
                <x-input title="phone" v-model="phone" :max="11" type="tel" is-type="china-mobile"></x-input>
                <x-input title="password" v-model="password" type="password"></x-input>
            </group>
            <div class="button-box">
                <x-button :gradients="[ '#FF7500', '#FF9500']" @click.native="login">登录</x-button>
                <div class="link">
                    <router-link name="li" to="/reigster">注册</router-link>
                    <router-link name="li" to="/home">忘记密码</router-link>
                </div>
            </div>
        </div>
        <div v-show="showIndex === 1">
            <group :gutter="0">
                <x-input title="phone" v-model="phone" :max="11" type="tel" is-type="china-mobile"></x-input>
                <x-input title="code" v-model="code" :max="6">
                    <x-button slot="right" type="primary" mini  :plain="true">发送验证码</x-button>
                </x-input>
            </group>
            <div class="button-box">
                <x-button :gradients="[ '#FF7500', '#FF9500']" @click.native="login">登录</x-button>
                <div class="link">
                    <router-link name="li" to="/reigster">注册</router-link>
                    <router-link name="li" to="/home">忘记密码</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {Tab, TabItem, XInput, XButton, Group} from 'vux'

	export default {
		name: "Login",
		components: {
			Tab,
			TabItem,
			XButton,
			XInput,
			Group,
		},
		data() {
			return {
				showIndex: 0,
				phone: '',
				password: '',
				code: ''
			}
		},
		methods: {
			onItemClick(index) {
				this.showIndex = index
			},
			login() {
				console.log(this.$axios.post)
                this.$axios.post(  'http://10.10.18.12:8082/per/getintromember')
                // this.$router.push({
                //     path: 'me'
                // })
			}
		}
	};
</script>

<style lang="less" scoped>
    @import '~vux/src/styles/center.less';
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
    .weui-btn_plain-primary{
        border-color:#ff9900;
        color: #ff9900;
    }
</style>
