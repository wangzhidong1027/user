<template>
  <div class="coupon-item" :id="info.isExpired ==1? 'useed':''">
    <div class="amount">
      <div class="count">
        <b>￥ </b> <span> {{info.facevalue}}</span>
      </div>
      <div class="lowest">
        <span>满{{info.rule}}元可用</span>
      </div>
    </div>
    <div class="coupon-container">
      <div class="name">{{info.facevalue}}元优惠券（<span v-if="info.couponType == 1">限油品使用</span><span v-if="info.couponType == 2">限非油品使用</span><span v-if="info.couponType == 3">全品类使用</span>）</div>
      <div class="time">有效期：{{datetime(info.useStart)}} 至 {{datetime(info.expireTime)}} </div>
    </div>
    <!--<div class="state" v-if="info.Expired ==3">-->
      <!--消费-->
    <!--</div>-->
    <div class="state" v-if="info.isExpired ==1">
      过期
    </div>
  </div>
</template>

<script>
  export default {
    name: "coupon-card",
    props: {
      info: {
        type: Object,
      }
    },
    methods: {
      datetime (time) {
        return time.substr(0,10)
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
.coupon-item{
  background: #fff;
  margin-bottom: 0.2rem;
  border-radius: 8px;
  width: 100%;
  padding: 0.5rem 0.3rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .amount{
    display: flex;
    flex-direction: column;
    font-size: 0.1rem;
    .count{
      font-weight: normal;
      color: #f44;
      flex: 1;
      b{
        font-size: 0.2rem;
      }
      span{
        font-size: 0.4rem;
      }
    }
    .lowest{
      font-size: 0.22rem;
      color: #999;
      padding-right: 0.4rem;
    }
  }
  .coupon-container{
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    .name{
      flex: 1;
      font-size: 0.3rem;
      overflow: hidden;
      color: #333;
      text-align: left;
      width: 100%;
    }
    .time{
      width: 100%;
      font-size: 0.22rem;
      text-align: left;
      color: #999;
    }
  }
}
#useed{
  position: relative;
  .count{
    color: #999;
  }
  .coupon-container .name{
    color: #999;
  }
  .state{
    position: absolute;
    top: 0.3rem;
    right: 0.2rem;
    color: #f44;
    font-size: 0.4rem;
    padding: 0 0.2rem;
    border: 1px solid #f44;
    transform:rotate(20deg);
  }
}

</style>
