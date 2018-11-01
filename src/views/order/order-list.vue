<template>
  <div class="myorder">
    <div class="serch-box">
      <search v-model="orderid" @on-submit="onSubmit" @onFocus="onFocus"></search>
    </div>
    <div class="order-box">
        <div class="oredr-item" >
          <div class="count"><span class="orderid"><b>订单号:</b>123213123</span><span class="addtime">123213123</span></div>
          <scroller lock-y :scrollbar-x=false height="130px" class="goods">
            <p class="order-ads"><span><i class="iconfont icon-qiandao1"></i> 啊打发士大夫</span></p>
            <div class="box1" :style=" { width: 5*100 + 'px' }">
              <a href="#">
                <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/2f9fafc888421d8b1771e66c990a6b03_121_121.jpg" alt="">
              </a>
              <a href="#">
                <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/2f9fafc888421d8b1771e66c990a6b03_121_121.jpg" alt="">
              </a>
              <a href="#">
                <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/2f9fafc888421d8b1771e66c990a6b03_121_121.jpg" alt="">
              </a>
              <a href="#">
                <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/2f9fafc888421d8b1771e66c990a6b03_121_121.jpg" alt="">
              </a>
              <a href="#">
                <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/2f9fafc888421d8b1771e66c990a6b03_121_121.jpg" alt="">
              </a>
            </div>
          </scroller>
          <div class="title">共7件商品&nbsp实付款：<b>￥23.33</b></div>
        </div>
    </div>
  </div>
</template>

<script>
  import { Search, Scroller  } from "vux"
export default{
  name: "orderList",
  components: {
    Search,
    Scroller
  },
  data () {
    return {
      orderid: ''
    }
  },
  methods: {
    onSubmit () {

    },
    onFocus () {

    },
  }
}
</script>

<style lang="less" scoped>
.myorder{
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .serch-box{
    font-size: 0.4rem;
    height: 1rem;
  }
  .order-box{
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    padding-top: 0.2rem;
    box-sizing: border-box;
    .oredr-item{
      background: #fff;
      box-sizing: border-box;
      .order-ads{
        padding: 0 0.3rem;
        font-size: 0.3rem;
        color: #666;
        padding-top: 5px;
      }
      .goods{
        padding: 0 0.3rem;
        background: #f5f5f5;
        .box1{
          a{
            float: left;
            padding: 0.2rem;
            padding-top: 0.1rem;
            box-sizing: border-box;
            width: 100px;
            img{
              width: 100%;
              display: block;
            }
          }
        }
      }
      .count{
        background: #fff;
        font-size: 0.3rem;
        line-height: 0.8rem;
        display: flex;
        justify-content: space-between;
        padding: 0 0.3rem;
        font-weight: normal;
        color: #333;
        b{
          font-weight: 300;
        }
      }
      .title{
        background: #fff;
        height: 1rem;
        text-align: right;
        font-size: 0.3rem;
        line-height: 1rem;
        padding: 0 0.3rem;
        font-weight: 600;
        color: #555;
        b{
          color: #333;
          font-weight: bold;
          font-size: 0.35rem;
        }
      }
    }
  }
}
</style>
