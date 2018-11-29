<template>
  <div class="myorder">
    <div class="serch-box">
      <search v-model="orderid" @on-submit="onSubmit" @on-cancel="getOrderLst"></search>
    </div>
    <div class="order-box" v-if="showPage">
      <div class="oredr-item" v-for="item in orders" :key='item.id'>
        <div class="count"><span class="orderid"><b>订单号:</b>{{item.billno}}</span> <span class="states">{{item.payStatus_cn}}</span>
        </div>
        <p class="order-ads"><span><i class="iconfont icon-qiandao1"></i> {{item.oil_name}}</span><span class="addtime">{{item.createdate}}</span>
        </p>
        <div :style=" { width: item.goodslist.length * 120 + 'px' }" >
        <scroller lock-y :scrollbar-x=false height="100px" class="goods">
          <div class="box1" >
            <a v-for="gooditem in item.goodslist" :key='gooditem.id'>   <!--:href="'#/detail/'+gooditem.oilmxId"-->
              <img :src="gooditem.images" alt="">
            </a>
          </div>
        </scroller>
        </div>
        <!--<div class="title vux-1px-b">优惠券减免：<b>￥23.33</b></div>-->
        <div class="title" v-if="item.payStatus == 1">共{{item.goodslist.length}}件商品&nbsp;总金额：<b>¥{{item.billAmt |
          formatMoney}}</b></div>
        <div class="title" v-if="item.payStatus != 1">共{{item.goodslist.length}}件商品&nbsp;实付款：<b>¥{{ item.payMoney |
          formatMoney}}</b></div>
        <div class="gopay vux-1px-t" v-if="item.payStatus == 1"><a :href="'#/pay/'+ item.billno">去支付</a></div>
      </div>
      <divider v-if="!orders.length">没有订单信息</divider>
    </div>
  </div>
</template>

<script>
import {Search, Scroller, Divider} from "vux"

export default {
  name: "orderList",
  components: {
    Search,
    Scroller,
    Divider
  },
  data() {
    return {
      orderid: '',
      orders: [],
      showPage: ''
    }
  },
  methods: {
    onSubmit() {
      if (!this.orderid) {
        this.$vux.toast.show({
          type: 'cancel',
          text: '请输入订单号',
          width: '3em',
          position: 'middle',
          isShowMask: true
        })
        return false
      }
      var data = {
        orderno: this.orderid
      }
      var formdata = this.$base64.encode(JSON.stringify(data))
      this.getOrderLst(formdata)
    },
    getOrderLst(data) {
      this.$axios.post(this.$baseUrl + '/per/getgorderlist', this.$qs.stringify({
        data: data
      })).then(result => {
        this.showPage = true
        var res = JSON.parse(this.$base64.decode(result.data))
        if (res.code == 10000) {
          if (res.data == '暂无订单信息') {
            this.orders = []
          } else {
            this.orders = res.data
          }
        }
      })
    }
  },
  mounted() {
    this.getOrderLst()
  }
}
</script>

<style lang="less" scoped>
  .myorder {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    .serch-box {
      font-size: 0.4rem;
      height: 1rem;
    }
    .order-box {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      padding-top: 0.2rem;
      box-sizing: border-box;
      font-size: 0.3rem;
      .oredr-item {
        background: #fff;
        box-sizing: border-box;
        margin-bottom: 0.2rem;
        background: #f5f5f5;
        .order-ads {
          padding: 0 0.3rem;
          font-size: 0.3rem;
          color: #666;
          padding-top: 5px;
          background: #f5f5f5;
          display: flex;
          justify-content: space-between;
        }
        .goods {
          padding: 0 0.3rem;
          background: #f5f5f5;
          box-sizing: border-box;
          .box1 {
            height: 100px;
            a {
              float: left;
              padding: 0.2rem;
              /*padding-top: 0.1rem;*/
              box-sizing: border-box;
              width: 100px;
              height: 100px;
              overflow: hidden;
              img {
                width: 100%;
                display: block;
                height: 100%;
                background: #fff;
              }
            }
          }
        }
        .count {
          background: #fff;
          font-size: 0.3rem;
          line-height: 0.8rem;
          display: flex;
          justify-content: space-between;
          padding: 0 0.3rem;
          font-weight: normal;
          color: #333;
          b {
            font-weight: 300;
          }
          .states {
            color: #f44;
            font-weight: 400;
          }
        }
        .title {
          background: #fff;
          height: 0.8rem;
          text-align: right;
          font-size: 0.3rem;
          line-height: 0.8rem;
          padding: 0 0.3rem;
          font-weight: 600;
          color: #555;
          b {
            color: #333;
            font-weight: bold;
            font-size: 0.35rem;
          }
        }
        .gopay {
          height: 1rem;
          font-size: 0.3rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.3rem;
          overflow: hidden;
          background: #fff;
          a {
            border-radius: 4px;
            padding: 0 0.3rem;
            display: block;
            line-height: 0.6rem;
            background: #fff;
            color: #f44;
            font-weight: bold;
            border: 1px solid #f44;
          }
        }
      }
    }
  }
</style>
