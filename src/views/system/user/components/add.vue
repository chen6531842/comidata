<template>
  <Modal
    v-model="modalShow"
    class="user-add"
    :title="title"
    :footer-hide="true"
    :width="1000"
  >
    <Form
      ref="formValidate"
      :model="formInline"
      :rules="rule"
      :label-width="120"
    >
      <FormItem label="姓名" prop="name">
        <Input v-model="formInline.name" placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem label="手机号码" prop="phone">
        <Input v-model="formInline.phone" placeholder="请输入手机号码"></Input>
        <div class="form-tips">
          用些手机号码登录后，即可完成激活，激活后不可修改
        </div>
      </FormItem>
      <FormItem label="选择角色" prop="city">
        <Select v-model="formInline.role" placeholder="请选择选择角色">
          <Option
            :value="item.roleId"
            v-for="(item, index) in roleList"
            :key="index"
            >{{ item.roleName }}</Option
          >
        </Select>
        <Button type="text" siam="small">新增角色</Button>
      </FormItem>

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
      <FormItem>
        <Button type="primary">Submit</Button>
        <Button style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "@/common/common-interface";
import blockContent from "@/components/block-content/block-content.vue";
import noData from "@/components/no-data/no-data.vue";
@Component({
  components: {
    "wy-block-content": blockContent,
    "wy-no-data": noData,
  },
})
export default class PageUserAdd extends Vue {
  private modalShow = false;
  private formInline: objAny = {
    name: "",
    phone: "",
    role: "",
    category: [],
    account: [],
    desc: "",
  };
  private all = false;
  private rule: objAny = {};
  private roleList: objAny[] = [
    { roleName: "餐饮", roleId: 1 },
    { roleName: "汽车", roleId: 2 },
    { roleName: "健康食品", roleId: 3 },
    { roleName: "教育培训", roleId: 4 },
    { roleName: "金融", roleId: 5 },
  ];
  private accountList: objAny[] = [
    { name: "a", value: 1 },
    { name: "d", value: 2 },
  ];

  private title = "新增人员";
  public open(): void {
    this.modalShow = true;
  }

  public addRight(): void {
    console.log("?");
  }
}
</script>

<style lang="less">
.user-add {
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
