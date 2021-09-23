<template>
  <view class="be-gesture" @touchstart="onTouchstart" @touchend="onTouchend">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'BeGesture',
  props: {
    // 滑动多少距离触发手势
    triggerLevel: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      startPoint: [0, 0]
    };
  },
  methods: {
    onTouchstart(event) {
      this.startPoint = [event.touches[0].clientX, event.touches[0].clientY];
    },
    onTouchend(event) {
      let [endX, endY] = [
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      ];

      let [startX, startY] = this.startPoint;

      let offsetX = endX - startX;
      let offsetY = endY - startY;
      if (Math.abs(offsetX) >= this.triggerLevel && Math.abs(offsetY) < 50) {
        if (offsetX > 0) {
          this.$emit('slideRight');
        } else {
          this.$emit('slideLeft');
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.be-gesture {
  width: 100%;
}
</style>
