<template>
  <iframe
    class="example-iframe"
    title="Inline Frame Example"
    :src="'../example/index.html#' + url"
    :style="{ height, maxWidth }"
  >
  </iframe>
</template>

<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: 'unset'
  },
  maxWidth: {
    type: String,
    default: 'unset'
  }
});
</script>

<style lang="scss" scoped>
.example-iframe {
  width: 100%;
  border: 1px solid #a6accd;
  border-radius: 8px;
}
</style>
