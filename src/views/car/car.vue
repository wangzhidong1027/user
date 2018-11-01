<template>
  <div id="car">
    <x-header :left-options="{backText: '主页', preventGoBack: true}" @on-click-back="goHome" >我的购物车
      <b slot="right" style="font-weight: normal" @click="alldel">删除选中</b>
    </x-header>
    <swipeout>
      <swipeout-item  ref="swipeoutItem" :right-menu-width="210" :sensitivity="15" v-for="item,index in carlist" class="car-cunt">
        <div slot="content" class="car-item  vux-1px-b">
            <div class="left"  >
              <checklist  :options="[{key: item.id,id:item.id, }]" v-model="checklist"  class="car-check"></checklist>
            </div>
            <router-link tag="a" class="right" :to="'/detail/'+ item.id" >
              <img src="//img13.360buyimg.com/n2/s240x240_jfs/t10675/253/1344769770/66891/92d54ca4/59df2e7fN86c99a27.jpg!q70.jpg" alt="">
              <div class="text-box">
                <div class="name">打开了分厘卡圣诞节灯笼阿斯顿撒旦asdsadsaasasdasdsaasdas撒旦撒旦撒旦裤洒家发</div>
                <div class="price">
                  <p>￥<span>9.00</span></p>
                  <p>￥<span>9.00</span><b class="iconfont icon-huiyuan" ></b></p>
                </div>
              </div>
            </router-link>
            <div class="number-input" style="text-align:center;">
              <inline-x-number width="30px" :min="1" v-model="item.number" @click.native="changeNumber(index)"></inline-x-number>
            </div>
        </div>
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick(index)" type="primary" :width="70">删除</swipeout-button>
        </div>
      </swipeout-item>
    </swipeout>
    <car-tab :allmoney="allmoney" :vipmoney="vipmoney" :allcount="allcount" :isALL="isALL" @selectallChange="selectallChange" @submitFrom="submitFrom"></car-tab>
  </div>
</template>

<script>
  import { Swipeout, SwipeoutItem, SwipeoutButton, XHeader, Checklist, InlineXNumber  } from 'vux'
  import { mapMutations } from "vuex";
  import CarTab from "./components/car--tab"
export default {
  name: "car",
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XHeader,
    Checklist,
    InlineXNumber,
    CarTab
  },
  data () {
    return {
      checklist: [],
      vipmoney: '0.00',
      allcount: 0
    }
  },
  computed: {
    carlist () {
      return this.$store.state.car.car
    },
    allmoney () {
      var all = 0
      var vip = 0
      var count = 0
      if (!this.checklist.length) {
        this.vipmoney = "0.00"
        this.allcount = 0
        return "0.00"
      }
      for (let i = 0; i < this.checklist.length; i++) {
        for (let k = 0;k < this.carlist.length; k++) {
          if (this.checklist[i]=== this.carlist[k].id) {
            vip += this.carlist[k].vipprice;
            all += this.carlist[k].price;
            count += this.carlist[k].number;
            break
          }
        }
      }
      this.allcount = count
      this.vipmoney = vip
      return all
    },
    isALL () {
      return this.carlist.length === this.checklist.length
    }
  },
  methods: {
    ...mapMutations([
      "ADD_CAR",
      "batch_DEL"
    ]),
    // 批量删除
    alldel () {
      if (!this.checklist.length) {
        this.$vux.toast.show({
          type: 'cancel',
          text: "请选择商品",
          width: "3em",
          position: "middle",
          isShowMask: true
        });
        return
      }
      this.batch_DEL( this.checklist);
    },
    // 左滑删除
    onButtonClick (index){
      this.batch_DEL([this.carlist[index].id])
    },
    // 选中
    change () {
      console.log(this.carlist)
    },
    // 修改购物车
    changeNumber (index) {
      if(this.carlist[index].number === 1) {
        return
      }
      this.ADD_CAR({id: this.carlist[index].id, number: this.carlist[index].number+1})
    },
    goHome () {
      this.$router.push({
        path: "home"
      })
    },
    // 全选
    selectallChange (val) {
      if (!val){
        var arr = []
        for(var i = 0;i < this.carlist.length; i++){
          arr.push(this.carlist[i].id)
        }
        this.checklist = arr
      }else{
        this.checklist = []
      }
    },
    // 提交订单
    submitFrom () {
      if (!this.checklist.length) {
        this.$vux.toast.show({
          type: 'cancel',
          text: "请选择商品",
          width: "3em",
          position: "middle",
          isShowMask: true
        });
        return
      }
    }
  }
}
</script>

<style lang="less" >
#car{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background: #f5f5f5;
  padding-bottom: 1rem;
  .car-cunt{
    margin-bottom: 0.2rem;
  }
  .car-item{
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    .left{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .weui-cells:before{
        display: none;
      }
      .weui-cells:after{
        display: none;
      }
      .weui-cells_checkbox{
        padding: 0;
      }
      .weui-cell.weui-check_label{
        padding: 0;
      }
    }
    .number-input{
      position: absolute;
      bottom: 0.2rem;
      right: 0;
      z-index: 999;
      line-height: 0;
    }
    .right{
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding: 0.3rem 0;
      img{
        width: 1.7rem;
        height: 1.7rem;
      }
      .text-box{
        flex: 1;
        .name{
          width: 100%;
          font-size: 0.25rem;
          height: 0.75rem;
          overflow: hidden;
          color: #333;
        }
        .price{
          font-size: 0.3rem;
          color: #e4393c;
          b{
            color: #ff9900;
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
}
</style>
