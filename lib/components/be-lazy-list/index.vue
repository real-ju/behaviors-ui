<template>
  <!-- 组件代理触底 -->
  <!-- uniapp小程序端不支持动态组件所以这里写成两份 -->
  <scroll-view
    v-if="proxy"
    class="list-wrapper"
    :style="{ '--refresher-color': refresherColor }"
    scroll-y
    @scrolltolower="loadMore"
    :refresher-enabled="pullDownRefresh"
    :refresher-triggered="triggered"
    refresher-background="rgba(255, 255, 255, 0)"
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
              marginTop: emptyFontTop
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
          color: moreFontColor
        }"
        @click="loadMore"
      >
        <template v-if="!finished">
          <view class="tip" v-if="!loading">{{ moreText.loadmore }}</view>
          <view class="tip" v-else>
            <be-icon
              v-if="moreIcon && moreIcon !== true"
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
      <BeViewLoading v-if="$slots.loading">
        <slot name="loading"></slot>
      </BeViewLoading>
      <BeViewLoading v-else></BeViewLoading>
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
              marginTop: emptyFontTop
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
          color: moreFontColor
        }"
        @click="loadMore"
      >
        <template v-if="!finished">
          <view class="tip" v-if="!loading">{{ moreText.loadmore }}</view>
          <view class="tip" v-else>
            <be-icon
              v-if="moreIcon && moreIcon !== true"
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
      <BeViewLoading v-if="$slots.loading">
        <slot name="loading"></slot>
      </BeViewLoading>
      <BeViewLoading v-else></BeViewLoading>
    </template>
  </view>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Recordable } from '../../types';

import { ref, computed } from 'vue';
import BeViewLoading from '../be-view-loading/index.vue';
import assetsUrlEmpty from './assets/empty.png';

const props = defineProps({
  // 列表数据
  modelValue: {
    type: Array as PropType<Recordable[]>,
    default: () => {
      return [];
    }
  },
  // 由组件代理监听触底
  proxy: {
    type: Boolean,
    default: true
  },
  // 代理模式下列表最小高度
  minHeight: {
    type: String,
    default: '200rpx'
  },
  // 初始化时自动加载数据
  autoLoad: {
    type: Boolean,
    default: true
  },
  // 显示加载图标 Icon组件props对象 为false或者null则不显示
  moreIcon: {
    type: [Object, Boolean],
    default: () => {
      return {
        fontFamily: 'iconfont',
        prefix: 'icon-',
        name: 'loading'
      };
    }
  },
  moreText: {
    type: Object as PropType<Recordable>,
    default: () => {
      return {
        loadmore: '加载更多',
        loading: '加载中…',
        nomore: '没有更多了'
      };
    }
  },
  // 加载区域字体大小
  moreFontSize: {
    type: String,
    default: '26rpx'
  },
  // 加载区域字体颜色
  moreFontColor: {
    type: String,
    default: '#999999'
  },
  // 数据为空时 是否显示提示
  showEmptyTip: {
    type: Boolean,
    default: true
  },
  // 空提示图片URL
  emptyImageUrl: {
    type: String,
    default: assetsUrlEmpty
  },
  // 空提示图片宽度，图片使用widthFix模式显示
  emptyImageWidth: {
    type: String,
    default: '200rpx'
  },
  emptyText: {
    type: String,
    default: '暂无内容'
  },
  // 空提示字体大小
  emptyFontSize: {
    type: String,
    default: '26rpx'
  },
  // 空提示字体颜色
  emptyFontColor: {
    type: String,
    default: '#aaaaaa'
  },
  // 空提示字体和图片的间距
  emptyFontTop: {
    type: String,
    default: '50rpx'
  },
  // 开启列表下拉刷新，仅代理模式下支持
  pullDownRefresh: {
    type: Boolean,
    default: false
  },
  // 下拉刷新器颜色
  refresherColor: {
    type: String,
    default: '#aaaaaa'
  }
});

const emit = defineEmits(['update:modelValue', 'load', 'refreshData']);

const ready = ref(false);
const loading = ref(false);
const finished = ref(false);
const page = ref(1);
const triggered = ref(false);

const listLength = computed(() => {
  return props.modelValue.length;
});

const showEmptyArea = computed(() => {
  return props.showEmptyTip && finished.value && listLength.value === 0;
});

const showMoreArea = computed(() => {
  return !(finished.value && listLength.value === 0);
});

const init = () => {
  if (props.autoLoad) {
    loadMore();
  }
};

const loadMore = () => {
  if (finished.value || loading.value) {
    return;
  }

  loading.value = true;

  /**
   * page 当前页数
   * onLoadSuccess 加载成功时回调 传入当前页数据数组 为空或者不传则表示加载结束
   * onLoadError 加载失败时回调
   * init 是否为第一次加载数据（初始化或者重置后）
   */
  emit('load', page.value, onLoadSuccess, onLoadError, !ready.value);
};

const onLoadSuccess = (datas: Recordable[]) => {
  if (datas && datas.length > 0) {
    emit('update:modelValue', [...props.modelValue, ...datas]);
    page.value++;
  } else {
    finished.value = true;
  }

  loading.value = false;

  if (!ready.value) {
    ready.value = true;
    if (triggered.value) {
      triggered.value = false;
    }
  }
};

const onLoadError = () => {
  loading.value = false;

  if (!ready.value) {
    ready.value = true;
    if (triggered.value) {
      triggered.value = false;
    }
  }
};

/**
 * 重置组件数据并初始化
 */
const reset = () => {
  emit('update:modelValue', []);

  ready.value = false;
  loading.value = false;
  finished.value = false;
  page.value = 1;

  init();
};

/**
 * 下拉刷新数据
 * auto=true 表示自动重置列表
 * auto=false 表示手动刷新 配合@refreshData、reset()、finishRefresh()使用
 * 注：调用reset()后会自动关闭下拉刷新加载动画，无需再调用finishRefresh()
 */
const refreshData = (auto = true) => {
  triggered.value = true;
  emit('refreshData');
  if (auto) {
    reset();
  }
};

const finishRefresh = () => {
  triggered.value = false;
};

init();

defineExpose({
  reset,
  finishRefresh
});
</script>

<script lang="ts">
export default {
  name: 'BeLazyList'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';

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

  // H5中定义下拉刷新器颜色
  :deep {
    .uni-scroll-view-refresher {
      .uni-scroll-view-refresh-inner {
        background-color: unset;
        box-shadow: none;

        .uni-scroll-view-refresh__spinner {
          circle {
            color: var(--refresher-color) !important;
          }
        }
      }

      .uni-scroll-view-refresh__icon {
        fill: var(--refresher-color);
      }
    }
  }
}

.unproxy-list-wrapper {
  height: unset;
}
</style>
