<template>
  <div class="goodslist">
    <div  class="allgoods" v-show="show">
      <div class="nogoods" v-if="!goods.length">
        <p><b class="iconfont icon-shibai"></b></p>
        <p>抱歉，没有找到商品额</p>
      </div>
      <div class="goods-item" v-for="item in goods" :key="item.id">
        <img :src="item.image" alt="">
        <div class="price">
          <span>金额:￥</span><b>{{item.price}}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: "goodsList",
  data () {
	  return {
      goods: [],
      show: false
    }
  },
  created () {
    this.$axios.post(this.$baseUrl + "/per/goodslist").then(
    	result => {
    		var res = JSON.parse(this.$base64.decode(result.data))
        console.log(res)
        this.goods = res.data
        this.show = true
      }
    )
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.goodslist {
  width: 100%;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding-top: 20px;
  background: #f5f5f5;
  .nogoods {
    width: 100%;
    margin: 0 auto;
    p {
      width: 100%;
      text-align: center;
      font-size: 0.4rem;
      color: #333;
      margin-top: 20px;
    }
    b {
      font-size: 3rem;
      color: #999;
    }
  }
  .allgoods{
    width: 100%;
    box-sizing: border-box;
    padding:0 0.15rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .goods-item{
      width: 48%;
      margin-bottom: 0.3rem;
      img{
        width: 100%;
        display: block;
      }
      .price{
        border-top: 1px solid #eee;
        padding-left: 0.2rem;
        font-size: 0.3rem;
        background: #fff;
        line-height: 0.9rem;
        b{
          font-size: 0.4rem;
          color: #ff3737;
        }
      }
    }
  }
}
</style>
