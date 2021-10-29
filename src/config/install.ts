// import Vue from "vue";
import config from "./config";
import common from "../common/common";
import { objAny } from "../common/common-interface";

const install = (Vue: objAny): void => {
  Vue.prototype.$config = config;
  Vue.prototype.$common = common;
};

declare module "vue/types/vue" {
  interface Vue {
    $common: objAny;
    $config: objAny;
  }
}

export default install;
