<template>
    <div id="me">
        <header>
            <div class="header-left">
                <div class="user-img">
                    <img src="https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png" alt="">
                </div>
            </div>
            <a class="header-right">
                <div class='name'><a href="#/edit/name"><span>昵称</span></a></div>
                <div class="vip">
                    <a href="#/vip">会员</a>
                </div>
            </a>
        </header>
        <div class="nav">
            <grid>
                <grid-item label="订单">
                    <!--<img slot="icon" src="">-->
                </grid-item>
                <grid-item label="已购">
                    <!--<img slot="icon" src="">-->
                </grid-item>
                <grid-item label="优惠券">
                    <!--<img slot="icon" src="">-->
                </grid-item>
            </grid>
        </div>
        <div class="center">
            <group :gutter="0"  >
                <cell is-link title="实名认证" value="未认证" link="edit/car">
                </cell>
                <cell is-link link="edit/car" title="邮箱绑定" value="未认证">
                </cell>
                <cell is-link link="edit/car" title="车辆绑定" value="未认证">
                </cell>
            </group>
        </div>
        <div class="center">
            <group :gutter="0">
                <cell-box is-link>
                     <b class="iconfont icon-shezhi cell-icon"></b>设置
                </cell-box>
                <cell-box is-link @click.native="show">
                     <b class="iconfont icon-yaoqing cell-icon" style="font-size: 18px"></b>邀请好友
                </cell-box>
                <cell-box is-link link="idea">
                    <b class="iconfont icon-yijianfankui cell-icon"></b>意见反馈
                </cell-box>
            </group>
        </div>
        <actionsheet v-model="showShare" :menus="menus1" theme="ios" :show-cancel="true"></actionsheet>
        <tabbar>
            <tabbar-item link="home">
                <span slot="icon" class="icon-shouye1 iconfont" style="font-size: 22px;"></span>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item link="me" selected>
                <span slot="icon" class="icon-wode iconfont" style="color: #ff9900;font-size: 20px;"></span>
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import {Tabbar, TabbarItem, Grid, GridItem, CellBox, Cell, Group, Actionsheet} from 'vux'

export default {
  name: "me",
  components: {
    Tabbar,
    TabbarItem,
    Grid,
    GridItem,
    CellBox,
    Cell,
    Group,
    Actionsheet
  },
  data() {
    return {
      showShare: false,
      menus1: {
        menu1: "邀请好友",
        menu2: "分享到朋友圈"
      }
    }
  },
  methods: {
    show () {
      this.showShare = true;
    }
  }
}
</script>

<style scoped lang="less">
.weui-bar__item_on {
  p {
      span {
          color: #ff9900;
      }
  }
}
.cell-icon{
  padding-right: 5px;
}
#me {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1.2rem;
  box-sizing: border-box;
  header {
  height: 2rem;
  background: #fff;
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: flex-start;
  .header-left {
    width: 25%;
    height: 100%;
    box-sizing: border-box;
    .user-img {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      display: block;
      width: 60%;
      border-radius: 50%;
    }
  }
  .header-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      div {
          flex: 1;
          font-size: 20px;
      }
      .name {
          position: relative;
          a span {
              position: absolute;
              left: 0;
              bottom: 0;
              font-size: 0.4rem;
              color: #444;
          }
      }
      .vip {
          position: relative;
          a {
              position: absolute;
              top: 0;
              left: 0;
              background: #eee;
              padding: 0 0.2rem;
              border-radius: 0.2rem;
              font-size: 0.3rem;
              color: #fff;
          }
      }
    }
  }
  .nav {
    background: #fff;
    margin-bottom: 0.2rem;
  }
  .center {
    background: #fff;
    margin-bottom: 0.2rem;
  }
}
</style>
