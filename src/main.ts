import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import install from "./config/install";
import "view-design/dist/styles/iview.css";
// import "./common/filters";
import Video from "video.js";
import "video.js/dist/video-js.css";

Vue.config.productionTip = false;

Vue.use(ViewUI);
Vue.use(install);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
