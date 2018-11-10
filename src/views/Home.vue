<template>
  <div class="home">
      <div style="font-size: 0.3rem">
          <swiper :list="demo01_index" :auto="true" :loop="true" :show-desc-mask="false"></swiper>
      </div>
      <grid style="background: #fff; margin-top: 15px">
        <grid-item label="会员特权" link="dredgevip/1">
        </grid-item>
          <grid-item label="会员商城" link="goodslist">
        </grid-item>
          <grid-item label="邀请拿礼" link="https://zzfw.haibaobaoxian.com/activity/insr-accident.html?pcode=lifjr-h5-zengx">
        </grid-item>
          <grid-item label="一键加油"  @click.native="alertNow">
        </grid-item>
      </grid>
      <div style="width: 100%;margin-top: 10px">
        <a href="#/dredgevip/1">
           <img style="width: 100%; display: block" src="../assets/images/jbanner.jpg" alt="">
        </a>
      </div>
    <div style="width: 100%;margin-top: 10px">
      <a href="#/invite/1/OS1541057568072831/1">
        <img style="width: 100%; display: block" src="../assets/images/jianyang.jpg" alt="">
      </a>
    </div>
    <h5 class="active">热卖商品</h5>
    <div class="hot">
      <goodscard v-for="item in goods" :info="item"></goodscard>
    </div>
      <!--<group title="今日油价" style="background: #fff;line-height: 30px; padding-left:20px; padding-right: 20px; ">-->
          <!--<v-chart :data="data" prevent-default>-->
              <!--<v-scale x :tick-count="3"/>-->
              <!--<v-tooltip :show-item-marker="false" show-x-value/>-->
              <!--<v-line/>-->
          <!--</v-chart>-->
      <!--</group>-->
      <tabbar>
          <tabbar-item selected link="home">
              <span slot="icon" class="icon-shouye1 iconfont" style=" color: #ff9900;font-size: 22px;"></span>
              <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item link="me">
              <span slot="icon" class="icon-wode iconfont" style=" font-size: 20px;"></span>
              <span slot="label">我的</span>
          </tabbar-item>
      </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Swiper, Group, VChart, VTooltip, VLine, VScale, Grid, GridItem } from "vux"
import Goodscard from  '../components/good-card/good-card'
import banner1 from '../assets/images/vipbanner.jpg'
import banner2 from '../assets/images/baoxian.jpg'
export default {
  name: "home",
  components: {
    Tabbar,
    TabbarItem,
    Swiper,
    Group,
    VChart,
    VTooltip,
    VLine,
    VScale,
    Grid,
    GridItem,
    Goodscard
  },
  data() {
    return {
      demo01_index: [
        {
          url: "/dredgevip/1",
          img: banner1,
          title: ""
        },
        {
          url: "https://zzfw.haibaobaoxian.com/activity/insr-accident.html?pcode=lifjr-h5-zengx",
          img: banner2,
        },
      ],
      goods: [],
      data: [
        { date: "2017-06-05", value: 116 },
        { date: "2017-06-06", value: 129 },
        { date: "2017-06-07", value: 135 },
        { date: "2017-06-08", value: 86 },
        { date: "2017-06-09", value: 73 },
        { date: "2017-06-10", value: 85 },
        { date: "2017-06-11", value: 73 },
        { date: "2017-06-12", value: 68 },
        { date: "2017-06-13", value: 92 },
        { date: "2017-06-14", value: 130 },
        { date: "2017-06-15", value: 245 },
        { date: "2017-06-16", value: 139 },
        { date: "2017-06-17", value: 115 },
        { date: "2017-06-18", value: 111 },
        { date: "2017-06-19", value: 309 },
        { date: "2017-06-20", value: 206 },
        { date: "2017-06-21", value: 137 },
        { date: "2017-06-22", value: 128 },
        { date: "2017-06-23", value: 85 },
        { date: "2017-06-24", value: 94 },
        { date: "2017-06-25", value: 71 },
        { date: "2017-06-26", value: 106 },
        { date: "2017-06-27", value: 84 },
        { date: "2017-06-28", value: 93 },
        { date: "2017-06-29", value: 85 },
        { date: "2017-06-30", value: 73 },
        { date: "2017-07-01", value: 83 },
        { date: "2017-07-02", value: 125 },
        { date: "2017-07-03", value: 107 },
        { date: "2017-07-04", value: 82 },
        { date: "2017-07-05", value: 44 },
        { date: "2017-07-06", value: 72 },
        { date: "2017-07-07", value: 106 },
        { date: "2017-07-08", value: 107 },
        { date: "2017-07-09", value: 66 },
        { date: "2017-07-10", value: 91 },
        { date: "2017-07-11", value: 92 },
        { date: "2017-07-12", value: 113 },
        { date: "2017-07-13", value: 107 },
        { date: "2017-07-14", value: 131 },
        { date: "2017-07-15", value: 111 },
        { date: "2017-07-16", value: 64 },
        { date: "2017-07-17", value: 69 },
        { date: "2017-07-18", value: 88 },
        { date: "2017-07-19", value: 77 },
        { date: "2017-07-20", value: 83 },
        { date: "2017-07-21", value: 111 },
        { date: "2017-07-22", value: 57 },
        { date: "2017-07-23", value: 55 },
        { date: "2017-07-24", value: 60 }
      ]
    }
  },
  methods: {
    alertNow () {
      this.$vux.confirm.show({
        content: '敬请期待！',
        showCancelButton: false,
        onConfirm: () => {}
      })
    },
    getgoods () {
      var data = {merchNo: this.$merchNo}
      // var data = {merchNo: JSON.parse(localStorage.getItem("station")).merchNo}
      this.$axios.post(this.$baseUrl + "/per/oilgoodslist",this.$qs.stringify({
        data: this.$base64.encode(JSON.stringify(data))
      })).then(
        result => {
          var res = JSON.parse(this.$base64.decode(result.data))
          if(res.code == 10000) {
            this.goods = res.data
            console.log(this.goods)
          }else{
            this.$vux.toast.show({
              type: "cancel",
              text: res.message,
              position: "middle",
              isShowMask: true
            });
          }
        }
      )
    }
  },
  mounted () {
    this.getgoods()
  }
};
</script>

<style lang="less" scoped>
.weui-bar__item_on {
  p {
    span {
      color: #ff9900;
    }
  }
}
.home {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1rem;
  box-sizing: border-box;
  .active{
    font-size: 0.3rem;
    line-height: 1rem;
    padding: 0 0.2rem;
  }
  .hot{
    padding: 0 0.2rem;
    background: #fff;
  }
}
</style>
