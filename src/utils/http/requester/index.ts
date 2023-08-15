import type { CustomOptions } from './types';

import { getEnv } from '@/utils/env';
import { useUserStore } from '@/store/modules/user';
import { uniRequestConfig, defaultRequestOptions } from './config';
import { ContentTypeEnum } from '@/enums/httpEnum';
import { BasicPageEnum } from '@/enums/pageEnum';
import qs from 'qs';

export const httpRequest = async (
  config: UniNamespace.RequestOptions,
  customOptions: CustomOptions = {}
) => {
  config = { ...uniRequestConfig, ...config };
  const fullOptions: Required<CustomOptions> = { ...defaultRequestOptions, ...customOptions };

  let { url, method, data, header } = config;
  header = header || {};

  // handle baseURL
  const baseURL = getEnv().VITE_API_BASE_URL;
  url = baseURL + url;

  // handle token
  const userStore = useUserStore();
  const customToken = fullOptions.customToken;
  if (fullOptions.auth && (userStore.isLogin || customToken)) {
    const token = customToken ? customToken : userStore.getToken;
    header[fullOptions.authHeader] = `Bearer ${String(token)}`;
  }

  // handle ContentType
  const contentType = (header['Content-Type'] = fullOptions.contentType);
  if (contentType === ContentTypeEnum.FORM_URLENCODED && method && method !== 'GET' && data) {
    data = qs.stringify(data, { arrayFormat: 'brackets' });
  }

  const response = await uni.request({
    url,
    method,
    data,
    header
  });

  if (fullOptions.validateCustomStatus(response)) {
    return response.data;
  } else {
    handleResponseError(response, fullOptions);
    throw response;
  }
};

const handleResponseError = (response: any, customOptions: Required<CustomOptions>): void => {
  const code = +response.data.code;
  if (code === 10001) {
    const userStore = useUserStore();
    userStore.logout();
    uni.reLaunch({
      url: BasicPageEnum.LOGIN
    });
  }
  const handleCustomError = customOptions.handleCustomError;

  handleCustomError &&
    handleCustomError(response, {
      showErrorTip: customOptions.showCustomErrorTip
    });
};
