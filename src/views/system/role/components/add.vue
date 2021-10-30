<template>
  <Modal
    v-model="modalShow"
    class="user-add"
    :title="title"
    :footer-hide="true"
    :width="800"
  >
    <Form
      ref="formValidate"
      :model="formInline"
      :rules="rule"
      :label-width="120"
    >
      <FormItem label="角色名称" prop="name">
        <Input v-model="formInline.name" placeholder="请输入姓名"></Input>
        <div class="form-tips">些角色为默认角色，名称不可修改</div>
      </FormItem>
      <FormItem label="角色权限" prop="rightsStr">
        <Input
          v-model="formInline.rightsStr"
          placeholder=""
          style="display: none"
        ></Input>
        <div class="role-item-table">
          <div
            class="item-table-row"
            v-for="(item, index) in allAutoList"
            :key="index"
          >
            <div class="item-auto">
              <Checkbox
                v-model="item.is_checked"
                @on-change="itemChange(item)"
                >{{ item.name }}</Checkbox
              >
            </div>
            <div class="item-auto-list">
              <div
                class="item-auto-item"
                v-for="(child, i) in item.childrens"
                :key="index + '-' + i"
              >
                <Checkbox
                  v-model="child.is_checked"
                  @on-change="childChange(item, child)"
                  >{{ child.name }}</Checkbox
                >
              </div>
            </div>
          </div>
        </div>
      </FormItem>

      <FormItem>
        <Button :loading="loading" type="primary" @click="submitClick"
          >提交</Button
        >
        <Button style="margin-left: 8px" @click="modalShow = false"
          >取消</Button
        >
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "@/common/common-interface";
import blockContent from "@/components/block-content/block-content.vue";
import noData from "@/components/no-data/no-data.vue";
import { addRole, getRoleRights } from "@/api/api-user";
@Component({
  components: {
    "wy-block-content": blockContent,
    "wy-no-data": noData,
  },
})
export default class PageUserRole extends Vue {
  private modalShow = false;
  private formInline: objAny = {
    name: "",
    id: "",
    rights: [],
    description: "",
    rightsStr: "",
  };
  private loading = false;
  private rule: objAny = {};
  private allAutoList: objAny[] = [
    {
      name: "内容管理",
      is_checked: false,
      childrens: [
        { name: "内容管理", is_checked: false },
        { name: "内容管理", is_checked: false },
        { name: "内容管理", is_checked: false },
        { name: "内容管理", is_checked: false },
      ],
    },
  ];
  private autoListShow: objAny[] = [];

  private title = "新增权限";
  public open(item?: objAny): void {
    this.modalShow = true;
    if (!item) {
      // 新增
      if (this.allAutoList.length == 0) {
        this.getRoleRights();
      } else {
        this.autoListShow = JSON.parse(JSON.stringify(this.allAutoList));
      }
      this.formInline.id = "";
    } else {
      this.autoListShow = JSON.parse(JSON.stringify(item.rights));
      this.formInline.id = item.id;
    }
  }

  async getRoleRights(): Promise<void> {
    let ret = await getRoleRights({});
    if (ret.code == 200) {
      this.allAutoList = ret.payload;
    }
  }
  public itemChange(data: objAny): void {
    if (data.childrens) {
      data.childrens.map((item: objAny) => {
        item.is_checked = data.is_checked;
      });
    }
  }
  public childChange(item: objAny, child: objAny): void {
    if (child.is_checked && !item.is_checked) {
      item.is_checked = true;
    }
    let isSelect = false;
    item.childrens.map((item: objAny) => {
      if (item.is_checked) {
        isSelect = true;
      }
    });
    if (!isSelect && item.is_checked) {
      item.is_checked = false;
    }
  }
  $refs!: {
    formValidate: HTMLFormElement; //写法1 - 推荐
  };
  public handleSubmit(): void {
    let rights: number[] = [];
    this.autoListShow.map((item: objAny) => {
      if (item.is_checked) {
        rights.push(item.id);
      }
      if (item.childrens && item.childrens.length > 0) {
        item.childrens.map((child: objAny) => {
          if (child.is_checked) {
            rights.push(item.id);
          }
        });
      }
    });
    this.formInline.rightsStr = rights.join(",");
    this.$refs.formValidate.validate((valid: boolean) => {
      if (valid) {
        this.submitData();
      }
    });
  }
  async submitData(): Promise<void> {
    this.loading = true;
    let data: objAny = {
      name: this.formInline.name,
      description: this.formInline.description,
      rights: this.formInline.rights,
    };
    if (this.formInline.id != "") {
      data.id = this.formInline.id;
    }
    let ret = await addRole(data);
    if (ret.code == 200) {
      this.$Message.success("操作成功");
      this.$emit("success");
    }
    this.loading = false;
  }
}
</script>

<style lang="less"></style>
