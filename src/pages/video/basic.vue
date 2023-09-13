<template>
  <view class="playground video-basic-page">
    <be-video
      class="video1"
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      coverSrc="/static/image/messi.jpeg"
    >
    </be-video>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.video-basic-page {
  .video1 {
    width: 100%;
    height: 200px;
  }
}
</style>
