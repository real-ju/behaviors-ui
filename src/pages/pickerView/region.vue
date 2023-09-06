<template>
  <view class="playground picker-view-region-page">
    <be-picker-view mode="region" v-model="region" height="200px"></be-picker-view>
    <view class="model-result">v-model值：{{ region }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const region = ref([]);
</script>

<style lang="scss" scoped>
.picker-view-region-page {
  .model-result {
    margin-top: 20px;
  }
}
</style>
