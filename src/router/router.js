import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
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
      path: "/dredgevip",
      name: "dredgevip",
      meta: {
        title: "会员权益"
      },
      component: () => import("../views/dredge-vip.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
});

export default router;
