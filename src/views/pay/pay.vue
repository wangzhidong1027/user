<template>
  <div class="outside">
    <div id="pay" v-if="payStatus">
        <div class="box" v-if="main">
          <div class="station">
            <div class="shop_list">取货地址</div>
            <div class="address">
              <div class="name">{{orderinfo.oil_name}}</div>
              <p>{{orderinfo.oil_ddress}}</p>
            </div>
          </div>
          <div class="shop_list">商品清单</div>
          <div data-v-605c5a35="" class="submit-goods" v-for="item in goods">
            <div class="goods-img">
              <a><!-- //href="#/details/NTM2NTA1MA=="-->
                <img :src="item.images">
              </a>
            </div>
            <div class="goods-name">
              <p class="name">{{item.name}}</p>
              <!--<p class="style">类型:加油卡</p>-->
              <h5 style="color: #8c8c8c">
                <b>¥ <span>{{item.price | formatMoney}}</span></b>
                <span class="number">x{{item.num}}</span>
              </h5>
              <h4>
                <b>¥ {{item.vip_price | formatMoney}}</b>
                <span class="number">超级会员价<b class="iconfont icon-huiyuan" style="color:#ff9900"></b></span>
              </h4>
            </div>
          </div>
          <div class="youhuiquan" @click="voucher">
            <span>优惠券</span>
            <span class="sfr">
            <b class="">></b>
          </span>
          </div>
          <div class="amoney" v-if="couponMoney">
            <div class="zongjia">
              <p>优惠券金额</p>
              <span>¥ <b>{{couponMoney | formatMoney}}</b>
            </span>
            </div>
          </div>
          <div class="total">
            <div class="zongjia">
              <p>总商品金额</p>
              <span>¥ <b>{{orderinfo.billAmt | formatMoney}}</b>
            </span>
            </div>
            <div class="zongjia">
              <p>会员总金额</p>
              <span>¥ <b>{{orderinfo.billVipAmt | formatMoney}}</b>
            </span>
            </div>
          </div>
        </div>
      <div id="cartab" v-if="main">
        <div class="money">
          <a><span>支付金额:<b>¥{{paymoney | formatMoney}}</b></span></a>
        </div>
        <div class="addcard">
          <a>
            <span @click="pay">去支付</span>
          </a>
        </div>
      </div>
    </div>
    <div class="payover" v-if="!payStatus">
      <msg title="支付成功" description="订单已支付成功，请您尽快提取您的当但商品">
        <template slot="buttons">
          <x-button plain type="primary" @click.native="gopath('order')">订单信息</x-button>
          <x-button type="primary" @click.native="gopath('me')">个人中心</x-button>
        </template>
      </msg>
    </div>
    <popup v-model="show1" height="70%" class="cou-pop" :popup-style="{ zIndex: 999 }" :show-mask="false">
      <popup-header  right-text="确定" title="请选择优惠券"  @on-click-right="voucher"></popup-header>
      <!--<p style="padding-left: 20px;background: #fff9e6;color: #333">提示：此单最多同时使用优惠券{{Math.floor(orderinfo.billAmt / 100)}}张已选{{selectArr.length}}张</p>-->
      <div class="cuoponlist">
        <select-cou v-for="item in datas" :info="item" v-if="item.couponType === 2" :selectArr="selectArr" @on-select="selected" :rule="orderinfo.billAmt" :count="count"></select-cou>
      </div>
    </popup>
    <div class="my-mask" v-if="show1" @click="show1 = !show1"></div>
  </div>
</template>

