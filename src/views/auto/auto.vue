<template>
  <wy-sys-content title="接入授权" class="page-auto">
    <div class="form-box">
      <div class="form-flex">
        <Form inline>
          <FormItem prop="name">
            <Button type="primary" @click="addModalShow">新增授权</Button>
          </FormItem>
          <FormItem prop="name">
            <Button type="success" @click="addModalShow">同步数据</Button>
          </FormItem>
          <FormItem prop="name">
            <div class="btn-tips">
              点击按钮可同步当前账号下详细统计数据，每隔一小时可同步一次
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
    <Table :columns="columns" :data="tableList">
      <template slot-scope="{ row }" slot="fans">
        <a class="blue">10{{ row.a }}</a>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          class="blue"
          type="text"
          size="small"
          style="margin-right: 5px"
          @click="updataKey(row)"
          >重新授权</Button
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
export default class PageAuto extends Vue {
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
      title: "头像",
      key: "headimg",
      minWidth: 120,
    },
    {
      title: "昵称",
      key: "name",
      minWidth: 120,
    },
    {
      title: "平台",
      key: "userInfo",
      minWidth: 120,
    },
    {
      title: "粉丝数",
      slot: "fans",
      minWidth: 120,
    },
    {
      title: "发布量",
      key: "userInfo",
      minWidth: 120,
    },
    {
      title: "播放量",
      key: "userInfo",
      minWidth: 120,
    },
    {
      title: "评论量",
      key: "userInfo",
      minWidth: 120,
    },
    {
      title: "授权时间",
      key: "userInfo",
      minWidth: 160,
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
}
</script>

<style lang="less">
.page-auto {
  .btn-tips {
    font-size: 14px;
    color: #999;
  }
}
</style>
