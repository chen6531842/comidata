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
  private echartData: objAny[] = [];

  $refs!: {
    chanceEchart: HTMLFormElement;
  };
  async getEchartData(): Promise<void> {
    // let ret = await getChanceData(this.formInline);
    var ret = {
      code: 200,
      payload: [
        {
          name: "2021-11-10",
          value: 200,
        },
        {
          name: "2021-11-11",
          value: 100,
        },
        {
          name: "2021-11-12",
          value: 260,
        },
        {
          name: "2021-11-13",
          value: 300,
        },
      ],
    };
    if (ret.code == 200) {
      this.echartData = ret.payload;
      this.echartShow();
    }
  }
  public echartShow(): void {
    let time: string[] = [];
    let data: number[] = [];
    this.echartData.map((item: objAny) => {
      time.push(item.name);
      data.push(item.value);
    });
    let option: objAny = {
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: time,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "商机数量",
          data: data,
          type: "line",
        },
      ],
    };
    this.myChart = echarts.init(this.$refs.chanceEchart);
    this.myChart.setOption(option, true);
  }

  mounted(): void {
    this.$nextTick(() => {
      this.getEchartData();
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
