<template>
  <wy-sys-content title="星图达人" class="page-cooperate">
    <Table :columns="columns" :data="tableList" :loading="loading">
      <template slot-scope="{ row }" slot="account">
        <div>{{ row.nick_name }}</div>
        <div>抖音id: {{ row.unique_id }}</div>
      </template>
      <template slot-scope="{ row }" slot="tag">
        <Tag color="orange" v-for="(item, index) in row.tags" :key="index">{{
          item
        }}</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="text" class="red" size="small" @click="removeVideo(row)"
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
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "@/components/sys-content/sys-content.vue";
import listPage from "@/components/list-page/list-page.vue";
import { objAny } from "@/common/common-interface";
import { getHotStar, delHotStar } from "@/api/api-user";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-list-page": listPage,
  },
})
export default class PageCooperate extends Vue {
  private formInline: objAny = {
    page: 1,
    per_page: 10,
  };
  private loading = false;
  private total = 0;
  private targetList: objAny[] = [];
  private sexList: objAny[] = [];
  private columns: objAny[] = [
    {
      title: "平台账户",
      slot: "account",
      minWidth: 120,
    },
    {
      title: "粉丝数",
      key: "follower",
      minWidth: 100,
    },
    {
      title: "标签",
      slot: "tag",
      minWidth: 120,
    },

    // {
    //   title: "操作",
    //   slot: "action",
    //   minWidth: 80,
    // },
  ];
  private tableList: objAny[] = [{}];

  public removeVideo(item: objAny): void {
    this.$Modal.confirm({
      title: "提示",
      content: "<p>确定要删除吗？</p>",
      onOk: () => {
        this.delSub(item.id);
      },
    });
  }
  async delSub(id: number): Promise<void> {
    let ret = await delHotStar({ id: id });
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
    let ret = await getHotStar(this.formInline);
    if (ret.code == 200) {
      this.tableList = ret.payload.data;
      this.total = ret.payload.total;
    }
    this.loading = false;
  }
  mounted(): void {
    this.getTableList();
  }
}
</script>

<style lang="less"></style>
