<template>
    <div class="idea">
        <group :gutter="0">
            <x-textarea :max="60" placeholder="" :rows='6'></x-textarea>
        </group>
        <group :gutter="20" class="btn-box">
                <x-button  type="primary" class="custom-primary-red"  @click.native="submit">提交</x-button>
        </group>
    </div>
</template>

<script>
import { Group, XTextarea, XButton } from 'vux'
export default {
    name: 'idea',
    components: {
        Group,
        XTextarea,
        XButton
    },
    methods: {
    	submit () {
    		this.$router.push({
                path: 'me'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.idea{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    .btn-box{
        padding: 0 0.4rem;
        background: #f5f5f5;
    }
    .weui-btn:after{
        display: block;
        border-radius:99px;
    }
}
</style>
