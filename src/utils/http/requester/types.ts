import { ContentTypeEnum } from '@/enums/httpEnum';

export interface CustomOptions {
  auth?: boolean;
  contentType?: ContentTypeEnum;
  customToken?: string | false;
  authHeader?: string;
  validateCustomStatus?: (response: any) => boolean;
  handleCustomError?: CustomErrorHandler | null;
  showCustomErrorTip?: boolean;
}

interface CustomErrorHandler {
  (response: any, options: CustomErrorOptions): void;
}

interface CustomErrorOptions {
  showErrorTip: boolean;
}
