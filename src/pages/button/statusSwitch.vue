<template>
  <scroll-view class="playground button-status-switch-page">
    <view class="playground-content">
      <be-button class="button-1" :loading="loading" :disabled="disabled" disabled-class="disabled">
        {{ statusText }}
        <template #loading>
          <image class="loading-icon" src="/static/button/loading.png" mode="scaleToFill" />
        </template>
      </be-button>
      <be-button class="button-2" hover @click="switchStatus">切换状态</be-button>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const loading = ref(false);
const disabled = ref(false);
const status = ref('normal');

const statusText = computed(() => {
  return status.value === 'normal' ? '按钮' : status.value === 'loading' ? '加载中' : '不可用';
});

const switchStatus = () => {
  if (status.value === 'normal') {
    loading.value = true;
    status.value = 'loading';
  } else if (status.value === 'loading') {
    loading.value = false;
    disabled.value = true;
    status.value = 'disabled';
  } else {
    disabled.value = false;
    status.value = 'normal';
  }
};
</script>

<style lang="scss" scoped>
.button-status-switch-page {
  .playground-content {
    width: 100%;
    display: flex;

    .button-1,
    .button-2 {
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

    .button-1 {
      &:active {
        background-color: darken(#4a68cc, 20%);
      }

      &.disabled {
        background-color: #aaaaaa;
      }

      .loading-icon {
        width: 16px;
        height: 16px;
        animation: uni-loading 1s linear infinite;
        margin-right: 6rpx;
      }
    }

    .button-2 {
      margin-left: 10px;
    }
  }
}
</style>
