<template>
  <slot :validateField="validateField" :validate="validate" :resetFields="resetFields"></slot>
</template>

<script setup lang="ts">
import type { Recordable } from '../../types';
import type { PropType } from 'vue';

import { provide } from 'vue';
import validator from './utils/validator';

interface ErrorField {
  field: string;
  message: string;
}

const props = defineProps({
  // 表单数据对象
  model: {
    type: Object as PropType<Recordable>,
    default: () => {
      return {};
    }
  },
  // 校验规则
  rules: {
    type: Object as PropType<Recordable>,
    default: () => {
      return {};
    }
  }
});

const emit = defineEmits(['update:model']);

let defaultModel: Recordable = {};
const formItemContexts: any[] = [];

const addField = (context: any) => {
  formItemContexts.push(context);
};

// 重置所有字段
const resetFields = (clearModel = true) => {
  if (clearModel) {
    emit('update:model', { ...defaultModel });
  }

  formItemContexts.forEach((ctx) => {
    ctx.clearError();
  });
};

/**
 * 验证单个字段
 * 返回一个Promise，then表示验证通过，catch表示验证失败
 */
const validateField = async (prop: string) => {
  const ctx = formItemContexts.find((item) => {
    return item.field === prop;
  });
  if (ctx) {
    const rst = validator.single(props.model[prop], props.rules[prop]);
    if (rst === true) {
      ctx.clearError();
      return true;
    } else {
      const error: ErrorField = { field: prop, message: rst };
      ctx.handleError(error);
      throw error;
    }
  } else {
    return true;
  }
};

/**
 * 验证所有字段
 * 返回一个Promise，then表示验证通过，catch表示验证失败
 */
const validate = async () => {
  const rst = validator.validate(props.model, props.rules);
  if (rst === true) {
    resetFields(false);
    return true;
  } else {
    handleFieldsError(rst);
    throw rst;
  }
};

const handleFieldsError = (errors: ErrorField[]) => {
  formItemContexts.forEach((ctx) => {
    const error = errors.find((item) => {
      return item.field === ctx.field;
    });
    if (error) {
      ctx.handleError(error);
    } else {
      ctx.clearError();
    }
  });
};

const init = () => {
  defaultModel = { ...props.model };
};

init();

provide('beFormContext', {
  addField
});

defineExpose({
  validateField,
  validate,
  resetFields
});
</script>

<script lang="ts">
export default {
  name: 'BeForm',
  options: {
    virtualHost: true
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';
</style>
