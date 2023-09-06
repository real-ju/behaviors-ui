<template>
  <view class="playground select-view-single-page">
    <be-select-view mode="single" v-model="selectValue" :list="selectList" height="200px">
    </be-select-view>
    <view class="model-result">v-model值：{{ selectValue }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectValue = ref<number>();
const selectList = ref([
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]);
</script>

<style lang="scss" scoped>
.select-view-single-page {
  .model-result {
    margin-top: 20px;
  }
}
</style>
