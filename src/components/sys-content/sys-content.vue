<template>
  <div class="sys-content">
    <div class="sys-content-title">{{ title }}</div>
    <div class="sys-content-div"><slot></slot></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// import { objAny } from "../../common/common-interface";
@Component
export default class SysContent extends Vue {
  @Prop({ default: "" }) private title!: string;
}
</script>
<style lang="less">
.sys-content {
  background-color: #fff;
  padding: 0 10px 10px 10px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  .sys-content-title {
    line-height: 26px;
    font-size: 14px;
    font-weight: bold;
    position: relative;
    padding: 10px 0 10px 15px;
    border-bottom: 1px solid #e5e5e5;
  }
  .sys-content-title::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 20px;
    background-color: #2d8cf0;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .sys-content-div {
    flex: 1;
    padding: 10px 0;
  }
}
</style>
