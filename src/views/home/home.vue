<template>
  <div class="page-home">
    <Row>
      <Col :span="18">
        <section class="section-box">
          <div class="incomplete-box">
            <div class="incomplete-flex">
              <h3>欢迎来到Comidata，您的账号资质未完成认证，请完成以下步骤</h3>
              <Steps
                class="steps-box"
                :current="0"
                direction="vertical"
                size="small"
              >
                <Step>
                  <div slot="title">
                    完整填写账号与联系人信息
                    <span class="blue">立即完成</span>
                  </div>
                </Step>
                <Step>
                  <div slot="title">
                    完成合同签署<span class="blue">立即完成</span>
                  </div>
                </Step>
              </Steps>
            </div>
            <div class="incomplete-icon"></div>
          </div>
        </section>
        <wy-chance-data></wy-chance-data>
        <wy-top-comtent></wy-top-comtent>
      </Col>
      <Col :span="6" style="padding-left: 10px">
        <wy-advertisement></wy-advertisement>
        <wy-zi-xun></wy-zi-xun>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import chanceData from "./components/chance-data.vue";
import topComtent from "./components/top-comtent.vue";
import ziXun from "./components/zi-xun.vue";
import advertisement from "./components/advertisement.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    "wy-chance-data": chanceData,
    "wy-top-comtent": topComtent,
    "wy-advertisement": advertisement,
    "wy-zi-xun": ziXun,
  },
})
export default class Home extends Vue {}
</script>
<style lang="less">
.page-home {
  .section-box {
    background-color: #fff;
    border-radius: 4px;
    margin-top: 10px;
    padding: 10px 20px;
    .ivu-steps-main {
      min-height: 30px;
    }
    .steps-box {
      margin-top: 15px;
    }
    .incomplete-box {
      display: flex;
      .incomplete-flex {
        flex: 1;
      }
      .incomplete-icon {
        width: 200px;
      }
    }
  }
  .section-box:first-child {
    margin-top: 0;
  }
  .title-box {
    display: flex;
    .title-text {
      font-size: 16px;
      color: #333;
      line-height: 32px;
    }
    .title-flex {
      flex: 1;
      text-align: right;
    }
  }
}
</style>
