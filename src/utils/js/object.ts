// 通过规则过滤某个对象，规则回调函数返回true或者没有对应规则的属性组成新的对象
export function filter(obj: Recordable = {}, rules: Recordable = {}) {
  let rst: Recordable = {};
  for (let key in obj) {
    if (key in rules) {
      let callback = rules[key];
      if (callback(obj[key])) {
        rst[key] = obj[key];
      }
    } else {
      rst[key] = obj[key];
    }
  }

  return rst;
}

// 对象深拷贝
export function deepClone(value: Recordable | null) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  let obj: Recordable = {};

  // 遍历可枚举属性
  for (const key in value) {
    const item = value[key];
    if (typeof item === 'function') {
      // 如果是函数，则通过bind拷贝
      obj[key] = item.bind(obj);
    } else if (Array.isArray(item)) {
      obj[key] = item.map((i) => {
        return deepClone(i);
      });
    } else {
      obj[key] = deepClone(item);
    }
  }

  return obj;
}
