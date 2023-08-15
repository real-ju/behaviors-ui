<template>
  <view class="be-form be deep" :class="[rootClass ? rootClass : '']" :style="rootStyle">
    <slot
      v-bind="{
        validateField,
        validate,
        resetFields
      }"
    >
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import { useSlots, onMounted } from 'vue';
import validator from './utils/validator';

interface ErrorField {
  field: string;
  message: string;
}

let defaultModel: Recordable = {};
let formItemInstances: any[] = [];

const props = defineProps({
  // 设置根元素class
  rootClass: {
    type: String,
    default: ''
  },
  // 设置根元素style
  rootStyle: {
    type: String,
    default: ''
  },
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
      return null;
    }
  }
});

const emit = defineEmits(['update:model']);
const slots = useSlots();

const resetFields = (clearModel = true) => {
  if (clearModel) {
    emit('update:model', { ...defaultModel });
  }

  formItemInstances.forEach((item) => {
    item.clearError();
  });
};

const validateField = (prop: string) => {
  if (!props.rules) {
    return;
  }

  let instance = formItemInstances.find((item) => {
    return item.getFieldProp() === prop;
  });
  if (instance) {
    let rst = validator.single(props.model[prop], props.rules[prop]);
    if (rst === true) {
      instance.clearError();
    } else {
      instance.handleError({ field: prop, message: rst });
    }
  }
};

/**
 * 返回一个Promise，then表示验证通过，catch表示验证失败
 */
const validate = async () => {
  if (!props.rules) {
    return true;
  }

  let rst = validator.validate(props.model, props.rules);
  if (rst === true) {
    resetFields(false);
    return true;
  } else {
    handleFieldsError(rst);
    throw rst;
  }
};

const handleFieldsError = (errors: ErrorField[]) => {
  formItemInstances.forEach((instance) => {
    let error = errors.find((item) => {
      return item.field === instance.getFieldProp();
    });
    if (error) {
      instance.handleError(error);
    } else {
      instance.clearError();
    }
  });
};

const initFormItems = () => {
  // #ifdef MP-WEIXIN
  const query = uni.createSelectorQuery().in(this);
  let formNode = query.select('.be-form');
  let nodes = (formNode as any)._component.$children; // uni-app内部属性获取slot节点
  formItemInstances = nodes;
  // #endif

  // #ifndef MP-WEIXIN
  if (slots.default) {
    formItemInstances = (slots.default as unknown as Array<any>).map((item) => {
      return item.componentInstance;
    });
  }
  // #endif
};

const init = () => {
  defaultModel = { ...props.model };
  initFormItems();
};

onMounted(() => {
  init();
});

defineExpose({
  validateField,
  validate,
  resetFields
});
</script>

<script lang="ts">
export default {
  name: 'BeForm'
};
</script>

<style lang="scss" scoped></style>
