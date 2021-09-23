export default {
  name: 'BeProgress',
  props: {
    // 当前进度值
    value: {
      type: Number,
      default: 0
    },
    // 总进度值
    total: {
      type: Number,
      default: 100
    },
    // 百分比精确到小数点后几位
    precision: {
      type: Number,
      default: 0
    }
  },
  computed: {
    percent() {
      return ((this.value / this.total) * 100).toFixed(this.precision);
    }
  }
};
