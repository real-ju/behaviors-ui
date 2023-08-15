<template>
  <slot
    v-bind="{
      error
    }"
  >
  </slot>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface ErrorField {
  field: string;
  message: string;
}

const props = defineProps({
  // 表单域model对象的属性名 用于验证
  prop: {
    type: String,
    default: ''
  },
  // 是否必填字段 考虑到是否必填和验证规则没有必然的联系，所以需手动控制该状态，一般用于控制UI
  required: {
    type: Boolean,
    default: false
  }
});

const error = ref<ErrorField | null>(null);

const getFieldProp = () => {
  return props.prop;
};

const handleError = (_error: ErrorField) => {
  error.value = _error;
};

const clearError = () => {
  error.value = null;
};

defineExpose({
  getFieldProp,
  handleError,
  clearError
});
</script>

<script lang="ts">
export default {
  name: 'BeFormItem'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';
</style>
