<template>
  <wy-sys-content title="视频列表" class="page-opportunities">
    <div class="form-box">
      <div class="form-flex">
        <Button type="primary" style="margin-right: 20px">分配子管理员</Button>
        <Button type="error" @click="allDel" :disabled="selectList.length == 0"
          >批量删除</Button
        >
      </div>
      <Form ref="formInline" :model="formInline" inline>
        <FormItem label="评论时段" :label-width="80">
          <DatePicker
            @on-change="timeChange"
            type="daterange"
            show-week-numbers
            placement="bottom-end"
            placeholder="请选择时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="性别" :label-width="40">
          <Select
            v-model="formInline.gender"
            style="width: 120px"
            placeholder="请选择搜索项"
          >
            <Option
              :value="item.value"
              v-for="(item, index) in genderList"
              :key="index"
              >{{ item.label }}</Option
            >
          </Select>
        </FormItem>
        <!-- <FormItem label="">
          <Select
            v-model="formInline.sex"
            style="width: 180px"
            placeholder="请选择搜索项"
          >
            <Option
              :value="item.value"
              v-for="(item, index) in genderList"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem> -->
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
      <template slot-scope="{ row }" slot="userInfo">
        <div class="user-info">
          <div class="header-img">
            <img :src="row.avatar" alt="" />
          </div>
          <div class="name">{{ row.nickname }}</div>
          <!-- <div class="follow">关注用户</div> -->
        </div>
      </template>
      <template slot-scope="{ row }" slot="userData">
        <div class="user-data">
          {{ row.a }}
          <!-- <p>作品数：59</p>
          <p>关注数：59</p>
          <p>粉丝数：59</p>
          <p>获赞数：59</p> -->
        </div>
      </template>
      <template slot-scope="{ row }" slot="info">
        <div class="user-data">
          <p>性别：{{ row.genderZh }}</p>
          <!-- <p>年龄：59</p> -->
          <p>城市：{{ row.country }}{{ row.province }}{{ row.city }}</p>
          <!-- <p>来源：账号监控</p> -->
          <!-- <p>获取时间：{{row.created_at}}</p> -->
        </div>
      </template>
      <template slot-scope="{ row }" slot="comment">
        <div class="user-data">
          {{ row.a }}
          <p>评论内容：{{ row.comment }}</p>
          <p>评论时间：{{ row.create_time }}</p>
          <!-- <p class="red">商机词：多少钱</p> -->
        </div>
      </template>
      <template slot-scope="{ row }" slot="contact">
        <div class="user-data">
          {{ row.a || "" }}
          <!-- <a class="blue">扫码联系</a>
          <p>平台：抖音</p>
          <p>签名：给大家一起分享</p> -->
        </div>
      </template>
      <template slot-scope="{ row }" slot="describe">
        <div class="user-data">
          {{ row.a }}
          <a class="blue" :href="row.video_url" target="_blank">查看视频</a>
          <p>{{ row.video_description }}</p>
          <!-- <p class="red">同城视频号：抖音抖音抖音抖音</p> -->
          <p>监控时间：{{ row.created_at }}</p>
        </div>
      </template>
      <template slot-scope="{ row }" slot="videoData">
        <div class="user-data">
          {{ row.a }}
          <p>转发数：{{ row.forward_count }}</p>
          <p>评论数：{{ row.comment_count }}</p>
          <p>点赞数：{{ row.digg_count }}</p>
        </div>
      </template>
      <template slot-scope="{ row }" slot="handle">
        <div class="user-data">
          {{ row.a }}
          <p>所属者：--</p>
          <p><Tag color="blue">未处理</Tag></p>
        </div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          class="blue"
          type="text"
          size="small"
          style="margin-right: 5px"
          @click="sendMessage(row)"
          >处理数据</Button
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
    <wy-send-message ref="sendMessage"> </wy-send-message>
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "../../../components/sys-content/sys-content.vue";
import listPage from "../../../components/list-page/list-page.vue";
import { objAny } from "../../../common/common-interface";
import { getCommentList, delComment } from "@/api/api-user";
import sendMessage from "./components/sendMessage.vue";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-list-page": listPage,
    "wy-send-message": sendMessage,
  },
})
export default class PageOpportunities extends Vue {
  private formInline: objAny = {
    keyword: "",
    gender: "",
    pageIndex: 1,
    pageSize: 10,
    startTime: "",
    endTime: "",
  };
  private loading = false;
  private total = 0;

  private selectList: objAny[] = [];
  private genderList: objAny[] = [
    { label: "全部", value: "" },
    { label: "男", value: "1" },
    { label: "女", value: "2" },
  ];
  private columns: objAny[] = [
    {
      type: "selection",
      width: 60,
      align: "center",
    },
    {
      title: "用户信息",
      slot: "userInfo",
      minWidth: 120,
    },
    {
      title: "用户数据",
      slot: "userData",
      minWidth: 120,
    },
    {
      title: "基础信息",
      slot: "info",
      minWidth: 160,
    },
    {
      title: "评论信息",
      slot: "comment",
      minWidth: 140,
    },
    {
      title: "联系用户",
      slot: "contact",
      minWidth: 140,
    },
    {
      title: "视频",
      key: "name",
      minWidth: 120,
    },
    {
      title: "描述",
      slot: "describe",
      minWidth: 160,
    },
    {
      title: "视频数据",
      slot: "videoData",
      minWidth: 120,
    },
    {
      title: "处理信息",
      slot: "handle",
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
        this.delSub(item.id);
      },
    });
  }
  async delSub(id: string): Promise<void> {
    let ret = await delComment({ id: id });
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
    let ret = await getCommentList({});
    if (ret.code == 200) {
      this.tableList = ret.payload.data;
      this.total = ret.payload.total;
    }
    this.loading = false;
    this.selectList = [];
  }
  public timeChange(time: string[]): void {
    console.log(time);
    this.formInline.startTime = time[0];
    this.formInline.endTime = time[1];
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
        this.delSub(ids.join(","));
      },
    });
  }
  $refs!: {
    sendMessage: HTMLFormElement;
  };
  public sendMessage(item: objAny): void {
    this.$refs.sendMessage.open(item);
  }
  created(): void {
    this.getTableList();
  }
}
</script>

<style lang="less">
.page-opportunities {
  .user-info {
    text-align: center;
    .header-img {
      width: 40px;
      height: 40px;
      display: inline-block;
      vertical-align: top;
      background-color: #f5f5f5;
    }
    .follow {
      color: #2d8cf0;
      display: inline-block;
      vertical-align: top;
    }
  }
  .user-data {
    line-height: 22px;
  }
}
</style>
