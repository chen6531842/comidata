<template>
  <wy-sys-content title="视频列表" class="page-opportunities">
    <div class="form-box">
      <div class="form-flex">
        <Button type="primary" style="margin-right: 20px">分配子管理员</Button>
        <Button type="error">批量删除</Button>
      </div>
      <Form ref="formInline" :model="formInline" inline>
        <FormItem label="评论时段" :label-width="80">
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
        <FormItem label="性别" :label-width="40">
          <Select
            v-model="formInline.sex"
            style="width: 120px"
            placeholder="请选择搜索项"
          >
            <Option
              :value="item.value"
              v-for="(item, index) in sexList"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="">
          <Select
            v-model="formInline.sex"
            style="width: 180px"
            placeholder="请选择搜索项"
          >
            <Option
              :value="item.value"
              v-for="(item, index) in sexList"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="">
          <Input
            style="width: 240px"
            v-model="formInline.name"
            placeholder="请输入关键字"
          ></Input>
        </FormItem>
        <FormItem label="">
          <Button type="primary">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <Table :columns="columns" :data="tableList">
      <template slot-scope="{ row }" slot="userInfo">
        <div class="user-info">
          <div class="header-img">{{ row.a }}</div>
          <div class="name">ada</div>
          <div class="follow">关注用户</div>
        </div>
      </template>
      <template slot-scope="{ row }" slot="userData">
        <div class="user-data">
          {{ row.a }}
          <p>作品数：59</p>
          <p>关注数：59</p>
          <p>粉丝数：59</p>
          <p>获赞数：59</p>
        </div>
      </template>
      <template slot-scope="{ row }" slot="info">
        <div class="user-data">
          {{ row.a }}
          <p>性别：女</p>
          <p>年龄：59</p>
          <p>城市：深圳</p>
          <p>来源：账号监控</p>
          <p>获取时间：2020-01-01</p>
        </div>
      </template>
      <template slot-scope="{ row }" slot="comment">
        <div class="user-data">
          {{ row.a }}
          <p>评论内容：女</p>
          <p>评论时间：59</p>
          <p class="red">商机词：多少钱</p>
        </div>
      </template>
      <template slot-scope="{ row }" slot="contact">
        <div class="user-data">
          {{ row.a }}
          <a class="blue">扫码联系</a>
          <p>平台：抖音</p>
          <p>签名：给大家一起分享</p>
        </div>
      </template>
      <template slot-scope="{ row }" slot="describe">
        <div class="user-data">
          {{ row.a }}
          <a class="blue">查看视频</a>
          <p>给大家一起分享给大家一起分享给大家一起分享给大家一起分享</p>
          <p class="red">同城视频号：抖音抖音抖音抖音</p>
          <p>监控时间：2020-01-01 10:00:00</p>
        </div>
      </template>
      <template slot-scope="{ row }" slot="videoData">
        <div class="user-data">
          {{ row.a }}
          <p>转发数：5</p>
          <p>评论数：5</p>
          <p>点赞数：5</p>
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
          @click="showVideo(row)"
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
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "../../../components/sys-content/sys-content.vue";
import listPage from "../../../components/list-page/list-page.vue";
import { objAny } from "../../../common/common-interface";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-list-page": listPage,
  },
})
export default class PageOpportunities extends Vue {
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
  private tableList: objAny[] = [];

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
