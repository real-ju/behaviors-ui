<template>
  <input
    :value="value"
    :placeholder="placeholder"
    :placeholder-style="placeholderStyle"
    :placeholder-class="placeholderClass"
    :type="inputType"
    @input="onInput"
    @blur="onBlur"
    :password="password"
  />
</template>

<script>
export default {
  name: 'BeInput',
  props: {
    value: {
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
    }
  },
  data() {
    return {
      oldValue: this.value
    };
  },
  computed: {
    inputType() {
      if (this.type === 'text') {
        return 'text';
      } else if (this.type === 'number') {
        return 'text';
      } else {
        return 'text';
      }
    },
    inputPattern() {
      if (this.pattern) {
        return this.pattern;
      } else {
        if (this.type === 'number') {
          if (!this.allowNegative && !this.allowDecimal) {
            return /^\d*$/;
          } else if (this.allowNegative && !this.allowDecimal) {
            return /^-?\d*$/;
          } else if (!this.allowNegative && this.allowDecimal) {
            return /(^\d*$)|(^\d+\.\d*$)/;
          } else if (this.allowNegative && this.allowDecimal) {
            return /(^-?\d*$)|(^-?\d+\.\d*$)/;
          }
        } else {
          return null;
        }
      }
    }
  },
  methods: {
    changeValue(value) {
      this.$emit('input', value);
      this.oldValue = value;
    },
    recoverValue(newValue) {
      this.$emit('input', newValue);
      this.$nextTick(() => {
        this.$emit('input', this.oldValue);
      });
    },
    onInput(event) {
      let newValue = event.detail.value;

      if (this.trim) {
        newValue = newValue.trim();
      }

      if (this.inputPattern) {
        if (this.inputPattern.test(newValue)) {
          this.changeValue(newValue);
        } else {
          this.recoverValue(newValue);
        }
      } else {
        this.$emit('input', newValue);
      }
    },
    onBlur(event) {
      if (this.type === 'number') {
        let value = event.detail.value;
        value = parseFloat(value);
        if (value < this.min) {
          this.$emit('input', String(this.min));
        } else if (value > this.max) {
          this.$emit('input', String(this.max));
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
