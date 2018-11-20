<template>
  <div class="cou-outside">
    <div class="coupon-item" @click="select(info)" :id="(rule - (info.rule * 1 + this.count)< 0 || !usertime ) && !canuse? 'useed':''">
      <div class="amount">
        <div class="count">
          <b>¥ </b> <span> {{info.facevalue}}</span>
        </div>
        <div class="lowest">
          <span>满{{info.rule}}元可用</span>
        </div>
      </div>
      <div class="coupon-container">
        <div class="name" v-if="info.couponType === 1">{{info.facevalue}}元优惠券（<span>限油品使用</span>）</div>
        <div class="name" v-if="info.couponType === 2">{{info.facevalue}}元优惠券（<span>限非油品使用</span>）</div>
        <div class="name" v-if="info.couponType === 3">{{info.facevalue}}元优惠券（<span>全品类使用</span>）</div>
        <div class="time">有效期：{{datetime(info.useStart)}} 至 {{datetime(info.expireTime)}}</div>
      </div>
      <div class="raido-box">
        <check-icon :value="canuse"></check-icon>
      </div>
    </div>
    <div class="ino-box" >
      <div class="ino" v-if="rule - (info.rule * 1 + this.count)< 0  && usertime && !canuse">不可用原因：不符合优惠券累加满减</div>
      <div class="ino" v-if="!usertime">不可用原因：未在有效期内</div>
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
  data () {
    return {

    }
  },
  props: {
    info: {
      type: Object
    },
    rule: {
      default () {
        return 0
      }
    },
    selectArr: {
      type: Array,
      default () {
        return []
      }
    },
    count: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  computed: {
    canuse () {
      if(this.selectArr.indexOf(this.info.couponNo) === -1){
        return false
      }else{
        return true
      }
    },
    usertime () {
      // 有效期内
      return new Date().getTime()  > new Date(this.info.useStart.replace(/-/g,"/")).getTime()  && new Date().getTime() < new Date(this.info.expireTime.replace(/-/g,"/")).getTime()
    }
  },
  methods: {
    datetime (time) {
      return time.substr(0,10)
    },
    select (infos) {
      if (!this.usertime) return // 不在有效期
      if (this.selectArr.indexOf(infos.couponNo) === -1){
        // 不在已选数组中
        if(this.rule < (this.count + Number(infos.rule))){
          return
        }else{
          this.$emit('on-select',infos)
        }
      }else{
        this.$emit('on-select',infos)
      }
    }
  },
  created () {
  }
}
</script>

<style lang="less">
  .cou-outside{
    margin-bottom: 0.2rem;
  }
.coupon-item {
  background: #fff;
  border-radius: 8px;
  width: 100%;
  padding: 0.5rem 0.3rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  z-index: 500;
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
.ino-box{
  height: 0.2rem;
}
.ino{
  color: #f44;
  font-size: 0.22rem;
}
</style>
