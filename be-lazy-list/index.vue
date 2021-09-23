<template>
  <!-- 组件代理触底 -->
  <scroll-view
    v-if="proxy"
    class="list-wrapper"
    scroll-y
    @scrolltolower="loadMore"
  >
    <template v-if="ready">
      <slot v-if="listLength > 0"></slot>
      <slot v-if="showEmptyArea" name="empty">
        <view class="empty-tip">
          <image class="icon" mode="widthFix" src="./assets/empty.png" />
          <view
            class="text"
            :style="{ 'font-size': emptyFontSize, color: emptyFontColor }"
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
          color: moreFontColor
        }"
        @click="loadMore"
      >
        <template v-if="!finished">
          <view class="tip" v-if="!loading">{{ moreText.loadmore }}</view>
          <view class="tip" v-else>
            <be-icon v-if="moreIcon" class="loading-icon" :name="moreIcon">
            </be-icon>
            {{ moreText.loading }}…
          </view>
        </template>
        <view class="tip disable-tip" v-else>{{ moreText.nomore }}</view>
      </view>
    </template>
    <be-view-loading v-else></be-view-loading>
  </scroll-view>

  <!-- 自定义触底 -->
  <view v-else class="list-wrapper proxy-list-wrapper" :style="{ minHeight }">
    <template v-if="ready">
      <slot v-if="listLength > 0"></slot>
      <slot v-if="showEmptyArea" name="empty">
        <view class="empty-tip">
          <image class="icon" mode="widthFix" src="./assets/empty.png" />
          <view
            class="text"
            :style="{ 'font-size': emptyFontSize, color: emptyFontColor }"
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
          color: moreFontColor
        }"
        @click="loadMore"
      >
        <template v-if="!finished">
          <view class="tip" v-if="!loading">{{ moreText.loadmore }}</view>
          <view class="tip" v-else>
            <be-icon v-if="moreIcon" class="loading-icon" :name="moreIcon">
            </be-icon>
            {{ moreText.loading }}…
          </view>
        </template>
        <view class="tip disable-tip" v-else>{{ moreText.nomore }}</view>
      </view>
    </template>
    <be-view-loading v-else></be-view-loading>
  </view>
</template>

<script>
import BeViewLoading from '../be-view-loading/index.vue';

export default {
  name: 'BeLazyList',
  components: {
    BeViewLoading
  },
  props: {
    value: {
      // 列表数据
      type: Array,
      default: () => {
        return [];
      }
    },
    proxy: {
      // 由组件代理监听触底
      type: Boolean,
      default: true
    },
    minHeight: {
      // 代理模式下列表最小高度
      type: String,
      default: '200rpx'
    },
    autoLoad: {
      // 初始化时自动加载数据
      type: Boolean,
      default: true
    },
    moreIcon: {
      // 显示加载图标 Icon组件 name值 为空则不显示
      type: String,
      default: ''
    },
    moreText: {
      type: Object,
      default: () => {
        return {
          loadmore: '加载更多',
          loading: '加载中',
          nomore: '没有更多了'
        };
      }
    },
    moreFontSize: {
      // 加载区域字体大小
      type: String,
      default: '26rpx'
    },
    moreFontColor: {
      // 加载区域字体颜色
      type: String,
      default: '#666666'
    },
    showEmptyTip: {
      // 数据为空时 是否显示提示
      type: Boolean,
      default: true
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    emptyFontSize: {
      // 空提示字体大小
      type: String,
      default: '26rpx'
    },
    emptyFontColor: {
      // 空提示字体颜色
      type: String,
      default: '#aaaaaa'
    }
  },
  data() {
    return {
      ready: false,
      loading: false,
      finished: false,
      page: 1
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
      return !this.showEmptyArea;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.autoLoad) {
        this.loadMore();
      } else {
        this.ready = true;
      }
    },
    loadMore() {
      if (this.finished || this.loading) {
        return;
      }

      this.loading = true;
      this.$emit('load', this.page, this.onLoadSuccess, this.onLoadError);
    },
    onLoadSuccess(datas) {
      if (datas && datas.length > 0) {
        this.$emit('input', [...this.value, ...datas]);
        this.page++;
      } else {
        this.finished = true;
      }

      this.loading = false;

      if (!this.ready) {
        this.ready = true;
      }
    },
    onLoadError() {
      this.loading = false;

      if (!this.ready) {
        this.ready = true;
      }
    }
  }
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

    .icon {
      width: 200rpx;
    }

    .text {
      margin-top: 50rpx;
    }
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

.proxy-list-wrapper {
  height: unset;
}
</style>
