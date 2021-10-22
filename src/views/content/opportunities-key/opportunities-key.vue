<template>
  <wy-sys-content title="商家关键字" class="page-opportunities-key">
    <div class="form-box">
      <div class="form-flex">
        <Form>
          <FormItem prop="name">
            <Button type="primary" @click="addModalShow">新增关键字</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <Table :columns="columns" :data="tableList">
      <template slot-scope="{ row }" slot="time">
        <a class="blue" style="margin-right: 20px" @click="queryModalShow(row)"
          >查看</a
        >
        {{ row.time }}2010-10-010
      </template>

      <template slot-scope="{ row }" slot="action">
        <Button
          class="blue"
          type="text"
          size="small"
          style="margin-right: 5px"
          @click="detailsKey(row)"
          >详情</Button
        >
        <Button
          class="blue"
          type="text"
          size="small"
          style="margin-right: 5px"
          @click="updataKey(row)"
          >修改</Button
        >
        <Button
          class="blue"
          type="text"
          size="small"
          style="margin-right: 5px"
          @click="copy(row)"
          >复制</Button
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
    <wy-query-modal ref="queryModal"></wy-query-modal>
    <wy-add-modal ref="addModal"></wy-add-modal>
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "../../../components/sys-content/sys-content.vue";
import listPage from "../../../components/list-page/list-page.vue";
import { objAny } from "../../../common/common-interface";
import queryModal from "./components/query.vue";
import addModal from "./components/add.vue";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-list-page": listPage,
    "wy-query-modal": queryModal,
    "wy-add-modal": addModal,
  },
})
export default class PageOpportunitiesKey extends Vue {
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
      title: "行业",
      key: "userInfo",
      minWidth: 120,
    },
    {
      title: "关联平台账户",
      key: "userData",
      minWidth: 120,
    },
    {
      title: "更新时间",
      key: "info",
      slot: "time",
      minWidth: 160,
    },

    {
      title: "操作",
      slot: "action",
      minWidth: 140,
    },
  ];
  private tableList: objAny[] = [{}];

  public showVideo(item: objAny): void {
    console.log(item);
  }
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
    queryModal: HTMLFormElement;
    addModal: HTMLFormElement;
  };
  public queryModalShow(item: objAny): void {
    this.$refs.queryModal.open(item);
  }
  public addModalShow(): void {
    this.$refs.addModal.open();
  }
  public updataKey(item: objAny): void {
    this.$refs.addModal.open(item);
  }
  public detailsKey(item: objAny): void {
    this.$refs.addModal.open(item);
  }
  public copy(item: objAny): void {
    this.$Message.success(item);
  }
}
</script>

<style lang="less"></style>
