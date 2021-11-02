<template>
  <Upload
    multiple
    :type="type"
    :action="action"
    :headers="headers"
    name="file"
    :data="uploadData"
    :on-success="uploadSuccess"
    :before-upload="beforeUpload"
    :on-error="error"
    :default-file-list="defaultList"
  >
    <slot></slot>
    <!-- <div class="Upload-text">点击或者拖拽上传视频</div> -->
  </Upload>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { postHeaders } from "@/api/api-require";
import { objAny } from "@/common/common-interface";
@Component
export default class WyUpload extends Vue {
  @Prop({ default: "select" }) private type!: string;
  @Prop({ default: "/api/video/upload" }) private action!: string;
  @Prop({ default: 1 }) private uploadType!: number; // 1表示图片，2表示视频。
  @Prop({
    default: () => {
      return {};
    },
  })
  private data!: objAny;

  private headers: objAny = {};
  private uploadData: objAny = {};
  private defaultList: objAny[] = [];

  public uploadSuccess(response: objAny, file: objAny): void {
    if (response.code == 200) {
      this.defaultList = [file];
      this.$emit("success", response.payload);
    } else {
      this.$Notice.error({
        title: "提示",
        desc: response.message,
      });
      this.defaultList = [];
    }
  }
  public error(): void {
    this.$Notice.error({
      title: "提示",
      desc: "上传失败",
    });
    this.defaultList = [];
  }

  public beforeUpload(file: objAny): boolean {
    let arr: string[] = file.name.split(".");
    let name: string = arr[arr.length - 1].toLowerCase();
    let videoType: string[] =
      this.uploadType == 1 ? this.$config.imgType : this.$config.videoType;
    if (videoType.indexOf(name) != -1) {
      return true;
    } else {
      this.$Message.error(
        "请上传" + this.$config.videoType.join(",") + "格式文件"
      );
      return false;
    }
  }
  mounted(): void {
    this.uploadData = JSON.parse(JSON.stringify(this.data));
    this.uploadData.type = this.uploadType;
    this.headers = postHeaders({});
  }
}
</script>
<style lang="less"></style>
