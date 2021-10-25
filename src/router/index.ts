import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store/index";
import login from "../views/login/login.vue";
import home from "../views/home/home.vue";
import release from "../views/content/release/release.vue";
import video from "../views/content/video/video.vue";
import opportunities from "../views/content/opportunities/opportunities.vue";
import opportunitiesKey from "../views/content/opportunities-key/opportunities-key.vue";
import auto from "../views/auto/auto.vue";
import cooperate from "../views/cooperate/cooperate.vue";
import user from "../views/system/user/user.vue";
import message from "../views/message/message.vue";
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
    path: "/content/video",
    name: "video",
    component: video,
  },
  {
    path: "/content/opportunities",
    name: "opportunities",
    component: opportunities,
  },
  {
    path: "/content/opportunities-key",
    name: "opportunitiesKey",
    component: opportunitiesKey,
  },

  {
    path: "/auto",
    name: "auto",
    component: auto,
  },
  {
    path: "/cooperate/xin-tu",
    name: "cooperate",
    component: cooperate,
  },
  {
    path: "/system/user",
    name: "user",
    component: user,
  },
  {
    path: "/message",
    name: "message",
    component: message,
  },

  {
    path: "/login",
    name: "login",
    component: login,
  },
];

const router = new VueRouter({
  // mode: "history",
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
