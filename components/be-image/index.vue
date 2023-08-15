<template>
  <view
    class="be-image be deep"
    :class="[
      rootClass ? rootClass : '',
      mode === 'heightFix' ? 'height-fix' : '',
      mode === 'widthFix' ? 'width-fix' : ''
    ]"
    :style="rootStyle"
  >
    <image class="image" :src="src" :mode="mode" lazy-load @load="onImgLoad"> </image>
    <template v-if="!ready">
      <view class="mask" v-if="!customLoading">
        <image class="icon" :src="assetsUrlLoading" />
      </view>
      <view class="custom-mask" v-else>
        <slot name="loading"></slot>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';
import assetsUrlLoading from './assets/loading.png';

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

  /**
   * 以下为uni-app image组件属性
   */
  src: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'scaleToFill'
  }
});

const slots = useSlots();

const ready = ref(false);
const customLoading = ref(false);

const init = () => {
  if (slots.loading) {
    customLoading.value = true;
  }
};

const onImgLoad = (event: any) => {
  ready.value = true;
};

init();
</script>

<script lang="ts">
export default {
  name: 'BeImage'
};
</script>

<style lang="scss" scoped>
.be-image {
  display: inline-block;
  font-size: 0px;
  overflow: hidden;
  position: relative;

  .image {
    width: 100%;
    height: 100%;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      width: 64rpx;
      height: 64rpx;
    }
  }

  .custom-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 14px;
  }

  &.height-fix {
    width: unset !important;
  }

  &.width-fix {
    height: unset !important;
  }
}
</style>
