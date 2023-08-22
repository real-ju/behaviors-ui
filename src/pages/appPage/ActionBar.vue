<template>
  <view class="action-bar" :class="{ dark: bgTheme === 'dark' }">
    <view class="back-btn">&lt;</view>
    <view class="title">{{ title }}</view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  bgTheme: {
    type: String,
    default: 'light'
  }
});
</script>

<style lang="scss" scoped>
.action-bar {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  position: relative;

  .back-btn {
    font-size: 30px;
  }

  .title {
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.dark {
    color: #ffffff;
  }
}
</style>
