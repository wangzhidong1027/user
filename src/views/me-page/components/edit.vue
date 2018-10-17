<template>
    <div id="edit">
        <x-header>设置昵称<a slot="right" style="color: #ff9900">完成</a></x-header>
        <group :gutter="1">
             <x-input  v-model="value" placeholder="请输入昵称"></x-input>
        </group>
        <div class="idcard">

        </div>
    </div>
</template>

<script>
    import { XButton, XHeader, XInput, Group } from "vux"
export  default {
    name: "edit",
    components: {
    	XButton,
        XHeader,
        XInput,
        Group
    },
    data () {
    	return {
    		value: ''
        }
    }
}
</script>

<style lang="less" scoped>
#edit{
    height: 100%;
    width: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .btn-box{
        padding: 1rem 0.6rem;
    }
}
</style>
