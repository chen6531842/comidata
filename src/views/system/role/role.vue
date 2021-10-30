<template>
  <wy-sys-content title="角色权限" class="page-role">
    <section class="form-box">
      <div class="form-flex">
        <Form>
          <FormItem prop="name">
            <Button type="primary" @click="addModalShow">新增角色权限</Button>
          </FormItem>
        </Form>
      </div>
    </section>
    <section class="role-content" v-if="tableList && tableList.length > 0">
      <ul class="role-list">
        <li
          class="role-item"
          @click="roleClick(item)"
          :class="item.id == selectId ? 'active' : ''"
          v-for="(item, index) in tableList"
          :key="index"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="role-item-content">
        <div class="role-item-title">
          <span class="title">管理员</span>
          <a class="blue updata-click">编辑角色权限</a>
        </div>
        <div class="role-item-table" v-if="roleData.rights">
          <div
            class="item-table-row"
            v-for="(item, index) in roleData.rights"
            :key="index"
          >
            <div class="item-auto">{{ item.name }}</div>
            <template v-for="(child, i) in item.childrens">
              <div
                class="item-auto-list"
                v-if="child.is_checked"
                :key="index + '-' + i"
              >
                <div class="item-auto-item">{{ child.name }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
    <wy-no-data v-if="tableList.length == 0"></wy-no-data>
    <wy-add-modal ref="addModal"></wy-add-modal>
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "@/components/sys-content/sys-content.vue";
import { objAny } from "@/common/common-interface";
import addModal from "./components/add.vue";
import noData from "@/components/no-data/no-data.vue";
import { getRoleList, getRoleDetails } from "@/api/api-user";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-add-modal": addModal,
    "wy-no-data": noData,
  },
})
export default class PageSystemRole extends Vue {
  private formInline: objAny = {
    target: "",
    name: "",
    sex: "",
    pageIndex: 1,
    pageSize: 10,
  };
  private selectId = "";
  private roleData: objAny = {};
  private tableList: objAny[] = [];

  async getTableList(): Promise<void> {
    let ret = await getRoleList({});
    if (ret.code == 200) {
      this.tableList = ret.payload;
      if (this.tableList.length > 0 && this.selectId == "") {
        this.selectId = this.tableList[0].id;
        this.getDetails();
      }
    }
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
  async getDetails(): Promise<void> {
    let ret = await getRoleDetails({ id: this.selectId });
    if (ret.code == 200) {
      this.roleData = ret.payload;
    }
  }
  public roleClick(item: objAny): void {
    this.selectId = item.id;
    this.getDetails();
  }
  mounted(): void {
    this.getTableList();
  }
}
</script>

<style lang="less">
.page-role {
  .role-content {
    border-top: 1px solid #e8eaec;
    display: flex;
    margin: 0 -16px;
    .role-list {
      width: 200px;
      line-height: 50px;
      font-size: 16px;
      color: #333;
      border-right: 1px solid #e8eaec;
      .role-item {
        list-style: none;
        padding-left: 20px;
        border-bottom: 1px solid #e8eaec;
      }
      .role-item.active {
        background-color: #f0faff;
        color: #2d8cf0;
      }
    }
    .role-item-content {
      flex: 1;
      padding: 16px;
      .role-item-title {
        font-size: 14px;

        color: #333;
        line-height: 28px;
        .title {
          font-weight: 600;
        }
        .updata-click {
          margin-left: 30px;
          cursor: pointer;
        }
      }
    }
  }
}

.role-item-table {
  margin-top: 16px;
  border: 1px solid #e8eaec;
  .item-table-row {
    display: flex;
    border-bottom: 1px solid #e8eaec;

    .item-auto {
      width: 180px;
      font-weight: 600;
      align-items: center;
      justify-items: center;
      padding: 10px 20px;
      display: flex;
      border-right: 1px solid #e8eaec;
    }
  }
  .item-table-row:last-child {
    border-bottom: none;
  }
  .item-auto-list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    .item-auto-item {
      width: 50%;
      border-top: 1px solid #e8eaec;
      line-height: 40px;
      padding-left: 16px;
    }
    .item-auto-item:first-child,
    .item-auto-item:nth-child(2) {
      border-top: none;
    }
  }
}
</style>
