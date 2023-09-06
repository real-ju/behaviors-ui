<template>
  <view class="playground select-view-cascade-page">
    <be-select-view mode="cascade" v-model="selectValue" :list="selectList" height="200px">
    </be-select-view>
    <view class="model-result">v-model值：{{ selectValue }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectValue = ref<number[]>([]);
const selectList = ref([
  {
    label: '选项1',
    value: 100,
    children: [
      {
        label: '选项1-1',
        value: 110,
        children: [
          {
            label: '选项1-1-1',
            value: 111
          },
          {
            label: '选项1-1-2',
            value: 112
          }
        ]
      },
      {
        label: '选项1-2',
        value: 120,
        children: [
          {
            label: '选项1-2-1',
            value: 121
          },
          {
            label: '选项1-2-2',
            value: 122
          }
        ]
      }
    ]
  },
  {
    label: '选项2',
    value: 200,
    children: [
      {
        label: '选项2-1',
        value: 210,
        children: [
          {
            label: '选项2-1-1',
            value: 211
          }
        ]
      }
    ]
  }
]);
</script>

<style lang="scss" scoped>
.select-view-cascade-page {
  .model-result {
    margin-top: 20px;
  }
}
</style>
