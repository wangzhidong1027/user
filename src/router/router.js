import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: '/home'
    },
    {
      path: "/home",
      name: "home",
      meta: {
        title: "主页"
      },
      component: () => import("../views/Home.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "登录"
      },
      component: () => import("../views/login.vue")
    },
    {
      path: "/reigster",
      name: "reigster",
      meta: {
        title: "注册"
      },
      component: () => import("../views/reigster.vue")
    },
    {
      path: "/me",
      name: "me",
      meta: {
        title: "个人中心"
      },
      component: () => import("../views/me.vue")
    },
    {
      path: "/idea",
      name: "idea",
      meta: {
        title: "意见反馈"
      },
      component: () => import("../views/me-page/idea.vue")
    },
     {
      path: "/edit/:type",
      name: "edit",
      meta: {
        title: "个人信息"
      },
      component: () => import("../views/me-page/components/edit.vue")
    },
    {
      path: "/setting",
      name: "setting",
      meta: {
        title: "设置"
      },
      component: () => import("../views/me-page/setting.vue")
    },
    {
      path: "/vip",
      name: "vip",
      meta: {
        title: "会员中心"
      },
      component: () => import("../views/viplist.vue")
    },
    {
      path: "/dredgevip/:id",
      name: "dredgevip",
      meta: {
        title: "会员权益"
      },
      component: () => import("../views/dredge-vip.vue")
    },
    {
      path: "/invite/:gid/:no/:type",
      name: "invite",
      meta: {
        title: "开通会员"
      },
      component: () => import("../views/invite-page.vue")
    },
    {
      path: "/nearby",
      name: "nearby",
      meta: {
        title: "附近油站"
      },
      component: () => import("../views/nearby/nearby.vue")
    },
    {
      path: "/goodslist",
      name: "goodslist",
      meta: {
        title: "商品列表"
      },
      component: () => import("../views/goods-list.vue")
    },
    {
      path: "/detail/:id",
      name: "detail",
      meta: {
        title: "商品详情"
      },
      component: () => import("../views/goods/detail.vue")
    },
    {
      path: "/pay/:orderid",
      name: "pay",
      meta: {
        title: "订单支付"
      },
      component: () => import("../views/pay/pay.vue")
    },
    {
      path: "/car",
      name: "car",
      meta: {
        title: "购物车"
      },
      component: () => import("../views/car/car.vue")
    },
    {
      path: "/coupon",
      name: "coupon",
      meta: {
        title: "优惠券"
      },
      component: () => import("../views/coupon/coupon.vue")
    },
    {
      path: "/order",
      name: "order",
      meta: {
        title: "订单列表"
      },
      component: () => import("../views/order/order-list.vue")
    },
    {
      path: "/maplist",
      name: "maplist",
      meta: {
        title: "油站地图"
      },
      component: () => import("../views/maplist/maplist.vue")
    },
    {
      path: "/oil",
      name: "oil",
      meta: {
        title: "一键加油"
      },
      component: () => import("../views/oil/oil.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  var token = localStorage.getItem('Token');
  var station = localStorage.getItem("station")
  if(!token ){
    if( to.name == "pay" ||  to.name == "order"  ||  to.name == "coupon"){
      next({
        name: 'login' // 跳转到登录页
      })
    }else{
      next()
    }
  }else{
    next()
  }
  // 未选择服务站
  // if(!station && (to.name == "car" || to.name == "goodslist" || to.name == "detail") ){
  //   localStorage.setItem("car","")
  //   next({
  //     name: 'nearby' // 选择油站
  //   })
  // }
});
router.afterEach((to, from) => {
  // ...
  var token = localStorage.getItem('Token')
  if(token){
    var memberNo = Vue.prototype.$memberNo;
    // var memberNo = localStorage.getItem("memberNo")
    Vue.prototype.$axios.post(Vue.prototype.$baseUrl + '/weixin/wxshare',Vue.prototype.$qs.stringify({
      url:location.href
    })).then(
      result => {
        var res = JSON.parse(Vue.prototype.$base64.decode(result.data))
        if (res.code == 10000) {
          var b = res.data
          wx.config({
            debug: false,////生产环境需要关闭debug模式
            appId: b.appId,//appId通过微信服务号后台查看
            timestamp: b.timestamp,//生成签名的时间戳
            nonceStr: b.nonceStr,//生成签名的随机字符串
            signature: b.signature,//签名
            jsApiList: [//需要调用的JS接口列表
              'onMenuShareTimeline',//分享给好友
              'onMenuShareAppMessage'//分享到朋友圈
            ]
          });
          wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
            wx.onMenuShareTimeline({
              title: '购买会员拿大礼包', // 分享标题
              desc: '购买会员拿大礼包', // 分享描述
              link: location.href.split("#")[0] + '/#/invite/1/'+ memberNo +'/2', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: location.href.split("#")[0] + '/ciec.png', // 分享图标
              success: function () {
                // 设置成功
              }
            })
            wx.onMenuShareAppMessage({
              title: '购买会员拿大礼包', // 分享标题
              link: location.href.split("#")[0] + '/#/invite/1/'+ memberNo +'/2', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: location.href.split("#")[0] + '/ciec.png', // 分享图标
              success: function () {
                // 用户点击了分享后执行的回调函数
              },
            })
          })
          wx.error(function (res) {
          });
        }
      }
    )
  }
})

export default router;
