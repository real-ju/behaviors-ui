<template>
  <be-popup
    class="be-data-popup"
    :value="value"
    @input="onInput"
    @close="onInnerPopupClose"
    position="bottom"
    :height="height"
    :mask-close-able="maskCloseAble"
  >
    <view class="header-bar">{{ title }}</view>
    <image class="close-icon" :src="assets_url_close" @click="close" />
    <view class="data-content">
      <slot></slot>
    </view>
    <view class="action-bar" :class="{ 'sink-bottom': actionBarSinkStatus }">
      <be-button root-class="btn clear-btn" @click="clear">
        {{ clearText }}
      </be-button>
      <be-button root-class="btn ok-btn" @click="confirm">
        {{ confirmText }}
      </be-button>
    </view>
  </be-popup>
</template>

<script>
import BePopup from "../be-popup/index.vue";
import BeButton from "../be-button/index.vue";
import assets_url_close from "./assets/close.png";

export default {
  name: "BeDataPopup",
  components: {
    BePopup,
    BeButton,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: "unset",
    },
    title: {
      type: String,
      default: "",
    },
    clearText: {
      type: String,
      default: "清空",
    },
    confirmText: {
      type: String,
      default: "确定",
    },
    maskCloseAble: {
      type: Boolean,
      default: true,
    },
    // 点击确定或清空按钮后关闭弹出层
    actionCloseAble: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      assets_url_close,
    };
  },
  computed: {
    actionBarSinkStatus() {
      return this.height !== "unset" && this.height !== "auto";
    },
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
    onInnerPopupClose() {
      this.$emit("close");
    },
    close() {
      this.$emit("input", false);
      this.$emit("close");
    },
    clear() {
      this.$emit("clear");
      if (this.actionCloseAble) {
        this.close();
      }
    },
    confirm() {
      this.$emit("confirm");
      if (this.actionCloseAble) {
        this.close();
      }
    },
  },
  // !如何需要修改子组件样式则配置此项
  options: {
    styleIsolation: "shared", // uni组件的默认值是apply-shared
  },
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
    padding: 30rpx;
    padding-bottom: calc(40rpx + 20rpx); // 处理内容安全下边距 20rpx
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;

    &.sink-bottom {
      position: absolute;
      bottom: 0rpx;
      left: 0rpx;
    }

    be-button {
      width: calc((100% - 30rpx) / 2);
    }

    ::v-deep {
      .btn {
        width: 100%;
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
        color: #ffffff;
        font-weight: bold;

        &:not([disabled]):active {
          background-color: darken(#2979ff, 5%);
        }
      }
    }
  }
}
</style>
