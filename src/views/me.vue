<template>
  <div id="me">
    <header>
      <div class="header-left">
        <div class="user-img">
          <img src="https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png" alt="">
        </div>
      </div>
      <a class="header-right">
        <div class='name'>
          <a href="#/edit/username" v-if="isLogin"><span>{{name}}</span><b class="iconfont icon-bianji" style="margin-left: 30px;"></b></a>
         <a href="#/login" v-else><span>未登录</span></a>
        </div>
        <div class="vip">
          <a href="#/vip" :class="userinfo.level_name ? 'isVIP' : ''"><b class="iconfont icon-huiyuan" style="font-size:0.3rem "></b>{{userinfo.level_name}}</a>
        </div>
      </a>
      <div class="sign-box" @click="sign" v-if="isLogin">
          <div class="sign active">
              <div class="sign-icon"><i class="iconfont icon-qiandao"></i></div>
              <div class="sign-title" v-if="isSign">已签到</div>
              <div class="sign-title" v-else>点击签到</div>
          </div>
      </div>
    </header>

    <div class="nav">
      <grid>
        <grid-item label="订单" link="order">
          <b slot="icon" class="iconfont icon-dingdan" style="display: block;font-size: 26px;color: #999"></b>
        </grid-item>
        <grid-item label="已购" link="car">
           <b slot="icon" class="iconfont icon-gouwuchekong" style="display: block;font-size: 26px;color: #999"></b>
        </grid-item>
        <grid-item label="优惠券" link="coupon">
           <b slot="icon" class="iconfont icon-youhuiquan" style="display: block;font-size: 24px;color: #999"></b>
        </grid-item>
      </grid>
    </div>
    <div class="center" v-if="isLogin">
      <group :gutter="0">
        <cell is-link title="实名认证" value="未认证" link="edit/realname" v-if="!userinfo.realname">
          <b class="iconfont icon-shiming cell2-icon" slot="icon"></b>
        </cell>
        <cell  title="实名认证" :value="userinfo.realname" v-else>
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
      <group :gutter="0">
        <cell-box is-link link="setting">
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
    <actionsheet v-model="showShare" :menus="menus1" theme="ios" :show-cancel="true" @on-click-menu="ShareData"></actionsheet>
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
      car: ''
    };
  },
  computed: {
  	isLogin: () => {
  		return localStorage.getItem('Token') ? true : false;
    },
  },
  methods: {
  	getsign () {
  		let signTime = localStorage.getItem("sign");
  		if ( signTime ){
        var Otime = JSON.parse(this.$base64.decode(signTime))
        var date = new Date()
        if( Otime.year < date.getFullYear()){
            this.isSign =  true;
        }else if( Otime.month < date.getMonth() + 1 ){
             this.isSign =  true;
        }else if ( Otime.strDate <= date.getDate() ) {
           this.isSign =  true;
        }else{
        	 this.isSign =  false
        }
      }else{
  			 this.isSign =  false;
      }
    },
  	sign () {
  		if ( !this.isLogin || this.isSign) {
        return false;
      }
      var date = new Date()
      var currentdate = {
      	  year: date.getFullYear(),
          month: date.getMonth() + 1,
          strDate: date.getDate()
      }
      var base = this.$base64.encode(JSON.stringify(currentdate))
      localStorage.setItem("sign",base)
       this.isSign = true
       this.$vux.toast.show({
          text: "签到成功 积分+1",
          width: "3em",
          position: "middle",
          isShowMask: true
        });
    },
    show () {
      if(this.isLogin){
        this.showShare = true;
      }else{
      	this.$router.push({
          path: 'login'
        })
      }
    },
    getinfo() {
      this.$axios.post(this.$baseUrl + "/per/getuser", this.$qs.stringify({
      })).then(
      	result => {
          var res = JSON.parse(this.$base64.decode(result.data));
          if(res.code == 10000){
          	this.userinfo = res.data
            if(res.data.username){
          		this.name = res.data.username
            }else{
          		this.name = res.data.mobile
            }
          }else{
          	localStorage.clear()
          }
        });
    },
    ShareData (menuKey, menuItem) {
  	  console.log(menuItem)
      wx.updateAppMessageShareData({
        title: '购买会员拿大礼包', // 分享标题
        desc: '购买会员拿大礼包', // 分享描述
        link:  location.href.split("#")[0] + '/#/home', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png', // 分享图标
        success: function () {
          // 设置成功
        }
      })
    },
    updateTime () {
          wx.updateTimelineShareData({
            title: '购买会员拿大礼包', // 分享标题
            link: location.href.split("#")[0] + '/#home', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png', // 分享图标
            success: function () {
              // 用户点击了分享后执行的回调函数
            },
          })
    },

    getWX () {
      this.$axios.post(this.$baseUrl + '/weixin/wxshare').then(
        result => {
          var res = JSON.parse(this.$base64.decode(result.data))
          console.log(res)
          if (res.code == 10000) {
            var b = res.data
            // wx.config({
            //   debug: true,////生产环境需要关闭debug模式
            //   appId: b.appId,//appId通过微信服务号后台查看
            //   timestamp: b.timestamp,//生成签名的时间戳
            //   nonceStr: b.nonceStr,//生成签名的随机字符串
            //   signature: b.signature,//签名
            //   jsApiList: [//需要调用的JS接口列表
            //     'onMenuShareTimeline',//分享给好友
            //     'onMenuShareAppMessage'//分享到朋友圈
            //   ]
            // });
            // wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
            //   wx.updateTimelineShareData({
            //     title: '购买会员拿大礼包', // 分享标题
            //     link: location.href.split("#")[0] + '/#home', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            //     imgUrl: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png', // 分享图标
            //     success: function () {
            //       // 用户点击了分享后执行的回调函数
            //     },
            //   })
            // })
            // wx.error(function(res){
            // });
          }
        }
       )
    }
  },
  mounted() {
    this.getinfo();
    if( this.isLogin) {
      this.getsign()
      this.getWX()
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
        a{
          position: absolute;
          left: 0;
          bottom: 0;
          display: block;
          span {
            font-size: 0.4rem;
            color: #444;
          }
          b{
            color: #999;
          }
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
          font-size: 0.2rem;
          color: #fff;
        }
       .isVIP{
          background: #000;
         color: #f8e51c;
        }
      }
    }
    .sign-box{
      display: flex;
      align-items: center;
      .active{
        color: #f71d62;
      }
      .sign{
        margin-right: 0.2rem;
        width: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .sign-icon{
          display: inline-block;
          line-height: 0.5rem;
          margin: 0 auto;
          i{
            display: block;
            font-size: 0.4rem;
          }
        }
        .sign-title{
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
