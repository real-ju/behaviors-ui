export default {
  name: 'BeCheckbox',
  props: {
    value: {
      // 当前选中项value数组
      type: Array,
      default: () => {
        return [];
      }
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
      return this.value.indexOf(item.value) !== -1;
    },

    /**
     * 用户触发选中某一项后调用
     * @param {Object} item 选项数据对象
     */
    selectCheckbox(item) {
      if (!item.disabled) {
        let values = [...this.value];
        let index = values.indexOf(item.value);
        if (index === -1) {
          values.push(item.value);
        } else {
          values.splice(index, 1);
        }
        this.$emit('input', values);
      }
    }
  }
};
