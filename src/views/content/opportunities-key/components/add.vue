<template>
  <Modal
    v-model="modalShow"
    class="opportunities-key-add"
    :title="title"
    :footer-hide="true"
    :width="1000"
  >
    <Form ref="formValidate" :model="formInline" :rules="rule" :label-width="0">
      <wy-block-content :isTitle="false">
        <FormItem prop="name">
          <div class="form-label">行业类别</div>
          <CheckboxGroup v-model="formInline.category">
            <Checkbox
              :label="item.value"
              v-for="(item, index) in categoryList"
              :key="index"
              >{{ item.name }}</Checkbox
            >
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="name">
          <div class="form-label">行业类别</div>
          <Row>
            <Col :span="10">
              <Input
                v-model="formInline.desc"
                type="textarea"
                :rows="10"
                placeholder="多个关键字以换行或者逗号分隔"
              ></Input>
            </Col>
            <Col :span="4" class="text-center">
              <Button @click="addRight">》添加</Button>
            </Col>
            <Col :span="10">
              <wy-block-content :disable="true" :border="true">
                <div slot="block-title">
                  <Input suffix="ios-search" placeholder="搜索已添加项" />
                </div>
                <div class="v-center text-center" style="height: 125px">
                  <div style="width: 100%">未设置<br />请在左侧输入并添加</div>
                </div>
              </wy-block-content>
            </Col>
          </Row>
        </FormItem>
      </wy-block-content>
      <wy-block-content title="关联平台账户">
        <Row>
          <Col :span="14" class="select">
            <Input
              prefix="ios-search"
              placeholder="输入要搜索的应用名称或者ID"
            />
          </Col>
        </Row>
        <Row class="acc-box-row">
          <Col :span="14" class="select">
            <wy-block-content title="平台账户" :border="true">
              <div class="acc-content">
                <Checkbox v-model="all">全选</Checkbox>
                <CheckboxGroup v-model="formInline.account">
                  <Checkbox
                    :label="item.value"
                    v-for="(item, index) in accountList"
                    :key="index"
                    >{{ item.name }}</Checkbox
                  >
                </CheckboxGroup>
              </div>
            </wy-block-content>
          </Col>
          <Col :span="10">
            <wy-block-content title="" :border="true">
              <div class="select-box" slot="block-title">
                <div class="select-box-title">
                  已选 0 项目 <span class="clear blue">清空</span>
                </div>
              </div>
              <div class="acc-content">
                <wy-no-data></wy-no-data>
              </div>
            </wy-block-content>
          </Col>
        </Row>
      </wy-block-content>

      <FormItem style="margin-top: 20px" class="text-center">
        <Button type="primary">提交</Button>
        <Button style="margin-left: 8px" @click="modalShow = false"
          >取消</Button
        >
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../../../common/common-interface";
import blockContent from "@/components/block-content/block-content.vue";
import noData from "@/components/no-data/no-data.vue";
@Component({
  components: {
    "wy-block-content": blockContent,
    "wy-no-data": noData,
  },
})
export default class PageOpportunitiesKeyAdd extends Vue {
  private modalShow = false;
  private formInline: objAny = {
    target: "",
    category: [],
    account: [],
    desc: "",
  };
  private all = false;
  private rule: objAny = {};
  private categoryList: objAny[] = [
    { name: "餐饮", value: 1 },
    { name: "汽车", value: 2 },
    { name: "健康食品", value: 3 },
    { name: "教育培训", value: 4 },
    { name: "金融", value: 5 },
  ];
  private accountList: objAny[] = [
    { name: "a", value: 1 },
    { name: "d", value: 2 },
  ];

  private title = "新增关键字";
  public open(): void {
    this.modalShow = true;
  }

  public addRight(): void {
    console.log("?");
  }
}
</script>

<style lang="less">
.opportunities-key-add {
  .acc-box-row {
    margin-top: 20px;
  }
  .select {
    padding-right: 10px;
  }
  .select-box {
    .clear {
      float: right;
      cursor: pointer;
    }
  }
  .acc-content {
    height: 200px;
    .ivu-checkbox-group-item {
      display: block;
      margin-top: 10px;
    }
  }
}
</style>