<script>
  import { mapMutations } from "vuex"
  import { Msg, XButton, Popup, PopupHeader } from 'vux'
  import SelectCou from '../oil/select-coupon'

  export default {
    data() {
      return {
        show1: false,
        main: true,
        datas: [],
        orderinfo: {},
        goods: [],
        paycoupon: [],
        selectArr: [],
        count: 0,
        payStatus: true
      }
    },
    components: {
      Msg,
      XButton,
      Popup,
      PopupHeader,
      SelectCou
    },
    computed: {
      couponMoney () {
        var all = 0
        var ruleall = 0
        if(!this.selectArr.length){
          this.count = 0
          return 0
        }else{
          for(var i = 0; i < this.selectArr.length; i++){
            all += this.paycoupon[i].facevalue
            ruleall += Number(this.paycoupon[i].rule)
          }
          this.count = ruleall
          return  0 - all
        }
      },
      paymoney() {
        var payY = 0
        if (this.orderinfo.isMember == 1) {
          payY = this.orderinfo.billVipAmt
        } else {
          payY = this.orderinfo.billAmt
        }
        return payY * 100 + this.couponMoney * 100 < 0 ? '0' : (payY * 100 + this.couponMoney * 100) / 100
      }
    },
    methods: {
      ...mapMutations([
        "getOpenid"
      ]),
      selected (info) {
        var index = this.selectArr.indexOf(info.couponNo)
        if( index === -1){
          this.selectArr.push(info.couponNo)
          this.paycoupon.push(info)
        }else{
          this.selectArr.splice(index, 1)
          this.paycoupon.splice(index, 1)
        }
      },
      gopath(path) {
        this.$router.push({
          path: '/'+ path,
        })
      },
      voucher() {
        // 显示优惠券
        this.show1 = !this.show1
      },
      getcoupon() {
        var data = {
          page: 1,
          isExpired: 0,
        }
        this.$axios.post(this.$baseUrl + '/per/couponlist', this.$qs.stringify({
          data: this.$base64.encode(JSON.stringify(data))
        })).then(result => {
          var res = JSON.parse(this.$base64.decode(result.data))
          if (res.code == 10000) {
            this.datas = res.data
          }
        })
      },
      pay() {
        if(!localStorage.getItem("openid")){
          this.$vux.toast.show({
            type: 'cancel',
            text: '签名错误，请点击右上角刷新页面',
            position: 'middle',
            isShowMask: true
          })
          return
        }
        this.$vux.loading.show()
        var ids = ''
        for(var i = 0; i < this.selectArr.length; i++){
          ids = ids + this.selectArr[i]  + ","
        }
        var data = {
          openid: localStorage.getItem("openid"),
          orderno: this.$route.params.orderid,
          couponNo: ids,
          total_fee: this.paymoney
        }
        this.$axios.post(this.$baseUrl + "/wxpay/dowxpay", this.$qs.stringify({
          data: this.$base64.encode(JSON.stringify(data))
        })).then(result => {
          var res = JSON.parse(this.$base64.decode(result.data))
          if (res.code == 10000) {
            var that = this
            this.$vux.loading.hide()
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', res.data,
              function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  that.payStatus = false
                }
              })
          } else {
            this.$vux.toast.show({
              type: 'cancel',
              text: res.message,
              position: 'middle',
              isShowMask: true
            })
          }
        })
      }
    },
    created() {
      this.getOpenid(this.$base64.encode(location.href + "?openid="))
      var orderno = this.$route.params.orderid;
      this.$axios.post(this.$baseUrl + '/per/getgorderdetail', this.$qs.stringify({
        orderno: orderno
      })).then(result => {
        var res = JSON.parse(this.$base64.decode(result.data))
        if (res.code == 10000) {
          this.orderinfo = res.data.orderInfo;
          this.goods = res.data.goodslist
        } else {
          this.$vux.toast.show({
            type: 'cancel',
            text: res.message,
            position: 'middle',
            isShowMask: true
          })
        }
      })
      this.getcoupon()
    }
  }
</script>

