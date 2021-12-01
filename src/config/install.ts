// import Vue from "vue";
import config from "./config";
import common from "../common/common";
import { objAny } from "../common/common-interface";
import Video from "video.js";
const install = (Vue: objAny): void => {
  Vue.prototype.$config = config;
  Vue.prototype.$common = common;
  Vue.prototype.$video = Video;
};

declare module "vue/types/vue" {
  interface Vue {
    $common: objAny;
    $config: objAny;
    $video: any;
  }
}

export default install;
