<template>
  <wy-sys-content title="评论统计">功能开发中...</wy-sys-content>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "../../../components/sys-content/sys-content.vue";
@Component({
  components: {
    "wy-sys-content": sysContent,
  },
})
export default class PageDataComment extends Vue {}
</script>
