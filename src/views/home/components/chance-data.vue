<template>
  <section class="section-box chance-data">
    <div class="title-box">
      <div class="title-text">商机数据</div>
      <div class="title-flex">
        <Form ref="formInline" :model="formInline" inline>
          <FormItem :label-width="0">
            <DatePicker
              v-model="time"
              type="daterange"
              :start-date="new Date(2021, 1, 1)"
              placement="bottom-end"
              placeholder="请选择时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="指标" :label-width="50">
            <Select v-model="formInline.target" style="width: 180px">
              <Option
                :value="item.value"
                v-for="(item, index) in targetList"
                :key="index"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem :label-width="0">
            <Checkbox v-model="formInline.checkbox">对比</Checkbox>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="chance-echart"></div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../../common/common-interface";
@Component({
  components: {},
})
export default class ChanceData extends Vue {
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
.chance-data {
  .chance-echart {
    height: 300px;
    margin-top: 15px;
  }
  .ivu-form-item {
    margin-bottom: 0;
  }
}
</style>
