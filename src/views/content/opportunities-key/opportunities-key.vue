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
    <Table :columns="columns" :data="tableList" :loading="loading">
      <template slot-scope="{ row }" slot="industry">
        {{ row.industry_category_names.join(",") }}
      </template>
      <template slot-scope="{ row }" slot="account">
        <div v-if="row.platform_account_nick_names.douyin">
          抖音: {{ row.platform_account_nick_names.douyin.join(",") }}
        </div>
        <div v-if="row.platform_account_nick_names.kuaishou">
          快手: {{ row.platform_account_nick_names.kuaishou.join(",") }}
        </div>
      </template>

      <template slot-scope="{ row }" slot="time">
        <a class="blue" style="margin-right: 20px" @click="queryModalShow(row)"
          >查看</a
        >
        {{ row.updated_at }}
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
    <wy-add-modal ref="addModal" @successs="getTableList"></wy-add-modal>
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "../../../components/sys-content/sys-content.vue";
import listPage from "../../../components/list-page/list-page.vue";
import { objAny } from "../../../common/common-interface";
import queryModal from "./components/query.vue";
import addModal from "./components/add.vue";
import {
  getBusinessKeyword,
  delBusinessKeyword,
  copyBusinessKeyword,
} from "@/api/api-user";
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
  private loading = false;
  private targetList: objAny[] = [];
  private sexList: objAny[] = [];
  private columns: objAny[] = [
    {
      title: "行业",
      slot: "industry",
      minWidth: 120,
    },
    {
      title: "关键词",
      key: "name",
      minWidth: 120,
    },
    {
      title: "关联平台账户",
      key: "account",
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
  private tableList: objAny[] = [];

  public showVideo(item: objAny): void {
    console.log(item);
  }
  public removeVideo(item: objAny): void {
    this.$Modal.confirm({
      title: "提示",
      content: "<p>确定要删除吗？</p>",
      onOk: () => {
        this.delSub(item.id);
      },
    });
  }
  async delSub(id: string): Promise<void> {
    let ret = await delBusinessKeyword({ id: id });
    if (ret.code == 200) {
      this.$Message.success("删除成功");
      this.getTableList();
    }
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

  async getTableList(): Promise<void> {
    this.loading = true;
    let ret = await getBusinessKeyword(this.formInline);
    if (ret.code == 200) {
      this.tableList = ret.payload.data;
      this.total = ret.payload.total;
    }
    this.loading = false;
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
  async copy(item: objAny): Promise<void> {
    let ret = await copyBusinessKeyword({ id: item.id });
    if (ret.code == 200) {
      this.$Message.success("复制成功");
      this.getTableList();
    }
  }
  mounted(): void {
    this.getTableList();
  }
}
</script>

<style lang="less"></style>
