<template>
  <view
    class="be-form be important"
    :class="[
      rootClass ? rootClass : ''
    ]"
    :style="rootStyle"
  >
    <slot></slot>
  </view>
</template>

<script>
import validator from './validator';

let defaultModel = {},
  formItemInstances = [];

export default {
  name: 'BeForm',
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
    model: {
      // 表单数据对象
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    resetFields(clearModel = true) {
      if (clearModel) {
        this.$emit('update:model', { ...defaultModel });
      }

      formItemInstances.forEach(item => {
        item.clearError();
      });
    },
    validateField(rules, prop) {
      let instance = formItemInstances.find(item => {
        return item.getFieldProp() === prop;
      });
      if (instance) {
        let rst = validator.single(this.model[prop], rules[prop]);
        if (rst === true) {
          instance.clearError();
        } else {
          instance.handleError({ field: prop, message: rst });
        }
      }
    },
    validate(rules, callback) {
      // uniapp不支持在prop中传函数
      // rules为验证规则 使用validator库
      if (!rules) {
        callback(true);
        return;
      }

      let rst = validator.validate(this.model, rules);
      if (rst === true) {
        this.resetFields(false);
        callback(true);
      } else {
        this.handleFieldsError(rst);
        callback(false);
      }
    },
    handleFieldsError(errors) {
      formItemInstances.forEach(instance => {
        let error = errors.find(item => {
          return item.field === instance.getFieldProp();
        });
        if (error) {
          instance.handleError(error);
        } else {
          instance.clearError();
        }
      });
    },
    initFormItems() {
      // #ifdef MP-WEIXIN
      const query = uni.createSelectorQuery().in(this);
      let formNode = query.select('.be-form');
      let nodes = formNode._component.$children; // uni-app骚操作获取slot节点
      formItemInstances = nodes;
      // #endif

      // #ifndef MP-WEIXIN
      formItemInstances = this.$slots.default.map(item => {
        return item.componentInstance;
      });
      // #endif
    },
    init() {
      defaultModel = { ...this.model };
      this.initFormItems();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped></style>
