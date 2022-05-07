<template>
  <view class="be-app-page">
    <view
      class="nav-bar"
      :class="{
        'immersive-nav': immersiveNav,
        'white-nav': navWhiteBg,
      }"
      :style="{ backgroundColor: navBgColor }"
      v-if="showNavbar"
    >
      <view class="status-bar-area" :style="{ height: statusBarHeight + 'px' }">
      </view>
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
        <be-view-loading :bgColor="bgColor" :iconSize="loadingIconSize">
        </be-view-loading>
      </slot>
      <slot name="upLayer"></slot>
    </view>
  </view>
</template>

<script>
import BeViewLoading from "../be-view-loading/index.vue";

export default {
  name: "BeAppPage",
  components: {
    BeViewLoading,
  },
  props: {
    // 显示导航栏
    showNavbar: {
      type: Boolean,
      default: false,
    },
    // 导航栏标题
    title: {
      type: String,
      default: "",
    },
    // 导航栏背景色
    navBgColor: {
      type: String,
      default: "#ffffff",
    },
    // 沉浸式导航栏
    immersiveNav: {
      type: Boolean,
      default: false,
    },
    // 页面背景色
    bgColor: {
      type: String,
      default: "#ffffff",
    },
    // 页面加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 页面加载图标大小
    loadingIconSize: {
      type: String,
      default: "50rpx",
    },
    // 开启页面下拉刷新
    pullDownRefresh: {
      type: Boolean,
      default: false,
    },
    // 页面滚动动画
    scrollWithAnimation: {
      type: Boolean,
      default: true,
    },
    data() {
      return {
        statusBarHeight: 0,
        navWhiteBg: false,
        pageScrollTop: 0,
        triggered: false,
      };
    },
    created() {
      this.initStatusBarHeight();
    },
    methods: {
      refreshData() {
        this.triggered = true;
        this.$emit("refreshData", this.finishRefresh);
      },
      finishRefresh() {
        this.triggered = false;
      },
      scrollToLower() {
        this.$emit("scrolltolower");
      },
      // 返回顶部
      backTop() {
        this.setPageScroll(0);
      },
      // 设置scroll-top
      setPageScroll(value) {
        // 兼容性写法
        this.pageScrollTop = value + 1;
        this.$nextTick(() => {
          this.pageScrollTop = value;
        });
      },
      pageScroll(event) {
        this.$emit("scroll", event);

        if (!this.immersiveNav) {
          return;
        }

        let detail = event.detail;

        if (detail.scrollTop > 100) {
          if (!this.navWhiteBg) {
            this.$emit("toggleNavBg", true);
          }
          this.navWhiteBg = true;
        } else {
          if (this.navWhiteBg) {
            this.$emit("toggleNavBg", false);
          }
          this.navWhiteBg = false;
        }
      },
      initStatusBarHeight() {
        let { statusBarHeight } = uni.getSystemInfoSync();

        this.statusBarHeight = statusBarHeight;
      },
    },
  },
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
