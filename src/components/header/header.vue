<template>
  <div class="header-content">
    <div class="header-content-flex">
      <div class="logo"></div>
      <div class="title">全网营销运营辅助平台</div>
    </div>
    <div class="header-right">
      <div class="right-icon v-center">
        <img class="img" src="../../assets/img/doubt.png" alt="" />
      </div>
      <div class="right-icon v-center">
        <img class="img" src="../../assets/img/msg.png" alt="" />
      </div>
      <Poptip placement="bottom" width="200">
        <div class="user-info">
          <div class="user-img v-center">
            <img class="img" src="../../assets/img/user.png" alt="" />
          </div>

          <div class="user-flex">
            <div class="name">123</div>
            <div class="id">ID: 54555</div>
          </div>
          <div class="v-center">
            <Icon type="md-arrow-dropdown" />
          </div>
        </div>
        <div class="api" slot="content">
          <ul class="poptip-ul">
            <li class="poptip-li" @click="out">退出登录</li>
          </ul>
        </div>
      </Poptip>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { objAny } from "../../common/common-interface";
@Component
export default class Header extends Vue {
  public out(): void {
    this.$Modal.confirm({
      title: "提示",
      content: "<p>确定要退出登录吗？</p>",
      onOk: () => {
        this.$router.push("/login");
        setTimeout(() => {
          window.location.reload();
        });
      },
    });
  }
}
</script>
<style lang="less">
.header-content {
  display: flex;
  .header-content-flex {
    flex: 1;
    .logo {
      display: inline-block;
      vertical-align: top;
      height: 64px;
      width: 120px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      display: inline-block;
      vertical-align: top;
      height: 32px;
      line-height: 32px;
      margin-top: 14px;
      color: #fff;
      font-size: 20px;
      border-left: 1px solid #999;
      margin-left: 10px;
      padding-left: 20px;
    }
  }
  .header-right {
    margin: 16px 0;
    line-height: 32px;
    height: 32px;
    display: flex;
    color: #999;
    .img {
      width: 26px;
      height: 26px;
      vertical-align: top;
    }
    .right-icon {
      padding: 0px 10px;
      cursor: pointer;
    }
    .user-info {
      display: flex;
      padding: 0 20px;
      cursor: pointer;
      .user-img {
        width: 32px;
        height: 32px;
        background-color: #fff;
        border-radius: 50%;
        text-align: center;
        padding: 0 4px;
        img {
          width: 22px;
          height: 22px;
        }
      }
      .user-flex {
        font-size: 14px;
        line-height: 16px;
        padding-left: 10px;
        margin-right: 10px;
      }
    }
  }
  .v-center {
    align-items: center;
    justify-items: center;
    display: flex;
  }
  .poptip-ul {
    text-align: center;
    color: #333;
    font-size: 15px;
    line-height: 30px;
    .poptip-li {
      cursor: pointer;
      border-top: 1px solid #e5e5e5;
    }
    .poptip-li:first-child {
      border: none;
    }
  }
}
</style>
