<template>
  <Modal
    v-model="modalShow"
    class="opportunities-key-add"
    :title="title"
    :footer-hide="true"
    :width="1000"
  >
    <Form ref="formValidate" :model="formInline" :rules="rule" :label-width="0">
      <wy-block-content :isTitle="false">
        <FormItem prop="industry_category_tags">
          <div class="form-label">行业类别</div>
          <CheckboxGroup v-model="formInline.industry_category_tags">
            <Checkbox
              :label="item.tag"
              v-for="(item, index) in categoryList"
              :key="index"
              >{{ item.name }}</Checkbox
            >
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="name">
          <div class="form-label">关键词</div>
          <Row>
            <Col :span="10">
              <Input
                v-model="formInline.inputName"
                type="textarea"
                :rows="10"
                placeholder="多个关键字以换行或者逗号分隔"
              ></Input>
            </Col>
            <Col :span="4" class="text-center">
              <Button @click="addRight">》添加</Button>
            </Col>
            <Col :span="10">
              <wy-block-content :disable="true" :border="true">
                <div slot="block-title">
                  <Input
                    suffix="ios-search"
                    v-model="searchValue"
                    placeholder="搜索已添加项"
                  />
                </div>
                <div
                  class="v-center text-center"
                  style="height: 125px"
                  v-if="formInline.name.length == 0"
                >
                  <div style="width: 100%">未设置<br />请在左侧输入并添加</div>
                </div>
                <ul v-else class="input-list">
                  <template v-for="(item, index) in formInline.name">
                    <li
                      :key="index"
                      v-show="
                        searchValue == '' || item.indexOf(searchValue) != -1
                      "
                    >
                      {{ item }}
                    </li>
                  </template>
                </ul>
              </wy-block-content>
            </Col>
          </Row>
        </FormItem>
      </wy-block-content>
      <wy-block-content title="关联平台账户">
        <FormItem prop="platform_account_ids">
          <!-- <Row>
            <Col :span="14" class="select">
              <Input
                prefix="ios-search"
                placeholder="输入要搜索的应用名称或者ID"
              />
            </Col>
          </Row> -->
          <Row class="acc-box-row">
            <Col :span="14" class="select">
              <wy-block-content title="平台账户" :border="true">
                <div class="acc-content">
                  <Checkbox v-model="all" @on-change="allChange">全选</Checkbox>
                  <CheckboxGroup v-model="formInline.platform_account_ids">
                    <Checkbox
                      :label="item.id"
                      v-for="(item, index) in accountList"
                      :key="index"
                      >{{ item.platform_type_name }} ({{
                        item.nick_name
                      }})</Checkbox
                    >
                  </CheckboxGroup>
                </div>
              </wy-block-content>
            </Col>
            <Col :span="10">
              <wy-block-content title="" :border="true">
                <div class="select-box" slot="block-title">
                  <div class="select-box-title">
                    已选 {{ formInline.platform_account_ids.length }} 项目
                    <span
                      class="clear blue"
                      @click="formInline.platform_account_ids = []"
                      >清空</span
                    >
                  </div>
                </div>
                <div
                  class="acc-content"
                  v-if="formInline.platform_account_ids.length == 0"
                >
                  <wy-no-data></wy-no-data>
                </div>
                <div class="acc-content" v-else>
                  <template v-for="(item, index) in accountList">
                    <div
                      style="line-height: 21px; margin-bottom: 10px"
                      :key="index"
                      v-if="
                        formInline.platform_account_ids.indexOf(item.id) != -1
                      "
                    >
                      {{ item.platform_type_name }} ({{ item.nick_name }})
                    </div>
                  </template>
                </div>
              </wy-block-content>
            </Col>
          </Row>
        </FormItem>
      </wy-block-content>

      <FormItem style="margin-top: 20px" class="text-center">
        <Button type="primary" @click="handleSubmit">提交</Button>
        <Button style="margin-left: 8px" @click="modalShow = false"
          >取消</Button
        >
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../../../common/common-interface";
import blockContent from "@/components/block-content/block-content.vue";
import noData from "@/components/no-data/no-data.vue";
import {
  addBusinessKeyword,
  getIndustryCategories,
  getPlatformAccounts,
  getBusinessKeywordDetails,
} from "@/api/api-user";
@Component({
  components: {
    "wy-block-content": blockContent,
    "wy-no-data": noData,
  },
})
export default class PageOpportunitiesKeyAdd extends Vue {
  private modalShow = false;
  private formInline: objAny = {
    inputName: "",
    name: [],
    industry_category_tags: [],
    platform_account_ids: [],
    desc: "",
  };
  private searchValue = "";
  private all = false;
  private rule: objAny = {
    industry_category_tags: [
      {
        required: true,
        type: "array",
        message: "请选择行业类别",
        trigger: "change",
      },
    ],
    name: [
      {
        required: true,
        type: "array",
        message: "请添加关键词",
        trigger: "change",
      },
    ],
    platform_account_ids: [
      {
        required: true,
        type: "array",
        message: "请选择平台账户",
        trigger: "change",
      },
    ],
  };
  private categoryList: objAny[] = [];
  private accountList: objAny[] = [];
  private itemData: objAny = {};

