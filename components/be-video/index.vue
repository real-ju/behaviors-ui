<template>
  <view
    class="be-video be important"
    :class="[rootClass ? rootClass : '']"
    :style="rootStyle"
  >
    <view class="cover" v-if="!play" @click="play = true">
      <slot name="cover">
        <image class="bg" :src="imgSrc" mode="aspectFill"></image>
        <image
          class="play-btn"
          :src="playSrc"
          :style="{ width: playWidth, height: playHeight }"
        >
        </image>
      </slot>
    </view>
    <video :src="videoSrc" :autoplay="autoPlay" @play="onVideoPlay"></video>
  </view>
</template>

<script>
import assets_url_play from "./assets/video-play.png";

export default {
  name: "BeVideo",
  props: {
    // 设置根元素class
    rootClass: {
      type: String,
      default: "",
    },
    // 设置根元素style
    rootStyle: {
      type: String,
      default: "",
    },
    imgSrc: {
      type: String,
      default: "",
    },
    videoSrc: {
      type: String,
      default: "",
    },
    playSrc: {
      type: String,
      default: assets_url_play,
    },
    playWidth: {
      type: String,
      default: "100rpx",
    },
    playHeight: {
      type: String,
      default: "100rpx",
    },
    hideCover: {
      type: Boolean,
      default: false,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      play: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.hideCover) {
        this.play = true;
      }
    },
    onVideoPlay() {
      this.$emit("video-play");
    },
  },
};
</script>

<style lang="scss" scoped>
.be-video {
  width: 100%;
  overflow: hidden;

  .cover {
    width: 100%;
    height: 100%;
    position: relative;

    .bg {
      width: 100%;
      height: 100%;
    }

    .play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  video {
    width: 100%;
    height: 100%;
  }
}
</style>
