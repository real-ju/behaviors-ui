export default {
  name: 'BeFormItem',
  props: {
    prop: {
      // 表单域model对象的属性名 用于验证
      type: String,
      default: ''
    },
    // 是否必填字段 考虑到是否必填和验证规则没有必然的联系，所以需手动控制该状态，一般用于控制UI
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      error: null
    };
  },
  methods: {
    getFieldProp() {
      return this.prop;
    },
    handleError(error) {
      this.error = error;
    },
    clearError() {
      this.error = null;
    }
  }
};
