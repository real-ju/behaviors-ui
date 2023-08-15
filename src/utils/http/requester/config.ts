import type { CustomOptions } from './types';

import { ContentTypeEnum } from '@/enums/httpEnum';

export const defaultRequestOptions: Required<CustomOptions> = {
  // 请求是否需要登录鉴权
  auth: true,
  // http Content-Type
  contentType: ContentTypeEnum.JSON,
  // 自定义Token字符串
  customToken: false,
  // 鉴权Header名
  authHeader: 'Authorization',
  // 根据响应数据中的“自定义状态码”判断是resolve还是reject Promise
  // 如果validateCustomStatus返回true，则Promise将会resolved，否则是rejected
  validateCustomStatus: function (response) {
    const statusCode = response.statusCode;
    return statusCode === 200 && response.data && +response.data.code === 0;
  },
  // 处理自定义错误 validateCustomStatus返回false时执行
  handleCustomError: function (response) {
    const message = response.data && response.data.message;
    message &&
      uni.showToast({
        title: message,
        icon: 'none'
      });
  },
  // 显示自定义错误提示
  showCustomErrorTip: true
};

export const uniRequestConfig: Partial<UniNamespace.RequestOptions> = {
  timeout: 10 * 1000
};
