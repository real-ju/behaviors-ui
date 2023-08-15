<template>
  <view class="be-video be deep" :class="[rootClass ? rootClass : '']" :style="rootStyle">
    <view class="cover" v-if="!play" @click="play = true">
      <slot name="cover">
        <image class="bg" :src="imgSrc" mode="aspectFill"></image>
        <image class="play-btn" :src="playSrc" :style="{ width: playWidth, height: playHeight }">
        </image>
      </slot>
    </view>
    <video :src="videoSrc" :autoplay="autoPlay" @play="onVideoPlay"></video>
  </view>
</template>

<script setup lang="ts">
import assetsUrlPlay from './assets/video-play.png';
import { ref } from 'vue';

const props = defineProps({
  // 设置根元素class
  rootClass: {
    type: String,
    default: ''
  },
  // 设置根元素style
  rootStyle: {
    type: String,
    default: ''
  },
  imgSrc: {
    type: String,
    default: ''
  },
  videoSrc: {
    type: String,
    default: ''
  },
  playSrc: {
    type: String,
    default: assetsUrlPlay
  },
  playWidth: {
    type: String,
    default: '100rpx'
  },
  playHeight: {
    type: String,
    default: '100rpx'
  },
  hideCover: {
    type: Boolean,
    default: false
  },
  autoPlay: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['video-play']);

const play = ref(false);

const init = () => {
  if (props.hideCover) {
    play.value = true;
  }
};

const onVideoPlay = () => {
  emit('video-play');
};

init();
</script>

<script lang="ts">
export default {
  name: 'BeVideo'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';

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
