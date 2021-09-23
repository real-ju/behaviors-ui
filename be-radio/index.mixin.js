export default {
  name: 'BeRadio',
  props: {
    value: {
      // 当前选中项value
      type: [Number, String],
      default: null
    },
    data: {
      // 选项数据
      type: Array,
      default: () => {
        /**
         * 数组项规范：
         * { title, value, disabled, desc }
         */
        return [];
      }
    }
  },
  methods: {
    /**
     * 判断选项是否选中
     * @param {Object} item 选项数据对象
     */
    isChecked(item) {
      return item.value === this.value;
    },

    /**
     * 用户触发选中某一项后调用
     * @param {Object} item 选项数据对象
     */
    selectRadio(item) {
      if (!item.disabled && this.value !== item.value) {
        this.$emit('input', item.value);
      }
    }
  }
};
