<template>
  <view class="playground picker-basic-page">
    <be-button class="open-btn" hover @click="visible = true">打开弹框</be-button>
    <view class="model-result">v-model值：{{ time }}</view>
    <be-picker title="标题" v-model:visible="visible" mode="time" v-model:value="time"> </be-picker>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const time = ref('');
</script>

<style lang="scss" scoped>
.picker-basic-page {
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

  .model-result {
    margin-top: 20px;
  }
}
</style>
