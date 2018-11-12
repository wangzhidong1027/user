<template>
  <swipeout-item  ref="swipeoutItem" :right-menu-width="210" :sensitivity="15" class="car-cunt">
    <div slot="content" class="car-item  vux-1px-b">
      <div class="left"  >
        <checklist  :options="[{key: info.id,id:info.id, }]" v-model="checklist"  class="car-check"></checklist>
      </div>
      <router-link tag="a" class="right" :to="'/detail/'+ item.id" >
        <img :src="info.images" alt="">
        <div class="text-box">
          <div class="name">{{info.name}}</div>
          <div class="price">
            <p>￥<span>{{info.price | formatMoney}}</span></p>
            <p>￥<span>{{info.vipPrice | formatMoney}}</span><b class="iconfont icon-huiyuan" ></b></p>
          </div>
        </div>
      </router-link>
      <div class="number-input" style="text-align:center;">
        <x-number width="30px" :min="1" v-model="info" @on-change="changerNumber(index)"></x-number>
      </div>
    </div>
    <div slot="right-menu">
      <swipeout-button @click.native="onButtonClick(index)" type="primary" :width="70">删除</swipeout-button>
    </div>
  </swipeout-item>
</template>

<script>
export default {
  data () {
    return {
      num: ''
    }
  },
  props: {
    info: {}
  }
}
</script>
