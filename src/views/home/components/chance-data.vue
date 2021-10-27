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
            <Select
              v-model="formInline.target"
              style="width: 180px"
              placeholder="请选择"
            >
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
    <div class="chance-echart" ref="chanceEchart"></div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../../common/common-interface";
import * as echarts from "echarts";
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
  private myChart: objAny = {};

  $refs!: {
    chanceEchart: HTMLFormElement;
  };
  public echartShow(): void {
    let option: objAny = {
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: [
          "2020-10-01",
          "2020-10-02",
          "2020-10-03",
          "2020-10-04",
          "2020-10-05",
          "2020-10-06",
          "2020-10-07",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "商机数量",
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };
    this.myChart = echarts.init(this.$refs.chanceEchart);
    this.myChart.setOption(option, true);
  }

  mounted(): void {
    this.$nextTick(() => {
      this.echartShow();
    });
  }
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
