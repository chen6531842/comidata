<template>
  <div id="app">
    <Layout class="app-Layout">
      <Header class="app-header" v-show="sys.isLogin">
        <wy-header v-if="sys.isLogin"></wy-header>
      </Header>
      <Layout>
        <Sider class="app-sider" hide-trigger v-show="sys.isLogin">
          <wy-menu-list v-if="sys.isLogin"></wy-menu-list>
        </Sider>
        <Content class="app-content"><router-view /></Content>
      </Layout>
      <Footer v-show="sys.isLogin">Footer</Footer>
    </Layout>
  </div>
</template>
<script>
import menuList from "./components/menu-list/menu-list.vue";
import header from "./components/header/header.vue";
import { mapState } from "vuex";
export default {
  name: "app",
  data() {
    return {
      menuId: "",
      isCollapse: false,
    };
  },
  computed: {
    ...mapState(["sys"]),
  },
  methods: {},
  components: {
    "wy-menu-list": menuList,
    "wy-header": header,
  },
};
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
.app-Layout {
  height: 100%;
}
.app-header.ivu-layout-header {
  background-color: #1d1e26;
}
.app-sider.ivu-layout-sider {
  background-color: #fff;
}
.app-content.ivu-layout-content {
  background-color: #f5f5f5;
  padding: 10px;
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
.red {
  color: #ed4014;
}
</style>
