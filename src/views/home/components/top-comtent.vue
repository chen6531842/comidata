<template>
  <section class="section-box top-content-section">
    <div class="title-box">
      <div class="title-text">Top内容</div>
      <div class="title-flex">
        <Form ref="formInline" :label-width="0" :model="formInline" inline>
          <FormItem label="">
            <Select v-model="formInline.target" style="width: 180px">
              <Option
                :value="item.value"
                v-for="(item, index) in targetList"
                :key="index"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem>
            <DatePicker
              v-model="time"
              type="daterange"
              :start-date="new Date(2021, 1, 1)"
              placement="bottom-end"
              placeholder="请选择时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="top-content">
      <wy-no-data></wy-no-data>
    </div>
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
export default class TopContent extends Vue {
  private formInline: objAny = {
    target: "",
    checkbox: false,
    startTime: "",
    endTime: "",
  };
  private targetList: objAny[] = [];
  private time: string[] = [];
}
</script>
<style lang="less">
.top-content-section {
  .top-content {
  }
  .ivu-form-item {
    margin-bottom: 0;
  }
}
</style>
