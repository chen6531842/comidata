<template>
  <div class="page-login">
    <div class="login-content">
      <h1 class="title">COMIDATA 全网营销辅助平台</h1>
      <h5 class="small-title">一体化账号管理 全方位数据服务</h5>
      <div class="btn-box" v-if="!formShow">
        <Button type="primary" @click="loginShow">登录</Button>
        <Button @click="isRegisterShow">注册</Button>
      </div>
      <div
        class="login-form-box"
        :class="formShow ? 'login-form-show' : 'login-form-hide'"
        v-show="formShow"
      >
        <Form
          ref="formValidate"
          :model="form"
          :rules="ruleValidate"
          :label-width="0"
        >
          <FormItem prop="user_name">
            <div class="login-form">
              <div class="login-icon">
                <Icon type="md-person" />
              </div>
              <div class="login-flex">
                <Input
                  v-model="form.user_name"
                  placeholder="请输入用户名"
                ></Input>
                <!-- <input type="text" v-model="form.user_name" /> -->
              </div>
            </div>
          </FormItem>
          <FormItem prop="password">
            <div class="login-form">
              <div class="login-icon">
                <Icon type="ios-key" />
              </div>
              <div class="login-flex">
                <Input
                  :type="passwordShow ? 'text' : 'password'"
                  v-model="form.password"
                  placeholder="请输入密码"
                ></Input>
              </div>
              <div
                class="login-icon pass"
                @click="passwordShow = !passwordShow"
              >
                <Icon type="ios-eye" v-if="!passwordShow" />
                <Icon type="ios-eye-off" v-else />
              </div>
            </div>
          </FormItem>
          <FormItem prop="code" v-if="isRegister">
            <div class="login-form">
              <div class="login-icon">
                <Icon type="ios-mail" />
              </div>
              <div class="login-flex">
                <input type="text" v-model="form.code" />
              </div>
              <div
                class="login-code"
                :class="isCode ? 'disable' : ''"
                @click="getCode"
              >
                {{ codeText }}
              </div>
            </div>
          </FormItem>
          <div class="sub-btn">
            <Button type="primary" size="large" long @click="handleSubmit"
              >登录</Button
            >
            <div class="sub-small">
              <div class="sub-small-flex">
                <div
                  class="small-name"
                  @click="isRegisterShow"
                  v-if="!isRegister"
                >
                  注册
                </div>
                <div class="small-name" @click="loginShow" v-else>登录</div>
              </div>
              <div class="sub-small-flex text-right">
                <div class="small-name" @click="formShow = false">取消</div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny } from "../../common/common-interface";
@Component
export default class Login extends Vue {
  private form: objAny = {
    user_name: "",
    password: "",
  };
  private ruleValidate: objAny = {
    user_name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  };
  private passwordShow = false;
  private formShow = false;
  private isRegister = false;
  private codeText = "获取验证码";
  private isCode = false;
  private time = 60;
  private timer = 0;

  public loginShow(): void {
    this.formShow = true;
    this.isRegister = false;
  }
  public isRegisterShow(): void {
    this.formShow = true;
    this.isRegister = true;
  }
  public getCode(): void {
    if (!this.isCode) {
      this.isCode = true;
      this.time = 5;
      this.codeText = this.time + "s";
      this.getCodeTime();
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
  public handleSubmit(): void {
    let formValidate: objAny = this.$refs.formValidate;
    formValidate.validate((valid: boolean) => {
      if (valid) {
        this.subData();
      }
    });
  }
  public subData(): void {
    this.$router.push("/home");
  }
}
</script>
<style lang="less">
.page-login {
  height: 100%;
  background-image: url("../../assets/img/bg.jpg");
  background-size: 100% 100%;
  position: relative;

  .login-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    padding: 50px 0;
    .title {
      line-height: 80px;
      font-size: 46px;
    }
    .small-title {
      font-size: 16px;
      text-align: center;
      font-weight: normal;
      letter-spacing: 15px;
      margin-top: 10px;
    }
    .btn-box {
      text-align: center;
      margin-top: 30px;
      .ivu-btn {
        width: 100px;
        border-radius: 20px;
        margin-right: 20px;
      }
      .ivu-btn:last-child {
        margin-right: 0;
        background: transparent;
        color: #fff;
      }
    }
    .login-form-box {
      margin: auto;
      margin-top: 30px;
      width: 300px;
      .login-form {
        display: flex;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        border-radius: 10px;
        color: #999;
        margin-bottom: 5px;
        .login-icon {
          width: 50px;
          text-align: center;
          font-size: 20px;
        }
        .login-icon.pass {
          cursor: pointer;
        }
        .login-flex {
          flex: 1;
          input {
            width: 100%;
            height: 40px;
            border: none;
            background: transparent;
          }
        }
        .login-code {
          width: 100px;
          text-align: center;
          background-color: #2d8cf0;
          color: #fff;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          font-size: 14px;
          cursor: pointer;
        }
        .login-code.disable {
          background-color: #ccc;
        }
      }
      .sub-small {
        margin-top: 10px;
        color: #999;
        line-height: 20px;
        display: flex;
        .text-right {
          text-align: right;
        }
        .sub-small-flex {
          flex: 1;
          .small-name {
            cursor: pointer;
          }
        }
      }
    }
  }
  .login-form-show {
    animation: loginTop 0.3s forwards;
  }
  .login-form-hide {
    animation: loginBottom 0.3s forwards;
  }
}

@keyframes loginTop {
  from {
    transform: translateY(200px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes loginBottom {
  from {
    transform: translateY(0px);
    opacity: 1;
  }
  to {
    transform: translateY(200px);
    opacity: 0;
  }
}
</style>
