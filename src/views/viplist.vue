<template>
  <div class="viplist">
    <a class="goods-img" v-for="good in goods" :href='"#/dredgevip/"+ good.id' ><img :src="good.image" alt=""></a>
  </div>
</template>

<script>
export default {
  name: "viplist",
  data() {
    return {
      goods: ''
    }
  },
  created () {
    this.$axios.post(this.$baseUrl + '/per/membersgoodslist',this.$qs.stringify({
    })).then( result => {
      var res = JSON.parse(this.$base64.decode(result.data))
      if(res.code == 10000){
        this.goods = res.data
      }else{
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

<style lang="less" scoped>
  .viplist {
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .goods-img {
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: 0.2rem 0.3rem;
      overflow: hidden;
      img {
        width: 100%;
        border-radius: 8px;

      }
    }
  }
</style>
