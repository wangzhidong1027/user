<template>
  <div class="coupon-item" @click="select(info)" :id="rule - info.rule < 0? 'useed':''">
    <div class="amount">
      <div class="count">
        <b>￥ </b> <span> {{info.facevalue}}</span>
      </div>
      <div class="lowest">
        <span>满{{info.rule}}元可用</span>
      </div>
    </div>
    <div class="coupon-container">
      <div class="name">{{info.facevalue}}元优惠券（<span>限油品使用</span>）</div>
      <div class="time">有效期：{{info.expireTime}}</div>
    </div>
    <div class="raido-box">
      <check-icon :value="canuse"></check-icon>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from 'vux'
  export default {
  name: 'selectCoupon',
  components: {
    CheckIcon
  },
  props: {
    info: {
      type: Object
    },
    selectinfo: {
      type: Object
    },
    rule: {
      default () {
        return 0
      }
    }
  },
  computed: {
    canuse () {
      if(this.selectinfo.couponNo){
        return this.info.couponNo === this.selectinfo.couponNo
      }else{
        return false
      }
    },
  },
  methods: {
    select (infos) {
      if(this.rule - this.info.rule < 0) return
      if (infos.couponNo === this.selectinfo.couponNo ){
        this.$emit('on-select',{})
      }else{
        this.$emit('on-select',infos)
      }
    }
  }
}
</script>

<style lang="less">
.coupon-item {
  background: #fff;
  margin-bottom: 0.2rem;
  border-radius: 8px;
  width: 100%;
  padding: 0.5rem 0.3rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .amount {
    display: flex;
    flex-direction: column;
    font-size: 0.1rem;
    .count {
      font-weight: normal;
      color: #f44;
      flex: 1;
      b {
        font-size: 0.2rem;
      }
      span {
        font-size: 0.4rem;
      }
    }
    .lowest {
      font-size: 0.22rem;
      color: #999;
      padding-right: 0.4rem;
    }
  }
  .coupon-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    .name {
      flex: 1;
      font-size: 0.3rem;
      overflow: hidden;
      color: #333;
      text-align: left;
      width: 100%;
    }
    .time {
      width: 100%;
      font-size: 0.22rem;
      text-align: left;
      color: #999;
    }
  }
}
#useed {
  position: relative;
  .count {
    color: #999;
  }
  .coupon-container .name {
    color: #999;
  }
  .state {
    position: absolute;
    top: 0.3rem;
    right: 0.2rem;
    color: #f44;
    font-size: 0.4rem;
    padding: 0 0.2rem;
    border: 1px solid #f44;
    transform: rotate(20deg);
  }
}
.raido-box{
  display: flex;
  align-items: center;
}
</style>
