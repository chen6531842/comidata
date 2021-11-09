<template>
  <wy-sys-content title="接入授权" class="page-cooperate">
    <Table :columns="columns" :data="tableList">
      <template slot-scope="{ row }" slot="tag">
        <Tag color="orange">orange{{ row.a }}</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <!-- <Button
          class="blue"
          type="text"
          size="small"
          style="margin-right: 5px"
          @click="updataKey(row)"
          >重新授权</Button
        > -->
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
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "@/components/sys-content/sys-content.vue";
import listPage from "@/components/list-page/list-page.vue";
import { objAny } from "@/common/common-interface";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-list-page": listPage,
  },
})
export default class PageCooperate extends Vue {
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
      title: "平台账户",
      key: "headimg",
      minWidth: 120,
    },
    {
      title: "粉丝数",
      key: "name",
      minWidth: 100,
    },
    {
      title: "标签",
      key: "tag",
      minWidth: 120,
    },

    {
      title: "操作",
      slot: "action",
      minWidth: 80,
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
}
</script>

<style lang="less"></style>
