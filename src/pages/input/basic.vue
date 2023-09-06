<template>
  <view class="playground input-basic-page">
    <be-input
      class="input1"
      type="text"
      v-model="content"
      placeholder="请输入"
      placeholder-class="input1-placeholder"
    >
    </be-input>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const content = ref('');
</script>

<style lang="scss" scoped>
.input-basic-page {
  .input1 {
    background-color: #f2f2f2;
    font-size: 14px;

    .input1-placeholder {
      color: #bbbbbb;
    }
  }
}
</style>
