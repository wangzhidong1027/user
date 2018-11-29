<template>
  <div id="me" >
    <div class="container" v-if="isshowpage">
    <header>
      <div class="header-left">
        <div class="user-img">
          <img src="../assets/images/pic.jpg" alt="">
        </div>
      </div>
      <a class="header-right"> 
        <div class='name'>
          <div  v-if="isLogin"><a href="#/edit/username">{{name}}</a><b class="iconfont icon-bianji" style="margin-left: 30px;"></b></div>
          <div  v-else><a href="#/login">未登录</a></div>
        </div>s
        <div class="vip">
          <a href="#/dredgevip/1" :class="userinfo.level_name ? 'isVIP' : ''"><b class="iconfont icon-huiyuan" style="font-size:0.3rem "></b>{{userinfo.level_name}}</a>
          <!--<span v-if="userinfo.level_name">{{datetime(userinfo.failure_time)}} 会员到期</span>-->
        </div>
        <div class="viptime" v-if="userinfo.level_name">
          <p>会员到期</p>
          <p>{{datetime(userinfo.failure_time)}}</p>
        </div>
      </a>
      <!--<div class="sign-box" @click="sign" v-if="isLogin">-->
        <!--<div class="sign active">-->
          <!--<div class="sign-icon"><i class="iconfont icon-qiandao"></i></div>-->
          <!--<div class="sign-title" v-if="isSign">已签到</div>-->
          <!--<div class="sign-title" v-else>点击签到</div>-->
        <!--</div>-->
      <!--</div>-->
    </header>

    <div class="nav">
      <grid>
        <grid-item label="订单" link="order">
          <b slot="icon" class="iconfont icon-dingdan" style="display: block;font-size: 26px;color: #FF7500"></b>
        </grid-item>
        <grid-item label="购物车" link="car">
          <b slot="icon" class="iconfont icon-gouwuchekong" style="display: block;font-size: 26px;color: #FF7500"></b>
        </grid-item>
        <grid-item label="优惠券" link="coupon">
          <b slot="icon" class="iconfont icon-youhuiquan" style="display: block;font-size: 24px;color: #FF7500"></b>
        </grid-item>
      </grid>
    </div>
    <div class="center" v-if="isLogin">
      <group :gutter="0">
        <cell is-link title="实名认证" value="未认证" link="edit/realname" v-if="!userinfo.realname">
          <b class="iconfont icon-shiming cell2-icon" slot="icon"></b>
        </cell>
        <cell title="实名认证" :value="userinfo.realname" v-else>
          <b class="iconfont icon-shiming cell2-icon" slot="icon"></b>
        </cell>
        <cell is-link link="edit/email" title="邮箱绑定" value="未设置" v-if="!userinfo.email">
          <b class="iconfont icon-youxiang cell2-icon" slot="icon"></b>
        </cell>
        <cell is-link link="edit/email" title="邮箱绑定" :value="userinfo.email" v-else>
          <b class="iconfont icon-youxiang cell2-icon" slot="icon"></b>
        </cell>
        <cell is-link link="edit/car_num" title="车辆绑定" value="未绑定" v-if="!userinfo.car_num">
          <b class="iconfont icon-cheliangguanli cell2-icon" slot="icon"></b>
        </cell>
        <cell is-link link="edit/car_num" title="车辆绑定" :value="userinfo.car_num" v-else>
          <b class="iconfont icon-cheliangguanli cell2-icon" slot="icon"></b>
        </cell>
      </group>
    </div>
    <div class="center">
      <cell-box is-link @click.native="show" v-if="!userinfo.level_name">
        <b class="iconfont icon-huiyuan cell-icon" ></b>体验会员
      </cell-box>
      <group :gutter="0">
        <cell-box is-link link="setting">
          <b class="iconfont icon-shezhi cell-icon"></b>设置
        </cell-box>
        <!--<cell-box is-link @click.native="show">-->
        <!--<b class="iconfont icon-yaoqing cell-icon" style="font-size: 18px"></b>邀请好友-->
        <!--</cell-box>-->
        <cell-box is-link link="idea">
          <b class="iconfont icon-yijianfankui cell-icon"></b>意见反馈
        </cell-box>

      </group>
    </div>
    <!--<actionsheet v-model="showShare" :menus="menus1" theme="ios" :show-cancel="true"-->
                 <!--@on-click-menu="ShareData"></actionsheet>-->
    </div>
    <div class="bot">
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
  </div>
</template>

