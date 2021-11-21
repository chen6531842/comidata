<template>
  <Modal
    v-model="modalShow"
    class="auto-add"
    :title="title"
    :footer-hide="true"
    :width="500"
  >
    <ul class="auto-list">
      <template v-for="(item, index) in autoList">
        <li
          class="auto-item"
          :key="index"
          v-if="!itemData.id || item.platform_type == itemData.platform_type"
        >
          <div class="auto-icon">
            <img
              v-if="item.platform_type == 'kuaishou'"
              src="../../../assets/img/logo-2.jpg"
            />
            <img
              v-if="item.platform_type == 'douyin'"
              src="../../../assets/img/logo-1.jpg"
            />
          </div>
          <div class="auto-name">{{ item.platform_type_name }}</div>
          <div class="auto-btn">
            <Button @click="autoClick(item)">立即授权</Button>
          </div>
        </li>
      </template>
    </ul>
    <wy-auto-iframe ref="autoIframe" @success="autoSuccess"></wy-auto-iframe>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "@/common/common-interface";
import blockContent from "@/components/block-content/block-content.vue";
import noData from "@/components/no-data/no-data.vue";
import { getKsAuth, getDyAuth } from "@/api/api-user";
import autoIframe from "@/components/auto-iframe/auto-iframe.vue";
@Component({
  components: {
    "wy-block-content": blockContent,
    "wy-no-data": noData,
    "wy-auto-iframe": autoIframe,
  },
})
export default class Auto extends Vue {
  private modalShow = false;
  private rule: objAny = {};
  private formInline: objAny = {
    target: "",
    category: [],
    account: [],
    desc: "",
  };
  private autoList: objAny[] = [
    { type: 1, name: "抖音", platform_type: "douyin" },
    { type: 2, name: "快手", platform_type: "kuaishou" },
  ];
  private itemData: objAny = {};
  private iframeShow = false;

  private title = "新增授权";
  public open(item?: objAny): void {
    this.modalShow = true;
    this.itemData = item || {};
    if (item) {
      this.title = "重新授权";
    } else {
      this.title = "新增授权";
    }
    // this.getAllAccounts();
  }
  public autoClick(item: objAny): void {
    if (item.type == 2) {
      this.getKsAuth();
    } else if (item.type == 1) {
      this.getDyAuth();
    }
  }
  public autoSuccess(): void {
    console.log("成功");
    this.iframeShow = false;
    this.$emit("success");
  }

  $refs!: {
    autoIframe: HTMLFormElement;
  };
  async getKsAuth(): Promise<void> {
    let url = window.location.origin;
    let ret = await getKsAuth({
      redirectUrl: url + this.$config.host + "/auth.html",
    });
    if (ret.code == 200) {
      this.iframeShow = true;
      this.$nextTick(() => {
        this.$refs.autoIframe.open(ret.payload.url);
      });
    }
  }
  async getDyAuth(): Promise<void> {
    let url = window.location.origin;
    let ret = await getDyAuth({
      redirectUrl: url + this.$config.host + "/#/auto",
    });
    if (ret.code == 200) {
      this.iframeShow = true;
      this.$nextTick(() => {
        this.$common.save("dyAuto", "1");
        window.location.href = ret.payload.url;
        // this.$refs.autoIframe.open(ret.payload.url);
      });
    }
  }

  // async getAllAccounts(): Promise<void> {
  //   let ret = await getAllAccounts({});
  //   if (ret.code == 200) {
  //     this.autoList = ret.payload;
  //   }
  // }
}
</script>

<style lang="less">
.auto-add {
  .auto-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-items: center;
  }
  .auto-item {
    width: 200px;
    height: 200px;
    border: 1px solid #e5e5ee;
    border-radius: 4px;
    text-align: center;
    box-sizing: border-box;
    padding-top: 25px;
    padding-bottom: 25px;
    margin-left: 20px;
    list-style: none;
    .auto-icon {
      width: 50px;
      height: 50px;
      display: inline-block;
      vertical-align: top;
      background-color: #f5f5f5;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .auto-name {
      font-size: 15px;
      color: #333;
      margin-top: 35px;
      line-height: 20px;
    }
    .auto-btn {
      margin-top: 20px;
      .ivu-btn {
        color: #2d8cf0;
        border-color: #2d8cf0;
      }
    }
  }
  // .auto-item:first-child {
  //   margin-left: 0;
  // }
}
</style>
