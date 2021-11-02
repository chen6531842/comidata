<template>
  <wy-sys-content title="一键发布" class="page-release">
    <Alert type="warning" show-icon>
      注意事项
      <template slot="desc">
        视频账号如果未完成认证，将导致视频发布失败
      </template>
    </Alert>
    <div class="release-form-content">
      <Row>
        <Col :span="12">
          <Form
            ref="formValidate"
            :model="formInline"
            :rules="ruleValidate"
            :label-width="80"
          >
            <FormItem label="视频标题" prop="title">
              <Input
                v-model="formInline.title"
                placeholder="请填写视频标题"
              ></Input>
              <div class="form-tips blue">
                系统将自动检测是否包含抖音、快手平台的违禁词
              </div>
            </FormItem>
            <FormItem label="视频备注" prop="description">
              <Input
                v-model="formInline.description"
                placeholder="请填写视频备注"
              ></Input>
              <div class="form-tips">
                添加此次发布的备注信息，仅自己可见，不会发布到APP
              </div>
            </FormItem>
            <FormItem label="发布方式" prop="publish_method">
              <RadioGroup v-model="formInline.publish_method">
                <Radio label="1">立即发布</Radio>
                <Radio label="2">定时发布</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              label="发布时间"
              prop="planed_publish_date"
              v-if="formInline.publish_method == '2'"
            >
              <DatePicker
                type="date"
                placeholder="请选择发布时间"
                v-model="formInline.planed_publish_date"
              ></DatePicker>
            </FormItem>
            <FormItem label="发布平台" prop="platform_account_ids">
              <ul class="platform-ul">
                <li class="platform-item">
                  <div class="platform-title">
                    <img
                      src="../../../assets/img/logo-1.jpg"
                      class="title-icon"
                      alt=""
                    />
                    抖音
                  </div>
                  <div class="platform-info">
                    <div class="bind blue">立即绑定</div>
                  </div>
                </li>
                <li class="platform-item">
                  <div class="platform-title">
                    <img
                      src="../../../assets/img/logo-2.jpg"
                      class="title-icon"
                      alt=""
                    />
                    快手
                  </div>
                  <div class="platform-info">
                    <div class="bind blue">立即绑定</div>
                  </div>
                </li>
              </ul>
              <div class="form-tips">一次可以发布到多个平台</div>
            </FormItem>
            <FormItem label="上传视频" prop="video_file_path">
              <wy-upload :uploadType="2" type="drag" @success="uploadSuccess">
                <div class="Upload-text">点击或者拖拽上传视频</div>
              </wy-upload>
            </FormItem>
            <!-- <div class="other-config">
              <div class="other-config-name">以下配置仅针对快手</div>
            </div> -->
            <FormItem label="视频封面" prop="cover_file_path">
              <wy-upload
                :uploadType="1"
                type="select"
                @success="uploadImgSuccess"
              >
                <!-- <div
                  style="
                    width: 58px;
                    height: 58px;
                    line-height: 58px;
                    border: 1px dashed #dcdee2;
                    text-align: center;
                  "
                >
                  <Icon type="ios-camera" size="20"></Icon>
                </div> -->
              </wy-upload>
            </FormItem>
            <FormItem>
              <Button>取消</Button>
              <Button style="margin-left: 8px" type="primary">确认</Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="12"></Col>
      </Row>
    </div>
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "@/components/sys-content/sys-content.vue";
import { objAny } from "@/common/common-interface";
import { subPlatformVideo, getAllAccounts } from "@/api/api-user";
import upload from "@/components/upload/upload.vue";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-upload": upload,
  },
})
export default class ContentRelease extends Vue {
  private formInline: objAny = {
    title: "",
    description: "",
    publish_method: 1,
    planed_publish_date: "",
    platform_account_ids: [],
    cover_file_path: "",
    video_file_path: "",
  };
  private ruleValidate: objAny = {
    title: [{ required: true, message: "请输入标题", trigger: "blur" }],
    publish_method: [
      { required: true, message: "请选择发布方式", trigger: "change" },
    ],
    cover_file_path: [
      { required: true, message: "请上传封面图片", trigger: "change" },
    ],
    video_file_path: [
      { required: true, message: "请上传视频", trigger: "change" },
    ],
    planed_publish_date: [
      {
        required: true,
        type: "date",
        message: "请选择时间",
        trigger: "change",
      },
    ],
    platform_account_ids: [
      {
        required: true,
        type: "array",
        min: 1,
        message: "请选择发布平台",
        trigger: "change",
      },
    ],
  };
  private accountsList: objAny[] = [];

  async getAllAccounts(): Promise<void> {
    let ret = await getAllAccounts({});
    if (ret.code == 200) {
      this.accountsList = ret.payload;
    }
  }
  $refs!: {
    formValidate: HTMLFormElement; //写法1 - 推荐
  };
  public handleSubmit(): void {
    this.$refs.formValidate.validate((valid: boolean) => {
      if (valid) {
        this.subPlatformVideo();
      }
    });
  }
  async subPlatformVideo(): Promise<void> {
    let ret = await subPlatformVideo(this.formInline);
    if (ret.code == 200) {
      this.$Modal.success({
        title: "发布成功",
      });
    }
  }
  public uploadSuccess(data: objAny): void {
    this.formInline.video_file_path = data.file_path;
  }
  public uploadImgSuccess(data: objAny): void {
    this.formInline.cover_file_path = data.file_path;
  }

  mounted(): void {
    this.getAllAccounts();
  }
}
</script>
<style lang="less">
.page-release {
  .release-form-content {
    width: 100%;
    max-width: 1200px;
    margin: auto;
  }
  .platform-ul {
    display: flex;
    flex-wrap: wrap;
    .platform-item {
      margin-right: 2%;
      background-color: #f5f5f5;
      list-style: none;
      margin-bottom: 10px;
      width: 48%;
      .platform-title {
        padding: 5px;
        border-bottom: 2px solid #fff;
        line-height: 20px;
        font-size: 14px;
        color: #333;

        .title-icon {
          width: 18px;
          height: 18px;
          vertical-align: top;
        }
      }
      .platform-info {
        height: 100px;
        .bind {
          line-height: 100px;
          text-align: center;
        }
      }
    }
  }
  .other-config {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #f90;
    .other-config-name {
      display: inline-block;
      position: relative;
    }
  }
}
</style>
