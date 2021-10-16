<template>
  <section class="section-box advertisement">
    <div class="title-box">
      <div class="title-text">最新资迅</div>
      <div class="title-flex">
        <a href="javascript:;" class="blue more">查看更多</a>
      </div>
    </div>
    <Carousel v-model="value" loop>
      <CarouselItem>
        <div class="advertisement-item"></div>
      </CarouselItem>
    </Carousel>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../../common/common-interface";
import noData from "../../../components/no-data/no-data.vue";
@Component({
  components: {
    "wy-no-data": noData,
  },
})
export default class Advertisement extends Vue {
  private value = 0;
}
</script>
<style lang="less">
.advertisement {
  .advertisement-item {
    height: 280px;
  }
  .more {
    line-height: 32px;
    font-size: 14px;
  }
}
</style>
