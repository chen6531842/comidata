<template>
  <Modal v-model="modalShow" title="关联平台账户" :footer-hide="true">
    <div class="relation-acc">关联账户 <span class="small">共 1 个</span></div>
    <div class="relation-acc">快手(874555)</div>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { objAny } from "../../../../common/common-interface";
@Component({
  components: {},
})
export default class PageOpportunitiesKeyQuery extends Vue {
  private modalShow = false;

  public open(): void {
    this.modalShow = true;
  }
}
</script>

<style lang="less">
.relation-acc {
  line-height: 40px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 14px;
  color: #333;
  .small {
    font-size: 12px;
  }
}
</style>
