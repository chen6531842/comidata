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
    <Table :columns="columns" :data="tableList" @on-select="tableSelect">
      <template slot-scope="{ row }" slot="content">
        <div
          class="content-box"
          :class="row.is_read == 1 ? 'unread' : ''"
          @click="queryModalShow(row)"
        >
          <div class="content-title">
            <Tag color="blue">{{ row.message_type_zh }}</Tag>
            <span class="title-text">{{ row.title }}</span>
          </div>
          <div class="content-text">
            {{ row.content }}
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
import { getUserMessageList } from "@/api/api-user";
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
  private loading = false;
  private targetList: objAny[] = [];
  private sexList: objAny[] = [];
  private columns: objAny[] = [
    // {
    //   type: "selection",
    //   width: 60,
    //   align: "center",
    // },
    {
      title: "消息内容",
      slot: "content",
      minWidth: 240,
    },
    {
      title: "发布时间",
      key: "created_at",
      minWidth: 180,
    },
  ];
  private tableList: objAny[] = [];
  private statusList: objAny[] = [
    { name: "未读", value: 1 },
    { name: "已读", value: 2 },
  ];
  private selectList: objAny[] = [];

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
  public tableSelect(list: objAny[]): void {
    this.selectList = list;
  }
  async getTableList(): Promise<void> {
    this.loading = true;
    let ret = await getUserMessageList({});
    if (ret.code == 200) {
      this.tableList = ret.payload.data;
      this.total = ret.payload.total || 0;
    }
    this.selectList = [];
    this.loading = false;
  }
  $refs!: {
    queryModal: HTMLFormElement; //写法1 - 推荐
  };
  public queryModalShow(item: objAny): void {
    this.$refs.queryModal.open(item);
  }

  mounted(): void {
    this.getTableList();
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
  .content-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
