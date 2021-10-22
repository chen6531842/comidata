<template>
  <Modal
    v-model="modalShow"
    class="auto-add"
    :title="title"
    :footer-hide="true"
    :width="500"
  >
    <ul class="auto-list">
      <li class="auto-item" v-for="(item, index) in autoList" :key="index">
        <div class="auto-icon">
          <img v-if="item.type == 1" src="../../../assets/img/logo-1.jpg" />
          <img v-if="item.type == 2" src="../../../assets/img/logo-2.jpg" />
        </div>
        <div class="auto-name">{{ item.name }}</div>
        <div class="auto-btn">
          <Button>立即授权</Button>
        </div>
      </li>
    </ul>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "@/common/common-interface";
import blockContent from "@/components/block-content/block-content.vue";
import noData from "@/components/no-data/no-data.vue";
@Component({
  components: {
    "wy-block-content": blockContent,
    "wy-no-data": noData,
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
    { type: 1, name: "抖音" },
    { type: 2, name: "快手" },
  ];

  private title = "新增授权";
  public open(): void {
    this.modalShow = true;
  }
}
</script>

<style lang="less">
.auto-add {
  .auto-list {
    display: flex;
    flex-wrap: wrap;
  }
  .auto-item {
    width: 200px;
    height: 200px;
    border: 1px solid #e5e5ee;
    border-radius: 4px;
    text-align: center;
    box-sizing: border-box;
    padding-top: 25px;
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
