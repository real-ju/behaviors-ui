<template>
  <scroll-view class="playground icon-view-loading-page">
    <view class="playground-content">
      <view class="container">
        <be-view-loading iconSize="26px"></be-view-loading>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.icon-view-loading-page {
  .container {
    width: 100%;
    height: 100px;
    // 需要把容器设置为定位祖先元素
    position: relative;
  }
}
</style>
