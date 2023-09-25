<template>
  <view
    class="be-gesture-view be deep"
    :class="[rootClass ? rootClass : '']"
    :style="rootStyle"
    @touchstart="onTouchstart"
    @touchend="onTouchend"
    @touchmove="onTouchmove"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  // 设置根元素class
  rootClass: {
    type: String,
    default: ''
  },
  // 设置根元素style
  rootStyle: {
    type: String,
    default: ''
  },
  // 滑动多少距离触发手势
  triggerLevel: {
    type: Number,
    default: 50
  },
  // 阻止页面滚动
  preventScroll: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['slideLeft', 'slideRight', 'slideTop', 'slideBottom']);

let startPoint = [0, 0];

const onTouchstart = (event: any) => {
  startPoint = [event.touches[0].clientX, event.touches[0].clientY];
};

const onTouchend = (event: any) => {
  const [endX, endY] = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];

  const [startX, startY] = startPoint;

  const offsetX = endX - startX;
  const offsetY = endY - startY;
  if (Math.abs(offsetX) > Math.abs(offsetY)) {
    // 左右滑动
    if (Math.abs(offsetX) >= props.triggerLevel && Math.abs(offsetY) < 50) {
      if (offsetX > 0) {
        emit('slideRight');
      } else {
        emit('slideLeft');
      }
    }
  } else if (props.preventScroll) {
    // 上下滑动
    if (Math.abs(offsetY) >= props.triggerLevel && Math.abs(offsetX) < 50) {
      if (offsetY > 0) {
        emit('slideBottom');
      } else {
        emit('slideTop');
      }
    }
  }
};

const onTouchmove = (event: any) => {
  if (props.preventScroll) {
    event.stopPropagation();
    event.preventDefault();
  }
};
</script>

<script lang="ts">
export default {
  name: 'BeGestureView',
  options: {
    virtualHost: true
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';

.be-gesture-view {
  width: 100%;
}
</style>
