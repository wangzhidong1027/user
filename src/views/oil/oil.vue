<template>
  <div class="oil">
    <group title="此订单暂时为油品优惠券使用订单，您可以再此生成优惠券订单。支付方式为油站支付。">
      <x-input title="加油金额" placeholder="请输入加油金额" placeholder-align="right" class="money" text-align="right" v-model="money" @on-change="clear"></x-input>
      <cell title="优惠券减免"  is-link @click.native="selCupon" :value="facevalue"></cell>
      <cell title="需实付金额" @click.native="onClick"  :value="total_fee"></cell>
    </group>
    <div class="btn-box" @click="submit">一键加油</div>
    <popup v-model="show1" height="70%" class="cou-pop" :popup-style="{ zIndex: 888 }" :show-mask="false">
      <popup-header  right-text="确定" title="请选择优惠券"  @on-click-right="selCupon"></popup-header>
      <div class="cuoponlist">
        <select-cou v-for="item in noUse" :info="item" v-if="item.couponType === 1" :selectinfo="selectinfo" @on-select="select" :rule="money"></select-cou>
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
      selectinfo: {}
    }
  },
  computed: {
    total_fee () {
      if (!this.money) {
        return ''
      }
      if(!this.selectinfo.facevalue){
        return ''
      }
      return (this.money * 100 - this.selectinfo.facevalue*100)/100
    },
    facevalue () {
      if(this.selectinfo.facevalue){
        var str = '-' + this.selectinfo.facevalue
        return str
      }else{
        return ''
      }
    }
  },
  methods: {
    select (info) {
      this.selectinfo = info
    },
    selCupon () {
      this.show1 = !this.show1
    },
    onClick () {

    },
    submit () {
      if (!this.money) {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入下单金额',
        })
        return
      }
      if (!this.selectinfo.facevalue) {
        this.$vux.alert.show({
          title: '提示',
          content: '请使用优惠券',
        })
        return
      }
      var data = {
        merchNo: this.$merchNo,
        totalAmt: this.money,
        couponNo: this.selectinfo.couponNo,
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
      this.selectinfo = {}
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
