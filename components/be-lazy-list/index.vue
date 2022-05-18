<template>
  <!-- 组件代理触底 -->
  <!-- uniapp小程序端不支持动态组件所以这里写成两份 -->
  <scroll-view
    v-if="proxy"
    class="list-wrapper"
    scroll-y
    @scrolltolower="loadMore"
    :refresher-enabled="pullDownRefresh"
    :refresher-triggered="triggered"
    @refresherrefresh="refreshData"
  >
    <template v-if="ready">
      <slot v-if="listLength > 0"></slot>
      <slot v-if="showEmptyArea" name="empty">
        <view class="empty-tip">
          <image
            class="icon"
            mode="widthFix"
            :src="emptyImageUrl"
            :style="{ width: emptyImageWidth }"
          />
          <view
            class="text"
            :style="{
              'font-size': emptyFontSize,
              color: emptyFontColor,
              marginTop: emptyFontTop,
            }"
          >
            {{ emptyText }}
          </view>
        </view>
      </slot>
      <view
        v-if="showMoreArea"
        class="more-area"
        :style="{
          'font-size': moreFontSize,
          color: moreFontColor,
        }"
        @click="loadMore"
      >
        <template v-if="!finished">
          <view class="tip" v-if="!loading">{{ moreText.loadmore }}</view>
          <view class="tip" v-else>
            <be-icon
              v-if="moreIcon"
              class="loading-icon"
              :font-family="moreIcon.fontFamily"
              :prefix="moreIcon.prefix"
              :name="moreIcon.name"
            >
            </be-icon>
            {{ moreText.loading }}
          </view>
        </template>
        <view class="tip disable-tip" v-else>{{ moreText.nomore }}</view>
      </view>
    </template>
    <template v-else>
      <be-view-loading v-if="$slots.loading">
        <slot name="loading"></slot>
      </be-view-loading>
      <be-view-loading v-else></be-view-loading>
    </template>
  </scroll-view>

  <!-- 自定义触底 -->
  <view v-else class="list-wrapper unproxy-list-wrapper" :style="{ minHeight }">
    <template v-if="ready">
      <slot v-if="listLength > 0"></slot>
      <slot v-if="showEmptyArea" name="empty">
        <view class="empty-tip">
          <image
            class="icon"
            mode="widthFix"
            :src="emptyImageUrl"
            :style="{ width: emptyImageWidth }"
          />
          <view
            class="text"
            :style="{
              'font-size': emptyFontSize,
              color: emptyFontColor,
              marginTop: emptyFontTop,
            }"
          >
            {{ emptyText }}
          </view>
        </view>
      </slot>
      <view
        v-if="showMoreArea"
        class="more-area"
        :style="{
          'font-size': moreFontSize,
          color: moreFontColor,
        }"
        @click="loadMore"
      >
        <template v-if="!finished">
          <view class="tip" v-if="!loading">{{ moreText.loadmore }}</view>
          <view class="tip" v-else>
            <be-icon
              v-if="moreIcon"
              class="loading-icon"
              :font-family="moreIcon.fontFamily"
              :prefix="moreIcon.prefix"
              :name="moreIcon.name"
            >
            </be-icon>
            {{ moreText.loading }}
          </view>
        </template>
        <view class="tip disable-tip" v-else>{{ moreText.nomore }}</view>
      </view>
    </template>
    <template v-else>
      <be-view-loading v-if="$slots.loading">
        <slot name="loading"></slot>
      </be-view-loading>
      <be-view-loading v-else></be-view-loading>
    </template>
  </view>
</template>

<script>
import BeViewLoading from "../be-view-loading/index.vue";
import assets_url_empty from "./assets/empty.png";

