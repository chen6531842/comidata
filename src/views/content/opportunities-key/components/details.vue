<template>
  <Modal
    v-model="modalShow"
    class="opportunities-key-add"
    :title="title"
    :footer-hide="true"
    :width="500"
  >
    <Form ref="formValidate" :label-width="0">
      <wy-block-content :isTitle="false">
        <FormItem prop="industry_category_tags">
          <div class="form-label">行业类别</div>
          <div class="tags-list" v-if="itemData.industry_category_names">
            <span
              style="margin-left: 20px"
              v-for="(item, index) in itemData.industry_category_names"
              :key="index"
              >{{ item.name }}</span
            >
          </div>
        </FormItem>
        <FormItem prop="name">
          <div class="form-label">关键词</div>

          <wy-block-content :disable="true" :border="true">
            <div slot="block-title">
              <Input
                suffix="ios-search"
                v-model="searchValue"
                placeholder="搜索已添加项"
              />
            </div>
            <ul class="input-list">
              <template v-for="(item, index) in formInline.name">
                <li
                  :key="index"
                  v-show="searchValue == '' || item.indexOf(searchValue) != -1"
                >
                  {{ item }}
                </li>
              </template>
            </ul>
          </wy-block-content>
        </FormItem>
      </wy-block-content>
      <wy-block-content title="关联平台账户">
        <div class="acc-content" v-if="itemData.platform_account_nick_names">
          <template
            v-for="(item, index) in itemData.platform_account_nick_names"
          >
            <div
              style="line-height: 21px; margin-bottom: 10px"
              v-for="(child, i) in item"
              :key="index + '-' + i"
            >
              {{ index == "douyin" ? "抖音" : "快手" }}:
              {{ child.name }}
            </div>
          </template>
        </div>
      </wy-block-content>
    </Form>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../../../common/common-interface";
import blockContent from "@/components/block-content/block-content.vue";
import noData from "@/components/no-data/no-data.vue";

@Component({
  components: {
    "wy-block-content": blockContent,
    "wy-no-data": noData,
  },
})
export default class PageOpportunitiesKeyAdd extends Vue {
  private modalShow = false;
  private itemData: objAny = {};
  private searchValue = "";
  private formInline: objAny = {
    inputName: "",
    name: [],
    industry_category_tags: [],
    platform_account_ids: [],
    desc: "",
  };

  private title = "详情";
  public open(item: objAny): void {
    this.modalShow = true;
    this.itemData = item;
    this.formInline.name = item.name.split(",");
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
