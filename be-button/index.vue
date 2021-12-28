<template>
  <button
    class="be-button be important"
    :class="[
      rootClass ? rootClass : '',
      disabled && !disabledClass ? 'button-disabled' : '',
      disabled ? disabledClass : ''
    ]"
    :style="rootStyle"
    :hover-class="hoverClass"
    :loading="!loadingIcon && loading"
    :disabled="disabled"
    :data-loading="loading"
    :open-type="openType"
    :session-from="sessionFrom"
    @getphonenumber="onGetphonenumber"
    @getuserinfo="onGetuserinfo"
    @error="onError"
    @click="onClick"
  >
    <be-icon
      v-if="loadingIcon && loading"
      class="loading-icon"
      :name="loadingIcon"
      :style="{
        'font-size': loadingSize,
        color: loadingColor,
        display: 'inline-block'
      }"
    >
    </be-icon>
    <slot></slot>
  </button>
</template>

<script>
import BeIcon from '../be-icon/index.vue';

export default {
  name: 'BeButton',
  components: {
    BeIcon
  },
  props: {
    /**
     * 设置根元素class
     * 1.在css选择器中需要加上.be.important提高优先级，如test.be.important
     * 2.不支持scoped模式
     */
    rootClass: {
      type: String,
      default: ''
    },
    // 设置根元素style
    rootStyle: {
      type: String,
      default: ''
    },
    // 默认点击效果
    hover: {
      type: Boolean,
      default: false
    },
    // 按钮加载状态(加载时会添加data-loading属性，可用于样式控制)
    loading: {
      type: Boolean,
      default: false
    },
    // 自定义加载图标 Icon组件 name值
    loadingIcon: {
      type: String,
      default: ''
    },
    // 自定义加载图标大小 font-size值
    loadingSize: {
      type: String,
      default: 'unset'
    },
    // 自定义加载图标颜色 color值
    loadingColor: {
      type: String,
      default: 'unset'
    },
    // 按钮禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 自定义按钮禁用样式
    disabledClass: {
      type: String,
      default: ''
    },

    /**
     * 以下为uni-app button组件属性
     */
    openType: {
      type: String,
      default: ''
    },
    sessionFrom: {
      type: String,
      default: ''
    }
  },
  computed: {
    hoverClass() {
      return this.hover ? 'button-hover' : 'none';
    }
  },
  methods: {
    onGetphonenumber(...params) {
      this.$emit('getphonenumber', ...params);
    },
    onGetuserinfo(...params) {
      this.$emit('getuserinfo', ...params);
    },
    onError(...params) {
      this.$emit('error', ...params);
    },
    onClick(event) {
      this.$emit('click', event);
    }
  }
};
</script>

<style lang="scss" scoped>
.be-button {
  display: inline-block;
  margin: unset;
  padding: unset;
  font-size: unset;
  text-align: unset;
  text-decoration: unset;
  line-height: unset;
  border-radius: unset;
  color: unset;
  background-color: unset;

  &::after {
    display: none;
  }
}

.button-hover {
  // color: unset;
  // background-color: unset;
  opacity: 0.9 !important;
}

.button-disabled {
  color: rgba(0, 0, 0, 0.3) !important;
  background-color: #f7f7f7 !important;
}

.loading-icon {
  animation: uni-loading 1s linear infinite;
  margin-right: 6rpx;
}
</style>
