<template>
  <Modal
    v-model="modalShow"
    class="user-add"
    :title="title"
    :footer-hide="true"
    :width="800"
  >
    <Form
      ref="formValidate"
      :model="formInline"
      :rules="rule"
      :label-width="120"
    >
      <FormItem label="姓名" prop="full_name">
        <Input v-model="formInline.full_name" placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem label="手机号码" prop="mobile">
        <Input v-model="formInline.mobile" placeholder="请输入手机号码"></Input>
        <div class="form-tips">
          用此手机号码登录后，即可完成激活，激活后不可修改
        </div>
      </FormItem>
      <FormItem label="选择角色" prop="city">
        <Select v-model="formInline.role" placeholder="请选择选择角色">
          <Option
            :value="item.id"
            v-for="(item, index) in roleList"
            :key="index"
            >{{ item.name }}</Option
          >
        </Select>
        <Button type="text" siam="small" @click="addRight">新增角色</Button>
      </FormItem>
      <FormItem label="关联平台账户">
        <!-- <wy-block-content title="关联平台账户"> -->
        <Row>
          <Col :span="12" class="select">
            <Input
              prefix="ios-search"
              placeholder="输入要搜索的应用名称或者ID"
            />
          </Col>
        </Row>

        <Row class="acc-box-row">
          <Col :span="12" class="select">
            <wy-block-content title="平台账户" :border="true">
              <div class="acc-content">
                <Checkbox v-model="all">全选</Checkbox>
                <CheckboxGroup v-model="formInline.platform_accounts_ids">
                  <Checkbox
                    :label="item.id"
                    v-for="(item, index) in accountList"
                    :key="index"
                    >{{ item.nick_name }}{{ item.platform_type_name }}</Checkbox
                  >
                </CheckboxGroup>
              </div>
            </wy-block-content>
          </Col>
          <Col :span="12">
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
        <!-- </wy-block-content> -->
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit" :loading="loading"
          >提交</Button
        >
        <Button style="margin-left: 8px" @click="modalShow = false"
          >取消</Button
        >
      </FormItem>
    </Form>
    <wy-add-role ref="addModal" @success="getAllRole"></wy-add-role>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "@/common/common-interface";
import blockContent from "@/components/block-content/block-content.vue";
import noData from "@/components/no-data/no-data.vue";
import {
  getAllAccounts,
  getAllRole,
  getUserDetails,
  addUser,
} from "@/api/api-user";
import addRole from "@/views/system/role/components/add.vue";
import regular from "@/common/regular";
@Component({
  components: {
    "wy-block-content": blockContent,
    "wy-no-data": noData,
    "wy-add-role": addRole,
  },
})
export default class PageUserAdd extends Vue {
  private modalShow = false;
  private loading = false;

  private formInline: objAny = {
    id: "",
    full_name: "",
    mobile: "",
    role: "",
    category: [],
    platform_accounts_ids: [],
  };
  private all = false;
  private rule: objAny = {
    full_name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    mobile: [{ required: true, validator: regular.phone, trigger: "blur" }],
    role: [{ required: true, message: "请选择角色", trigger: "change" }],
  };
  private roleList: objAny[] = [];
  private accountList: objAny[] = [];

  private title = "新增人员";
  public open(item?: objAny): void {
    this.modalShow = true;
    this.getAllRole();
    this.getAllAccounts();
    if (item) {
      console.log(item);
      this.formInline.id = item.id;
      this.formInline.full_name = item.full_name;
      this.formInline.mobile = item.name;
      this.getUserDetails();
    }
  }

  async getUserDetails(): Promise<void> {
    let ret = await getUserDetails({
      id: this.formInline.id,
    });
    if (ret.code == 200) {
      let data: objAny = ret.payload;
      this.formInline.platform_accounts_ids = data.platform_accounts_ids;
    }
  }
  async getAllRole(): Promise<void> {
    let ret = await getAllRole({});
    if (ret.code == 200) {
      this.roleList = ret.payload;
    }
  }
  async getAllAccounts(): Promise<void> {
    let ret = await getAllAccounts({});
    if (ret.code == 200) {
      this.accountList = ret.payload;
    }
  }
  $refs!: {
    formValidate: HTMLFormElement; //写法1 - 推荐
    addModal: HTMLFormElement;
  };
  public handleSubmit(): void {
    this.$refs.formValidate.validate((valid: boolean) => {
      if (valid) {
        this.addUser();
      }
    });
  }
  async addUser(): Promise<void> {
    this.loading = true;
    let ret = await addUser(this.formInline);
    if (ret.code == 200) {
      this.modalShow = false;
      this.$emit("success");
      this.$Message.success("操作成功");
    }
    this.loading = false;
  }
  public addRight(): void {
    this.$refs.addModal.open();
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
