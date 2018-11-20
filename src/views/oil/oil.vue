<template>
  <div class="oil">
    <group title="此订单暂时为油品优惠券使用订单，您可以再此生成优惠券订单。支付方式为油站支付。">
      <x-input title="加油金额" placeholder="请输入加油金额" placeholder-align="right" class="money" text-align="right" v-model="money" @on-change="clear"></x-input>
      <cell title="优惠券减免"  is-link @click.native="selCupon" :value="coupon_total"></cell>
      <cell title="需实付金额"  :value="total_fee"></cell>
    </group>
    <div class="btn-box" @click="submit">一键加油</div>
    <popup v-model="show1" height="70%" class="cou-pop" :popup-style="{ zIndex: 888 }" :show-mask="false">
      <popup-header  right-text="确定" title="请选择优惠券"  @on-click-right="selCupon"></popup-header>
      <!--<p style="padding-left: 20px;background: #fff9e6;color: #333">提示：此单最多同时使用优惠券{{Math.floor(money / 100)}}张已选{{selectArr.length}}张</p>-->
      <div class="cuoponlist">
        <select-cou v-for="item in noUse" :info="item" v-if="item.couponType === 1" :selectArr="selectArr" @on-select="selected" :rule="money" :count="count"></select-cou>
      </div>
    </popup>
    <div class="my-mask" v-if="show1" @click="show1 = !show1"></div>
  </div>
</template>

<script>
import { XInput, Group, Cell, Popup, PopupHeader } from 'vux'
import SelectCou from './select-coupon'
export default {
  name: 'oil',
  components: {
    XInput,
    Group,
    Cell,
    Popup,
    PopupHeader,
    SelectCou
  },
  data () {
    return {
      money: '',
      show1: false,
      noUse: [],
      selectinfo: [],
      selectArr: [],
      count: 0
    }
  },
  computed: {
    coupon_total () {
      var all = 0
      var ruleall = 0
      if(!this.selectArr.length){
        this.count = 0
        return ''
      }else{
        for(var i = 0; i < this.selectArr.length; i++){
          all += this.selectinfo[i].facevalue
          ruleall += Number(this.selectinfo[i].rule)
        }
        this.count = ruleall
        return  0 - all
      }

    },
    total_fee () {
      if (!this.money) {
        return ''
      }
      if(!this.coupon_total){
        return ''
      }
      return (this.money * 100 + this.coupon_total*100)/100
    },
  },
  methods: {
    selected (info) {
      var index = this.selectArr.indexOf(info.couponNo)
      if( index === -1){
        this.selectArr.push(info.couponNo)
        this.selectinfo.push(info)
      }else{
        this.selectArr.splice(index, 1)
        this.selectinfo.splice(index, 1)
      }
    },
    selCupon () {
      this.show1 = !this.show1
    },
    submit () {
      if (!this.money) {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入下单金额',
        })
        return
      }
      if (!this.selectArr.length) {
        this.$vux.alert.show({
          title: '提示',
          content: '请使用优惠券',
        })
        return
      }
      var ids = ''
      for(var i = 0; i < this.selectArr.length; i++){
        ids = ids + this.selectArr[i]  + ","
      }
      var data = {
        merchNo: this.$merchNo,
        totalAmt: this.money,
        couponNo: ids,
        totalFee: this.total_fee
      }
      this.$axios.post( this.$baseUrl + '/per/peronekeyorderdown',this.$qs.stringify({
          data: this.$base64.encode(JSON.stringify(data))
      })).then(res => {
        var result = JSON.parse(this.$base64.decode(res.data))
        if(result.code === 10000) {
          this.$vux.confirm.show({
            content: '下单成功，您可以再选择油站使用手机号完成此订单！',
            showCancelButton: false,
            onConfirm: () => {
              this.$router.push({
                path: '/home'
              })
            }
          })
        }else{
          this.$vux.alert.show({
            title: '提示',
            content: result.message,
          })
        }
      })
    },
    getcoupon () {
      var data= {
        page: 1,
        isExpired: 0,
      }
      this.$axios.post(this.$baseUrl + '/per/couponlist', this.$qs.stringify({
        data: this.$base64.encode(JSON.stringify(data))
      })).then(result => {
        var res = JSON.parse(this.$base64.decode(result.data))
        if(res.code == 10000){
          this.noUse = res.data
        }
      })
    },
    clear () {
      this.selectinfo = []
      this.selectArr = []
    }
  },
  mounted () {
    this.getcoupon()
  }
}
</script>

<style lang="less" scoped>
.oil{
  width: 100%;
  height: 100%;
  background: #fbf9fe;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
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
  .money{
    background: #fff;
  }
  .btn-box{
    width: 3rem;
    height: 3rem;
    background: #FF7500;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 3rem;
    color: #fff;
    text-align: center;
    line-height: 3rem;
    font-weight: 600;
    font-size: 0.4rem;
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
}
</style>
