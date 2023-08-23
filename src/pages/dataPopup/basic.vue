<template>
  <view class="playground popup-basic-page">
    <view class="playground-content">
      <be-button class="open-btn" hover @click="visible = true">打开弹框</be-button>
      <be-data-popup v-model:visible="visible" title="标题" theme="#4a68cc">
        <view>内容</view>
      </be-data-popup>
    </view>
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
</style>
