<template>
  <slot :options="options" :isChecked="isChecked" :selectItem="selectItem"></slot>
</template>

<script setup lang="ts">
import type { Recordable } from '../../types';

import type { PropType } from 'vue';

interface CheckboxOption {
  // 多选项标题
  title: string;
  // 多选项值
  value: string | number;
  // 是否禁用
  disabled?: boolean;
  // 其他数据
  desc?: Recordable;
}

const props = defineProps({
  // 当前选中项value数组
  modelValue: {
    type: Array as PropType<Array<string | number>>,
    default: () => {
      return [];
    }
  },
  // 选项数据
  options: {
    type: Array as PropType<Array<CheckboxOption>>,
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
const isChecked = (item: CheckboxOption) => {
  return props.modelValue.indexOf(item.value) !== -1;
};

/**
 * 用户触发选中某一项后调用
 * @param {Object} item 选项数据对象
 */
const selectItem = (item: CheckboxOption) => {
  if (!item.disabled) {
    let values = [...props.modelValue];
    let index = values.indexOf(item.value);
    if (index === -1) {
      values.push(item.value);
    } else {
      values.splice(index, 1);
    }
    emit('update:modelValue', values);
  }
};
</script>

<script lang="ts">
export default {
  name: 'BeCheckbox',
  options: {
    virtualHost: true
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';
</style>
