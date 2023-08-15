<template>
  <BePopup
    class="be-data-popup"
    :style="{ '--theme-color': theme }"
    :visible="visible"
    @update:visible="onVisibleUpdate"
    @close="onInnerPopupClose"
    position="bottom"
    :height="height"
    :mask-close-able="maskCloseAble"
  >
    <view class="header-bar">{{ title }}</view>
    <image class="close-icon" :src="assetsUrlClose" @click="close" />
    <view class="data-content">
      <slot></slot>
    </view>
    <view class="action-bar" :class="{ 'sink-bottom': actionBarSinkStatus }">
      <BeButton class="btn-comp" root-class="btn clear-btn" @click="clear">
        {{ clearText }}
      </BeButton>
      <BeButton class="btn-comp" root-class="btn ok-btn" hover @click="confirm">
        {{ confirmText }}
      </BeButton>
    </view>
  </BePopup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BePopup from '../be-popup/index.vue';
import BeButton from '../be-button/index.vue';
import assetsUrlClose from './assets/close.png';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: 'unset'
  },
  title: {
    type: String,
    default: ''
  },
  clearText: {
    type: String,
    default: '清空'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  maskCloseAble: {
    type: Boolean,
    default: true
  },
  // 点击确定或清空按钮后关闭弹出层
  actionCloseAble: {
    type: Boolean,
    default: true
  },
  // 主题色
  theme: {
    type: String,
    default: '#2979ff'
  }
});

const emit = defineEmits(['update:visible', 'close', 'clear', 'confirm']);

const actionBarSinkStatus = computed(() => {
  return props.height !== 'unset' && props.height !== 'auto';
});

const onVisibleUpdate = (value: boolean) => {
  emit('update:visible', value);
};

const onInnerPopupClose = () => {
  emit('close');
};

const close = () => {
  emit('update:visible', false);
  emit('close');
};

const clear = () => {
  emit('clear');
  if (props.actionCloseAble) {
    close();
  }
};

const confirm = () => {
  emit('confirm');
  if (props.actionCloseAble) {
    close();
  }
};
</script>

<script lang="ts">
export default {
  name: 'BeDataPopup',
  // 微信小程序如果需要修改子组件样式则配置此项
  options: {
    styleIsolation: 'shared' // uni组件的默认值是apply-shared
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';

.be-data-popup {
  box-sizing: border-box;

  .header-bar {
    width: 100%;
    padding: 30rpx 0rpx;
    text-align: center;
    font-size: 28rpx;
    font-weight: bold;
    line-height: 1;
  }

  .close-icon {
    width: 24rpx;
    height: 24rpx;
    position: absolute;
    top: 32rpx;
    right: 30rpx;
  }

  .data-content {
    width: 100%;
  }

  .action-bar {
    width: 100%;
    padding: 30rpx;
    /* #ifdef MP-WEIXIN */
    padding-bottom: calc(30rpx + 20rpx); // 处理内容安全下边距 20rpx
    /* #endif */
    /* #ifdef H5 */
    padding-bottom: calc(
      30rpx + var(--window-bottom)
    ); // 处理内容安全下边距 --window-bottom等于tabbar高度
    /* #endif */
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;

    &.sink-bottom {
      position: absolute;
      bottom: 0rpx;
      left: 0rpx;
    }

    /* #ifdef MP-WEIXIN */
    be-button {
      width: calc((100% - 30rpx) / 2);
    }
    /* #endif */

    :deep {
      .btn {
        /* #ifdef MP-WEIXIN */
        width: 100%;
        /* #endif */
        /* #ifdef H5 */
        width: calc((100% - 30rpx) / 2);
        /* #endif */
        height: 70rpx;
        border-radius: 50rpx;
        text-align: center;
        line-height: 70rpx;
        font-size: 30rpx;
      }

      .clear-btn {
        background-color: #f8f8f8;

        &:not([disabled]):active {
          background-color: darken(#f8f8f8, 5%);
        }
      }

      .ok-btn {
        background-color: var(--theme-color);
        color: #ffffff;
        font-weight: bold;
      }
    }
  }
}
</style>
