<template>
  <div class="block-content-com" :class="{ border: border, disable: disable }">
    <div class="block-content-title" v-if="isTitle">
      {{ title }}<slot name="block-title"></slot>
    </div>
    <div class="block-content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// import { objAny } from "../../common/common-interface";
@Component
export default class BlockContent extends Vue {
  @Prop({ default: "" }) private title!: string;
  @Prop({ default: true }) private isTitle!: boolean;
  @Prop({ default: false }) private border!: boolean;
  @Prop({ default: false }) private disable!: boolean;
}
</script>
<style lang="less">
.block-content-com {
  background-color: #fff;
  border-radius: 4px;
  margin-top: 20px;
  box-shadow: 0 0 10px #ccc;
  .block-content-title {
    line-height: 20px;
    font-size: 15px;
    color: #333;
    // background-color: #f5f5f5;
    padding: 10px;
    border-bottom: 1px solid #e5e5e5;
  }
  .block-content {
    padding: 20px;
  }
}
.block-content-com:first-child {
  margin-top: 0;
}
.block-content-com.border {
  border: 1px solid #e5e5e5;
  box-shadow: none;
}
.block-content-com.disable {
  background-color: #fafafa;
  color: #999;
}
</style>
