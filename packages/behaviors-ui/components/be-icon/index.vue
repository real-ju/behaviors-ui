<template>
  <text :class="fontClass"></text>
</template>

<script setup lang="ts">
import { computed } from 'vue';
/**
 * 阿里iconfont https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8d11a391&helptype=code
 *
 * font-class 引用方式，请自行在全局引入FontClass css文件
 */
const props = defineProps({
  fontFamily: {
    // Font Family
    type: String,
    default: 'iconfont'
  },
  prefix: {
    // FontClass 前缀
    type: String,
    default: 'icon-'
  },
  name: {
    // FontClass 名
    type: String,
    default: ''
  }
});

const fontClass = computed(() => {
  return props.fontFamily + ' ' + props.prefix + props.name;
});
</script>

<script lang="ts">
export default {
  name: 'BeIcon',
  options: {
    virtualHost: true
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';

text {
  font-size: unset;
  line-height: 1;
}
</style>
