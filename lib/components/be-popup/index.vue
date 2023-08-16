<template>
  <view class="be-popup" :style="{ top: popupTop, height: popupHeight }" v-if="showPopup">
    <view class="popup-mask" @click="onMaskClick" :animation="maskAnimationData"></view>
    <view
      class="popup-content-area"
      :class="position + '-content-area'"
      :style="{
        width: contentWidth,
        height: contentHeight,
        backgroundColor: contentBackgroundColor,
        borderRadius: contentBorderRadius,
        transform: contentTransform,
        top: contentTop
      }"
      :animation="contentAnimationData"
      @click="onContentClick"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Recordable } from '../../types';

import { ref, computed, watch } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  /**
   * 弹出位置
   * 注：position=custom 限制：弹出层内容中的click事件必须添加.stop阻止冒泡
   */
  position: {
    type: String,
    default: 'center' // 可选 top / right / bottom / left / custom
  },
  width: {
    type: String,
    default: 'unset'
  },
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
  },
  // 是否开启动画
  animation: {
    type: Boolean,
    default: true
  },
  // 打开关闭弹框 动画时长(ms)
  animationDuration: {
    type: Number,
    default: 150
  },
  // 弹出层距离屏幕的偏移量
  screenTopOffset: {
    type: String,
    default: '0px'
  },
  screenBottomOffset: {
    type: String,
    default: '0px'
  }
});

const emit = defineEmits(['update:visible', 'close', 'maskClick']);

const showPopup = ref<boolean>(props.visible);
const maskAnimationData = ref<Recordable | null>(null);
const contentAnimationData = ref<Recordable | null>(null);
const maskStartAnimation = ref<Recordable | null>(null);
const maskEndAnimation = ref<Recordable | null>(null);
const contentStartAnimation = ref<Recordable | null>(null);
const contentEndAnimation = ref<Recordable | null>(null);

const animationDurationVal = computed(() => {
  return props.animation ? props.animationDuration : 0;
});
const popupTop = computed(() => {
  return props.screenTopOffset;
});
const popupHeight = computed(() => {
  return `calc(100vh - ${props.screenTopOffset} - ${props.screenBottomOffset})`;
});
const contentWidth = computed(() => {
  if (props.position === 'top' || props.position === 'bottom' || props.position === 'custom') {
    return '100%';
  } else {
    return props.width;
  }
});
const contentHeight = computed(() => {
  if (props.position === 'left' || props.position === 'right' || props.position === 'custom') {
    return '100%';
  } else {
    return props.height;
  }
});
const contentBackgroundColor = computed(() => {
  if (props.position === 'center') {
    return 'unset';
  } else if (props.position === 'custom') {
    return 'transparent';
  } else {
    return props.backgroundColor;
  }
});
const contentBorderRadius = computed(() => {
  let radius = props.borderRadius;
  if (props.position === 'center') {
    return 'unset';
  } else if (props.position === 'top') {
    return `0px 0px ${radius} ${radius}`;
  } else if (props.position === 'bottom') {
    return `${radius} ${radius} 0px 0px`;
  } else if (props.position === 'left') {
    return `0px ${radius} ${radius} 0px`;
  } else if (props.position === 'right') {
    return `${radius} 0px 0px ${radius}`;
  } else if (props.position === 'custom') {
    return 'unset';
  } else {
    return undefined;
  }
});
const contentTransform = computed(() => {
  if (props.position === 'center') {
    return 'translate(-50%, -40%)';
  } else if (props.position === 'top') {
    return 'translate(0px, -100%)';
  } else if (props.position === 'bottom') {
    return 'translate(0px, 100%)';
  } else if (props.position === 'left') {
    return 'translate(-100%, 0px)';
  } else if (props.position === 'right') {
    return 'translate($100%, 0px)';
  } else if (props.position === 'custom') {
    return undefined;
  } else {
    return undefined;
  }
});
const contentTop = computed(() => {
  if (props.position === 'center') {
    return `calc(50% - ${props.negativeTop})`;
  } else if (props.position === 'top') {
    return '0px';
  } else if (props.position === 'bottom') {
    return undefined;
  } else if (props.position === 'left') {
    return '0px';
  } else if (props.position === 'right') {
    return '0px';
  } else if (props.position === 'custom') {
    return '0px';
  } else {
    return undefined;
  }
});

watch(
  () => props.visible,
  (val) => {
    if (val) {
      showPopup.value = true;
      // 兼容性：解决有几率出现不播放进入动画的问题
      setTimeout(() => {
        playStartAnimation();
      }, 150);
    } else {
      playEndAnimation();
      setTimeout(() => {
        showPopup.value = false;
      }, animationDurationVal.value);
    }
  }
);

const initAnimation = () => {
  maskStartAnimation.value = uni.createAnimation({
    duration: animationDurationVal.value
  });

  maskEndAnimation.value = uni.createAnimation({
    duration: animationDurationVal.value
  });

  contentStartAnimation.value = uni.createAnimation({
    duration: animationDurationVal.value
  });

  contentEndAnimation.value = uni.createAnimation({
    duration: animationDurationVal.value
  });

  if (showPopup.value) {
    playStartAnimation();
  }
};

const onMaskClick = () => {
  if (props.maskCloseAble) {
    playEndAnimation();
    setTimeout(() => {
      emit('update:visible', false);
      emit('close');
    }, animationDurationVal.value);
  }
  emit('maskClick');
};

const onContentClick = () => {
  if (props.position === 'custom') {
    onMaskClick();
  }
};

const playStartAnimation = () => {
  maskStartAnimation.value!.backgroundColor(`rgba(0, 0, 0, ${props.maskOpacity})`).step();

  maskAnimationData.value = maskStartAnimation.value!.export();

  if (props.position === 'center') {
    contentStartAnimation.value!.translate('-50%', '-50%').opacity(1).step();
  } else if (props.position === 'custom') {
    contentStartAnimation.value!.opacity(1).step();
  } else {
    contentStartAnimation.value!.translate('0px', '0px').step();
  }

  contentAnimationData.value = contentStartAnimation.value!.export();
};

const playEndAnimation = () => {
  maskEndAnimation.value!.backgroundColor('rgba(0, 0, 0, 0)').step();

  maskAnimationData.value = maskEndAnimation.value!.export();

  if (props.position === 'center') {
    contentEndAnimation.value!.translate('-50%', '-40%').opacity(0).step();
  } else if (props.position === 'top') {
    contentEndAnimation.value!.translate('0px', '-100%').step();
  } else if (props.position === 'bottom') {
    contentEndAnimation.value!.translate('0px', '100%').step();
  } else if (props.position === 'left') {
    contentEndAnimation.value!.translate('-100%', '0px').step();
  } else if (props.position === 'right') {
    contentEndAnimation.value!.translate('100%', '0px').step();
  } else if (props.position === 'custom') {
    contentEndAnimation.value!.opacity(0).step();
  }

  contentAnimationData.value = contentEndAnimation.value!.export();
};

initAnimation();
</script>

<script lang="ts">
export default {
  name: 'BePopup'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';

.be-popup {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 9997;
  overflow: hidden;

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

  .custom-content-area {
    top: 0px;
    left: 0px;
    opacity: 0;
  }
}
</style>
