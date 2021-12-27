<template>
  <text :class="fontClass"></text>
</template>

<script>
/**
 * 阿里iconfont https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8d11a391&helptype=code
 *
 * 请自行在全局引入FontClass css文件
 */
export default {
  name: 'BeIcon',
  props: {
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
  },
  computed: {
    fontClass() {
      return this.fontFamily + ' ' + this.prefix + this.name;
    }
  }
};
</script>

<style lang="scss" scoped>
text {
  font-size: unset;
  line-height: 1;
}
</style>
