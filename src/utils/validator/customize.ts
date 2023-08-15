// 自定义验证器
export default {
  arrNotEmpty
};

// 判断数组不为空
function arrNotEmpty(value: any[]) {
  if (value instanceof Array) {
    return value.length != 0;
  } else {
    return false;
  }
}
