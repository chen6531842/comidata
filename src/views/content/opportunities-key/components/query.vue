<template>
  <Modal v-model="modalShow" title="关联平台账户" :footer-hide="true">
    <div class="relation-acc">
      关联账户 <span class="small">共 {{ total }} 个</span>
    </div>
    <template v-if="itemData.platform_account_nick_names">
      <template v-for="(item, index) in itemData.platform_account_nick_names">
        <div
          class="relation-acc"
          v-for="(child, i) in item"
          :key="index + '-' + i"
        >
          {{ index == "douyin" ? "抖音" : "快手" }}:
          <span>{{ child.name }} </span>
        </div>
      </template>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "@/common/common-interface";
@Component({
  components: {},
})
export default class PageOpportunitiesKeyQuery extends Vue {
  private modalShow = false;
  private itemData: objAny = {};
  private total = 0;
  public open(item: objAny): void {
    this.modalShow = true;
    this.itemData = item;
    let total = 0;
    if (item.platform_account_nick_names.douyin) {
      total += item.platform_account_nick_names.douyin.length;
    }
    if (item.platform_account_nick_names.kuaishou) {
      total += item.platform_account_nick_names.kuaishou.length;
    }
    this.total = total;
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
.relation-acc:last-child {
  border-bottom: none;
}
</style>