<script>
  import {
    Tabbar,
    TabbarItem,
    Grid,
    GridItem,
    CellBox,
    Cell,
    Group,
    Actionsheet
  } from "vux";

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
        },
        isSign: false,
        name: '',
        userinfo: '',
        realname: '',
        email: '',
        car: '',
        isLogin: false,
        isshowpage: false
      };
    },
    computed: {
      // isLogin: () => {
      //   return localStorage.getItem('Token') ? true : false;
      // },
    },
    methods: {
      datetime (time) {
        return time.substr(0,10)
      },
      getsign() {
        let signTime = localStorage.getItem("sign");
        if (signTime) {
          var Otime = JSON.parse(this.$base64.decode(signTime))
          var date = new Date()
          if (Otime.year < date.getFullYear()) {
            this.isSign = true;
          } else if (Otime.month < date.getMonth() + 1) {
            this.isSign = true;
          } else if (Otime.strDate <= date.getDate()) {
            this.isSign = true;
          } else {
            this.isSign = false
          }
        } else {
          this.isSign = false;
        }
      },
      sign() {
        if (!this.isLogin || this.isSign) {
          return false;
        }
        var date = new Date()
        var currentdate = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          strDate: date.getDate()
        }
        var base = this.$base64.encode(JSON.stringify(currentdate))
        localStorage.setItem("sign", base)
        this.isSign = true
        this.$vux.toast.show({
          text: "签到成功 积分+1",
          position: "middle",
          isShowMask: true
        });
      },
      show() {
        if(!this.isLogin){
          this.$vux.alert.show({
            title: '提示',
            content: '请先登录',
          })
          return
        }
        this.$axios.post(this.$baseUrl + "/per/applymembertest", this.$qs.stringify({})).then(
          result => {
            var res = JSON.parse(this.$base64.decode(result.data));
            if (res.code == 10000) {
              this.$vux.alert.show({
                title: '恭喜',
                content: '您已成功申请为体验会员，明日生效后可享受会员权益',
              })
            } else if(res.code == 30001){
              if(this.userinfo.level_name){
                this.$vux.alert.show({
                  title: '提示',
                  content: '你已经是会员',
                })
              } else {
                this.$vux.alert.show({
                  title: '提示',
                  content: '体验会员每给账号只能一次',
                })
              }
            }else{
              this.$vux.alert.show({
                title: '提示',
                content: res.message,
              })
            }
          })
      },
      getinfo() {
        this.$axios.post(this.$baseUrl + "/per/getuser", this.$qs.stringify({})).then(
          result => {
            this.isshowpage = true
            var res = JSON.parse(this.$base64.decode(result.data));
            if (res.code == 10000) {
              this.isLogin = true
              this.userinfo = res.data
              localStorage.setItem("memberNo",res.data.memberNo)
              if (res.data.username) {
                this.name = res.data.username
              } else {
                this.name = res.data.mobile
              }
            } else {
              this.isLogin = false
              localStorage.clear()
            }
          });
      },
    },
    mounted() {
      this.getinfo();
      if (this.isLogin) {
        this.getsign()
      }
    }
  };
</script>

<style scoped lang="less">
  .weui-bar__item_on {
    p {
      span {
        color: #ff9900;
      }
    }
  }
  .cell-icon {
    padding-right: 10px;
    color: #0bb2e0;
  }
  .cell2-icon {
    padding-right: 10px;
    color: #ff9900;
  }
  #me {
    height: 100%;
    width: 100%;
    background: #f5f5f5;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .container{
      flex: 1;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .bot{
      height: 53px;
    }
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
        position: relative;
        .viptime{
          position: absolute;
          right: 0;
          top: 50%;
          font-size: 0.25rem;
          height: 0.8rem;
          margin-top: -0.4rem;
          display: flex;
          flex-direction: column;
          background: #e9c285;
          width: 2rem;
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          p{
            flex: 1;
            text-align: center;
            color: #b27a5c;
            line-height: 0.4rem;
          }
        }
        div {
          flex: 1;
          font-size: 20px;
        }
        .name {
          position: relative;
          a {
            position: absolute;
            left: 0;
            bottom: 0;
            display: block;
            span {
              font-size: 0.4rem;
              color: #444;
            }
            b {
              color: #999;
            }
          }
        }
        .vip {
          position: relative;
          span{
            position: absolute;
            top:  0.5rem;
            left: 0;
            font-size: 0.22rem;
            color: #999;
          }
          a {
            position: absolute;
            top: 0;
            left: 0;
            background: #eee;
            padding: 0 0.2rem;
            border-radius: 0.2rem;
            font-size: 0.2rem;
            color: #fff;
          }
          .isVIP {
            background: #333;
            color: #f8e51c;
          }
        }
      }
      .sign-box {
        display: flex;
        align-items: center;
        .active {
          color: #f71d62;
        }
        .sign {
          margin-right: 0.2rem;
          width: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          .sign-icon {
            display: inline-block;
            line-height: 0.5rem;
            margin: 0 auto;
            i {
              display: block;
              font-size: 0.4rem;
            }
          }
          .sign-title {
            text-align: center;
            font-size: 0.25rem;
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
