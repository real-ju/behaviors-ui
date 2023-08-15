export function rpx2px(rpx: number) {
  const baseScreenWidth = 750;
  const { windowWidth } = uni.getSystemInfoSync();
  return (rpx / baseScreenWidth) * windowWidth;
}

/**
 * 从路径或URL中解析文件名
 * @param path 路径或URL
 */
export function resolveFileNameFromPath(path: string): string {
  let arr1 = path.split('/');
  let arr2 = arr1[arr1.length - 1].split('.');
  return arr2[0];
}

/**
 * 将一个函数防抖化
 * @param fn 原函数
 * @param wait 间隔时间
 * @returns 防抖函数(取消平A，重置前摇。最后一次操作有意义)
 */
export function debounce(fn: Function, wait: number) {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

/**
 * 将一个函数节流化
 * @param fn 原函数
 * @param wait 间隔时间
 * @returns 节流函数(技能CD。每次操作都有意义)
 */
export function throttle(fn: Function, wait: number) {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: any[]) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, wait);
  };
}
