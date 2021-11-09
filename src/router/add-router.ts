import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import store from "../store/index";
import release from "../views/content/release/release.vue";
import video from "../views/content/video/video.vue";
import opportunities from "../views/content/opportunities/opportunities.vue";
import opportunitiesKey from "../views/content/opportunities-key/opportunities-key.vue";
import auto from "../views/auto/auto.vue";
import cooperate from "../views/cooperate/cooperate.vue";
import user from "../views/system/user/user.vue";
import role from "../views/system/role/role.vue";
// import message from "../views/message/message.vue";
import { objAny } from "../common/common-interface";
Vue.use(VueRouter);

const mumeListData: Array<RouteConfig> = [
  {
    path: "/content/release",
    name: "一键发布",
    component: release,
    meta: {
      key: "one_click_publishing",
    },
  },
  {
    path: "/content/video",
    name: "视频列表",
    component: video,
    meta: {
      key: "video",
    },
  },
  {
    path: "/content/opportunities",
    name: "发现商机",
    component: opportunities,
    meta: {
      key: "discover_business",
    },
  },
  {
    path: "/content/opportunities-key",
    name: "商机关键字",
    component: opportunitiesKey,
    meta: {
      key: "business_keywords",
    },
  },

  {
    path: "/auto",
    name: "接入授权",
    component: auto,
    meta: {
      key: "real_name_auth",
    },
  },
  {
    path: "/cooperate/xin-tu",
    name: "星图达人",
    component: cooperate,
    meta: {
      key: "darling_cooperation",
    },
  },
  {
    path: "/system/user",
    name: "人员设置",
    component: user,
    meta: {
      key: "staffing",
    },
  },
  {
    path: "/system/role",
    name: "角色权限",
    component: role,
    meta: {
      key: "role_permission",
    },
  },
];

const recursionRouter = (routerList: objAny): objAny[] => {
  if (JSON.stringify(routerList) == "{}") {
    return mumeListData;
  } else {
    const list: objAny[] = [];
    mumeListData.map((item: objAny) => {
      for (const i in routerList) {
        if (i == item.meta.key) {
          list.push(item);
        }
      }
    });
    return list;
  }
};

export default recursionRouter;
