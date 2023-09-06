<template>
  <view class="playground view-loading-basic-page">
    <view class="container">
      <be-view-loading iconSize="26px"></be-view-loading>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.view-loading-basic-page {
  .container {
    width: 100%;
    height: 100px;
    // 需要把容器设置为定位祖先元素
    position: relative;
  }
}
</style>
