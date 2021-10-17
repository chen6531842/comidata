<template>
  <div class="page-list">
    <Page
      :total="total"
      :show-elevator="showElevator"
      show-total
      :show-sizer="showSizer"
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class ListPage extends Vue {
  @Prop({ default: 0 }) private total!: number;
  @Prop({ default: true }) private showElevator!: boolean;
  @Prop({ default: true }) private showSizer!: boolean;
  public pageChange(val: number): void {
    this.$emit("change", val);
  }
  public pageSizeChange(val: number): void {
    this.$emit("size-change", val);
  }
}
</script>
<style lang="less">
.page-list {
  padding: 10px 0;
  text-align: right;
}
</style>
