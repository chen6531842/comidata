<template>
  <div class="no-data-components">
    <img src="../../assets/img/no-data.png" class="no-data-icon" alt="" />
    <div>暂无数据</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { objAny } from "../../common/common-interface";
@Component
export default class NoData extends Vue {}
</script>
<style lang="less">
.no-data-components {
  padding: 50px;
  text-align: center;
  color: #999;
  font-size: 12px;
  .no-data-icon {
    width: 60px;
    height: 60px;
    vertical-align: top;
  }
}
</style>
