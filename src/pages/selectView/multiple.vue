<template>
  <view class="playground select-view-multiple-page">
    <be-select-view mode="multiple" v-model="selectValue" :list="selectList" height="200px">
    </be-select-view>
    <view class="model-result">v-model值：{{ selectValue }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectValue = ref<number[]>([]);
const selectList = ref([
  [
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ],
  [
    { label: '选项4', value: 4 },
    { label: '选项5', value: 5 },
    { label: '选项6', value: 6 }
  ]
]);
</script>

<style lang="scss" scoped>
.select-view-multiple-page {
  .model-result {
    margin-top: 20px;
  }
}
</style>
