<template>
  <textarea
    class="be-textarea be important"
    :class="[
      rootClass ? rootClass : ''
    ]"
    :style="rootStyle"
    :value="value"
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

<script>
export default {
  name: 'BeTextarea',
  props: {
    /**
     * 设置根元素class
     * 1.在css选择器中需要加上.be.important提高优先级，如test.be.important
     * 2.不支持scoped模式
     */
    rootClass: {
      type: String,
      default: ''
    },
    // 设置根元素style
    rootStyle: {
      type: String,
      default: ''
    },
    value: {
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
    confirmType: {
      type: String,
      default: 'done'
    },
    showConfirmBar: {
      type: Boolean,
      default: true
    },
    adjustPosition: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event);
    },
    onBlur(event) {
      this.$emit('blur', event);
    }
  }
};
</script>

<style lang="scss" scoped>
.be-textarea {
  width: 100%;
}
</style>
