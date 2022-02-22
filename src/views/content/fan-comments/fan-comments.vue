<template>
  <wy-sys-content title="粉丝评论">功能开发中...</wy-sys-content>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "../../../components/sys-content/sys-content.vue";
@Component({
  components: {
    "wy-sys-content": sysContent,
  },
})
export default class PageContentFanfComments extends Vue {}
</script>
