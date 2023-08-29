<template>
  <be-app-page showNavbar title="标题" bgColor="#f2f2f2">
    <template #navBar="{ title }">
      <NavBar :title="title"></NavBar>
    </template>
    <view>内容</view>
  </be-app-page>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue';
</script>

<style lang="scss" scoped></style>
