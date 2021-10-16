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
            ref="formInline"
            :model="formInline"
            :rules="rule"
            :label-width="80"
          >
            <FormItem label="视频标题" prop="name">
              <Input
                v-model="formInline.name"
                placeholder="请填写视频标题"
              ></Input>
              <div class="form-tips blue">
                系统将自动检测是否包含抖音、快手平台的违禁词
              </div>
            </FormItem>
            <FormItem label="视频备注" prop="name">
              <Input
                v-model="formInline.name"
                placeholder="请填写视频备注"
              ></Input>
              <div class="form-tips">
                添加此次发布的备注信息，仅自己可见，不会发布到APP
              </div>
            </FormItem>
            <FormItem label="发布方式" prop="gender">
              <RadioGroup v-model="formInline.sataus">
                <Radio label="1">立即发布</Radio>
                <Radio label="2">定时发布</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              label="发布时间"
              prop="gender"
              v-if="formInline.sataus == '2'"
            >
              <DatePicker
                type="date"
                placeholder="请选择发布时间"
                v-model="formInline.date"
              ></DatePicker>
            </FormItem>
            <FormItem label="发布平台" prop="gender">
              <ul class="platform-ul">
                <li class="platform-item">
                  <div class="platform-title">
                    <img
                      src="../../../assets/img/msg.png"
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
                      src="../../../assets/img/msg.png"
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
            <FormItem label="发布方式" prop="gender">
              <Upload
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
              >
                <div class="Upload-text">点击或者拖拽上传视频</div>
              </Upload>
            </FormItem>
            <div class="other-config">
              <div class="other-config-name">以下配置仅针对快手</div>
            </div>
            <FormItem label="视频封面" prop="gender">
              <Upload
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block; width: 58px"
              >
                <div style="width: 58px; height: 58px; line-height: 58px">
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
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
import sysContent from "../../../components/sys-content/sys-content.vue";
import { objAny } from "../../../common/common-interface";
@Component({
  components: {
    "wy-sys-content": sysContent,
  },
})
export default class ContentRelease extends Vue {
  private formInline: objAny = {
    sataus: "",
    checkbox: false,
    startTime: "",
    endTime: "",
    date: "",
  };
  private ruleValidate: objAny = {
    name: [
      { required: true, message: "The name cannot be empty", trigger: "blur" },
    ],
  };
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
