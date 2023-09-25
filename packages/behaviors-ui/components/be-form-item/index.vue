<template>
  <slot :required="required" :error="error"></slot>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';

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

const handleError = (err: ErrorField) => {
  error.value = err;
};

const clearError = () => {
  error.value = null;
};

// 由于Form组件slot中无法获取到子组件实例的expose，所以使用依赖注入的方式（参考了ant-design-vue的写法）
const beFormContext: any = inject('beFormContext');
beFormContext.addField({
  field: props.prop,
  handleError,
  clearError
});
</script>

<script lang="ts">
export default {
  name: 'BeFormItem',
  options: {
    virtualHost: true
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';
</style>
