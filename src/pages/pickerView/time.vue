<template>
  <view class="playground picker-view-time-page">
    <be-picker-view
      mode="time"
      v-model="time"
      timeFormat="yyyy-MM-dd hh:mm"
      :timeColumn="['year', 'minute']"
      :timeRange="{ year: [2022, 2024], hour: [12, 23] }"
      height="200px"
    >
    </be-picker-view>
    <view class="model-result">v-model值：{{ time }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const time = ref('2023-08-31 16:00');
</script>

<style lang="scss" scoped>
.picker-view-time-page {
  .model-result {
    margin-top: 20px;
  }
}
</style>
