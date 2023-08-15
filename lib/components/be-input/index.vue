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
    type: String,
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

const emit = defineEmits(['update:modelValue', 'focus']);

const oldValue = ref(props.modelValue);

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
  // 输入框中的值和v-model的值一样则无需更新视图
  if (newValue === inputValue) {
    emit('update:modelValue', newValue);
    oldValue.value = newValue;
  } else {
    emit('update:modelValue', inputValue);
    nextTick(() => {
      emit('update:modelValue', newValue);
      oldValue.value = newValue;
    });
  }
};

const onInput = (event: any) => {
  let inputValue, newValue;
  newValue = inputValue = event.detail.value;

  if (props.trim) {
    newValue = newValue.trim();
  }

  if (inputPattern.value) {
    if (inputPattern.value.test(newValue)) {
      newValue = oldValue.value;
    }
  }

  changeValue(inputValue, newValue);
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
};
const onFocus = (event: any) => {
  emit('focus', event);
};
</script>

<script lang="ts">
export default {
  name: 'BeInput'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';
</style>
