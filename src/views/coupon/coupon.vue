<template>
  <div id="coupon">
    <tab>
      <tab-item selected @on-item-click="onItemClick">未使用</tab-item>
      <!--<tab-item @on-item-click="onItemClick">已使用</tab-item>-->
      <tab-item @on-item-click="onItemClick">已过期</tab-item>
    </tab>
    <div v-if="index===0" class="tab-item-container">
      <div v-for="itemnoUse in noUse ">
        <coupon-card :info="itemnoUse"></coupon-card>
      </div>
    </div>
    <!--<div v-if="index===1" class="tab-item-container">-->
      <!--<coupon-card></coupon-card>-->
    <!--</div>-->
    <div v-if="index===1" class="tab-item-container">
      <div v-for="itemExpired in Expired">
        <coupon-card :info="itemExpired"></coupon-card>
      </div>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem } from 'vux';
  import CouponCard from "./components/coupon-card";
export default {
  name: 'coupon',
  components: {
    Tab,
    TabItem,
    CouponCard
  },
  data () {
    return {
      index: 0,
      noUse: [],
      useed: [],
      Expired: [] // 过期
    }
  },
  methods: {
    onItemClick (index) {
      this.index = index
    },
    couponList (index) {
      var data= {
        page: 1,
        isExpired: index,
      }
      this.$axios.post(this.$baseUrl + '/per/couponlist', this.$qs.stringify({
        data: this.$base64.encode(JSON.stringify(data))
      })).then(result => {
        var res = JSON.parse(this.$base64.decode(result.data))
        if(res.code == 10000){
          if(index == 0){
            this.noUse = res.data
          }
          if(index == 1){
            this.Expired = res.data
          }
        }
      })
    }
  },
  mounted () {
    this.couponList(0);
    this.couponList(1)
  }
}
</script>

<style lang="less" scoped>
#coupon{
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .tab-item-container{
    padding: 0 0.3rem;
    padding-top: 0.2rem;
    flex: 1;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
