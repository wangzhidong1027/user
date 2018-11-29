<template>
  <div id="me">
    <header  :class=" isExpired == 2 ? 'vip':'' + ' ' + isvip">
      <div class="back-box"></div>
      <div class="header-contaner" >
        <a class="seticon" href="#/setting">
          <i class="iconfont icon-shezhi"></i>
        </a>
        <div class="info">
          <div class="user-img">
            <img src="../../assets/images/pic.jpg" alt="">
          </div>
          <div class="user" v-if="isLogin">
            <div class="name"><router-link to="/edit/username"><span>{{name}}</span></router-link><i>{{level_name}}</i></div>
            <div class="endtime" v-if="failure_time && isExpired != 2">您的{{level_name}}于{{datetime(failure_time)}}到期</div>
            <div class="endtime" v-else>您的超级会员已于{{datetime(failure_time)}}到期</div>
          </div>
          <div class="user" v-else>
            <div class="name">
              <router-link to="/login"><span>未登录</span></router-link>
            </div>
          </div>
        </div>
        <div class="renewal-box">
          <x-button plain class="renewal" @click.native="renew" >立即续费</x-button>
        </div>
        <div class="Open">
          <div class="vip"><strong>超级会员</strong><span>开通即享<b>4</b>大特权</span></div>
          <div class="open-btn">
            <x-button type="primary"
                      link="/dredgevip/1"
                      style="border-radius:0.21rem;height: 0.42rem; font-size: 0.24rem;line-height: 0.42rem;color: #836334"
                      :gradients="['#f8e7c1', '#f0cc9a']">立即开通
            </x-button>
          </div>
        </div>
      </div>
    </header>
    <!-----------------nav------------>
    <nav class="nav">
      <a class="nav-item" href="#/order">
        <div class="icon"><b class="iconfont icon-dingdan"></b></div>
        <p>订单</p>
      </a>
      <a class="nav-item" href="#/car">
        <div class="icon"><b class="iconfont icon-gouwuchekong"></b></div>
        <p>购物车</p>
      </a>
      <a class="nav-item" href="#/coupon">
        <div class="icon"><b class="iconfont icon-youhuiquan"></b></div>
        <p>优惠券</p>
      </a>
    </nav>
    <!-------------userInfo------------------->
    <group>
      <grid :cols="2">
        <grid-item @click.native="goIdcard">
          <div class="info-item">
            <div class="cell2-icon">
              <img src="../../assets/icon-img/persen.png" alt="">
            </div>
            <div class="info-title">
              <p class="title">实名认证</p>
              <p class="container">{{realname}}</p>
            </div>
          </div>
        </grid-item>
        <grid-item link="/edit/email">
          <div class="info-item">
            <div class="cell2-icon">
              <img src="../../assets/icon-img/email.png" alt="">
            </div>
            <div class="info-title">
              <p class="title">邮箱</p>
              <p class="container">{{email}}</p>
            </div>
          </div>
        </grid-item>
        <grid-item link="/edit/car_num">
          <div class="info-item">
            <div class="cell2-icon">
              <img src="../../assets/icon-img/car.png" alt="">
            </div>
            <div class="info-title">
              <p class="title">车辆绑定</p>
              <p class="container">{{car_num}}</p>
            </div>
          </div>
        </grid-item>
        <grid-item link="/idea">
          <div class="info-item">
           <div class="cell2-icon">
              <img src="../../assets/icon-img/idea.png" alt="">
           </div>
            <div class="info-title">
              <p class="title">意见反馈</p>
              <p class="container">期待您的反馈</p>
            </div>
          </div>
        </grid-item>
      </grid>
    </group>
    <!--nav-tab-->
    <div class="nav-tab">
      <tabbar>
        <tabbar-item link="home">
          <span slot="icon" class="icon-shouye1 iconfont" style="font-size: 22px;"></span>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item link="me" selected>
          <span slot="icon" class="icon-wode iconfont" style="color: #dfb875;font-size: 20px;"></span>
          <span slot="label" style="color: #dfb875">我的</span>
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
    Actionsheet,
    XButton
  } from "vux";
  import {mapMutations} from "vuex" 

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
      Actionsheet,
      XButton
    },
    data() {
      return {
        isvip: ''
      };
    },
    computed: {
      isLogin () {
        return this.$store.state.user.islogin
      },
      name () {
        if(this.$store.state.user.userinfo.username){
          return this.$store.state.user.userinfo.username
        }else{
          return this.$store.state.user.userinfo.mobile
        }
      },
      isExpired () {
        return this.$store.state.user.userinfo.isExpired
      },
      level_name () {
        if(this.$store.state.user.userinfo.level_name){
          switch (this.$store.state.user.userinfo.level_name){
            case '中能源超级会员' :
              this.isvip = 'vip'
                return '超级会员'
                break;
            case '中能源超级会员（15天体验）' :
              this.isvip = 'testvip'
              return '体验会员'
              break;
            case '中能源注册会员' :
              return '注册会员'
              break;
          }
        }else{
          return '注册会员'
        }
      },
      failure_time () {
        if(this.$store.state.user.userinfo.failure_time){
          return this.$store.state.user.userinfo.failure_time
        }else{
          return ''
        }
      },
      realname () {
        if(this.$store.state.user.userinfo.realname){
          return this.$store.state.user.userinfo.realname
        }else{
          return '未认证'
        }
      },
      email () {
        if(this.$store.state.user.userinfo.email){
          return this.$store.state.user.userinfo.email
        }else{
          return '未绑定'
        }
      },
      car_num() {
        if(this.$store.state.user.userinfo.car_num){
          return this.$store.state.user.userinfo.car_num
        }else{
          return '未绑定'
        }
      }
    },
    methods: {
       ...mapMutations([
        "getOpenid",
        "getUserInfo"
      ]),
      renew () {
        this.$vux.loading.show()
        var that = this
        var data = {
          gid: 1,
          openid: localStorage.getItem("openid")
        }
        data = this.$base64.encode(JSON.stringify(data))
        this.$axios.post(this.$baseUrl + '/per/memberrenew', this.$qs.stringify({
          data: data
        })).then(result => {
          var res = JSON.parse(this.$base64.decode(result.data))
          if (res.code == 10000) {
            this.$vux.loading.hide()
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', res.data,
              function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  this.getinfo()
                  that.$vux.confirm.show({
                    content: '恭喜您，会员续费成功！',
                    showCancelButton: false,
                  })
                }
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
      },
      goIdcard () {
        if(this.realname == '未认证'){
          this.$router.push({
            path: '/edit/realname'
          })
        }
      },
      datetime (time) {
        return time.substr(0,10)
      },
      getinfo() {
        this.$axios.post(this.$baseUrl + "/per/getuser", this.$qs.stringify({
        })).then(result => {
          var res = JSON.parse(this.$base64.decode(result.data));
          if (res.code === 10000) {
            this.getUserInfo(res.data);
          } else {
            localStorage.clear();
            this.$vux.toast.show({
              type: "cancel",
              text: res.message,
              position: "middle",
              isShowMask: true
            });
          }
        });
      },
    },
    mounted() {
      this.getOpenid(this.$base64.encode(location.href + "?openid="))
    }
  };

</script>

<style  lang="less">
  #me {
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    background: #f6f6f6;
    padding-bottom: 53px;
    box-sizing: border-box;
    header {
      width: 100%;
      height: 4.2rem;
      background: #2f2f31;
      position: relative;
      box-sizing: border-box;
      padding: 0.4rem 0.4rem 0px 0.4rem;
      overflow: hidden;
      z-index: 0;
    }
    .back-box {
      position: absolute;
      top: 2.1rem;
      left: 0;
      width: 200%;
      margin-left: -50%;
      background: #fff;
      height: 3rem;
      transform: rotate(-7deg);
      -ms-transform: rotate(-7deg); /* IE 9 */
      -moz-transform: rotate(-7deg); /* Firefox */
      -webkit-transform: rotate(-7deg); /* Safari 和 Chrome */
      -o-transform: rotate(-7deg);
      z-index: -1;
    }
    .header-contaner {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      z-index: 300;
      /*box-shadow: 0px 5px 0 #eaf1fc;*/
      background-image: url("../../assets/images/mebg.png");
      -webkit-background-size: 101% 100%;
      background-size: 101% 100%;
      background-position: -2px top;
      overflow: hidden;
      position: relative;
      .renewal-box{
        display: none;
      }
      .seticon {
        position: absolute;
        right: 0.24rem;
        top: 0.3rem;
        color: #fff;
        font-size: 0;
        i {
          font-size: 0.44rem;
        }
      }
      /*************用户信息********/
      .info {
        padding-top: 0.36rem;
        padding-left: 0.3rem;
        display: flex;
        justify-content: space-between;
        .user-img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            display: block;
          }
        }
        .user {
          flex: 1;
          padding-left: 0.2rem;
          padding-top: 0.1rem;
          .name {
            font-weight: 500;
            display: flex;
            align-items: center;
            span {
              color: #142e4a;
              font-size: 0.34rem;
              padding-right: 0.25rem;
            }
            i {
              display: inline-block;
              font-style: normal;
              color: #fff;
              font-size: .2rem;
              padding: 0 0.18rem;
              background-color: #2a3845;
              line-height: 0.36rem;
              border-radius: 0.17rem;
              font-weight: 500;
            }
          }
          .endtime{
            font-size: 0.24rem;
            font-weight: 500;
            color: #1d334a;
          }
        }
      }
      /*************开通会员********/
      .Open {
        display: block;
        box-sizing: border-box;
        height: 0.74rem;
        background-color: #ecf2fe;
        background-image: -webkit-gradient(linear, left 0, right 0, from(rgb(106, 129, 153)), to(rgb(80, 111, 150)));
        position: absolute;
        left: 0;
        bottom: 0.3rem;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-left: 0.3rem;
        padding-right: 0.2rem;
        .vip {
          strong {
            color: #f7d7a8;
            font-size: 0.28rem;
            line-height: 0.74rem;
          }
          span {
            padding-left: 0.2rem;
            color: #f5e6ca;
            font-size: 0.22rem;
            b {
              padding: 0 2px;
              font-weight: 500;
              font-size: 0.3rem;
            }
          }
        }
        .open-btn {
          display: flex;
          align-items: center;
          font-size: 0.24rem;
        }
      }
    }
    .nav {
      background: #fff;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0.3rem 0;
      .nav-item {
        flex: 1;
        text-align: center;
        .icon {
          line-height: normal;
          color: #d2c08d;
          font-size: 0.3rem;
          b {
            font-size: 0.5rem;
            font-weight: normal;
          }
        }
        p {
          font-size: 0.32rem;
          color: #3d3d3d;
        }
      }
    }
    /************info*********/
    .info-item {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cell2-icon {
        padding-left: 0.2rem;
        img{
          display: block;
          width: 0.54rem;
        }
      }
      .info-title{
        flex: 1;
        padding-left: 0.26rem;
        line-height: 0.56rem;
        font-weight: 500;
        .title{
          font-size: 0.32rem;
          color: #333333;
        }
        .container{
          font-size: 0.28rem;
          color: #9b9b9b;
        }
      }
    }
    /********nav-tab*****/
    .nav-tab {
      width: 100%;
    }
  }
  #me{
    .weui-grids:before{
      color: #ff0000;
      display: none;
    }
    .weui-grids:after {
      display: none;
    }
    .weui-cells:before{
      display: none;
    }
    .weui-cells:after {
      display: none;
    }

    .vip{
      .header-contaner{
        background-image: url("../../assets/images/mevip.png");
        .info{
          .user{
            .name{
              span{
                color: #70542c;
              }
              i{
                background: #4a2a11;
              }
            }
            .endtime{
              color: #70542c;
            }
          }
        }
        .Open{
          display: none;
        }
        .renewal-box{
          display: block;
          width: 2.6rem;
          position: absolute;
          bottom: 0.7rem;
          left: 0.4rem;
        }
        .renewal{
          height: 0.7rem;
          color: #674e25;
          border-radius: 0.35rem;
          font-size: 0.32rem;
          line-height: 0.7rem;
          font-weight: 500;
          border-color: #674e25;
        }
      }
    }
  }
</style>
