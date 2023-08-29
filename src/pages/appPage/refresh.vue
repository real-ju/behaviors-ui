<template>
  <be-app-page showNavbar title="标题" bgColor="#f2f2f2" pullDownRefresh @refreshData="refreshData">
    <template #navBar="{ title }">
      <NavBar :title="title"></NavBar>
    </template>
    <view>文本文本文本文本文本文本文本文本文本文本</view>
  </be-app-page>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue';

const refreshData = (finishRefresh: Function) => {
  setTimeout(() => {
    finishRefresh();
  }, 1000);
};
</script>

<style lang="scss" scoped></style>
