<template>
  <Modal
    v-model="modalShow"
    class="sendMessage"
    :title="title"
    :footer-hide="true"
    :width="500"
  >
    <Form
      ref="formValidate"
      :label-width="100"
      :model="formInline"
      :rules="rule"
    >
      <FormItem prop="content" label="发送内容">
        <Input
          type="textarea"
          v-model="formInline.content"
          placeholder="请输入发送内容"
          maxlength="200"
          show-word-limit
          :rows="4"
        />
      </FormItem>
      <FormItem style="margin-top: 20px" class="text-right">
        <Button type="primary" @click="subData">提交</Button>
        <Button
          style="margin-left: 8px"
          :loading="loading"
          @click="modalShow = false"
          >取消</Button
        >
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../../../common/common-interface";
import { sendCommentMessage } from "@/api/api-user";
@Component({
  components: {},
})
export default class PageOpportunitiesKeyAdd extends Vue {
  private modalShow = false;
  private formInline: objAny = {
    content: "",
    id: "",
  };
  private loading = false;
  private rule: objAny = {
    content: [{ required: true, message: "请输入发送内容", trigger: "blur" }],
  };

  private title = "发私信";
  public open(item: objAny): void {
    this.formInline.id = item.id;
    this.formInline.content = "";
    this.modalShow = true;
  }
  $refs!: {
    formValidate: HTMLFormElement; //写法1 - 推荐
  };
  public handleSubmit(): void {
    this.$refs.formValidate.validate((valid: boolean) => {
      if (valid) {
        this.subData();
      }
    });
  }
  async subData(): Promise<void> {
    this.loading = true;
    let ret = await sendCommentMessage(this.formInline);
    if (ret.code == 200) {
      this.$Message.success("发送成功");
      this.$emit("success");
    }
    this.loading = false;
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
}
</style>
