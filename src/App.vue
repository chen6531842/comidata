<template>
  <Layout id="app" class="app-Layout">
    <Header class="app-header" v-show="sys.isLogin">
      <wy-header v-if="sys.isLogin"></wy-header>
    </Header>
    <Layout class="app-Layout-content">
      <Sider :width="240" class="app-sider" hide-trigger v-show="sys.isLogin">
        <wy-menu-list ref="menuList" v-if="sys.isLogin"></wy-menu-list>
      </Sider>
      <Content class="app-content" :class="!sys.isLogin ? 'pd0' : ''">
        <router-view />
      </Content>
    </Layout>
    <Footer v-if="sys.isLogin" class="app-footer">
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >©2021 COMDATA 粤ICP备2021126334号 版权所有 震撼者科技深圳有限公司</a
      ></Footer
    >
  </Layout>
</template>
<script>
import menuList from "./components/menu-list/menu-list.vue";
import header from "./components/header/header.vue";
import { mapState, mapMutations } from "vuex";
import common from "@/common/common";
// import { objAny } from "./common/common-interface";
export default {
  name: "app",
  data() {
    return {
      menuId: "",
      isCollapse: false,
    };
  },
  watch: {
    "$route.path": function (val) {
      if (this.$refs.menuList && val != "/login") {
        this.$refs.menuList.getActive(val);
      }
    },
  },
  computed: {
    ...mapState(["sys"]),
  },
  methods: {
    ...mapMutations(["SET_WINONRESIZE", "SET_TODATE"]),
  },
  components: {
    "wy-menu-list": menuList,
    "wy-header": header,
  },
  mounted() {
    window.onresize = common.debounce(() => {
      this.SET_WINONRESIZE(true);
    }, 200);
  },
};
</script>
<style lang="less">
@import "./style/var.less";
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  min-width: 1366px;
}
.app-Layout {
  height: 100%;
  overflow: hidden;
}
.app-header.ivu-layout-header {
  background-color: #1d1e26;
  padding: 0 24px;
}
.app-sider.ivu-layout-sider {
  background-color: #fff;
}
.app-content.ivu-layout-content {
  background-color: #f8f9fa;
  // padding: @interval;
}
.app-content.ivu-layout-content.pd0 {
  padding: 0;
}
.app-Layout-content {
  overflow: hidden;
}
.blue,
.ivu-btn-text.blue,
.form-tips.blue {
  color: #2d8cf0;
}
.no-data {
  text-align: center;
}
.form-tips {
  font-size: 12px;
  color: #999;
  line-height: 18px;
  margin-top: 5px;
}
.form-box {
  display: flex;
  .form-flex {
    flex: 1;
  }
}
.red,
.ivu-btn-text.red,
.form-tips.red {
  color: #ed4014;
}
.text-center {
  text-align: center;
}
.v-center {
  display: flex;
  align-items: center;
  justify-items: center;
}
.text-right {
  text-align: right;
}
.app-footer.ivu-layout-footer {
  background-color: #f5f5f5;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  padding: 0;
  text-align: center;
  color: #999;
  a {
    color: #999;
  }
}
</style>
