<template>
  <scroll-view class="playground gesture-view-basic-page">
    <view class="playground-content">
      <be-gesture-view
        class="gesture-area"
        preventScroll
        @slideLeft="slideLeft"
        @slideRight="slideRight"
        @slideTop="slideTop"
        @slideBottom="slideBottom"
      >
        {{ tip }}
      </be-gesture-view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tip = ref('请滑动');

const slideLeft = () => {
  tip.value = '你向左滑动了';
};

const slideRight = () => {
  tip.value = '你向右滑动了';
};

const slideTop = () => {
  tip.value = '你向上滑动了';
};

const slideBottom = () => {
  tip.value = '你向下滑动了';
};
</script>

<style lang="scss" scoped>
.gesture-view-basic-page {
  .gesture-area {
    width: 100%;
    height: 210px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
