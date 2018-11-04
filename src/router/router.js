import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: '/me'
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
      path: "/pay",
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
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
});

export default router;
