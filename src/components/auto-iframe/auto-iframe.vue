<template>
  <Modal
    v-model="modalShow"
    class="auto-iframe-modal"
    :title="title"
    :footer-hide="true"
    :width="800"
  >
    <iframe class="auto-iframe" :src="src" v-if="src != ''"></iframe>
  </Modal>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { objAny } from "../../common/common-interface";
@Component
export default class NoData extends Vue {
  private modalShow = false;
  private title = "授权";
  private src = "";

  public open(src: string): void {
    this.modalShow = true;
    this.src = src;
    this.init();
  }

  public init(): void {
    if (window.subscribers) {
      window.subscribers.subscribe("autoBack", (str: string) => {
        let is_success = this.$common.request("is_success", str);
        if (is_success == "true" || is_success == true) {
          this.$Message.success("授权成功");
          this.$emit("success");
        } else {
          let info = this.$common.request("info");
          this.$Message.error(info);
          this.$emit("error");
        }
        this.modalShow = false;
      }); // 定阅
    }
  }
  destroyed(): void {
    if (window.subscribers) {
      window.subscribers.unsubscribe("autoBack"); // 取消定阅
    }
  }
}
</script>
<style lang="less">
.auto-iframe {
  width: 100%;
  height: 500px;
}
</style>
