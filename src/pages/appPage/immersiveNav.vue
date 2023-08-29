<template>
  <be-app-page
    showNavbar
    title="标题"
    bgColor="#f2f2f2"
    immersiveNav
    @toggleImmersive="toggleImmersive"
  >
    <template #navBar="{ title }">
      <NavBar :title="title" :bgTheme="bgTheme"></NavBar>
    </template>
    <view class="banner">Banner</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
    <view>文本</view>
  </be-app-page>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue';

import { ref } from 'vue';

const defaultBgTheme = 'dark';
// 导航栏背景色是暗色还是亮色
const bgTheme = ref('dark');

const toggleImmersive = (isImmersive: boolean) => {
  bgTheme.value = isImmersive ? defaultBgTheme : 'light';
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4a68cc;
  color: white;
}
</style>
