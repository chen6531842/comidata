/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-05-20 15:08:10
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2020-06-05 11:07:28
 */

import Vue from "vue";

import sysContent from "../components/sys-content/sys-content.vue";
import tabsContent from "../components/tabs-content/tabs-content.vue";
import listPage from "../components/list-page/list-page.vue";
import infoTitle from "../components/info-title/info-title.vue";

// import "vue-easytable/libs/themes-base/index.css";
// import { VTable, VPagination } from "vue-easytable";
// Vue.component(VTable.name, VTable);
// Vue.component(VPagination.name, VPagination);
Vue.component("sys-content", sysContent);
Vue.component("tabs-content", tabsContent);
Vue.component("pi-list-page", listPage);
Vue.component("pi-info-title", infoTitle);
