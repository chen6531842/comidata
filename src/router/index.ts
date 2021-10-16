import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store/index";
import login from "../views/login/login.vue";
import home from "../views/home/home.vue";
import release from "../views/content/release/release.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/home",
    name: "home2",
    component: home,
  },
  {
    path: "/content/release",
    name: "release",
    component: release,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const state: any = store.state; // eslint-disable-line

  if (to.path != "/login" && !state.sys.isGetRouter) {
    //如果还没有添加路由
    store.dispatch("getRouter", {
      next: next,
      to: to,
    });
  } else {
    next();
  }
});

export default router;
