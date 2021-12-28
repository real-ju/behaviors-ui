<template>
  <view
    class="be-image be important"
    :class="[
      rootClass ? rootClass : '',
      mode === 'heightFix' ? 'height-fix' : '',
      mode === 'widthFix' ? 'width-fix' : ''
    ]"
    :style="rootStyle"
  >
    <image class="image" :src="src" :mode="mode" lazy-load @load="onImgLoad">
    </image>
    <template v-if="!ready">
      <view class="mask" v-if="!customLoading">
        <image class="icon" :src="assets_url_loading" />
      </view>
      <view class="custom-mask" v-else>
        <slot name="loading"></slot>
      </view>
    </template>
  </view>
</template>

<script>
import assets_url_loading from './assets/loading.png';

export default {
  name: 'BeImage',
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
  },
  data() {
    return {
      ready: false,
      customLoading: false,
      assets_url_loading
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.$slots.loading) {
        this.customLoading = true;
      }
    },
    onImgLoad(event) {
      this.ready = true;
    }
  }
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
}

.height-fix {
  width: unset !important;
}

.width-fix {
  height: unset !important;
}
</style>
