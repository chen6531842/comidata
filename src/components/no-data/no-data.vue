<template>
  <div class="no-data-components">暂无数据</div>
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
}
</style>
