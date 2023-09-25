<template>
  <view class="be-video be deep" :class="[rootClass ? rootClass : '']" :style="rootStyle">
    <view class="cover" v-if="showCover" @click="play">
      <slot name="cover">
        <image class="bg" :src="coverSrc" mode="aspectFill"></image>
        <image
          class="play-btn"
          :src="playBtnSrc"
          :style="{ width: playBtnWidth, height: playBtnHeight }"
        >
        </image>
      </slot>
    </view>
    <video :id="videoId" :src="src" :autoplay="autoplay" @play="onPlay"></video>
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
  src: {
    type: String,
    default: ''
  },
  coverSrc: {
    type: String,
    default: ''
  },
  hideCover: {
    type: Boolean,
    default: false
  },
  playBtnSrc: {
    type: String,
    default: assetsUrlPlay
  },
  playBtnWidth: {
    type: String,
    default: '100rpx'
  },
  playBtnHeight: {
    type: String,
    default: '100rpx'
  }
});

const emit = defineEmits(['play']);

const showCover = ref(true);
const videoId = `be-video-${Date.now()}`;
const autoplay = ref(false);

const init = () => {
  if (props.hideCover) {
    showCover.value = false;
  }
};

const play = () => {
  showCover.value = false;
  // #ifdef H5
  const videoContext = uni.createVideoContext(videoId);
  videoContext.play();
  // #endif
  // #ifdef MP-WEIXIN
  autoplay.value = true;
  // #endif
};

const onPlay = () => {
  emit('play');
};

init();
</script>

<script lang="ts">
export default {
  name: 'BeVideo',
  options: {
    virtualHost: true
  }
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
    cursor: pointer;

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
