// 预设验证规则
import type { PresetRules } from './types';

const presetRules: PresetRules = {
  mobile: {
    pattern: /^1\d{10}$/,
    message: '手机号格式错误'
  }
};

export default presetRules;
