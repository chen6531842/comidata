<template>
  <div class="login-content-box-2">
    <div class="box-content">
      <div class="box-title">一个账号登录COMIDATA管理不同的平台</div>
      <div class="box-title-small">全方位数据分析让你轻松掌控</div>
      <div class="item-list">
        <div class="item-content">
          <div class="item-title">抖音</div>
          <div class="item-logo">
            <img src="../img/douyin.png" alt="" />
          </div>
          <div class="item-text">
            抖音让每一个人看见并连接更大的世界，鼓励表达、沟通和记录，激发创造，丰富人们的精神世界，让现实生活更美好
          </div>
        </div>

        <div class="item-content">
          <div class="item-title">快手</div>
          <div class="item-logo">
            <img src="../img/kuaishou.png" alt="" />
          </div>
          <div class="item-text">
            在快手，了解真实的世界，认识有趣的人，也可以记录真实而有趣的自己。快手，拥抱每一种生活
          </div>
        </div>

        <div class="item-content">
          <div class="item-title">西瓜</div>
          <div class="item-logo"><img src="../img/xigua.png" alt="" /></div>
          <div class="item-text">
            国内领先的中视频平台，它源源不断的为不同人群提供优质内容，让人们看到更丰富和有深度的世界
          </div>
        </div>

        <div class="item-content">
          <div class="item-title">哔哩哔哩</div>
          <div class="item-logo">
            <img src="../img/bilibili.png" alt="" />
          </div>
          <div class="item-text">
            bilibili是国内知名的视频弹幕网站，这里有及时的动漫新番，活跃的ACG氛围，有创意有Up主。大家可以在这里找到许多欢乐
          </div>
        </div>
      </div>
      <div class="item-list">
        <div class="item-content">
          <div class="item-title">YouTuBe</div>
          <div class="item-logo">
            <img src="../img/youtube.png" alt="" />
          </div>
          <div class="item-text">
            YouTuBe是世界上最大的视频网站，没有之一，用户可以上传、观看、分享及评论视频
          </div>
        </div>

        <div class="item-content">
          <div class="item-title">twitter</div>
          <div class="item-logo">
            <img src="../img/twitter.png" alt="" />
          </div>
          <div class="item-text">
            全球互联网上访问最大的十个网站之一，全球各地的网友会在这里上传许多关于奇闻趣事的相关视频，所以推特上也有非常多不同种类，不同领域的视频
          </div>
        </div>

        <div class="item-content">
          <div class="item-title">dailymotion</div>
          <div class="item-logo">
            <img src="../img/dailymotion.png" alt="" />
          </div>
          <div class="item-text">
            dailymotion是法国热门在线视频网站。Dailymotion每月接待约1.12亿游客，上传视频时长可以为60分钟，大小可以达到4GB（1080p分辨率）
          </div>
        </div>

        <div class="item-content">
          <div class="item-title">Instagram</div>
          <div class="item-logo">
            <img src="../img/instagram.png" alt="" />
          </div>
          <div class="item-text">
            全球非常火的一款移动社交应用软件，随时随地分享抓拍下来的图片为彼此分享。Instagram的日活跃用户已突破5亿
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { objAny, fn } from "@/common/common-interface";
@Component({
  components: {},
})
export default class LoginContentBox2 extends Vue {}
</script>
<style lang="less">
.login-content-box-2 {
  text-align: center;
  .box-content {
    // width: 1160px;
    margin: auto;
  }
  .box-title {
    padding-top: 90px;
    margin-bottom: 10px;
    color: black;
    font-size: 40px;
    font-weight: 500;
    line-height: 56px;
  }
  .box-title-small {
    color: #333;
    font-size: 14px;
    line-height: 22px;
    opacity: 0.4;
    margin-bottom: 60px;
  }
  .content-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .content-item:not(:last-child) {
    margin-bottom: 30px;
  }
  .item-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .item-content {
    width: 260px;
    height: 284px;
    overflow: hidden;
    position: relative;
    display: inline-block;
    padding: 10px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 0 15px;
  }
  .item-logo {
    height: 69.5px;
    margin-top: 25px;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 80%;
    }
  }
  .item-text {
    color: #999;
    font-size: 14px;
    line-height: 22.4px;
    text-align: left;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
}

@media only screen and (max-height: 900px) {
  .login-content-box-2 {
    .box-title-small {
      margin-bottom: 40px;
    }
  }
}
@media only screen and (max-height: 885px) {
  .login-content-box-2 {
    .box-title-small {
      margin-bottom: 20px;
    }
  }
}
@media only screen and (max-height: 825px) {
  .login-content-box-2 {
    .content-item:not(:last-child) {
      margin-bottom: 15px;
    }
    .item-content {
      height: 264px;
    }
    .item-logo {
      margin-top: 25px;
      margin-bottom: 22px;
    }
  }
}

@media only screen and (max-height: 775px) {
  .login-content-box-2 {
    .item-content {
      height: 254px;
    }
    .item-logo {
      margin-top: 20px;
      margin-bottom: 17px;
    }
  }
}
</style>
