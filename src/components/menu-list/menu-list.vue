<template>
  <Menu :theme="theme2" active-name="1-2" :open-names="['1']" width="auto">
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-paper" />
        内容管理
      </template>
      <MenuItem name="1-1">文章管理</MenuItem>
      <MenuItem name="1-2">评论管理</MenuItem>
      <MenuItem name="1-3">举报管理</MenuItem>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-people" />
        用户管理
      </template>
      <MenuItem name="2-1">新增用户</MenuItem>
      <MenuItem name="2-2">活跃用户</MenuItem>
    </Submenu>
  </Menu>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class MenuList extends Vue {
  private theme2 = "light";
}
</script>
