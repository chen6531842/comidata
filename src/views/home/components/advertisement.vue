<template>
  <section class="section-box advertisement">
    <Carousel v-model="value" loop>
      <CarouselItem>
        <div class="advertisement-item"></div>
      </CarouselItem>
    </Carousel>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { objAny } from "../../../common/common-interface";
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
}
</style>
