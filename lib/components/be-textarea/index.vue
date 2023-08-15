<template>
  <textarea
    class="be-textarea be deep"
    :class="[rootClass ? rootClass : '']"
    :style="rootStyle"
    :value="modelValue"
    :placeholder="placeholder"
    :placeholder-style="placeholderStyle"
    :placeholder-class="placeholderClass"
    :disabled="disabled"
    :maxlength="maxlength"
    :focus="focus"
    :auto-height="autoHeight"
    :cursor-spacing="cursorSpacing"
    :confirm-type="confirmType"
    :show-confirm-bar="showConfirmBar"
    :adjust-position="adjustPosition"
    disable-default-padding
    @input="onInput"
    @blur="onBlur"
  />
</template>

<script setup lang="ts">
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
  disabled: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number,
    default: 140
  },
  focus: {
    type: Boolean,
    default: false
  },
  autoHeight: {
    type: Boolean,
    default: false
  },
  cursorSpacing: {
    type: Number,
    default: 0
  },
  // https://uniapp.dcloud.net.cn/component/textarea.html
  confirmType: {
    type: String,
    default: null
  },
  showConfirmBar: {
    type: Boolean,
    default: true
  },
  adjustPosition: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'blur']);

const onInput = (event: any) => {
  emit('update:modelValue', event.detail.value);
};

const onBlur = (event: any) => {
  emit('blur', event.detail.value);
};
</script>

<script lang="ts">
export default {
  name: 'BeTextarea'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';

.be-textarea {
  width: 100%;
}
</style>
