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
    }
  ]
});

router.beforeEach((to,from, next) => {
  document.title = to.meta.title;
  next()
});

export default router;
