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
    <Table :columns="columns" :data="tableList" :loading="loading">
      <template slot-scope="{ row }" slot="avatar">
        <a class="blue" :href="row.avatar" target="_blank">
          <img :src="row.avatar" class="avatar-img" alt="" />
        </a>
      </template>
      <template slot-scope="{ row }" slot="time">
        {{ row.platform_auth_date }}
        <span v-if="row.is_platform_auth_expired == 1" class="red"
          >(已过期)</span
        >
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          class="blue"
          type="text"
          size="small"
          style="margin-right: 5px"
          @click="updataKey(row)"
          v-if="row.is_platform_auth_expired == 1"
          >重新授权</Button
        >
        <Button type="text" class="red" size="small" @click="delClick(row)"
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
    }
    <wy-add-modal ref="addModal" @success="getTableList"></wy-add-modal>
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "@/components/sys-content/sys-content.vue";
import listPage from "@/components/list-page/list-page.vue";
import { objAny } from "@/common/common-interface";
import addModal from "./components/add.vue";
import { getAuthList, delAuth } from "@/api/api-user";
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
    page: 1,
    per_page: 10,
  };
  private total = 0;
  private targetList: objAny[] = [];
  private sexList: objAny[] = [];
  private columns: objAny[] = [
    {
      title: "头像",
      key: "avatar",
      slot: "avatar",
      minWidth: 120,
    },
    {
      title: "昵称",
      key: "nick_name",
      minWidth: 120,
    },
    {
      title: "平台",
      key: "platform_type_name",
      minWidth: 120,
    },
    {
      title: "粉丝数",
      key: "fan",
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
      key: "platform_auth_date",
      slot: "time",
      minWidth: 160,
    },
    {
      title: "操作",
      slot: "action",
      minWidth: 140,
    },
  ];
  private loading = false;
  private tableList: objAny[] = [];

  public delClick(item: objAny): void {
    this.$Modal.confirm({
      title: "提示",
      content: "<p>确定要删除吗？</p>",
      onOk: () => {
        this.delAuth(item.id);
      },
    });
  }
  async delAuth(id: number): Promise<void> {
    let ret = await delAuth({ id: id });
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
    let ret = await getAuthList({});
    if (ret.code == 200) {
      this.tableList = ret.payload.data;
      this.total = ret.payload.total;
    }
    this.loading = false;
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
  mounted(): void {
    this.getTableList();
    let is_success = this.$common.request("is_success");
    if (this.$common.get("dyAuto") == "1") {
      if (is_success == "true") {
        this.$Message.success("授权成功");
        this.$router.push("/auto");
      } else if (is_success == "false") {
        this.$Message.error("授权失败");
        this.$router.push("/auto");
      }
      this.$common.remove("dyAuto");
    }
  }
}
</script>

<style lang="less">
.page-auto {
  .btn-tips {
    font-size: 14px;
    color: #999;
  }
  .avatar-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
</style>
