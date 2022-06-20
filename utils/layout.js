/**
 * 获取内容安全区域距离信息
 */
export function getSafeAreaInsets() {
  const { safeAreaInsets } = uni.getSystemInfoSync();

  return safeAreaInsets;
}
