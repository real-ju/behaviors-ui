<template>
  <view
    class="be-gesture be important"
    :class="[
      rootClass ? rootClass : ''
    ]"
    :style="rootStyle"
    @touchstart="onTouchstart"
    @touchend="onTouchend"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'BeGesture',
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
