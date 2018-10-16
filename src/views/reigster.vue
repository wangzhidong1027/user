<template>
    <div id="reister">
        <group :gutter="0">
            <x-input title="phone" v-model="phone" :max="11" type="tel" is-type="china-mobile" placeholder="填写手机号码"></x-input>
            <x-input title="验证码" class="weui-vcode" v-model="code" :plain="true" placeholder="填写验证码">
                <x-button slot="right" type="primary" mini :plain="true">发送验证码</x-button>
            </x-input>
        </group>
          <div class="button-box">
                <x-button :gradients="[ '#FF7500', '#FF9500']" @click.native="login">完成</x-button>
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
        data () {
			return {
				phone: "",
                code: ""
            }
        }
	}
</script>

<style scoped lang="less">
    .weui-btn_plain-primary {
        border-color: #ff9900;
        color: #ff9900;
    }
    .button-box{
        padding: 0.5rem 0.4rem;
    }
</style>