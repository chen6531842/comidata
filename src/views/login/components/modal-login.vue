<template>
  <Modal
    class="login-modal-content"
    v-model="modalShow"
    :footer-hide="true"
    :width="348"
  >
    <!-- :title=" -->
    <div class="login-modal-title">
      <span v-if="loginType == 1">登录</span>
      <span v-else-if="loginType == 2">手机注册</span>
      <span v-else>忘记密码</span>
    </div>
    <div class="type-list" v-if="loginType != 3">
      <div class="login-type active">
        手机登录
        <span class="border"></span>
      </div>
    </div>

    <Form
      ref="formValidate"
      :model="form"
      :rules="ruleValidate"
      :label-width="0"
    >
      <template v-if="loginType == 1">
        <FormItem prop="mobile">
          <div class="login-form">
            <div class="login-icon"></div>
            <div class="login-box">
              <div class="login-flex">
                <Input v-model="form.mobile" placeholder="请输入用户名"></Input>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem prop="password">
          <div class="login-form">
            <div class="login-icon"></div>
            <div class="login-box">
              <div class="login-flex">
                <Input v-model="form.password" placeholder="请输入密码"></Input>
              </div>
            </div>
          </div>
        </FormItem>
      </template>
      <template v-else-if="loginType == 2">
        <FormItem prop="mobile">
          <div class="login-form">
            <div class="login-icon"></div>
            <div class="login-box">
              <div class="login-flex">
                <Input
                  v-model="form.mobile"
                  placeholder="请输入手机号码"
                ></Input>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem prop="password">
          <div class="login-form">
            <div class="login-icon"></div>
            <div class="login-box">
              <div class="login-flex">
                <Input v-model="form.password" placeholder="请输入密码"></Input>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem prop="password_confirmation">
          <div class="login-form">
            <div class="login-icon"></div>
            <div class="login-box">
              <div class="login-flex">
                <Input
                  v-model="form.password_confirmation"
                  placeholder="请输入确认密码"
                ></Input>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem prop="code">
          <div class="login-form">
            <div class="login-icon"></div>
            <div class="login-box">
              <div class="login-flex">
                <Input v-model="form.code" placeholder="验证码"></Input>
              </div>
              <div
                class="login-code"
                :class="isCode ? 'disable' : ''"
                @click="getCode"
              >
                {{ codeText }}
              </div>
            </div>
          </div>
        </FormItem>
      </template>
      <template v-else>
        <FormItem prop="mobile">
          <div class="login-form">
            <div class="login-icon"></div>
            <div class="login-box">
              <div class="login-flex">
                <Input v-model="form.mobile" placeholder="手机号码"></Input>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem prop="password">
          <div class="login-form">
            <div class="login-icon"></div>
            <div class="login-box">
              <div class="login-flex">
                <Input v-model="form.password" placeholder="新密码"></Input>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem prop="password_confirmation">
          <div class="login-form">
            <div class="login-icon"></div>
            <div class="login-box">
              <div class="login-flex">
                <Input
                  v-model="form.password_confirmation"
                  placeholder="密码确认"
                ></Input>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem prop="code">
          <div class="login-form">
            <div class="login-icon"></div>
            <div class="login-box">
              <div class="login-flex">
                <Input v-model="form.code" placeholder="验证码"></Input>
              </div>
              <div
                class="login-code"
                :class="isCode ? 'disable' : ''"
                @click="getCode"
              >
                {{ codeText }}
              </div>
            </div>
          </div>
        </FormItem>
      </template>
      <div class="login-tips" v-if="loginType == 1">
        登录即表明同意
        <a :href="$config.host + '/user-agreement.html'" target="_blank"
          >服务协议</a
        >
        和
        <a :href="$config.host + '/privacy-policy.html'" target="_blank"
          >隐私条款</a
        >
      </div>
      <div class="login-tips" v-else>
        <Checkbox v-model="single"></Checkbox>我已阅读并同意
        <a :href="$config.host + '/user-agreement.html'" target="_blank"
          >服务协议</a
        >
        和
        <a :href="$config.host + '/privacy-policy.html'" target="_blank"
          >隐私条款</a
        >
      </div>

      <div class="sub-btn">
        <Button
          v-if="loginType == 3"
          type="primary"
          size="large"
          long
          @click="handleSubmit"
          >重置</Button
        >
        <Button v-else type="primary" size="large" long @click="handleSubmit">{{
          loginType == 1 ? "登录" : "注册"
        }}</Button>
        <div class="sub-small">
          <div class="sub-small-flex">
            <div
              class="small-name"
              @click="loginType = 2"
              v-if="loginType == 1"
            >
              注册
            </div>
            <div class="small-name" @click="loginType = 1" v-else>登录</div>
          </div>
          <div class="sub-small-flex text-right">
            <div
              class="small-name"
              @click="loginType = 3"
              v-if="loginType == 1 || loginType == 2"
            >
              忘记密码
            </div>
            <div class="small-name" @click="loginType = 2" v-else>注册</div>
          </div>
        </div>
      </div>
    </Form>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny, fn, fnOne } from "@/common/common-interface";
