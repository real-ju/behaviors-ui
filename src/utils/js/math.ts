/**
 * 计算两个数组的笛卡尔乘积
 * @param a
 * @param b
 * @returns 组合值二维数组
 */
export function cartesian(a: any[] = [], b: any[] = []) {
  let rst: any[] = [];
  a.forEach((item1) => {
    b.forEach((item2) => {
      rst.push([].concat(item1, item2));
    });
  });

  return rst;
}
