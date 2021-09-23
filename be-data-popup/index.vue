<template>
  <be-popup
    class="be-data-popup"
    :value="value"
    @input="onInput"
    position="bottom"
    :height="height"
    :mask-close-able="maskCloseAble"
  >
    <view class="header-bar">{{ title }}</view>
    <image class="close-icon" src="./assets/close.png" @click="close" />
    <view class="data-content">
      <slot></slot>
    </view>
    <view class="action-bar">
      <be-button class="btn clear-btn" @click="clear">
        {{ clearText }}
      </be-button>
      <be-button class="btn ok-btn" @click="confirm">
        {{ confirmText }}
      </be-button>
    </view>
  </be-popup>
</template>

<script>
import BePopup from '../be-popup/index.vue';
import BeButton from '../be-button/index.vue';

export default {
  name: 'BeDataPopup',
  components: {
    BePopup,
    BeButton
  },
  props: {
    value: {
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
    }
  },
  data() {
    return {};
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    },
    close() {
      this.$emit('input', false);
    },
    clear() {
      this.$emit('clear');
      if (this.actionCloseAble) {
        this.close();
      }
    },
    confirm() {
      this.$emit('confirm');
      if (this.actionCloseAble) {
        this.close();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
    height: 200rpx;
    position: absolute;
    bottom: 30rpx;
    left: 0px;
    padding: 30rpx 30rpx 0rpx;
    display: flex;
    justify-content: space-between;
    background-color: white;

    .btn {
      width: calc((100% - 30rpx) / 2);
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
      background-color: #2979ff;
      color: white;
      font-weight: bold;

      &:not([disabled]):active {
        background-color: darken(#2979ff, 5%);
      }
    }
  }
}
</style>
