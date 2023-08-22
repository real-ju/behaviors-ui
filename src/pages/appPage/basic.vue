<template>
  <be-app-page showNavbar title="标题" bgColor="#f2f2f2">
    <template #actionBar="{ title }">
      <ActionBar :title="title"></ActionBar>
    </template>
    <view>内容</view>
  </be-app-page>
</template>

<script setup lang="ts">
import ActionBar from './ActionBar.vue';
</script>

<style lang="scss" scoped></style>
