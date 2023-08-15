<template>
  <slot
    v-bind="{
      percent
    }"
  >
  </slot>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  // 当前进度值
  modelValue: {
    type: Number,
    default: 0
  },
  // 总进度值
  total: {
    type: Number,
    default: 100
  },
  // 百分比精确到小数点后几位
  precision: {
    type: Number,
    default: 0
  }
});

const percent = computed(() => {
  return ((props.modelValue / props.total) * 100).toFixed(props.precision);
});
</script>

<script lang="ts">
export default {
  name: 'BeProgress'
};
</script>

<style lang="scss" scoped></style>
