/// <reference types="@dcloudio/types" />

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video'
}

export enum UploadStatus {
  LOCAL = 'local',
  PROGRESS = 'progress',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface UploadFile {
  // 文件唯一标识
  uuid: string;
  // 文件类型
  type: FileType;
  // 文件名
  name: string;
  // 文件URL
  url: string;
  // 上传状态
  status: UploadStatus;
  // 上传进度
  progress: number;
  // 服务器原始返回值
  response?: any;
}

export type DefaultFileList = Array<Pick<UploadFile, 'type' | 'name' | 'url'>>;
export type FileList = Array<UploadFile>;

export type FullChooseImageConfig = Required<
  Pick<UniNamespace.ChooseImageOptions, 'count' | 'sizeType' | 'sourceType'>
> & {
  /**
   * 图片最大限制 默认10M
   */
  maxSize: number;
};

export type ChooseImageConfig = Partial<FullChooseImageConfig>;

export type FullChooseVideoConfig = Required<
  Pick<UniNamespace.ChooseVideoOptions, 'sourceType' | 'compressed' | 'maxDuration' | 'camera'>
> & {
  /**
   * 视频最大限制 默认100M 安卓APP平台最大限制为180M
   */
  maxSize: number;
};

export type ChooseVideoConfig = Partial<FullChooseVideoConfig>;

export interface UploadHooks {
  /**
   * 文件上传接口调用成功（每个文件触发一次）
   * @param {*} res 从服务器返回的数据
   * @returns 返回值为文件url，没有返回值则表示上传失败
   */
  onResponse: (res: any) => string | null | undefined;
  /**
   * 全部文件上传完毕
   */
  onUploaded?: (results: any[]) => void;
  /**
   * 文件选择完成
   * @param {*} res uni.chooseImage返回的数据
   */
  onChooseComplete?: (res: any) => void;
  /**
   * 文件选择失败
   * @param {*} error uni.chooseImage返回的数据
   */
  onChooseFail?: (error: any) => void;
  /**
   * 文件大小超出限制
   * @param {*} error error.type 哪一种文件类型 image | video
   */
  onOversize?: (error: any) => void;
  /**
   * 文件数量超出限制
   */
  onOverCount?: () => void;
}

// 获取formData的工厂函数
export type FormDataFactory = (file: UploadFile) => Recordable;
