<template>
  <Menu :theme="theme2" width="auto" @on-select="menuChange">
    <template v-for="(item, index) in menuList">
      <MenuItem
        :name="item.id"
        :key="index"
        v-if="!item.children || item.children.length == 0"
      >
        <Icon type="md-document" />
        {{ item.name }}
      </MenuItem>
      <Submenu :name="item.id" v-else :key="index">
        <template slot="title">
          <Icon type="ios-paper" />
          {{ item.name }}
        </template>
        <MenuItem
          :name="item.id + '-' + i"
          v-for="(child, i) in item.children"
          :key="index + '-' + i"
          >{{ child.name }}</MenuItem
        >
      </Submenu>
    </template>
  </Menu>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import menuListJson from "./menu-list";
import { objAny } from "../../common/common-interface";
@Component
export default class MenuList extends Vue {
  private theme2 = "light";
  private menuList: objAny[] = menuListJson;
  private menuJson: objAny = {};

  public menuChange(key: string): void {
    console.log(this.menuJson);
    console.log(key);
    this.$router.push(this.menuJson[key]);
  }
  mounted(): void {
    let menuJson: objAny = {};
    menuListJson.map((item: objAny) => {
      if (item.children && item.children.length > 0) {
        item.children.map((child: objAny) => {
          menuJson[child.id] = child.url;
        });
      } else {
        menuJson[item.id] = item.url;
      }
    });
    this.menuJson = menuJson;
  }
}
</script>
