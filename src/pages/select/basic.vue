<template>
  <view class="playground select-basic-page">
    <be-button class="open-btn" hover @click="visible = true">打开弹框</be-button>
    <view class="model-result">v-model值：{{ selectValue || 'undefined' }}</view>
    <be-select
      title="标题"
      v-model:visible="visible"
      mode="single"
      v-model:value="selectValue"
      :list="selectList"
    >
    </be-select>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const selectValue = ref<number>();
const selectList = ref([
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]);
</script>

<style lang="scss" scoped>
.select-basic-page {
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
