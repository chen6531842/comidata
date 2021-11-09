<template>
  <div class="page-login" @scroll="pageScroll">
    <div class="login-header" :class="headerBg ? 'bg' : ''">
      <div class="login-header-flex">
        <div class="header-logo">
          <img src="../../assets/img/comidata_logo.png" alt="" />
        </div>
        <div class="header-tab">
          <div class="header-tab-item active">首页</div>
          <div class="header-tab-item">帮助中心</div>
        </div>
      </div>
      <!-- <div class="login-header-right"> -->
      <div class="v-center language">
        <Dropdown @on-click="languageClick">
          <a href="javascript:void(0)">
            {{ languageName }}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="(item, index) in $config.languageList"
              :key="index"
              :name="item.value"
              >{{ item.name }}</DropdownItem
            >
          </DropdownMenu>
        </Dropdown>
      </div>
      <!-- </div> -->
    </div>
    <wy-video></wy-video>

    <div class="login-content-box">
      <div class="login-content-box-1">
        <div class="login-content">
          <h1 class="title">COMIDATA 全网领先的视频管理系统</h1>
          <h5 class="small-title">一体化账号管理 全方位数据服务</h5>
          <div class="btn-box">
            <Button size="large" type="primary" @click="openLogin">登录</Button>
            <Button size="large" @click="openRegister">注册</Button>
          </div>
        </div>
      </div>
      <wy-login-content-box-2></wy-login-content-box-2>
      <div class="login-footer">
        <a href="https://beian.miit.gov.cn/" target="_blank">
          ©2021 COMDATA 粤ICP备2021126334号 版权所有 震撼者科技深圳有限公司</a
        >
      </div>
    </div>
    <wy-modal-Login ref="modalLogin"></wy-modal-Login>
  </div>
</template>
<script lang="ts">
import modalLogin from "./components/modal-login.vue";
import loginContentBox from "./components/login-content-box-2.vue";
import videoBox from "./components/video.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { fnOneBoolean, objAny } from "../../common/common-interface";
import { Mutation, State } from "vuex-class";
import common from "@/common/common";
@Component({
  components: {
    "wy-modal-Login": modalLogin,
    "wy-login-content-box-2": loginContentBox,
    "wy-video": videoBox,
  },
})
export default class Login extends Vue {
  @State("sys") sys!: objAny;
  @Mutation("SET_ISLOGIN") SET_ISLOGIN!: fnOneBoolean;
  private winHeight = 0;
  private headerBg = false;
  private languageName = "";
  $refs!: {
    modalLogin: HTMLFormElement; //写法1 - 推荐
  };
  @Watch("sys.winOnresize")
  getVisible(): void {
    this.winHeight = common.getClientHeight();
    console.log(this.winHeight);
  }

  public openLogin(): void {
    this.$refs.modalLogin.open(1);
  }
  public openRegister(): void {
    this.$refs.modalLogin.open(2);
  }
  public pageScroll(e: objAny): void {
    let scrollTop = e.target.scrollTop;
    if (scrollTop > this.winHeight - 60) {
      this.headerBg = true;
    } else {
      this.headerBg = false;
    }
  }
  public languageClick(value: string): void {
    this.getLanguageName(value);
  }
  public getLanguageName(key: string): void {
    this.$config.languageKey = key;
    this.languageName = this.$config.languageList.filter(
      (item: objAny) => item.value == key
    )[0].name;
  }
  mounted(): void {
    this.SET_ISLOGIN(false);
    this.$nextTick(() => {
      this.winHeight = common.getClientHeight();
    });
    this.getLanguageName(this.$config.languageKey);
  }
}
</script>
<style lang="less">
.page-login {
  height: 100%;
  overflow-y: auto;
  // background-image: url("../../assets/img/bg.jpg");
  // background-size: 100% 100%;
  position: relative;
  .login-header {
    position: fixed;
    height: 64px;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 6;
    padding: 0 50px;
    box-sizing: border-box;
    transition: 0.8s all;
    display: flex;
    .login-header-flex {
      flex: 1;
    }
    .language a {
      color: #fff;
      font-size: 14px;
    }
    .header-logo {
      display: inline-block;
      width: 106px;

      vertical-align: top;
      img {
        height: 64px;
      }
    }
    .header-tab {
      display: inline-block;
      vertical-align: top;
      margin-left: 30px;
      line-height: 64px;
      width: 300px;
      .header-tab-item {
        padding: 0 20px;
        font-size: 14px;
        color: #fff;
        margin-right: 20px;
        display: inline-block;
        position: relative;
        cursor: pointer;
      }
      .header-tab-item.active::before {
        content: "";
        width: 30px;
        height: 3px;
        background-color: #fff;
        position: absolute;
        bottom: 10px;
        left: 50%;
        margin-left: -15px;
      }
    }
  }
  .login-header.bg {
    background-color: #000;
  }
  .login-video {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    .video {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      object-fit: fill;
    }
  }
  .login-content-box {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 5;
    // overflow: auto;
    .login-content-box-1 {
      width: 100%;
      height: 100%;
    }
    .login-content-box-2 {
      position: relative;
      background-color: #fff;
      padding-bottom: 50px;
    }
  }
  .login-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    padding: 50px 0;
    .title {
      font-size: 57px;
      font-weight: 600;
      line-height: 90px;
      margin-bottom: 12px;
      text-align: center;
    }
    .small-title {
      letter-spacing: 20px;
      font-size: 16px;
      line-height: 24px;

      text-align: center;
      font-weight: normal;

      margin-top: 10px;
    }
    .btn-box {
      text-align: center;
      margin-top: 30px;
      .ivu-btn {
        width: 140px;
        border-radius: 20px;
        margin-right: 20px;
      }
      .ivu-btn:last-child {
        margin-right: 0;
        background: transparent;
        color: #fff;
      }
    }
  }
  .login-form-show {
    animation: loginTop 0.3s forwards;
  }
  .login-form-hide {
    animation: loginBottom 0.3s forwards;
  }
  .login-footer {
    background-color: #000;
    font-size: 14px;
    height: 64px;
    text-align: center;
    color: rgba(255, 255, 255, 0.55);
    padding: 22px 0;
    a {
      color: rgba(255, 255, 255, 0.55);
    }
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
video::-webkit-media-controls-fullscreen-button {
  display: none;
}
//播放按钮
video::-webkit-media-controls-play-button {
  display: none;
}
//进度条
video::-webkit-media-controls-timeline {
  display: none;
}
//观看的当前时间
video::-webkit-media-controls-current-time-display {
  display: none;
}
//剩余时间
video::-webkit-media-controls-time-remaining-display {
  display: none;
}
//音量按钮
video::-webkit-media-controls-mute-button {
  display: none;
}
video::-webkit-media-controls-toggle-closed-captions-button {
  display: none;
}
//音量的控制条
video::-webkit-media-controls-volume-slider {
  display: none;
}
//所有控件
video::-webkit-media-controls-enclosure {
  display: none;
}
//所有控件
video::-webkit-media-controls-controls {
  display: none;
}
</style>
