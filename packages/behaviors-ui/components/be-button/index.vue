<template>
  <button
    class="be-button be deep"
    :class="[
      rootClass ? rootClass : '',
      disabled && !disabledClass ? 'button-disabled' : '',
      disabled ? disabledClass : '',
      loading ? 'button-loading' : ''
    ]"
    :style="rootStyle"
    :hover-class="btnHoverClass"
    :loading="!isCustomLoadingIcon && loading"
    :disabled="disabled"
    :data-loading="loading || undefined"
    :open-type="openType"
    :session-from="sessionFrom"
    @getphonenumber="onGetphonenumber"
    @getuserinfo="onGetuserinfo"
    @error="onError"
    @click="onClick"
  >
    <slot name="loading" v-if="loading">
      <BeIcon
        v-if="loadingIcon && loadingIcon.name"
        class="loading-icon"
        :fontFamily="loadingIcon.fontFamily"
        :prefix="loadingIcon.prefix"
        :name="loadingIcon.name"
        :style="{
          'font-size': loadingSize,
          color: loadingColor,
          display: 'inline-block'
        }"
      >
      </BeIcon>
    </slot>
    <slot v-if="!(hiddenContentInLoading && loading)"></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import BeIcon from '../be-icon/index.vue';

const props = defineProps({
  /**
   * 设置根元素class
   * 1.非scoped模式，需要在css选择器中加上.be.deep提高优先级，如test.be.deep
   * 2.scoped模式，使用:deep样式穿透
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
  // 自定义点击样式
  hoverClass: {
    type: String,
    default: ''
  },
  // 按钮加载状态(加载时会添加data-loading属性，可用于样式控制)
  loading: {
    type: Boolean,
    default: false
  },
  // 加载时隐藏按钮内容
  hiddenContentInLoading: {
    type: Boolean,
    default: false
  },
  // 自定义加载图标 Icon组件 props
  loadingIcon: {
    type: Object,
    default: null
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
});

const emit = defineEmits(['getphonenumber', 'getuserinfo', 'error', 'click']);

const slots = useSlots();

const isCustomLoadingIcon = computed(() => {
  return (props.loadingIcon && props.loadingIcon.name) || slots.loading;
});

const btnHoverClass = computed(() => {
  return props.hover ? (props.hoverClass ? props.hoverClass : 'button-hover') : 'none';
});

const onGetphonenumber = (...params: any[]) => {
  emit('getphonenumber', ...params);
};

const onGetuserinfo = (...params: any[]) => {
  emit('getuserinfo', ...params);
};

const onError = (...params: any[]) => {
  emit('error', ...params);
};

const onClick = (event: any) => {
  if (!props.loading) {
    emit('click', event);
  }
};
</script>

<script lang="ts">
export default {
  name: 'BeButton'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';

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
  transition: all 0.2s;

  &::after {
    display: none;
  }
}

.button-hover {
  opacity: 0.8 !important;
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
