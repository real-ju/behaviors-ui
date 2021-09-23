<template>
  <view
    class="be-view-loading"
    :style="{
      backgroundColor: bgColor,
      height: height,
      borderRadius: borderRadius
    }"
  >
    <image
      v-if="!iconName"
      class="icon"
      :style="{ width: iconSize, height: iconSize }"
      src="./assets/loading.png"
    />
    <be-icon
      v-else
      class="icon"
      :name="iconName"
      :style="{
        'font-size': iconSize,
        color: iconColor
      }"
    >
    </be-icon>
  </view>
</template>

<script>
import BeIcon from '../be-icon/index.vue';

export default {
  name: 'BeViewLoading',
  components: {
    BeIcon
  },
  props: {
    iconSize: {
      // 加载图标大小
      type: String,
      default: '50rpx'
    },
    iconName: {
      // 自定义加载图标 Icon组件 name值
      type: String,
      default: ''
    },
    iconColor: {
      // 自定义加载图标颜色 color值
      type: String,
      default: '#aaaaaa'
    },
    bgColor: {
      // 背景颜色
      type: String,
      default: 'rgba(255, 255, 255, 0)'
    },
    borderRadius: {
      // 边框圆角
      type: String,
      default: '0rpx'
    },
    height: {
      // 高度
      type: String,
      default: '100%'
    }
  }
};
</script>

<style lang="scss" scoped>
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
