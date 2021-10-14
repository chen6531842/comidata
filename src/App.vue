<template>
  <div id="app">
    <Layout class="app-Layout">
      <Header class="app-header">Header</Header>
      <Layout>
        <Sider class="app-sider" hide-trigger>
          <pi-menu-list></pi-menu-list>
        </Sider>
        <Content class="app-content"><router-view /></Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  </div>
</template>
<script>
import menuList from "./components/menu-list/menu-list.vue";
export default {
  name: "app",
  data() {
    return {
      menuId: "",
      isCollapse: false,
    };
  },
  methods: {},
  components: {
    "pi-menu-list": menuList,
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
}
</style>
