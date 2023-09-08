<template>
  <view class="playground textarea-basic-page">
    <be-textarea
      class="textarea1"
      v-model="content"
      placeholder="请输入"
      placeholder-class="textarea1-placeholder"
    >
    </be-textarea>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const content = ref('');
</script>

<style lang="scss" scoped>
.textarea-basic-page {
  .textarea1 {
    background-color: #f2f2f2;
    font-size: 14px;

    .textarea1-placeholder {
      color: #bbbbbb;
    }
  }
}
</style>
