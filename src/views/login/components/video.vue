<template>
  <!-- autoplay -->
  <div class="login-video">
    <!-- <img
      style="width: 100%; height: 100%"
      src="../../../assets/login/4.jpg"
      alt=""
    /> -->
    <video
      ref="voideData"
      id="videoData"
      muted
      width="100%"
      height="100%"
      controls
      class="video video-js vjs-big-play-centered"
    >
      <source src="../../../assets/video/5.mp4" type="video/mp4" />
      <!-- poster="../../../assets/video/back.png" -->
    </video>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { objAny } from "@/common/common-interface";
@Component({
  components: {},
})
export default class LoginVideo extends Vue {
  private type = 0;
  private player: objAny = {};
  private videoSrcArr: string[] = [
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/jiheh7nulwbfphj/account_center/1.mp4",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/jiheh7nulwbfphj/account_center/2-1.mp4",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/jiheh7nulwbfphj/account_center/3-1.mp4",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/jiheh7nulwbfphj/account_center/4.mp4",
  ];
  mounted(): void {
    this.$nextTick(() => {
      // let win: objAny = window;
      this.player = this.$video(document.getElementById("videoData"), {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: false,
        //自动播放属性,muted:静音播放
        autoplay: true,
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        fluid: true, // 自适应宽高
        loop: true, //是否循环播放
        //设置视频播放器的显示宽度（以像素为单位）
        // width: "800px",
        //设置视频播放器的显示高度（以像素为单位）
        // height: "400px",
        controlBar: {
          playToggle: true,
        },
      });
      // this.player.on("ended", () => {
      //   this.player.play();
      // });
    });
  }
}
</script>
<style lang="less">
#videoData .vjs-big-play-button {
  display: none;
}
</style>
