<template>
  <textarea
    class="be-textarea"
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
