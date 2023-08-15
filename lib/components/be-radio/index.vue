<template>
  <slot
    v-bind="{
      data,
      isChecked,
      selectItem
    }"
  >
  </slot>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

interface RadioOption {
  // 单选项标题
  title: string;
  // 单选项值
  value: string | number;
  // 是否禁用
  disabled?: boolean;
  // 其他数据
  desc?: Recordable;
}

const props = defineProps({
  // 当前选中项value
  modelValue: {
    type: [Number, String],
    default: null
  },
  // 选项数据
  data: {
    type: Array as PropType<Array<RadioOption>>,
    default: () => {
      return [];
    }
  }
});

const emit = defineEmits(['update:modelValue']);

/**
 * 判断选项是否选中
 * @param {Object} item 选项数据对象
 */
const isChecked = (item: RadioOption) => {
  return item.value === props.modelValue;
};

/**
 * 用户触发选中某一项后调用
 * @param {Object} item 选项数据对象
 */
const selectItem = (item: RadioOption) => {
  if (!item.disabled && props.modelValue !== item.value) {
    emit('update:modelValue', item.value);
  }
};
</script>

<script lang="ts">
export default {
  name: 'BeRadio'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';
</style>
