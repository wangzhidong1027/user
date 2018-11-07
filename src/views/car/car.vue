<template>
  <div id="car">
    <x-header :left-options="{backText: '主页', preventGoBack: true}" @on-click-back="goHome" >我的购物车
      <b slot="right" style="font-weight: normal" @click="alldel">删除选中</b>
    </x-header>
    <swipeout>
      <swipeout-item  ref="swipeoutItem" :right-menu-width="210" :sensitivity="15" v-for="item,index in goodsinfo" class="car-cunt">
        <div slot="content" class="car-item  vux-1px-b">
            <div class="left"  >
              <checklist  :options="[{key: item.id,id:item.id, }]" v-model="checklist"  class="car-check"></checklist>
            </div>
            <router-link tag="a" class="right" :to="'/detail/'+ item.id" >
              <img :src="item.images" alt="">
              <div class="text-box">
                <div class="name">{{item.name}}</div>
                <div class="price">
                  <p>￥<span>{{item.price | formatMoney}}</span></p>
                  <p>￥<span>{{item.vipPrice | formatMoney}}</span><b class="iconfont icon-huiyuan" ></b></p>
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
  import { mapMutations, mapGetters  } from "vuex";
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
      allcount: 0,
      goodsinfo: []
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
        for (let k = 0;k < this.goodsinfo.length; k++) {
          if (this.checklist[i]=== this.goodsinfo[k].id) {
            vip += this.goodsinfo[k].vipPrice * 100 * this.goodsinfo[k].number;
            all += this.goodsinfo[k].price * 100  * this.goodsinfo[k].number;
            count += this.goodsinfo[k].number;
            break
          }
        }
      }
      this.allcount = count
      this.vipmoney = vip/100
      return all/100
    },
    isALL () {
      return this.carlist.length === this.checklist.length &&this.checklist.length !== 0
    }
  },
  methods: {
    ...mapMutations([
      "ADD_CAR",
      "batch_DEL"
    ]),
    getgoodsInfo () {
      var ids = ""
      for(var i = 0; i < this.carlist.length; i++){
        ids = ids + this.carlist[i].id  + ","
      }
      var data = {
        merchNo: JSON.parse(localStorage.getItem("station")).merchNo,
        ids: ids
      };
      this.$axios.post(this.$baseUrl + '/per/getbatchgoodsinfo',this.$qs.stringify({
        data: this.$base64.encode(JSON.stringify(data))
      })).then( result => {
        var res = JSON.parse(this.$base64.decode(result.data))
        if(res.code == 10000 ){
          this.goodsinfo = res.data
          for (var i = 0; i < this.carlist.length; i++){
            for (var k = 0; k < this.goodsinfo.length; k++){
              if(this.carlist[i].id == this.goodsinfo[k].id ){
                this.goodsinfo[k].number = this.carlist[i].number
              }
            }
          }
        }
      })
    },
    // 批量删除
    alldel () {
      if (!this.checklist.length) {
        this.$vux.toast.show({
          type: 'cancel',
          text: "请选择商品",
          position: "middle",
          isShowMask: true
        });
        return
      }
      console.log(this.checklist)
      this.batch_DEL( this.checklist);
      // this.goodsinfo = this.carlist

      for(let i = 0;i <  this.checklist.length; i++){
        for(let k = 0;k <  this.goodsinfo.length; k++){
          if (this.goodsinfo[k].id === this.checklist[i] ) {
            this.goodsinfo.splice( k, 1);
            break
          }
        }
      }
    },
    // 左滑删除
    onButtonClick (index){
      this.batch_DEL([this.goodsinfo[index].id])
      this.goodsinfo.splice(index,1)
    },
    // 选中
    change () {
      console.log(this.carlist)
    },
    // 修改购物车
    changeNumber (index) {
      if(this.goodsinfo[index].number === 1) {
        return
      }
      this.ADD_CAR({id: this.carlist[index].id, number: this.goodsinfo[index].number+1})
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
      if( !localStorage.getItem("Token")){
        this.$vux.confirm.show({
          content: '您还未登陆',
          showCancelButton: false,
          onConfirm: () => {
            this.$router.push({
              path: 'login'
            })
          }
        })
        return false
      }
      if (!this.checklist.length) {
        this.$vux.toast.show({
          type: 'cancel',
          text: "请选择商品",
          position: "middle",
          isShowMask: true
        });
        return false
      }
      var datafrom = {
        merchNo: JSON.parse(localStorage.getItem("station")).merchNo,
        goods: this.carlist,
        totalAmt: this.allmoney,
        totalVipAmt: this.vipmoney
      }
      this.$axios.post(this.$baseUrl + "/per/orderdown",this.$qs.stringify({
        data: this.$base64.encode(JSON.stringify(datafrom))
      })).then(result => {
        var res = JSON.parse(this.$base64.decode(result.data))
        if(res.code == 10000){
          this.batch_DEL( this.checklist);
          this.$router.push({
            path: '/pay/'+res.data
          })
        }else{
          this.$vux.toast.show({
            type: "cancel",
            text: res.message,
            position: "middle",
            isShowMask: true
          });
        }
      })
    }
  },
  mounted () {
    this.getgoodsInfo()
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
      right: 0.2rem;
      z-index: 999;
      line-height: 0;
    }
    .right{
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding: 0.3rem 0;
      padding-right: 0.2rem;
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
