/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-05-27 14:00:36
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2020-10-19 13:23:26
 */
import common from "./common";
import Vue from "vue";

const time = (value: Date | string, type?: string) => {
  if (value) {
    if (typeof value === "number") {
      const typeStr = type || "yyyy-mm-dd hh:mm:ss";
      return common.userDate(value, typeStr);
    } else {
      return value;
    }
  } else {
    return "";
  }
};

const Fixed = (value: number | string, type?: number): string | number => {
  if (typeof value === "number" && !isNaN(value)) {
    const n = type && type >= 0 ? type : 2;
    return value.toFixed(n);
  } else {
    return 0;
  }
};
const defaultText = (value: string | number): string | number => {
  if (value || value == 0) {
    return value;
  } else {
    return "--";
  }
};
Vue.filter("time", time);
Vue.filter("toFixed", Fixed);
Vue.filter("defaultText", defaultText);
