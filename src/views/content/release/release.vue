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
                <li
                  class="platform-item"
                  v-for="(item, index) in accountsObj"
                  :key="index"
                >
                  <div class="platform-title">
                    <img
                      src="../../../assets/img/logo-1.jpg"
                      class="title-icon"
                      alt=""
                      v-if="index == 'douyin'"
                    />
                    <img
                      src="../../../assets/img/logo-2.jpg"
                      class="title-icon"
                      alt=""
                      v-else-if="index == 'kuaishou'"
                    />
                    <img
                      src="../../../assets/img/bilibili-logo.jpg"
                      class="title-icon"
                      alt=""
                      v-else-if="index == 'bilibili'"
                    />
                    <img
                      src="../../../assets/img/xigua-logo.jpg"
                      class="title-icon"
                      alt=""
                      v-else-if="index == 'xigua'"
                    />
                    {{ $config.videoSys[index] }}
                    <!-- {{ index == "douyin" ? "抖音" : "快手" }} -->
                  </div>
                  <div class="platform-info" v-if="item.length > 0">
                    <CheckboxGroup
                      v-for="(acc, i) in item"
                      :key="i"
                      v-model="formInline.platform_account_ids"
                      @on-change="platformChange"
                    >
                      <Checkbox :label="acc.id">{{ acc.nick_name }}</Checkbox>
                    </CheckboxGroup>
                  </div>
                  <div class="platform-info" v-else>
                    <div class="bind blue" @click="bingClick(index)">
                      立即绑定
                    </div>
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
            <FormItem label="视频封面" prop="cover_file_path" v-if="isKuaishou">
              <wy-upload
                :uploadType="1"
                type="select"
                @success="uploadImgSuccess"
              >
              </wy-upload>
            </FormItem>
            <FormItem>
              <Button>取消</Button>
              <Button
                style="margin-left: 8px"
                type="primary"
                @click="handleSubmit"
                :loading="loading"
                >确认</Button
              >
            </FormItem>
          </Form>
        </Col>
        <Col :span="12">
          <div class="phone-video v-center" v-show="full_file_path != ''">
            <video
              id="myVideo"
              class="video video-js vjs-big-play-centered"
              controls
              preload="none"
            ></video>
          </div>
          <div class="phone-video v-center" v-show="full_file_path == ''">
            <wy-no-data></wy-no-data>
          </div>
        </Col>
      </Row>
    </div>
  </wy-sys-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sysContent from "@/components/sys-content/sys-content.vue";
import { objAny } from "@/common/common-interface";
import { subPlatformVideo, platformAccounts } from "@/api/api-user";
import upload from "@/components/upload/upload.vue";
import noData from "@/components/no-data/no-data.vue";
// import { videoCss, videoJS } from "@/common/add-js";
@Component({
  components: {
    "wy-sys-content": sysContent,
    "wy-upload": upload,
    "wy-no-data": noData,
  },
})
export default class ContentRelease extends Vue {
  private formInline: objAny = {
    title: "",
    description: "",
    publish_method: "1",
    planed_publish_date: "",
    platform_account_ids: [],
    cover_file_path: "",
    video_file_path: "",
  };
  private full_file_path = "";
  private isKuaishou = false;
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
  private accountsObj: objAny = {
    douyin: [],
    kuaishou: [],
    xigua: [],
    bilibili: [],
  };
  private loading = false;
  private player: objAny = {};

  async platformAccounts(): Promise<void> {
    let ret = await platformAccounts({});
    if (ret.code == 200) {
      this.accountsObj = Object.assign(this.accountsObj, ret.payload);
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
    this.loading = true;
    let ret = await subPlatformVideo(this.formInline);
    if (ret.code == 200) {
      this.$Modal.success({
        title: "发布成功",
      });
      this.$router.push("/content/video");
    }
    this.loading = false;
  }
  public uploadSuccess(data: objAny): void {
    this.formInline.video_file_path = data.file_path;
    this.full_file_path = data.full_file_path;
    this.videoPay();
  }
  public videoPay(): void {
    this.$nextTick(() => {
      this.player.src(this.full_file_path);
      this.player.load(this.full_file_path);
      this.player.play();
      // console.log(player);
    });
  }
  public uploadImgSuccess(data: objAny): void {
    console.log(data);
    this.formInline.cover_file_path = data.file_path;
  }
  public platformChange(accIds: number[]): void {
    let isKuaishou = false;
    for (let i in this.accountsObj) {
      let list: objAny = this.accountsObj[i];
      list.map((item: objAny) => {
        if (accIds.indexOf(item.id) != -1 && i == "kuaishou") {
          isKuaishou = true;
        }
      });
    }
    this.isKuaishou = isKuaishou;
  }
  public bingClick(key: string): void {
    this.$router.push("/auto?key=" + key);
  }

  created(): void {
    // this.initVodeo();
  }
  mounted(): void {
    this.platformAccounts();
    this.$nextTick(() => {
      // let win: objAny = window;
      this.player = this.$video(document.getElementById("myVideo"), {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: true,
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        // fluid: true, // 自适应宽高
        loop: true, //是否循环播放
        //设置视频播放器的显示宽度（以像素为单位）
        // width: "800px",
        //设置视频播放器的显示高度（以像素为单位）
        // height: "400px",
        controlBar: {
          playToggle: true,
        },
      });
    });
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
        padding: 10px 10px;
        box-sizing: border-box;
        .bind {
          line-height: 80px;
          text-align: center;
          cursor: pointer;
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
  .phone-video {
    width: 300px;
    height: 533px;
    border-radius: 20px;
    margin-left: 100px;
    background-color: #333333;
    overflow: hidden;
    .video {
      width: 100%;
      height: 100%;
    }
    .no-data-components {
      width: 100%;
    }
  }
}
</style>