  private title = "新增关键字";
  public open(item?: objAny): void {
    this.modalShow = true;
    this.searchValue = "";
    this.getIndustryCategories();
    this.getPlatformAccounts();
    if (item) {
      this.itemData = item;
      this.getBusinessKeywordDetails();
    } else {
      this.itemData = {};
    }
  }

  async getBusinessKeywordDetails(): Promise<void> {
    let ret = await getBusinessKeywordDetails({ id: this.itemData.id });
    if (ret.code == 200) {
      let data = ret.payload;
      this.formInline.name = data.name.split(",");
    }
  }
  async getIndustryCategories(): Promise<void> {
    let ret = await getIndustryCategories({});
    if (ret.code == 200) {
      this.categoryList = ret.payload;
    }
  }
  async getPlatformAccounts(): Promise<void> {
    let ret = await getPlatformAccounts({});
    if (ret.code == 200) {
      this.accountList = ret.payload;
    }
  }
  async addBusinessKeyword(): Promise<void> {
    let json: objAny = {
      name: this.formInline.name.join(","),
      industry_category_tags: this.formInline.industry_category_tags,
      platform_account_ids: this.formInline.platform_account_ids,
    };
    if (this.itemData.id) {
      json.id = this.itemData.itemData;
    }

    let ret = await addBusinessKeyword(json);
    if (ret.code == 200) {
      this.$Message.success("添操作成功");
      this.modalShow = false;
      this.$emit("successs");
    }
  }

  public addRight(): void {
    let arr = this.formInline.inputName.split(/[,，\s\n]/);
    let allArr = this.formInline.name.concat(arr);
    this.formInline.name = this.nique1(allArr);
    this.formInline.inputName = "";
  }
  public nique1(arr: string[]): string[] {
    var hash = [];
    for (var i = 0; i < arr.length; i++) {
      if (hash.indexOf(arr[i]) == -1) {
        hash.push(arr[i]);
      }
    }
    return hash;
  }
  $refs!: {
    formValidate: HTMLFormElement; //写法1 - 推荐
  };
  public handleSubmit(): void {
    this.$refs.formValidate.validate((valid: boolean) => {
      if (valid) {
        this.addBusinessKeyword();
      }
    });
  }
  public allChange(val: boolean) {
    if (val) {
      this.formInline.platform_account_ids = this.accountList.map(
        (item: objAny) => {
          return item.id;
        }
      );
    } else {
      this.formInline.platform_account_ids = [];
    }
  }
}
</script>

<style lang="less">
.opportunities-key-add {
  .acc-box-row {
    margin-top: 20px;
  }
  .select {
    padding-right: 10px;
  }
  .select-box {
    .clear {
      float: right;
      cursor: pointer;
    }
  }
  .acc-content {
    height: 200px;
    .ivu-checkbox-group-item {
      display: block;
      margin-top: 10px;
    }
  }
  .input-list {
    height: 125px;
    overflow-y: auto;
    li {
      list-style: none;
      padding: 0 20px;
      line-height: 26px;
    }
  }
}
</style>
