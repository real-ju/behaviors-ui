<template>
  <view
    class="be-gesture be deep"
    :class="[rootClass ? rootClass : '']"
    :style="rootStyle"
    @touchstart="onTouchstart"
    @touchend="onTouchend"
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
  }
});

const emit = defineEmits(['slideLeft', 'slideRight']);

let startPoint = [0, 0];

const onTouchstart = (event: any) => {
  startPoint = [event.touches[0].clientX, event.touches[0].clientY];
};

const onTouchend = (event: any) => {
  let [endX, endY] = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];

  let [startX, startY] = startPoint;

  let offsetX = endX - startX;
  let offsetY = endY - startY;
  if (Math.abs(offsetX) >= props.triggerLevel && Math.abs(offsetY) < 50) {
    if (offsetX > 0) {
      emit('slideRight');
    } else {
      emit('slideLeft');
    }
  }
};
</script>

<script lang="ts">
export default {
  name: 'BeGesture'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';

.be-gesture {
  width: 100%;
}
</style>
