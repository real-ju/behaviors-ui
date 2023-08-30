<template>
  <scroll-view class="playground image-basic-page">
    <view class="playground-content">
      <be-image class="image1" src="/static/image/messi.jpeg" mode="widthFix"></be-image>
    </view>
  </scroll-view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.image-basic-page {
  .image1 {
    width: 100%;
  }
}
</style>