export default {
  name: "BeLazyList",
  components: {
    BeViewLoading,
  },
  props: {
    // 列表数据
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 由组件代理监听触底
    proxy: {
      type: Boolean,
      default: true,
    },
    // 代理模式下列表最小高度
    minHeight: {
      type: String,
      default: "200rpx",
    },
    // 初始化时自动加载数据
    autoLoad: {
      type: Boolean,
      default: true,
    },
    // 显示加载图标 Icon组件props对象 为false或者null则不显示
    moreIcon: {
      type: [Object, Boolean],
      default: () => {
        return {
          fontFamily: "iconfont",
          prefix: "icon-",
          name: "loading",
        };
      },
    },
    moreText: {
      type: Object,
      default: () => {
        return {
          loadmore: "加载更多",
          loading: "加载中…",
          nomore: "没有更多了",
        };
      },
    },
    // 加载区域字体大小
    moreFontSize: {
      type: String,
      default: "26rpx",
    },
    // 加载区域字体颜色
    moreFontColor: {
      type: String,
      default: "#999999",
    },
    // 数据为空时 是否显示提示
    showEmptyTip: {
      type: Boolean,
      default: true,
    },
    // 空提示图片URL
    emptyImageUrl: {
      type: String,
      default: assets_url_empty,
    },
    // 空提示图片宽度，图片使用widthFix模式显示
    emptyImageWidth: {
      type: String,
      default: "200rpx",
    },
    emptyText: {
      type: String,
      default: "暂无内容",
    },
    // 空提示字体大小
    emptyFontSize: {
      type: String,
      default: "26rpx",
    },
    // 空提示字体颜色
    emptyFontColor: {
      type: String,
      default: "#aaaaaa",
    },
    // 空提示字体和图片的间距
    emptyFontTop: {
      type: String,
      default: "50rpx",
    },
    // 开启列表下拉刷新，仅代理模式下支持
    pullDownRefresh: {
      type: Boolean,
      default: false,
    },
    // 下拉刷新时自动重置组件数据并初始化
    resetWhileRefreshing: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ready: false,
      loading: false,
      finished: false,
      page: 1,
      triggered: false,
    };
  },
  computed: {
    listLength() {
      return this.value.length;
    },
    showEmptyArea() {
      return this.showEmptyTip && this.finished && this.listLength === 0;
    },
    showMoreArea() {
      return !(this.finished && this.listLength === 0);
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.autoLoad) {
        this.loadMore();
      }
    },
    loadMore() {
      if (this.finished || this.loading) {
        return;
      }

      this.loading = true;

      /**
       * page 当前页数
       * onLoadSuccess 加载成功时回调 传入当前页数据数组 为空或者不传则表示加载结束
       * onLoadError 加载失败时回调
       * firstLoad 是否为首次加载数据（初始化或者重置后）
       */
      this.$emit(
        "load",
        this.page,
        this.onLoadSuccess,
        this.onLoadError,
        this.firstLoad
      );
    },
    onLoadSuccess(datas) {
      if (datas && datas.length > 0) {
        if (this.firstLoad) {
          this.$emit("input", datas);
        } else {
          this.$emit("input", [...this.value, ...datas]);
        }

        this.page++;
      } else {
        this.finished = true;
      }

      this.loading = false;

      if (!this.ready) {
        this.ready = true;
      }

      if (this.firstLoad) {
        this.firstLoad = false;
      }

      if (this.triggered) {
        this.triggered = false;
      }
    },
    onLoadError() {
      this.loading = false;

      if (!this.ready) {
        this.ready = true;
      }

      if (this.triggered) {
        this.triggered = false;
      }
    },
    /**
     * 重置组件数据并初始化
     * options.silent 静默重置（不显示加载提示）
     */
    reset(options) {
      options = options || { silent: false };

      if (!options.silent) {
        this.ready = false;
      }

      this.firstLoad = true;
      this.loading = false;
      this.finished = false;
      this.page = 1;

      this.init();
    },
    /**
     * 下拉刷新时间
     * resetWhileRefreshing=true 表示自动重置列表
     * resetWhileRefreshing=false 表示手动刷新 配合@refreshData、reset()、loadMore()使用
     * 注：调用reset()后会自动关闭下拉刷新加载动画，无需再调用finishRefresh()
     */
    refreshData() {
      this.triggered = true;
      this.$emit("refreshData", {
        reset: this.reset,
        loadMore: this.loadMore,
        finishRefresh: this.finishRefresh,
      });
      if (this.resetWhileRefreshing) {
        this.reset();
      }
    },
    finishRefresh() {
      this.triggered = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .empty-tip {
    width: 100%;
    height: 100%;
    min-height: 350rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .more-area {
    width: 100%;
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .tip {
      display: flex;
      align-items: center;
    }

    .disable-tip {
      opacity: 0.7;
    }

    .loading-icon {
      margin-right: 10rpx;
      animation: uni-loading 1s linear infinite;
    }
  }
}

.unproxy-list-wrapper {
  height: unset;
}
</style>
