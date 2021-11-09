<template>
  <div class="">
    <Menu
      :accordion="true"
      :active-name="activeName"
      :open-names="openNames"
      :theme="theme2"
      width="auto"
      ref="side_menu"
      @on-select="menuChange"
    >
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
            :name="child.id"
            v-for="(child, i) in item.children"
            :key="index + '-' + i"
            >{{ child.name }}</MenuItem
          >
        </Submenu>
      </template>
    </Menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import menuListJson from "./menu-list";
import { objAny } from "../../common/common-interface";
import { State } from "vuex-class";
@Component
export default class MenuList extends Vue {
  @State("sys") sys!: objAny;

  private theme2 = "light";
  private activeName = "";
  private menuList: objAny[] = menuListJson;
  private menuJson: objAny = {};
  private menuValurJson: objAny = {};
  private openNames: string[] = [];

  public menuChange(key: string): void {
    if (this.menuJson[key] != this.$route.path) {
      this.$router.push(this.menuJson[key]);
    }
  }
  public init(): void {
    this.sys.routerList;
    let menuList: objAny[] = [
      { name: "首页", icon: "", id: "1", url: "/home" },
    ];
    let menuJson: objAny = {
      "1": "/home",
      "6": "/message",
    };
    let menuValurJson: objAny = {
      "/home": "1",
      "/message": "6",
    };

    menuListJson.map((item: objAny) => {
      if (!item.children || item.children.length == 0) {
        this.sys.routerList.map((router: objAny) => {
          if (router.path == item.url) {
            menuList.push(item);
            menuJson[item.id] = item.url;
            menuValurJson[item.url] = item.id;
          }
        });
      } else {
        let children: objAny[] = [];
        item.children.map((child: objAny) => {
          this.sys.routerList.map((router: objAny) => {
            if (router.path == child.url) {
              children.push(child);
              menuJson[child.id] = child.url;
              menuValurJson[child.url] = child.id;
            }
          });
        });

        if (children.length > 0) {
          let itemData: objAny = JSON.parse(JSON.stringify(item));
          itemData.children = children;
          menuList.push(itemData);
        }
      }
    });
    menuList.push({ name: "消息中心", icon: "", id: "6", url: "/message" });
    this.menuList = menuList;
    this.menuJson = menuJson;
    this.menuValurJson = menuValurJson;
    this.getActive(this.$route.path);
  }
  $refs!: {
    side_menu: HTMLFormElement;
  };
  getActive(url: string): void {
    let activeName = url == "/" ? "1" : this.menuValurJson[url];
    if (activeName) {
      this.activeName = activeName;
      this.openNames = [this.activeName.split("-")[0]];
      this.$nextTick(() => {
        if (this.$refs.side_menu) {
          this.$refs.side_menu.updateOpened();
          this.$refs.side_menu.updateActiveName();
        }
      });
    }
  }
  mounted(): void {
    this.init();
  }
}
</script>
