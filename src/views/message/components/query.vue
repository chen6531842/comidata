<template>
  <Modal
    v-model="modalShow"
    class="message-query"
    :footer-hide="true"
    :width="800"
  >
    <div class="message-title">{{ itemData.title }}</div>
    <div class="message-time">{{ itemData.created_at }}</div>
    <div class="message-content">{{ itemData.content }}</div>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "@/common/common-interface";
import { setUserMessageRead } from "@/api/api-user";
@Component({
  components: {},
})
export default class PageMessageAdd extends Vue {
  private modalShow = false;
  private itemData: objAny = {};

  public open(item: objAny): void {
    this.modalShow = true;
    this.itemData = item;
    this.read();
  }

  async read(): Promise<void> {
    await setUserMessageRead({ id: this.itemData.id });
  }
}
</script>
<style lang="less">
.message-query {
  .message-title {
    font-size: 16px;
    color: #333;
    line-height: 24px;
  }
  .message-time {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }
  .message-content {
    padding: 30px 20px;
    color: #333;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
