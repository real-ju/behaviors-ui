<template>
  <view class="be-app-page">
    <view
      v-if="showNavbar"
      class="nav-bar"
      :class="{
        'immersive-nav': immersiveNav,
        'white-nav': navWhiteBg
      }"
      :style="{ backgroundColor: navBgColor }"
    >
      <view class="status-bar-area" :style="{ height: statusBarHeight + 'px' }"> </view>
      <view class="action-bar-area">
        <slot name="actionBar" :title="title"></slot>
      </view>
    </view>
    <view class="page-main">
      <scroll-view
        v-if="!loading"
        scroll-y
        @scroll="pageScroll"
        :scroll-with-animation="scrollWithAnimation"
        :scroll-top="pageScrollTop"
        @scrolltolower="scrollToLower"
        :refresher-enabled="pullDownRefresh"
        :refresher-triggered="triggered"
        @refresherrefresh="refreshData"
        :style="{ backgroundColor: bgColor }"
      >
        <slot></slot>
      </scroll-view>
      <slot v-if="loading" name="loading">
        <BeViewLoading :bgColor="bgColor" :iconSize="loadingIconSize"></BeViewLoading>
      </slot>
      <slot name="upLayer"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import BeViewLoading from '../be-view-loading/index.vue';

const props = defineProps({
  // 显示导航栏
  showNavbar: {
    type: Boolean,
    default: false
  },
  // 导航栏标题
  title: {
    type: String,
    default: ''
  },
  // 导航栏背景色
  navBgColor: {
    type: String,
    default: '#ffffff'
  },
  // 沉浸式导航栏
  immersiveNav: {
    type: Boolean,
    default: false
  },
  // 页面背景色
  bgColor: {
    type: String,
    default: '#ffffff'
  },
  // 页面加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 页面加载图标大小
  loadingIconSize: {
    type: String,
    default: '50rpx'
  },
  // 开启页面下拉刷新
  pullDownRefresh: {
    type: Boolean,
    default: false
  },
  // 页面滚动动画
  scrollWithAnimation: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['refreshData', 'scrolltolower', 'scroll', 'toggleNavBg']);

const statusBarHeight = ref(0);
const navWhiteBg = ref(false);
const pageScrollTop = ref(0);
const triggered = ref(false);

const refreshData = () => {
  triggered.value = true;
  emit('refreshData', finishRefresh);
};

const finishRefresh = () => {
  triggered.value = false;
};

const scrollToLower = () => {
  emit('scrolltolower');
};

// 返回顶部
const backTop = () => {
  setPageScroll(0);
};

// 设置scroll-top
const setPageScroll = (value: number) => {
  // 兼容性写法
  pageScrollTop.value = value + 1;
  nextTick(() => {
    pageScrollTop.value = value;
  });
};

const pageScroll = (event: any) => {
  emit('scroll', event);

  if (props.immersiveNav) {
    return;
  }

  let detail = event.detail;

  if (detail.scrollTop > 100) {
    if (navWhiteBg.value) {
      emit('toggleNavBg', true);
    }
    navWhiteBg.value = true;
  } else {
    if (navWhiteBg.value) {
      emit('toggleNavBg', false);
    }
    navWhiteBg.value = false;
  }
};

const initStatusBarHeight = () => {
  const { statusBarHeight: barHeight } = uni.getSystemInfoSync();

  statusBarHeight.value = barHeight ?? 0;
};

// 初始化
initStatusBarHeight();

defineExpose({
  finishRefresh,
  backTop
});
</script>

<script lang="ts">
export default {
  name: 'BeAppPage'
};
</script>

<style lang="scss" scoped>
.be-app-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .nav-bar {
    width: 100%;
    flex: none;
    position: relative;
    z-index: 2;

    .status-bar-area {
      width: 100%;
    }

    .action-bar-area {
      width: 100%;
      position: relative;
    }
  }

  .immersive-nav {
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(255, 255, 255, 0) !important;
  }

  .white-nav {
    background-color: #ffffff !important;
  }

  .page-main {
    width: 100%;
    height: 0px;
    flex: auto;
    position: relative;
    z-index: 1;

    scroll-view {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
