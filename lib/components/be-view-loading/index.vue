<template>
  <view
    class="be-view-loading"
    :style="{
      backgroundColor: bgColor,
      height: height,
      borderRadius: borderRadius,
      display: displayStyle
    }"
  >
    <slot>
      <BeIcon
        v-if="loadingIcon && loadingIcon.name"
        class="icon"
        :fontFamily="loadingIcon.fontFamily"
        :prefix="loadingIcon.prefix"
        :name="loadingIcon.name"
        :style="{
          'font-size': iconSize,
          color: iconColor
        }"
      >
      </BeIcon>
      <image
        v-else
        class="icon"
        :style="{ width: iconSize, height: iconSize }"
        :src="assetsUrlLoading"
      />
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import BeIcon from '../be-icon/index.vue';
import assetsUrlLoading from '../../assets/images/icon-loading.png';

const props = defineProps({
  // 加载图标大小
  iconSize: {
    type: String,
    default: '50rpx'
  },
  // 自定义加载图标 Icon组件 props
  loadingIcon: {
    type: Object,
    default: null
  },
  // 自定义加载图标颜色 color值
  iconColor: {
    type: String,
    default: '#aaaaaa'
  },
  // 背景颜色
  bgColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0)'
  },
  // 边框圆角
  borderRadius: {
    type: String,
    default: '0rpx'
  },
  // 高度
  height: {
    type: String,
    default: '100%'
  }
});

const slots = useSlots();

const displayStyle = computed(() => {
  return slots.default ? 'block' : 'flex';
});
</script>

<script lang="ts">
export default {
  name: 'BeViewLoading'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';

.be-view-loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .icon {
    animation: uni-loading 1s linear infinite;
  }
}
</style>
