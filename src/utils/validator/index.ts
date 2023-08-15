// 表单验证器
import preset from './rules';
import customize from './customize';

import type { ErrorField, Rules, RuleDescription, CustomValidator } from './types';

export default {
  validate,
  single,
  match,
  customize
};

function validate(obj: Recordable, rules: Rules): ErrorField[] | true {
  if (typeof obj != 'object' || typeof rules != 'object') {
    throw `validate()参数错误`;
  }

  let errorFields: ErrorField[] = [];

  for (let key in obj) {
    let fieldRules = rules[key],
      currentVal = obj[key];

    if (fieldRules) {
      if (!(fieldRules instanceof Array)) {
        throw `validate()规则格式错误`;
      }

      let rst = single(currentVal, fieldRules);
      if (typeof rst == 'string') {
        errorFields.push({
          field: key,
          message: rst
        });
      }
    }
  }

  if (errorFields.length > 0) {
    return errorFields;
  } else {
    return true;
  }
}

function single(value: any, rules: RuleDescription[]): string | true {
  let rst: boolean | string = true,
    errorMsg: string = '验证未通过';

  if (!(rules instanceof Array)) {
    throw `single()规则格式错误`;
  }

  for (let index = 0; index < rules.length; index++) {
    const item = rules[index];

    if ('required' in item) {
      if (item.required && String(value) == '') {
        if (item.message) {
          errorMsg = item.message;
        }

        rst = errorMsg;
        break;
      }
    } else if (item.rule) {
      let matchRst = match(String(value), item.rule);
      if (typeof matchRst == 'string') {
        if (item.message) {
          errorMsg = item.message;
        } else {
          errorMsg = matchRst;
        }

        rst = errorMsg;
        break;
      }
    } else if ('validator' in item) {
      // validator字段为自定义验证器，参数为字段值，返回true或者错误信息字符串
      let customValidate = item.validator as CustomValidator,
        customRst = customValidate(value);

      if (typeof customRst == 'string' || customRst === false) {
        if (item.message) {
          errorMsg = item.message;
        } else {
          errorMsg = String(customRst);
        }

        rst = errorMsg;
        break;
      }
    }
  }

  return rst;
}

function match(value: string, rule: RegExp | string): string | true {
  let pattern: RegExp | null = null,
    errorMsg: string = '验证未通过';

  if (rule instanceof RegExp) {
    pattern = rule;
  } else if (typeof rule == 'string') {
    let item = preset[rule];
    if (!item) {
      throw `没有找到预置验证规则"${rule}"`;
    } else {
      pattern = item.pattern;
      errorMsg = item.message;
    }
  } else {
    throw `single()参数错误`;
  }

  // 正则验证
  if (pattern.test(value)) {
    return true;
  } else {
    return errorMsg;
  }
}
