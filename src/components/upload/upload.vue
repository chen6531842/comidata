<template>
  <div class="upload-box">
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
      :accept="accept"
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
    </Upload>
    <template v-if="type != 'select'">
      <Progress v-if="percentShow" :percent="percent"></Progress>
      <a target="_blank" :href="$config.imgShow + videoUrl" class="blue">{{
        videoName
      }}</a>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { objAny } from "@/common/common-interface";
import { State } from "vuex-class";
import {
  shardUploadFile,
  startUpload,
  multipartComplete,
} from "@/api/api-user";
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

  private shardSize: number = 2 * 1024 * 1024; //以2MB为一个分片
  // let shardSize:number = 50 * 1024;    //以50KB为一个分片

  private headers: objAny = {};
  private uploadData: objAny = {};
  private defaultList: objAny[] = [];
  private uploadList: objAny[] = [];
  private format: string[] = [];
  private percent = 0;
  private percentShow = false;
  private shardTotal = 0; // 文件总片数
  private shardIndex = 0; // 当前片数
  private videoUrl = "";
  private videoName = "";
  private accept = "";

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
      // return true;
      if (this.uploadType == 2) {
        this.uploadFile(file, name);
        return false;
      } else {
        return true;
      }
    } else {
      this.$Message.error(
        "请上传" + this.$config.videoType.join(",") + "格式文件"
      );
      return false;
    }
  }

  async uploadFile(file: objAny, suffix: string): Promise<void> {
    let ret = await startUpload({});
    if (ret.code == 200) {
      let upload_token = ret.payload.upload_token;
      let shardSize = this.shardSize;
      let shardIndex = 0; //分片索引，1表示第1个分片
      let size = file.size;
      let shardTotal = Math.ceil(size / shardSize); //总片数
      this.shardTotal = shardTotal;
      this.shardIndex = shardIndex;
      let param = {
        shardIndex: shardIndex, // 分片的 index
        shardSize: shardSize, // 分片的 大小
        shardTotal: shardTotal, // 总片数
        size: size, // 总文件大小
        fileName: file.name, // 文件名
        suffix: suffix, // 后缀名
        upload_token: upload_token,
      };
      this.upgradeFiles(param, file);
      this.videoName = file.name;
    }
  }
  // // 文件分片
  // async recursionUpload(param: objAny, file: objAny): Promise<void> {
  //   let shardIndex = param.shardIndex;
  //   let shardTotal = param.shardTotal;
  //   let shardSize = param.shardSize;

  //   let fileShard: objAny = this.getFileShard(shardIndex, shardSize, file); // 当前要传的分片

  //   let paramData: objAny = {
  //     fragment_id: shardIndex - 1,
  //     upload_token: param.upload_token,
  //     file: fileShard,
  //   };
  //   let ret = await shardUploadFile(paramData);
  //   if (ret.code == 200) {
  //     if (shardIndex < shardTotal) {
  //       console.log("下一份片开始。。。。。。");
  //       param.shardIndex = param.shardIndex + 1;
  //       this.recursionUpload(param, file);
  //     } else {
  //       let retUpload = await multipartComplete({
  //         upload_token: param.upload_token,
  //       });
  //       if (retUpload.code == 200) {
  //         this.$Message.success("上传成功");
  //         this.$emit("success", retUpload.payload);
  //       }
  //     }
  //   }
  // }

  // public getFileShard(
  //   shardIndex: number,
  //   shardSize: number,
  //   file: objAny
  // ): objAny {
  //   let start = (shardIndex - 1) * shardSize;
  //   let end = Math.min(file.size, start + shardSize);
  //   let fileShard = file.slice(start, end);
  //   console.log(start);
  //   console.log(end);
  //   console.log(fileShard);
  //   return fileShard;
  // }

  //文件二进制分片
  async upgradeFiles(param: objAny, file: objAny): Promise<void> {
    let shardIndex = param.shardIndex;
    let shardTotal = param.shardTotal;
    let shardSize = param.shardSize;

    let fileReader: objAny = new FileReader();
    let blobSlice = File.prototype.slice;
    // File.prototype.slice ||
    // File.prototype.mozSlice ||
    // File.prototype.webkitSlice;
    let start = shardIndex * shardSize;
    let end = start + shardSize >= file.size ? file.size : start + shardSize;
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));

    fileReader.onload = async (e: objAny) => {
      let content = e.target.result;
      let un8 = new Uint8Array(content);
      let paramData: objAny = {
        fragment_id: shardIndex,
        upload_token: param.upload_token,
        file: new Blob([un8]),
      };
      let ret = await shardUploadFile(paramData, {
        onUploadProgress: this.onUploadProgress,
      });
      if (ret.code == 200) {
        if (shardIndex < shardTotal - 1) {
          // console.log("下一份片开始。。。。。。");
          param.shardIndex = param.shardIndex + 1;
          this.shardIndex = param.shardIndex;
          this.upgradeFiles(param, file);
        } else {
          let retUpload = await multipartComplete({
            upload_token: param.upload_token,
          });
          if (retUpload.code == 200) {
            // this.$Message.success("上传成功");
            this.$emit("success", retUpload.payload);
            this.videoUrl = retUpload.payload.file_path;
          }
        }
      }
    };
  }
  public onUploadProgress(progressEvent: objAny): void {
    if (progressEvent.lengthComputable) {
      let total = this.shardTotal * 100;
      let t = this.shardIndex * 100; // 已上传的
      var complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0; // 当前上传的
      let percent: number = ((t + complete) / total) * 100;

      this.percent = parseInt(percent.toFixed(0));
      this.percentShow = true;
      if (this.percent >= 100) {
        this.percentShow = false;
        this.percent = 0; // 重新置0
      }
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
    let accept = this.format.map((item: string) => {
      return this.uploadType == 1 ? "image/" + item : "video/" + item;
    });
    this.accept = accept.join(",");
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
