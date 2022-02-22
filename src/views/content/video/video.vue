<template>
  <wy-sys-content title="视频列表" class="page-video">
    <div class="form-box">
      <div class="form-flex">
        <Button type="error" @click="allDel" :disabled="selectList.length == 0"
          >批量删除</Button
        >
      </div>
      <Form ref="formInline" :model="formInline" inline>
        <FormItem label="">
          <Select
            v-model="formInline.target"
            style="width: 180px"
            placeholder="请选择搜索项"
          >
            <Option
              :value="item.value"
              v-for="(item, index) in targetList"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="">
          <Input
            style="width: 240px"
            v-model="formInline.keyword"
            placeholder="请输入关键字"
          ></Input>
        </FormItem>
        <FormItem label="">
          <Button type="primary" @click="queryClick">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <Table
      :columns="columns"
      :data="tableList"
      :loading="loading"
      @on-select="tableSelect"
    >
      <template slot-scope="{ row }" slot="video">
        <a :href="row.video_url" target="_blank">
          <img class="video-show" :src="row.cover_url" v-if="row.cover_url" />
          <span v-else>暂无封面图</span>
        </a>
      </template>
      <template slot-scope="{ row }" slot="account">
        <div v-for="(item, index) in row.video_publish_accounts" :key="index">
          {{ index }}:
          <span v-for="(child, i) in item" :key="index + '-' + i"
            >{{ child.nick_name }}(<span :class="'status-' + child.status">{{
              child.status_name
            }}</span
            >)</span
          >
        </div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          type="text"
          class="blue"
          size="small"
          style="margin-right: 5px"
          @click="showVideo(row)"
          >查看视频</Button
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
      :index="formInline.page"
    ></wy-list-page>
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "@/components/sys-content/sys-content.vue";
import listPage from "@/components/list-page/list-page.vue";
import { objAny } from "@/common/common-interface";
import { getVideoList, delVideo, delAllVideo } from "@/api/api-user";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-list-page": listPage,
  },
})
export default class PageVideo extends Vue {
  private formInline: objAny = {
    target: "",
    keyword: "",
    page: 1,
    per_page: 10,
  };
  private loading = false;
  private total = 0;
  private targetList: objAny[] = [];
  private columns: objAny[] = [
    {
      type: "selection",
      width: 60,
      align: "center",
    },
    {
      title: "视频",
      key: "video_url",
      slot: "video",
      minWidth: 120,
    },
    {
      title: "描述",
      key: "description",
      minWidth: 160,
    },
    {
      title: "平台/账户",
      key: "video_publish_accounts",
      slot: "account",
      minWidth: 160,
    },
    {
      title: "发布时间",
      key: "created_at",
      minWidth: 140,
    },
    {
      title: "操作",
      slot: "action",
      minWidth: 120,
    },
  ];
  private tableList: objAny[] = [];
  private selectList: objAny[] = [];

  public showVideo(item: objAny): void {
    window.open(item.video_url);
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
  async delSub(id: number): Promise<void> {
    let ret = await delVideo({ id: id });
    if (ret.code == 200) {
      this.$Message.success("删除成功");
      this.getTableList();
    }
  }
  async delAllVideo(ids: number[]): Promise<void> {
    let ret = await delAllVideo({ ids: ids });
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
    let ret = await getVideoList(this.formInline);
    if (ret.code == 200) {
      this.tableList = ret.payload.data;
      this.total = ret.payload.total;
    }
    this.loading = false;
    this.selectList = [];
  }
  public tableSelect(list: objAny[]): void {
    this.selectList = list;
  }
  public allDel(): void {
    let ids = this.selectList.map((item: objAny) => {
      return item.id;
    });
    this.$Modal.confirm({
      title: "提示",
      content: "<p>确定要删除吗？</p>",
      onOk: () => {
        this.delAllVideo(ids);
      },
    });
  }
  mounted(): void {
    this.getTableList();
  }
}
</script>
<style lang="less">
.page-video {
  .video-show {
    width: 90px;
    height: 150px;
  }
  .status-1 {
    color: #00e600;
  }
  .status-2 {
    color: #f7e300;
  }
  .status-3 {
    color: #f20022;
  }
}
</style>
