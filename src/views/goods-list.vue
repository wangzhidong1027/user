<template>
  <div class="goodslist">
    <div class="out-side">
      <a class=" caricon iconfont icon-gouwuchekong" href="#/car">
        <badge  :text="carNum" class="total"></badge>
      </a>
    </div>
    <div  class="allgoods" v-show="show">
      <div class="nogoods" v-if="!goods.length">
        <p><b class="iconfont icon-shibai"></b></p>
        <p>抱歉，没有找到商品</p>
      </div>
      <div class="goods-item" v-for="item,index in goods" :key="item.id" v-show="item.inventory > 0 ">
        <a :href="'#/detail/' + item.id">
          <img :src="item.images" alt="" />
        </a>
        <div class="text">
          <div class="name">{{item.name}}</div>
          <div class="buy">
            <div class="price">
              <p class="ordinary"><span>零售价￥</span><b>{{item.price | formatMoney }}</b></p>
              <p class="vip"><span>会员价</span><b>￥{{item.vipPrice | formatMoney}}</b></p>
            </div>
            <div class="car-number">
              <b class="iconfont icon-gouwuchekong" @click="add(index)">
                <badge v-show="item.number" :text="item.number" class="icon-num"></badge>
              </b>
            </div>
          </div>
        </div>
      </div>
      <divider v-if="goods.length">我是有底线的！</divider>
    </div>
  </div>
</template>

<script>
  import { Badge, Divider } from 'vux';
  import { mapMutations, mapGetters  } from "vuex"
export default {
	name: "goodsList",
  components: {
    Badge,
    Divider
  },
  data () {
	  return {
      goods: [],
      show: false
    }
  },
  computed: {
    carlist () {
      return this.$store.state.car.car
    },
    ...mapGetters([
      'carNum'
    ]),
  },
  methods: {
    ...mapMutations([
      "ADD_CAR"
    ]),
    add (index) {
      this.goods[index].number ++
      this.ADD_CAR({id: this.goods[index].id, number: this.goods[index].number})
    }
  },
  created () {
	  // if(!localStorage.getItem("station")) {
    //   this.$vux.confirm.show({
    //     content: '您还未选择油站',
    //     showCancelButton: false,
    //     onConfirm: () => {
    //       this.$router.push({
    //         path: '/nearby'
    //       })
    //     }
    //   })
    // }else{
      var data = {merchNo: this.$merchNo}
      // var data = {merchNo: JSON.parse(localStorage.getItem("station")).merchNo}
      this.$axios.post(this.$baseUrl + "/per/oilgoodslist",this.$qs.stringify({
        data: this.$base64.encode(JSON.stringify(data))
      })).then(
        result => {
          var res = JSON.parse(this.$base64.decode(result.data))
          if(res.code == 10000) {
            this.goods = res.data.filter(item => {
              for (let i = 0; i < this.carlist.length; i++) {
                if( this.carlist[i].id === item.id) {
                  item.number = this.carlist[i].number
                  return item
                }
              }
              item.number = 0
              return item
            })
            this.show = true
          }else{
            // this.$router.go(-1)
            this.$vux.toast.show({
              type: "cancel",
              text: res.message,
              position: "middle",
              isShowMask: true
            });
          }
        }
      )
    // }
  },
}
</script>

<style lang="less" scoped>
.goodslist {
  width: 100%;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding-top: 20px;
  background: #f5f5f5;
  .out-side{
    position: fixed;
    bottom: 1rem;
    right:  0.3rem;
    z-index: 200;
  }
  .caricon{
    position: relative;
    font-size: 0.5rem;
    background: #000;
    border-radius: 50%;
    width: 0.9rem;
    height: 0.9rem;
    text-align: center;
    line-height: 0.9rem;
    color: #999;
    display: flex;
    opacity: 0.7;
    justify-content: center;
    z-index: 200;
    .total{
      position:absolute;
      top: 0;
      right: -5px;
    }
  }
  .nogoods {
    width: 100%;
    margin: 0 auto;
    p {
      width: 100%;
      text-align: center;
      font-size: 0.4rem;
      color: #333;
      margin-top: 20px;
    }
    b {
      font-size: 3rem;
      color: #999;
    }
  }
  .allgoods{
    width: 100%;
    box-sizing: border-box;
    padding:0 0.15rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .goods-item{
      width: 50%;
      margin-bottom: 0.3rem;
      /*border: 1px solid #eee;*/
      box-sizing: border-box;
      padding: 0 0.1rem;
      a{
        height: 3.4rem;
        overflow: hidden;
        background: #fff;
        display: flex;
        align-items: center;
        img{
          display: block;
          width: 100%;
        }
      }
      .text{
        background: #fff;
        padding: 0 0.2rem;
      }
      .name{
        border-top: 1px solid #eee;
        font-size: 0.23rem;
        width: 100%;
        overflow: hidden;
        height: 0.7rem;
      }
      .buy{
        display: flex;
        justify-content: space-around;
        .price{
          flex: 1;
          font-size: 0.22rem;
          color: #ff3737;
          b{
            font-size: 0.25rem;
            color: #ff3737;
          }
          .vip{
            font-weight: 600;
            span{
              display: inline-block;
              line-height: 0.4rem;
              border-radius: 2px;
              background: linear-gradient(90deg, rgb(254, 252, 249), rgb(245, 235, 216));
              color: #ae8d4c;
            }
          }
          .ordinary{
            color: #666;
            b{
              font-size: 0.25rem;
              color: #666;
              font-weight: normal;
            }
          }
        }
        .car-number{
          display: flex;
          align-items: center;
          padding-right: 0.2rem;
          b{
            font-size: 0.4rem;
            position: relative;
            .icon-num{
              position: absolute;
              top: -0.1rem;
              right: -0.2rem;
            }
          }
        }
      }
    }
  }
}
</style>