import { State, Mutation } from "vuex-class";
import {
  getRegisterCode,
  submitRegister,
  submitLogin,
  getSendFindPwdCodeCode,
  resetPwd,
} from "@/api/api-user";
import regular from "@/common/regular";
@Component({
  components: {},
})
export default class LoginModal extends Vue {
  private modalShow = false;
  @State("sys") sys!: objAny;
  @Mutation("SET_ISLOGIN") SET_ISLOGIN!: fn;
  private single = true;
  private form: objAny = {
    mobile: "",
    code: "",
    pawCode: "",
    password: "",
    password_confirmation: "",
  };

  private ruleValidate: objAny = {
    mobile: [{ required: true, validator: regular.phone, trigger: "blur" }],
    code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    pawCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    password_confirmation: [
      { required: true, validator: this.validatePass, trigger: "blur" },
    ],
  };
  private codeText = "获取验证码";
  private isCode = false;
  private time = 60;
  private timer = 0;

  private title = "";
  private loginType = 1; // 1 登录  2 注册  3 忘记密码

  public validatePass(rule: objAny, value: string, callback: fnOne): void {
    if (value === "") {
      callback("请输入密码");
    } else if (value !== this.form.password) {
      callback("两次密码输入不一至，请重新输入！");
    } else {
      callback();
    }
  }
  public open(type: number): void {
    this.modalShow = true;
    this.loginType = type;
  }

  async getCode(): Promise<void> {
    if (!this.isCode) {
      let ret;
      if (this.loginType == 2) {
        ret = await getRegisterCode({
          mobile: this.form.mobile,
        });
      } else if (this.loginType == 3) {
        ret = await getSendFindPwdCodeCode({
          mobile: this.form.mobile,
        });
      }
      if (ret.code == 200) {
        this.isCode = true;
        this.time = 60;
        this.codeText = this.time + "s";
        this.getCodeTime();
      }
    }
  }
  public getCodeTime(): void {
    this.timer = setTimeout(() => {
      this.time--;
      if (this.time <= 0) {
        this.isCode = false;
        this.codeText = "再次获取";
      } else {
        this.codeText = this.time + "s";
        this.getCodeTime();
      }
    }, 1000);
  }
  public resetForm(): void {
    this.form.mobile = "";
    this.form.code = "";
    this.form.pawCode = "";
    this.form.password = "";
    this.form.password_confirmation = "";
  }

  $refs!: {
    formValidate: HTMLFormElement; //写法1 - 推荐
  };
  public handleSubmit(): void {
    this.$refs.formValidate.validate((valid: boolean) => {
      if (valid) {
        if (this.loginType == 1) {
          this.subLogin();
        } else if (this.loginType == 2) {
          // 注册
          if (!this.single) {
            this.$Message.error("请勾选服务协议 和 隐私条款");
          } else {
            this.subRegister();
          }
        } else {
          // 找回密码
          if (!this.single) {
            this.$Message.error("请勾选服务协议 和 隐私条款");
          } else {
            this.subResetPwd();
          }
        }
      }
    });
  }
  async subLogin(): Promise<void> {
    // this.SET_ISLOGIN(true);
    let ret = await submitLogin({
      mobile: this.form.mobile,
      password: this.form.password,
    });
    if (ret.code == 200) {
      this.$common.save("loginData", ret.payload);
      this.$router.push("/home");
    }
  }
  async subRegister(): Promise<void> {
    let ret = await submitRegister({
      mobile: this.form.mobile,
      password: this.form.password,
      password_confirmation: this.form.password_confirmation,
      code: this.form.code,
    });
    if (ret.code == 200) {
      this.$Message.success("注册成功,请登录");
      this.loginType = 1;
      this.resetForm();
    }
  }
  async subResetPwd(): Promise<void> {
    let ret = await resetPwd({
      mobile: this.form.mobile,
      password: this.form.password,
      password_confirmation: this.form.password_confirmation,
      code: this.form.code,
    });
    if (ret.code == 200) {
      this.$Message.success("重置成功,请登录");
      this.loginType = 1;
      this.resetForm();
    }
  }
}
</script>
<style lang="less">
.login-modal-content {
  .ivu-modal-body {
    padding: 40px;
  }
  .login-modal-title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  .type-list {
    .login-type {
      display: inline-block;
      margin-right: 40px;
      font-size: 16px;
      color: #333333;
      .border {
        height: 2px;
        margin-top: 4px;
        display: block;
      }
    }
    .login-type.active {
      color: rgb(47, 136, 255);
      .border {
        background: rgb(47, 136, 255);
      }
    }
  }
  .login-form {
    margin-top: 14px;
    .login-icon {
      color: #c1c1c1;
      font-size: 12px;
      line-height: 20px;
      height: 20px;
    }
    .login-box {
      display: flex;
      border-bottom: 1px solid #f3f6fa;
      .login-flex {
        flex: 1;
        .ivu-input {
          border: none;
          padding-left: 0;
        }
      }
    }
    .login-code {
      color: #2f88ff;
      font-size: 14px;
    }
  }
  .ivu-form-item {
    margin-bottom: 0;
  }
  .login-tips {
    margin-top: 30px;
    font-size: 12px;
    color: #999999;
    line-height: 17px;
    a {
      font-size: 12px;
      color: #333;
      text-decoration: none;
    }
  }
  .sub-btn {
    margin-top: 40px;

    .sub-small {
      display: flex;
      line-height: 24px;
      font-size: 12px;
      color: #c1c1c1;
      line-height: 20px;
      margin-top: 4px;
      .sub-small-flex {
        flex: 1;
        .small-name {
          display: inline-block;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
