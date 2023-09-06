<template>
  <view class="playground popup-basic-page">
    <be-button class="open-btn" hover @click="visible = true">打开弹框</be-button>
    <be-popup v-model:visible="visible" position="center">
      <view class="popup-content">内容</view>
    </be-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<style lang="scss" scoped>
.popup-basic-page {
  height: 100%;

  .open-btn {
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

.popup-content {
  width: 200px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
