<template>
  <div id="detail">
    <div class="goods-box">
      <div class="goods-img">
        <img :src="goodinfo.images" alt="">
      </div>
      <div class="name">
       {{goodinfo.name}}
      </div>
      <div class="twoprice">
        <div class="price">
          <span>零售价</span>
          <b>¥ {{goodinfo.price | formatMoney}}</b>
        </div>
        <p class="economize">
          <span>超级会员价</span>
          <b>¥ {{goodinfo.vipPrice | formatMoney}} </b>
        </p>
      </div>
      <div class="number">
        <span>数量</span>
        <span><x-number v-model="number" :min="1" width="40px" class="number-inp"></x-number></span>
      </div>
      <!--<div class="stock">-->
      <!--<span>库存:</span>-->
      <!--<b>{{goodinfo.inventory}}</b>-->
      <!--</div>-->
      <div class="stock">
      <span>总量</span>
        <b>{{goodinfo.weight}} {{goodinfo.unit}}</b>
      </div>
      <div class="shop_content">
        <div class="content_img" v-html="goodinfo.content">
        </div>
      </div>
    </div>
    <div id="cartab">
      <div class="addcard">
        <a href="#/car"><b class="iconfont icon-gouwuchekong"></b></a>
        <span @click="addcar">加入购物车</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {XNumber} from "vux"
  import {mapMutations} from "vuex"

  export default {
    name: "detail",
    components: {
      XNumber
    },
    data() {
      return {
        number: 1,
        goodinfo: {},//图片 ok
      }
    },
    methods: {
      ...mapMutations([
        "detailadd"
      ]),
      addcar() {
        var data = {id: this.$route.params.id * 1, number: this.number}
        this.detailadd(data)
        this.$vux.toast.show({
          text: "添加成功",
          position: "middle",
          isShowMask: true
        });
      }
    },
    created() {
      var formData = {
        ids: this.$route.params.id,
        // merchNo: JSON.parse(localStorage.getItem("station")).merchNo
        merchNo: this.$merchNo
      }
      formData = this.$base64.encode(JSON.stringify(formData));
      this.$axios.post(this.$baseUrl + "/per/getbatchgoodsinfo", this.$qs.stringify({
        data: formData
      })).then(result => {
        var res = JSON.parse(this.$base64.decode(result.data))
        if (res.code == 10000) {
          this.goodinfo = res.data[0]
        } else {
          this.$router.go(-1)
        }
      })
    }
  }
</script>

<style lang="less">
  #detail {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    .goods-box{
      flex: 1;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      width: 100%;
    }
    .goods-img {
      width: 100%;
      img {
        display: block;
        width: 100%;
      }
    }
    .name {
      padding: 0.25rem;
      color: #434144;
      line-height: 0.5rem;
      background: #FFF;
      font-weight: bold;
      font-size: 0.46rem;
    }
    .twoprice {
      background: #fff;
      padding-bottom: 0.2rem;
      margin-bottom: 0.2rem;
      .price {
        font-size: 0.28rem;
        padding: 0 0.25rem;
        background: #FFF;
        color: #919191;
        b{
          font-size: 0.3rem;
          font-weight: normal;
        }
      }
      .economize {
        background: #fff;
        padding: 0.12rem 0.25rem;
        font-size: 0.28rem;
        span{
          display: inline-block;
          line-height: 0.5rem;
          color: #ae8d4c;
          background: linear-gradient(90deg, rgb(254, 252, 249), rgb(245, 235, 216));
        }
        b {
          font-size: 0.3rem;
          color: #e5725f;
        }
      }
    }
    .number {
      border-bottom: 1px solid #eee;
      font-size: 0.32rem;
      padding: 0rem 0.25rem;
      background: #FFF;
      align-items: center;
      display: flex;
      justify-content: flex-start;
      line-height: 1.2rem;
      span{
        color: #888888;
      }
    }
    .stock {
      line-height: 1.2rem;
      margin-bottom: 0.2rem;
      font-size: 0.32rem;
      padding: 0rem 0.25rem;
      background: #FFF;
      span{
        color: #888888;
      }
      b {
        color: #454344;
      }
    }
    .shop_content {
      border-bottom: 1px solid #eee;
      padding: 0.25rem 0.25rem;
      font-size: 0.3rem;
      background-color: #fff;
      width: 100%;
      box-sizing: border-box;
      p {
        padding-bottom: 0.1rem;
      }
      .content_img {
        margin-top: 0.1rem;
        display: block;
        /*background-image: url(http://img30.360buyimg.com/sku/jfs/t26089/173/526748692/403827/24d1a078/5b73bf0dN65a82d82.jpg);*/
        background-size: 100% auto;
        background-repeat: no-repeat;
        width: 100%;
        box-sizing: border-box;
        p{
          width: 100%;
          display: block;
          box-sizing: border-box;
          img{
            display: block;
            width: 100%;
          }
        }
        img{
          display: block;
          width: 100%;
        }
      }
    }
    #cartab {
      height: 1rem;
      width: 100%;
      box-shadow: 0 -1px 3px #EEEEEE;
      background: #fff;
      display: flex;
      flex-direction: row;
      color: #999;
      font-size: 0.5rem;
      text-align: center;
      z-index: 3333;
      .cancel {
        flex: 1;
        background: #A9A9A9;
        height: 1rem;
        color: #fff;
        font-size: 0.8rem;
        a {
          line-height: 1rem;
          display: block;
          color: #fff;
          text-decoration: none;
          cursor: pointer;
          outline: none;
          font-size: 0.45rem;
        }
      }
      .addcard {
        flex: 1;
        height: 1rem;
        color: #fff;
        font-size: 0.5rem;
        display: flex;
        justify-content: space-between;
        a {
          width: 1.6rem;
          line-height: 1rem;
          display: block;
          background: #fff;
          color: #696969;
          b{
            font-size: 0.5rem;
            font-weight: normal;
          }
        }
        span {
          flex: 1;
          background: #ff3b3c;
          line-height: 1rem;
          display: block;
          color: #fff;
          text-decoration: none;
          cursor: pointer;
          outline: none;
          font-size: 0.3rem;
        }
      }
    }
    .vux-number-selector svg {
      fill: #4f4f4f;
    }
    .vux-number-selector.vux-number-disabled svg {
      fill: #ccc;
    }
    .vux-number-input{
      height: 0.5rem;
      line-height: 0.5rem;
    }
    .vux-number-selector {
      height: 0.5rem;
      line-height: 0.5rem;
    }

  }
</style>
