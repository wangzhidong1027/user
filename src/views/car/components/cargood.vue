<template>
  <div class="car-goods">
    <router-link tag="a" class="right" :to="'/detail/'+ info.id" >
      <img :src="info.images" alt="">
      <div class="text-box">
        <div class="name">{{info.name}}</div>
        <div class="price">
          <p class="">￥<span>{{info.price | formatMoney}}</span></p>
          <p class="vipprice">￥<span>{{info.vipPrice | formatMoney}}</span><b class="iconfont icon-huiyuan" ></b></p>
        </div>
      </div>
    </router-link>
    <div class="number-input" style="text-align:center;">
      <x-number width="30px" :min="1" v-model="num"  @on-change="change"></x-number>
    </div>
  </div>
</template>

<script>
  import { XNumber } from 'vux'
export default {
  components: {
    XNumber
  },
  data () {
    return {
      num: ''
    }
  },
  props: {
    info: {
      type: Object
    },
    indexItem: {
      type: Number
    }
  },
  methods: {
    change (val) {
      this.$emit('on-changenum',val,this.indexItem)
    }
  },
  created () {
    this.num = this.info.number
  }
}
</script>

<style lang="less">

</style>
