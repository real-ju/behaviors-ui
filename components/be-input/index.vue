<template>
  <input
    class="be important"
    :class="[rootClass ? rootClass : '']"
    :style="rootStyle"
    :value="value"
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

<script>
export default {
  name: "BeInput",
  props: {
    // 设置根元素class
    rootClass: {
      type: String,
      default: "",
    },
    // 设置根元素style
    rootStyle: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    placeholderStyle: {
      type: String,
      default: "",
    },
    placeholderClass: {
      type: String,
      default: "",
    },
    allowNegative: {
      type: Boolean,
      default: false,
    },
    allowDecimal: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    pattern: {
      type: RegExp,
      default: null,
    },
    password: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: 140,
    },
  },
  data() {
    return {
      oldValue: this.value,
    };
  },
  computed: {
    inputType() {
      if (this.type === "text") {
        return "text";
      } else if (this.type === "number") {
        return "text";
      } else {
        return "text";
      }
    },
    inputPattern() {
      if (this.pattern) {
        return this.pattern;
      } else {
        if (this.type === "number") {
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
    },
  },
  methods: {
    changeValue(inputValue, newValue) {
      // 输入框中的值和v-model的值一样则无需更新视图
      if (newValue === inputValue) {
        this.$emit("input", newValue);
        this.oldValue = newValue;
      } else {
        this.$emit("input", inputValue);
        this.$nextTick(() => {
          this.$emit("input", newValue);
          this.oldValue = newValue;
        });
      }
    },
    onInput(event) {
      let inputValue, newValue;
      newValue = inputValue = event.detail.value;

      if (this.trim) {
        newValue = newValue.trim();
      }

      if (this.inputPattern) {
        if (this.inputPattern.test(newValue)) {
          newValue = this.oldValue;
        }
      }

      this.changeValue(inputValue, newValue);
    },
    onBlur(event) {
      if (this.type === "number") {
        let value = event.detail.value;
        value = parseFloat(value);
        if (value < this.min) {
          this.$emit("input", String(this.min));
        } else if (value > this.max) {
          this.$emit("input", String(this.max));
        }
      }
    },
    onFocus(event) {
      this.$emit("focus", event);
    },
  },
};
</script>

<style lang="scss" scoped></style>
