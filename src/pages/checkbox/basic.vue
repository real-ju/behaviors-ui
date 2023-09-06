<template>
  <view class="playground checkbox-basic-page">
    <be-checkbox v-model="model" :options="options">
      <template #default="{ options, isChecked, selectItem }">
        <view class="checkbox1">
          <view
            class="item"
            :class="{ checked: isChecked(item) }"
            v-for="item in options"
            :key="item.value"
            @click="selectItem(item)"
          >
            {{ item.title }}
          </view>
        </view>
      </template>
    </be-checkbox>
    <view class="model-result">v-model值：{{ model }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const model = ref<number[]>([]);
const options = ref([
  { title: '选项1', value: 1 },
  { title: '选项2', value: 2 },
  { title: '选项3', value: 3 }
]);
</script>

<style lang="scss" scoped>
.checkbox-basic-page {
  .checkbox1 {
    width: 100%;
    display: flex;
    align-items: center;

    .item {
      width: 50px;
      height: 50px;
      border-radius: 10rpx;
      background-color: #dddddd;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;

      & + .item {
        margin-left: 10px;
      }

      &.checked {
        color: #4a68cc;
        border: 2px solid #4a68cc;
      }
    }
  }

  .model-result {
    margin-top: 10px;
  }
}
</style>
