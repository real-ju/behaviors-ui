// 预设验证规则

export default {
  mobile: {
    pattern: /^1\d{10}$/,
    message: '手机号格式错误'
  },
  IDNumber: {
    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    message: '身份证号格式错误'
  }
};