<style lang="less">
  .outside{
    width: 100%;
    height: 100%;
  }
  #pay {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    .box {
      flex: 1;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .station {
      .address {
        background: #fff;
        padding: 0 0.25rem;
        .name {
          font-size: 0.35rem;
          line-height: 1rem;
          color: #333;
        }
        p {
          font-size: 0.3rem;
          line-height: 0.6rem;
          color: #666;
        }

      }
    }
    .shop_list {
      padding: 0.25rem;
      line-height: 0.5rem;
      font-size: 0.35rem;
    }
    .submit-goods {
      background: #fff;
      padding: 0.25rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.3rem;
      border-bottom: 1px solid #eee;
      align-items: center;
      .goods-img {
        position: relative;
        width: 3rem;
        display: flex;
        height: 100%;
        align-items: center;
        a {
          text-decoration: none;
          cursor: pointer;
          outline: none;
          color: #333333;
          img {
            width: 100%;
            vertical-align: middle;
          }
        }
      }
      .goods-name {
        flex: 1;
        padding-left: 0.25rem;
        .name {
          color: #333333;
        }
        .style {
          color: #999;
          font-size: 0.25rem;
        }
        p {
          width: 5.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
        h5 {
          padding-top: 0.12rem;
          color: #ff3737;
          display: flex;
          justify-content: space-between;
          font-size: 0.3rem;
        }
        h4 {
          b {
            color: #ff3737;
          }
          span {
            color: #ff9900;
          }
        }
      }
    }
    .youhuiquan {
      background: #fff;
      display: flex;
      justify-content: space-between;
      padding: 0.25rem;
      line-height: 0.5rem;
      color: #333;
      font-size: 0.35rem;
      b {
        color: #eee;
      }
    }
    .amoney {
      background: #fff;
      margin-top: 0.25rem;
      padding: 0.25rem;
      color: #333;
      font-size: 0.35rem;
      line-height: 0.62rem;
      div {
        display: flex;
        justify-content: space-between;
        span {
          color: #ff3737;
        }
      }
    }
    .total {
      background: #fff;
      margin-top: 0.25rem;
      padding: 0.25rem;
      color: #333;
      font-size: 0.35rem;
      line-height: 0.62rem;
      div {
        display: flex;
        justify-content: space-between;
        span {
          color: #ff3737;
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
      z-index: 200;
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
      .money {
        flex: 1;
        background: #fff;
        height: 1rem;
        color: #fff;
        font-size: 0.8rem;
        a {
          line-height: 1rem;
          display: block;
          color: #333;
          text-decoration: none;
          cursor: pointer;
          outline: none;
          font-size: 0.35rem;
          span {
            i {
              color: #ff3737;
            }

          }
        }
      }
      .addcard {
        flex: 1;
        background: #ff3b3c;
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
    }

  }

  /*优惠券*/
  .coupon {
    height: 100%;
    width: 100%;
    background: #f5f5f5;
    box-sizing: border-box;
    padding-bottom: 1rem;
    div.title {
      background-color: #fff;
      height: 0.75rem;
      line-height: 0.75;
      color: #333;
      font-size: 18px;
      line-height: 0.75rem;
      text-align: center;
    }
    div.content {
      margin: 0.25rem;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .coupon-info {
        flex: 1;
      }
      p {
        padding: 0.25rem;
        color: #333;
        font-size: 0.35rem;
      }
      p.info {
        padding-top: 0;
        display: flex;
        justify-content: space-between;
      }
      a {
        width: 0.25rem;
        height: 0.25rem;
        margin-top: 0.12rem;
        margin-right: 0.2rem;
        display: block;
        border: 1px solid #333;
        border-radius: 0.75rem;
      }
      a.choicey {
        width: 0.25rem;
        height: 0.25rem;
        margin-top: 0.12rem;
        margin-right: 0.2rem;
        display: block;
        border: 1px solid #ff3737;
        border-radius: 0.75rem;
        background-color: #ff3737;
      }
    }
    .dern {
      position: fixed;
      height: 1rem;
      border-top: 1px solid #eee;
      background: #fff;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-bottom: ;
      button.determine {
        width: 50%;
        border: none;
        color: #fff;
        font-size: 0.35rem;
        background: #FF3737;
        font-weight: bold;
      }
      button.return {
        width: 50%;
        border: none;
        color: #333;
        font-size: 0.35rem;
        font-weight: bold;
      }
    }
  }
  .cuoponlist{
    padding: 0.2rem;
    box-sizing: border-box;
    background: #fbf9fe;
    overflow: scroll;
    flex: 1;
  }
  .cou-pop{
    display: flex;
    flex-direction: column;
  }
  .my-mask{
    width: 100%;
    height: 100%;
    z-index: 2;
    background: #000;
    opacity: 0.6;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
