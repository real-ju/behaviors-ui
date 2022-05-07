<template>
  <button
    class="be-button be important"
    :class="[
      rootClass ? rootClass : '',
      disabled && !disabledClass ? 'button-disabled' : '',
      disabled ? disabledClass : '',
      loading ? 'button-loading' : '',
    ]"
    :style="rootStyle"
    :hover-class="hoverClass"
    :loading="!isCustomLoadingIcon && loading"
    :disabled="disabled"
    :data-loading="loading"
    :open-type="openType"
    :session-from="sessionFrom"
    @getphonenumber="onGetphonenumber"
    @getuserinfo="onGetuserinfo"
    @error="onError"
    @click="onClick"
  >
    <slot name="loading" v-if="loading">
      <be-icon
        v-if="loadingIcon && loadingIcon.name"
        class="loading-icon"
        :fontFamily="loadingIconProps.fontFamily"
        :prefix="loadingIconProps.prefix"
        :name="loadingIconProps.name"
        :style="{
          'font-size': loadingSize,
          color: loadingColor,
          display: 'inline-block',
        }"
      >
      </be-icon>
    </slot>
    <slot v-if="!(hiddenContentInLoading && loading)"></slot>
  </button>
</template>

<script>
import BeIcon from "../be-icon/index.vue";

const defaultLoadingIconProps = {
  fontFamily: "iconfont",
  prefix: "icon-",
  name: "",
};

export default {
  name: "BeButton",
  components: {
    BeIcon,
  },
  props: {
    /**
     * 设置根元素class
     * 1.非scoped模式，需要在css选择器中加上.be.important提高优先级，如test.be.important
     * 2.scoped模式，使用::v-deep样式穿透
     */
    rootClass: {
      type: String,
      default: "",
    },
    // 设置根元素style
    rootStyle: {
      type: String,
      default: "",
    },
    // 默认点击效果
    hover: {
      type: Boolean,
      default: false,
    },
    // 按钮加载状态(加载时会添加data-loading属性，可用于样式控制)
    loading: {
      type: Boolean,
      default: false,
    },
    // 加载时隐藏按钮内容
    hiddenContentInLoading: {
      type: Boolean,
      default: false,
    },
    // 自定义加载图标 Icon组件 props
    loadingIcon: {
      type: Object,
      default: () => {
        return { ...defaultLoadingIconProps };
      },
    },
    // 自定义加载图标大小 font-size值
    loadingSize: {
      type: String,
      default: "unset",
    },
    // 自定义加载图标颜色 color值
    loadingColor: {
      type: String,
      default: "unset",
    },
    // 按钮禁用状态
    disabled: {
      type: Boolean,
      default: false,
    },
    // 自定义按钮禁用样式
    disabledClass: {
      type: String,
      default: "",
    },

    /**
     * 以下为uni-app button组件属性
     */
    openType: {
      type: String,
      default: "",
    },
    sessionFrom: {
      type: String,
      default: "",
    },
  },
  computed: {
    isCustomLoadingIcon() {
      return (this.loadingIcon && this.loadingIcon.name) || this.$slots.loading;
    },
    loadingIconProps() {
      if (!this.loadingIcon) {
        return {};
      }

      return {
        ...defaultLoadingIconProps,
        ...this.loadingIcon,
      };
    },
    hoverClass() {
      return this.hover ? "button-hover" : "none";
    },
  },
  methods: {
    onGetphonenumber(...params) {
      this.$emit("getphonenumber", ...params);
    },
    onGetuserinfo(...params) {
      this.$emit("getuserinfo", ...params);
    },
    onError(...params) {
      this.$emit("error", ...params);
    },
    onClick(event) {
      if (!this.loading) {
        this.$emit("click", event);
      }
    },
  },
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
