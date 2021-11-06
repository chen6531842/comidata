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
        <Input
          v-model="formInline.mobile"
          :disabled="itemData.is_active"
          placeholder="请输入手机号码"
        ></Input>
        <div class="form-tips">
          用此手机号码登录后，即可完成激活，激活后不可修改
        </div>
      </FormItem>
      <FormItem label="选择角色" prop="role_id">
        <Select v-model="formInline.role_id" placeholder="请选择选择角色">
          <Option
            :value="item.id"
            v-for="(item, index) in roleList"
            :key="index"
            >{{ item.name }}</Option
          >
        </Select>
        <Button type="text" class="blue" siam="small" @click="addRight"
          >新增角色</Button
        >
      </FormItem>
      <FormItem label="关联平台账户">
        <!-- <wy-block-content title="关联平台账户"> -->
        <Row>
          <Col :span="12" class="select">
            <Input
              v-model="search"
              prefix="ios-search"
              placeholder="输入要搜索的应用名称或者ID"
            />
          </Col>
        </Row>

        <Row class="acc-box-row">
          <Col :span="12" class="select">
            <wy-block-content title="平台账户" :border="true">
              <div class="acc-content">
                <Checkbox v-model="all" @on-change="allChange">全选</Checkbox>
                <CheckboxGroup v-model="formInline.platform_account_ids">
                  <template v-for="(item, index) in accountList">
                    <Checkbox
                      :label="item.id"
                      :key="index"
                      v-if="
                        search == '' ||
                        item.platform_type_name.indexOf(search) != -1
                      "
                      >{{ item.platform_type_name }}</Checkbox
                    >
                  </template>
                </CheckboxGroup>
              </div>
            </wy-block-content>
          </Col>
          <Col :span="12">
            <wy-block-content title="" :border="true">
              <div class="select-box" slot="block-title">
                <div class="select-box-title">
                  已选 {{ formInline.platform_account_ids.length }} 项目
                  <span class="clear blue" @click="allChange(false)">清空</span>
                </div>
              </div>
              <div class="acc-content">
                <template v-for="(item, index) in accountList">
                  <div
                    class="account-item"
                    :key="index"
                    v-if="
                      formInline.platform_account_ids.indexOf(item.id) != -1
                    "
                  >
                    {{ item.platform_type_name }}
                  </div>
                </template>
                <wy-no-data
                  v-if="formInline.platform_account_ids.length == 0"
                ></wy-no-data>
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
  private search = "";
  private formInline: objAny = {
    id: "",
    full_name: "",
    mobile: "",
    role_id: "",
    // role_ids: [],
    platform_account_ids: [],
  };
  private platform_account_ids: string[] = [];
  private all = false;
  private rule: objAny = {
    full_name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    role_id: [
      {
        required: true,
        type: "number",
        message: "请选择角色",
        trigger: "change",
      },
    ],
    mobile: [{ required: true, validator: regular.phone, trigger: "blur" }],
    // role_ids: [
    //   {
    //     required: true,
    //     type: "array",
    //     message: "请选择角色",
    //     trigger: "change",
    //   },
    // ],
  };
  private roleList: objAny[] = [];
  private accountList: objAny[] = [];

  private title = "新增人员";
  private itemData: objAny = {};
  public open(item?: objAny): void {
    this.modalShow = true;
    this.getAllRole();
    this.getAllAccounts();
    if (item) {
      this.title = "修改人员";
      this.formInline.id = item.id;
      this.formInline.full_name = item.full_name;
      this.formInline.mobile = item.name;
      this.formInline.role_id = item.role_ids[0] || "";
      this.getUserDetails();
      this.itemData = item;
    } else {
      this.title = "新增人员";
      this.itemData = {};
      this.formInline.id = "";
      this.formInline.full_name = "";
      this.formInline.mobile = "";
      this.formInline.role_id = "";
    }
  }

  async getUserDetails(): Promise<void> {
    let ret = await getUserDetails({
      id: this.formInline.id,
    });
    if (ret.code == 200) {
      let data: objAny = ret.payload;
      this.formInline.platform_account_ids = data.platform_accounts_ids;
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
    let json: objAny = JSON.parse(JSON.stringify(this.formInline));
    console.log(this.formInline);
    console.log(json);
    json.role_ids = [json.role_id];
    delete json.role_id;
    if (json.id == "") {
      delete json.id;
    }
    let ret = await addUser(json);
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
  public allChange(val: boolean): void {
    if (val) {
      let platform_account_ids: number[] = [];
      this.accountList.map((item: objAny) => {
        platform_account_ids.push(item.id);
      });
      this.formInline.platform_account_ids = platform_account_ids;
    } else {
      this.formInline.platform_account_ids = [];
    }
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
  .account-item {
    margin-top: 10px;
  }
  .account-item:first-child {
    margin-top: 0;
  }
}
</style>
