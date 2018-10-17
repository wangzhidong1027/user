<template>
    <div class="viplist">
        <a class="goods-img" href="#/dredgevip"><img src="../assets/images/jbanner.jpg" alt=""></a>
    </div>
</template>

<script>

export default {
	name: "viplist",
    data () {
		return {}
    }
}
</script>

<style lang="less" scoped>
.viplist{
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .goods-img{
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 0.2rem 0.3rem;
        overflow: hidden;
           img{
               width: 100%;
               border-radius: 8px;

           }
    }
}
</style>