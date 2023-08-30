<template>
  <scroll-view class="playground input-basic-page">
    <view class="playground-content">
      <be-input
        class="input2"
        type="number"
        v-model="content"
        placeholder="请输入-100 ~ 100的数字，包括小数"
        placeholder-class="input2-placeholder"
        allowNegative
        allowDecimal
        :min="-100"
        :max="100"
      >
      </be-input>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const content = ref();
</script>

<style lang="scss" scoped>
.input-basic-page {
  .input2 {
    background-color: #f2f2f2;
    font-size: 14px;

    .input2-placeholder {
      color: #bbbbbb;
    }
  }
}
</style>
