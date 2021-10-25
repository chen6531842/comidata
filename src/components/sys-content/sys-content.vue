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
  // padding: 0 10px 10px 10px;
  box-sizing: border-box;
  // height: 100%;
  // display: flex;
  // flex-direction: column;
  .sys-content-title {
    margin: -16px -16px 0 -16px;
    font-weight: bold;
    position: relative;
    // padding: 10px 0 10px 15px;
    background-color: #fff;
    padding: 16px 24px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    box-shadow: 0 2px 10px rgba(228, 231, 242, 0.75);
  }
  // .sys-content-title::after {
  //   content: "";
  //   position: absolute;
  //   width: 4px;
  //   height: 20px;
  //   background-color: #2d8cf0;
  //   left: 0;
  //   top: 50%;
  //   transform: translateY(-50%);
  // }
  .sys-content-div {
    flex: 1;
    padding: 16px;
    margin-top: 16px;
    background-color: #fff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
  }
}
</style>
