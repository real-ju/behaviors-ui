<template>
  <input
    class="be deep"
    :class="[rootClass ? rootClass : '']"
    :style="rootStyle"
    :value="modelValue"
    :placeholder="placeholder"
    :placeholder-style="placeholderStyle"
    :placeholder-class="placeholderClass"
    :type="inputType"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
    :password="password"
    :maxlength="maxlength"
  />
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

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
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  placeholderStyle: {
    type: String,
    default: ''
  },
  placeholderClass: {
    type: String,
    default: ''
  },
  allowNegative: {
    type: Boolean,
    default: false
  },
  allowDecimal: {
    type: Boolean,
    default: false
  },
  min: {
    type: Number,
    default: -Infinity
  },
  max: {
    type: Number,
    default: Infinity
  },
  pattern: {
    type: RegExp,
    default: null
  },
  password: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number,
    default: 140
  },
  trim: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const oldValue = ref<string>(String(props.modelValue || ''));

const inputType = computed(() => {
  if (props.type === 'text') {
    return 'text';
  } else if (props.type === 'number') {
    return 'text';
  } else {
    return 'text';
  }
});

const inputPattern = computed(() => {
  if (props.pattern) {
    return props.pattern;
  } else {
    if (props.type === 'number') {
      if (!props.allowNegative && !props.allowDecimal) {
        return /^\d*$/;
      } else if (props.allowNegative && !props.allowDecimal) {
        return /^-?\d*$/;
      } else if (!props.allowNegative && props.allowDecimal) {
        return /(^\d*$)|(^\d+\.\d*$)/;
      } else if (props.allowNegative && props.allowDecimal) {
        return /(^-?\d*$)|(^-?\d+\.\d*$)/;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
});

const changeValue = (inputValue: string, newValue: string) => {
  // type=number时转换为Number类型
  const updateValue =
    props.type === 'number'
      ? newValue && newValue !== '-'
        ? parseFloat(newValue)
        : undefined
      : newValue;
  // 输入框中的值和v-model的值一样则无需更新视图（处理uni-app input组件问题）
  if (newValue === inputValue) {
    emit('update:modelValue', updateValue);
    oldValue.value = newValue;
  } else {
    emit('update:modelValue', inputValue);
    nextTick(() => {
      emit('update:modelValue', updateValue);
      oldValue.value = newValue;
    });
  }
};

const onInput = (event: any) => {
  let inputValue; // 每次input事件输入框的值
  let newValue; // 处理后的正确的值
  newValue = inputValue = event.detail.value;

  if (props.trim) {
    newValue = newValue.trim();
  }

  if (inputPattern.value && !inputPattern.value.test(newValue)) {
    newValue = oldValue.value;
  }

  changeValue(inputValue, newValue);
};

const onFocus = (event: any) => {
  emit('focus', event);
};

const onBlur = (event: any) => {
  if (props.type === 'number') {
    let value = event.detail.value;
    value = parseFloat(value);
    if (value < props.min) {
      emit('update:modelValue', String(props.min));
    } else if (value > props.max) {
      emit('update:modelValue', String(props.max));
    }
  }
  emit('blur', event);
};
</script>

<script lang="ts">
export default {
  name: 'BeInput',
  options: {
    virtualHost: true
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';
</style>
