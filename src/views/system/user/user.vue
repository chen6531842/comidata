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
    <Table :columns="columns" :data="tableList">
      <template slot-scope="{ row }" slot="status">
        <div class="status-dian">已激活{{ row.a }}</div>
        <Button type="text" size="small" @click="addModalShow">重新发送</Button>
      </template>

      <template slot-scope="{ row }" slot="action">
        <Button
          class="blue"
          type="text"
          size="small"
          style="margin-right: 5px"
          @click="detailsKey(row)"
          >更换超级管理员</Button
        >
        <Button
          class="blue"
          type="text"
          size="small"
          style="margin-right: 5px"
          @click="updataKey(row)"
          >修改</Button
        >
        <Button type="text" class="red" size="small" @click="removeVideo(row)"
          >删除</Button
        >
      </template>
    </Table>
    <wy-list-page
      @change="tableChange"
      @size-change="tableSizeChange"
      :total="total"
      :index="formInline.pageIndex"
    ></wy-list-page>
    <wy-add-modal ref="addModal"></wy-add-modal>
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "@/components/sys-content/sys-content.vue";
import listPage from "@/components/list-page/list-page.vue";
import { objAny } from "@/common/common-interface";
import addModal from "./components/add.vue";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-list-page": listPage,
    "wy-add-modal": addModal,
  },
})
export default class PageSystemUser extends Vue {
  private formInline: objAny = {
    target: "",
    name: "",
    sex: "",
    pageIndex: 1,
    pageSize: 10,
  };
  private total = 0;
  private targetList: objAny[] = [];
  private sexList: objAny[] = [];
  private columns: objAny[] = [
    {
      type: "selection",
      width: 60,
      align: "center",
    },
    {
      title: "姓名",
      key: "userInfo",
      minWidth: 120,
    },
    {
      title: "邮箱",
      key: "userData",
      minWidth: 120,
    },
    {
      title: "手机号码",
      key: "phone",
      minWidth: 130,
    },
    {
      title: "角色",
      key: "phone",
      minWidth: 120,
    },
    {
      title: "操作",
      slot: "action",
      minWidth: 140,
    },
  ];
  private tableList: objAny[] = [{}];

  public removeVideo(item: objAny): void {
    this.$Modal.confirm({
      title: "提示",
      content: "<p>确定要删除吗？</p>",
      onOk: () => {
        console.log(item);
      },
    });
  }

  public queryClick(): void {
    this.formInline.pageIndex = 1;
    this.getTableList();
  }
  public tableChange(val: number): void {
    this.formInline.pageIndex = val;
    this.getTableList();
  }
  public tableSizeChange(val: number): void {
    this.formInline.pageSize = val;
    this.getTableList();
  }

  public getTableList(): void {
    console.log("???");
  }
  $refs!: {
    addModal: HTMLFormElement;
  };
  public addModalShow(): void {
    this.$refs.addModal.open();
  }
  public updataKey(item: objAny): void {
    this.$refs.addModal.open(item);
  }
  public detailsKey(item: objAny): void {
    this.$refs.addModal.open(item);
  }
}
</script>

<style lang="less"></style>
