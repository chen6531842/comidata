<template>
  <Upload
    ref="upload"
    :type="type"
    :action="action"
    :headers="headers"
    name="file"
    :data="uploadData"
    :on-success="uploadSuccess"
    :before-upload="beforeUpload"
    :on-error="error"
    :default-file-list="defaultList"
    :show-upload-list="type == 'drag'"
  >
    <slot></slot>

    <template v-if="type == 'select'">
      <div class="img-box" v-for="(item, index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
          <img :src="item.url" />
        </template>
        <template v-else>
          <Progress
            v-if="item.showProgress"
            :percent="item.percentage"
            hide-info
          ></Progress>
        </template>
      </div>
      <div class="img-box">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </template>

    <!--:format="format" <div class="Upload-text">点击或者拖拽上传视频</div> -->
  </Upload>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { objAny } from "@/common/common-interface";
import { State } from "vuex-class";
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
  @State("sys") sys!: objAny;
  private headers: objAny = {};
  private uploadData: objAny = {};
  private defaultList: objAny[] = [];
  private uploadList: objAny[] = [];
  private format: string[] = [];

  public uploadSuccess(response: objAny, file: objAny): void {
    if (response.code == 200) {
      this.defaultList = [file];
      if (this.uploadList.length > 1) {
        this.uploadList.splice(0, 1);
      }
      // console.log(this.uploadList);
      file.url = this.$config.imgShow + response.payload.file_path;
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

  $refs!: {
    upload: HTMLFormElement; //写法1 - 推荐
  };
  mounted(): void {
    this.uploadData = JSON.parse(JSON.stringify(this.data));
    this.uploadData.type = this.uploadType;
    this.format =
      this.uploadType == 1 ? this.$config.imgType : this.$config.videoType;
    this.headers.Authorization = this.sys.loginData.token;

    this.uploadList = this.$refs.upload.fileList;
  }
}
</script>
<style lang="less">
.img-box {
  width: 58px;
  height: 58px;
  line-height: 58px;
  border: 1px dashed #dcdee2;
  text-align: center;
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
