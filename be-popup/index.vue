<template>
  <view class="be-popup" v-if="showPopup">
    <view
      class="popup-mask"
      @click="onMaskClick"
      :animation="maskAnimationData"
    >
    </view>
    <view
      class="popup-content-area"
      :class="position + '-content-area'"
      :style="{
        width: contentWidth,
        height: contentHeight,
        backgroundColor: position === 'center' ? 'unset' : backgroundColor,
        borderRadius: contentBorderRadius,
        transform: contentTransform,
        top: contentTop
      }"
      :animation="contentAnimationData"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'BePopup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'center' // 可选 top / right / bottom / left
    },
    // position=left|right必须设置宽度
    width: {
      type: String,
      default: 'unset'
    },
    // position=top|bottom必须设置高度
    height: {
      type: String,
      default: 'unset'
    },
    // position=center无效
    backgroundColor: {
      type: String,
      default: 'white'
    },
    // position=center无效
    borderRadius: {
      type: String,
      default: '16rpx'
    },
    maskOpacity: {
      type: Number,
      default: 0.6
    },
    // 遮罩层点击后关闭Popup
    maskCloseAble: {
      type: Boolean,
      default: true
    },
    // position=center有效，以避免可能弹出的键盘重合，往上偏移的值，单位任意
    negativeTop: {
      type: String,
      default: '5%'
    }
  },
  data() {
    return {
      showPopup: this.value,
      maskAnimationData: null,
      contentAnimationData: null
    };
  },
  watch: {
    value(val) {
      if (val) {
        this.showPopup = true;
        // 兼容性：解决有几率出现不播放进入动画的问题
        setTimeout(() => {
          this.playStartAnimation();
        }, 150);
      } else {
        this.playEndAnimation();
        setTimeout(() => {
          this.showPopup = false;
        }, 200);
      }
    }
  },
  computed: {
    contentWidth() {
      if (this.position === 'top' || this.position === 'bottom') {
        return '100%';
      } else {
        return this.width;
      }
    },
    contentHeight() {
      if (this.position === 'left' || this.position === 'right') {
        return '100%';
      } else {
        return this.height;
      }
    },
    contentBorderRadius() {
      let radius = this.borderRadius;
      if (this.position === 'center') {
        return 'unset';
      } else if (this.position === 'top') {
        return `0px 0px ${radius} ${radius}`;
      } else if (this.position === 'bottom') {
        return `${radius} ${radius} 0px 0px`;
      } else if (this.position === 'left') {
        return `0px ${radius} ${radius} 0px`;
      } else if (this.position === 'right') {
        return `${radius} 0px 0px ${radius}`;
      }
    },
    contentTransform() {
      let width = this.width;
      let height = this.height;
      if (this.position === 'center') {
        return 'translate(-50%, -50%)';
      } else if (this.position === 'top') {
        return `translate(0px, -${height})`;
      } else if (this.position === 'bottom') {
        return `translate(0px, ${height})`;
      } else if (this.position === 'left') {
        return `translate(-${width}, 0px)`;
      } else if (this.position === 'right') {
        return `translate(${width}, 0px)`;
      }
    },
    contentTop() {
      if (this.position === 'center') {
        return `calc(50% - ${this.negativeTop})`;
      } else if (this.position === 'top') {
        return '0px';
      } else if (this.position === 'bottom') {
        return null;
      } else if (this.position === 'left') {
        return '0px';
      } else if (this.position === 'right') {
        return '0px';
      }
    }
  },
  created() {
    this.initAnimation();
  },
  methods: {
    initAnimation() {
      this.maskStartAnimation = uni.createAnimation({
        duration: 200
      });

      this.maskEndAnimation = uni.createAnimation({
        duration: 200
      });

      this.contentStartAnimation = uni.createAnimation({
        duration: 200
      });

      this.contentEndAnimation = uni.createAnimation({
        duration: 200
      });
    },
    onMaskClick() {
      if (this.maskCloseAble) {
        this.playEndAnimation();
        setTimeout(() => {
          this.$emit('input', false);
        }, 200);
      }
    },
    playStartAnimation() {
      this.maskStartAnimation
        .backgroundColor(`rgba(0, 0, 0, ${this.maskOpacity})`)
        .step();

      this.maskAnimationData = this.maskStartAnimation.export();

      if (this.position === 'center') {
        this.contentStartAnimation
          .translate('-50%', '-50%')
          .opacity(1)
          .step();
      } else {
        this.contentStartAnimation.translate('0px', '0px').step();
      }

      this.contentAnimationData = this.contentStartAnimation.export();
    },
    playEndAnimation() {
      this.maskEndAnimation.backgroundColor('rgba(0, 0, 0, 0)').step();

      this.maskAnimationData = this.maskEndAnimation.export();

      let width = this.width;
      let height = this.height;

      if (this.position === 'center') {
        this.contentEndAnimation
          .translate('-50%', '-50%')
          .opacity(0)
          .step();
      } else if (this.position === 'top') {
        this.contentEndAnimation.translate('0px', `-${height}`).step();
      } else if (this.position === 'bottom') {
        this.contentEndAnimation.translate('0px', `${height}`).step();
      } else if (this.position === 'left') {
        this.contentEndAnimation.translate(`-${width}`, '0px').step();
      } else if (this.position === 'right') {
        this.contentEndAnimation.translate(`${width}`, '0px').step();
      }

      this.contentAnimationData = this.contentEndAnimation.export();
    }
  }
};
</script>

<style lang="scss" scoped>
.be-popup {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 9997;

  .popup-mask {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0);
  }

  .popup-content-area {
    position: absolute;
    z-index: 9999;
    overflow: hidden;
  }

  .center-content-area {
    top: 50%;
    left: 50%;
    opacity: 0;
  }

  .top-content-area {
    top: 0px;
    left: 0px;
  }

  .bottom-content-area {
    bottom: 0px;
    left: 0px;
  }

  .left-content-area {
    top: 0px;
    left: 0px;
  }

  .right-content-area {
    top: 0px;
    right: 0px;
  }
}
</style>
