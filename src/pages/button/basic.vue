<template>
  <scroll-view class="playground button-basic-page">
    <view class="playground-content">
      <be-button class="button-1" hover>按钮</be-button>
    </view>
  </scroll-view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.button-basic-page {
  .button-1 {
    width: 80px;
    height: 30px;
    border-radius: 8px;
    background-color: #4a68cc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #ffffff;
  }
}
</style>
