<template>
  <!-- autoplay -->
  <div class="login-video">
    <img
      style="width: 100%; height: 100%"
      src="../../../assets/login/4.jpg"
      alt=""
    />
    <!-- <video
      ref="voideData"
      muted
      width="100%"
      height="100%"
      controls
      class="video"
    >
      <source
        :src="videoSrc"
        type="video/mp4"
        poster="../../../assets/video/back.png"
      />
    </video> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// import { objAny } from "@/common/common-interface";
@Component({
  components: {},
})
export default class LoginVideo extends Vue {
  // @Prop({ default: "1" }) private type!: string;
  private type = 0;

  private videoSrc = "";
  private videoSrcArr: string[] = [
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/jiheh7nulwbfphj/account_center/1.mp4",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/jiheh7nulwbfphj/account_center/2-1.mp4",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/jiheh7nulwbfphj/account_center/3-1.mp4",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/jiheh7nulwbfphj/account_center/4.mp4",
  ];

  $refs!: {
    voideData: HTMLFormElement; //写法1 - 推荐
  };
  public init(): void {
    // this.$refs.voideData.addEventListener("play", function () {
    //   //播放开始执行的函数
    //   console.log("开始播放");
    // });
    // this.$refs.voideData.addEventListener("playing", function () {
    //   //播放中
    //   console.log("播放中");
    // });
    // this.$refs.voideData.addEventListener("waiting", function () {
    //   //加载
    //   console.log("加载中");
    // });
    this.payFn(0);
    // this.videoSrc = this.videoSrcArr[0];
    this.$refs.voideData.controls = false;
    this.$refs.voideData.addEventListener(
      "ended",
      () => {
        //暂停开始执行的函数
        console.log("播放结束");
        if (this.type < 3) {
          let type: number = this.type + 1;
          this.payFn(type);
        } else {
          this.payFn(1);
        }
      },
      false
    );
  }
  payFn(type: number): void {
    this.type = type;
    this.$refs.voideData.src = this.videoSrcArr[type];
    console.log(this.$refs.voideData);
    console.log(this.$refs.voideData.src);
    this.$refs.voideData.play();
  }
  // mounted(): void {
  //   this.$nextTick(() => {
  //     this.init();
  //   });
  // }
}
</script>
<style lang="less"></style>
