<template >
    <div class="vip">
        <div class="imgbox">
            <img src="../assets/images/vip.jpg" alt="">
        </div>
        <div class="bottom">
            <x-button :gradients="[ '#FF7500', '#FF9500']" @click.native="dredge">开通</x-button>
        </div>
    </div>
</template>

<script>
    import { XButton } from "vux"
    export default {
    	name: "dredgeVIP",
        components: {
    		XButton
        },
        methods: {
    		dredge () {

            }
        }
    }
</script>

<style lang="less" scoped>
.vip{
    height: 100%;
    width: 100%;
    background: #f5f5f5;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 45px;
    box-sizing: border-box;
    .imgbox{
        width: 100%;
        img{
            display: block;
            width: 100%;
        }

    }
    .bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
}
</style>
