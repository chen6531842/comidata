<template>
  <wy-sys-content title="消息中心" class="page-message">
    <div class="form-box">
      <div class="form-flex">
        <Form inline :label-width="90">
          <FormItem label="消息状态">
            <Select v-model="formInline.status" style="width: 200px">
              <Option value="">全部</Option>
              <Option
                :value="item.value"
                v-for="(item, index) in statusList"
                :key="index"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click="queryClick">查询</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <Table :columns="columns" :data="tableList">
      <template slot-scope="{ row }" slot="content">
        <div class="content-box unread" @click="queryModalShow(row)">
          <div class="content-title">
            <Tag color="blue">标题</Tag>
            <span class="title-text"
              >我是标题我是标题我是标题我是标题我是标题</span
            >
          </div>
          <div class="content-text">
            我是内容我是内容我是内容我是内容我是内容
          </div>
        </div>
      </template>
    </Table>
    <wy-list-page
      @change="tableChange"
      @size-change="tableSizeChange"
      :total="total"
      :index="formInline.pageIndex"
    ></wy-list-page>
    <wy-query-modal ref="queryModal"></wy-query-modal>
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "@/components/sys-content/sys-content.vue";
import listPage from "@/components/list-page/list-page.vue";
import { objAny } from "@/common/common-interface";
import queryModal from "./components/query.vue";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-list-page": listPage,
    "wy-query-modal": queryModal,
  },
})
export default class PageSystemUser extends Vue {
  private formInline: objAny = {
    status: "",
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
      title: "消息内容",
      slot: "content",
      minWidth: 180,
    },
    {
      title: "发布时间",
      key: "userData",
      width: 180,
    },
  ];
  private tableList: objAny[] = [{}];
  private statusList: objAny[] = [];

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

  public queryModalShow(): void {
    let queryModal: any = this.$refs.queryModal;
    queryModal.open();
  }
}
</script>

<style lang="less">
.page-message {
  .content-box {
    padding-left: 20px;
    position: relative;
    cursor: pointer;
  }
  .content-box.unread::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #2d8cf0;
    left: 0%;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
  }
  .content-title {
    color: #333;
  }
  .title-text {
    margin-top: 5px;
    color: #999;
  }
}
</style>
