<template>
  <wy-sys-content title="人员设置" class="page-user">
    <div class="form-box">
      <div class="form-flex">
        <Form>
          <FormItem prop="name">
            <Button type="primary" @click="addModalShow">新增人员</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <Table :columns="columns" :data="tableList" :loading="loading">
      <template slot-scope="{ row }" slot="is_active">
        <div class="status-dian" v-if="row.is_active">已激活</div>
        <div class="status-dian" v-else>未激活</div>
        <!-- <Button
          type="text"
          class="blue"
          v-else
          size="small"
          @click="resendClick(item)"
          >重新发送</Button
        > -->
      </template>
      <template slot-scope="{ row }" slot="role_names">
        {{ row.role_names ? row.role_names.join(",") : "" }}
      </template>

      <template slot-scope="{ row }" slot="action">
        <Button
          class="blue"
          type="text"
          size="small"
          style="margin-right: 5px"
          @click="detailsKey(row)"
          v-if="
            !row.is_super_user &&
            sys.loginData.user &&
            sys.loginData.user.is_super_user &&
            row.is_active
          "
          >更换超级管理员</Button
        >
        <Button
          class="blue"
          type="text"
          size="small"
          style="margin-right: 5px"
          @click="updataUser(row)"
          >修改</Button
        >
        <Button
          type="text"
          class="red"
          size="small"
          @click="delUserConfirm(row)"
          >删除</Button
        >
      </template>
    </Table>
    <wy-list-page
      @change="tableChange"
      @size-change="tableSizeChange"
      :total="total"
      :index="formInline.page"
    ></wy-list-page>
    <wy-add-modal ref="addModal" @success="getTableList"></wy-add-modal>
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "@/components/sys-content/sys-content.vue";
import listPage from "@/components/list-page/list-page.vue";
import { objAny } from "@/common/common-interface";
import addModal from "./components/add.vue";
import { getUserList, delUser, changeSuperUser } from "@/api/api-user";
import { State } from "vuex-class";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-list-page": listPage,
    "wy-add-modal": addModal,
  },
})
export default class PageSystemUser extends Vue {
  @State("sys") sys!: objAny;
  private formInline: objAny = {
    target: "",
    name: "",
    sex: "",
    page: 1,
    per_page: 10,
  };
  private loading = false;
  private total = 0;
  private targetList: objAny[] = [];
  private sexList: objAny[] = [];
  private columns: objAny[] = [
    // {
    //   type: "selection",
    //   width: 60,
    //   align: "center",
    // },
    {
      title: "姓名",
      key: "full_name",
      minWidth: 120,
    },
    // {
    //   title: "邮箱",
    //   key: "email",
    //   minWidth: 120,
    // },
    {
      title: "手机号码",
      key: "name",
      minWidth: 130,
    },
    {
      title: "角色",
      key: "role_names",
      slot: "role_names",
      minWidth: 120,
    },
    {
      title: "是否激活",
      key: "is_active",
      slot: "is_active",
      minWidth: 120,
    },
    {
      title: "操作",
      slot: "action",
      minWidth: 140,
    },
  ];
  private tableList: objAny[] = [];

  public delUserConfirm(item: objAny): void {
    this.$Modal.confirm({
      title: "提示",
      content: "<p>确定要删除吗？</p>",
      onOk: () => {
        this.delUser(item.id);
      },
    });
  }
  async delUser(id: number): Promise<void> {
    let ret = await delUser({ id: id });
    if (ret.code == 200) {
      this.$Message.success("删除成功");
      this.getTableList();
    }
  }

  public queryClick(): void {
    this.formInline.page = 1;
    this.getTableList();
  }
  public tableChange(val: number): void {
    this.formInline.page = val;
    this.getTableList();
  }
  public tableSizeChange(val: number): void {
    this.formInline.per_page = val;
    this.getTableList();
  }

  async getTableList(): Promise<void> {
    this.loading = true;
    let ret = await getUserList({});
    if (ret.code == 200) {
      this.tableList = ret.payload.data;
      this.total = ret.payload.total;
    }
    this.loading = false;
  }
  $refs!: {
    addModal: HTMLFormElement;
  };
  public addModalShow(): void {
    this.$refs.addModal.open();
  }
  public updataUser(item: objAny): void {
    this.$refs.addModal.open(item);
  }
  public detailsKey(item: objAny): void {
    this.$Modal.confirm({
      title: "提示",
      content: "<p>确定更换此用户为管理员吗？</p>",
      onOk: () => {
        this.changeSuperUser(item.id);
      },
    });
  }
  async changeSuperUser(id: number): Promise<void> {
    let ret = await changeSuperUser({ to_user_id: id });
    if (ret.code == 200) {
      this.$Message.success("更换成功");
      this.getTableList();
    }
  }

  public resendClick(item: objAny): void {
    console.log(item);
  }
  mounted(): void {
    this.getTableList();
  }
}
</script>

<style lang="less"></style>
