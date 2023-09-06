<template>
  <view class="playground popup-basic-page">
    <be-button class="open-btn" hover @click="visible = true">自定义弹框</be-button>
    <be-popup v-model:visible="visible" position="custom" :maskOpacity="0">
      <view class="popup-content" @click.stop>这是一段描述文本。</view>
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
  background-color: #333333;

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
  position: absolute;
  top: 60px;
  left: 24px;
  padding: 6px 10px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    display: block;
    width: 0px;
    height: 0px;
    border-left: 8px solid rgba(255, 255, 255, 0);
    border-right: 8px solid rgba(255, 255, 255, 0);
    border-top: 10px solid rgba(255, 255, 255, 0);
    border-bottom: 10px solid #ffffff;
    position: absolute;
    top: -20px;
    left: 20px;
  }
}
</style>
