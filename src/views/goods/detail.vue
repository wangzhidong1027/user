<template>
  <div id="detail">
    <div class="goods-box">
      <div class="goods-img">
        <img :src="goodinfo.images" alt="">
      </div>
      <div class="name">
        商品名称:{{goodinfo.name}}
      </div>
      <div>

      </div>
      <div class="twoprice">
        <div class="price">
          <span>价格:</span>
          <b>¥ {{goodinfo.price | formatMoney}}</b>
        </div>
        <p class="economize">
          <span>会员价:</span>
          <b>¥ {{goodinfo.vipPrice | formatMoney}} </b>
        </p>
      </div>
      <div class="number">
        <span>数量:</span>
        <span><XNumber v-model="number" :min="1"></XNumber></span>
      </div>
      <!--<div class="stock">-->
      <!--<span>库存:</span>-->
      <!--<b>{{goodinfo.inventory}}</b>-->
      <!--</div>-->
      <div class="shop_content">
        <p>商品简介:</p>
        {{goodinfo.content}}<br/>
        <div class="content_img">
          {{goodinfo.intro}}
        </div>
      </div>
    </div>
    <div id="cartab">
      <div class="addcard">
        <a href="#/car">去结算</a>
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
        var data = {id: this.$route.params.id, number: this.number}
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
        merchNo: JSON.parse(localStorage.getItem("station")).merchNo
      }
      formData = this.$base64.encode(JSON.stringify(formData));
      this.$axios.post(this.$baseUrl + "/per/getbatchgoodsinfo", this.$qs.stringify({
        data: formData
      })).then(result => {
        var res = JSON.parse(this.$base64.decode(result.data))
        if (res.code == 10000) {
          this.goodinfo = res.data[0]
        } else {
          // this.$router.go(-1)
        }
      })
    }
  }
</script>

<style lang="less" scoped>
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
    }
    .goods-img {
      width: 100%;
      img {
        display: block;
        width: 100%;
        border-bottom: 1px solid #eee;
      }
    }
    .name {
      padding: 0.25rem;
      font-size: 0.3rem;
      color: #333333;
      line-height: 0.5rem;
      background: #FFF;
    }
    .twoprice {
      border-bottom: 1px solid #eee;
      .price {
        font-size: 0.3rem;
        padding: 0 0.25rem;
        background: #FFF;
        b {
          color: #ff3737;
        }
      }
      .economize {
        background: #fff;
        padding: 0.12rem 0.25rem;
        font-size: 0.3rem;
        b {
          color: #ff3737;
        }
      }
    }
    .number {
      border-bottom: 1px solid #eee;
      font-size: 0.3rem;
      padding: 0rem 0.25rem;
      background: #FFF;
      align-items: center;
      display: flex;
      justify-content: space-between;
    }
    .stock {
      border-bottom: 1px solid #eee;
      font-size: 0.3rem;
      padding: 0.25rem 0.25rem;
      background: #FFF;
      b {
        color: #ff3737;
      }
    }
    .shop_content {
      border-bottom: 1px solid #eee;
      margin-bottom: 1rem;
      padding: 0.25rem 0.25rem;
      font-size: 0.3rem;
      background-color: #fff;
      p {
        padding-bottom: 0.25rem;
      }
      .content_img {
        margin-top: 0.25rem;
        display: block;
        /*background-image: url(http://img30.360buyimg.com/sku/jfs/t26089/173/526748692/403827/24d1a078/5b73bf0dN65a82d82.jpg);*/
        background-size: 100% auto;
        background-repeat: no-repeat;
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
          flex: 1;
          line-height: 1rem;
          display: block;
          font-size: 0.3rem;
          background: #fff;
          color: #333;
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

  }
</style>
