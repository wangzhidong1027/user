<template>
  <div class="home">
      <div>
          <swiper :list="demo01_index" :auto="true" :loop="true"></swiper>
      </div>
      <grid style="background: #fff; margin-top: 15px">
        <grid-item label="会员特权">
        </grid-item>
          <grid-item label="积分兑换" >
        </grid-item>
          <grid-item label="邀请拿礼" >
        </grid-item>
          <grid-item label="限时领券" >
        </grid-item>
      </grid>
      <div style="width: 100%;margin-top: 10px">
          <img style="width: 100%; display: block" src="../assets/images/jbanner.jpg" alt="">
      </div>
      <group title="今日油价" style="background: #fff;line-height: 30px">
          <v-chart :data="data" prevent-default>
              <v-scale x :tick-count="3"/>
              <v-tooltip :show-item-marker="false" show-x-value/>
              <v-line/>
          </v-chart>
      </group>
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
    GridItem
  },
  data() {
    return {
      demo01_index: [
        {
          url: "/vip",
          img: "http://pic.qiantucdn.com/58pic/28/25/77/60A58PICdx5_1024.jpg!/fw/1024/watermark/url/L2ltYWdlcy93YXRlcm1hcmsveGlhb3R1LnBuZw==/align/center",
          title: "开通个会员吧"
        },
        {
          url: "javascript:",
          img: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg",
          title: "送你一朵fua"
        },
        {
          url: "javascript:",
          img: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg",
          title: "送你一辆车"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/5.jpg",
          title: "送你一次旅行",
          fallbackImg: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"
        }
      ],
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
    };
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
  padding-bottom: 1.2rem;
  box-sizing: border-box;
}
</style>
