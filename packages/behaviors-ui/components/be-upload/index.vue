<template>
  <slot
    :fileList="fileList"
    :chooseImage="chooseImage"
    :chooseVideo="chooseVideo"
    :previewImage="previewImage"
    :remove="remove"
    :clear="clear"
    :upload="upload"
    :reUpload="reUpload"
  >
  </slot>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type {
  FullChooseImageConfig,
  FullChooseVideoConfig,
  ChooseImageConfig,
  ChooseVideoConfig,
  DefaultFileList,
  UploadFile,
  FileList,
  UploadHooks
} from './types';
import type { Recordable } from '../../types';
import { FileType, UploadStatus } from './types';

import { ref, computed, watch } from 'vue';

const defaultChooseImageConfig: FullChooseImageConfig = {
  count: 9,
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera'],
  maxSize: 10240 // 默认10M
};

const defaultChooseVideoConfig: FullChooseVideoConfig = {
  sourceType: ['album', 'camera'],
  compressed: true,
  maxDuration: 60,
  camera: 'back',
  maxSize: 102400 // 默认100M 安卓APP平台最大限制为180M
};

const props = defineProps({
  // 当前上传成功文件url列表（v-model）
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => {
      return [];
    }
  },
  /**
   * 默认显示已上传的文件列表
   * -更改后会重新初始化fileList
   * -初始化时会自动更新v-model值
   */
  defaultFileList: {
    type: Array as PropType<DefaultFileList>,
    default: () => {
      return [];
    }
  },
  // 选择图片配置
  chooseImageConfig: {
    type: Object as PropType<ChooseImageConfig>,
    default: () => {
      /**
       * https://uniapp.dcloud.io/api/media/image?id=chooseimage接口包含的参数
       * maxSize: Number 单位KB 选择图片最大大小
       */
      return {};
    }
  },
  // 选择视频配置
  chooseVideoConfig: {
    type: Object as PropType<ChooseVideoConfig>,
    default: () => {
      /**
       * https://uniapp.dcloud.io/api/media/video?id=choosevideo接口包含的参数
       * maxSize: Number 单位KB 选择视频最大大小
       */
      return {};
    }
  },
  autoUpload: {
    type: Boolean,
    default: true
  },
  maxCount: {
    type: Number,
    default: Infinity
  },
  action: {
    type: String,
    default: ''
  },
  header: {
    type: Object as PropType<Recordable>,
    default: () => {
      return {};
    }
  },
  formData: {
    type: Object as PropType<Recordable>,
    default: () => {
      return {};
    }
  },
  hooks: {
    type: Object as PropType<UploadHooks>,
    default: () => {
      return {
        onResponse: (res: any) => {
          return res.url;
        }
      };
    }
  }
});

const emit = defineEmits(['update:modelValue']);

const fileList = ref<FileList>([]);

// 是否超出文件数量限制
const isOverCount = computed(() => {
  return fileList.value.length >= props.maxCount;
});

watch(
  () => props.defaultFileList,
  () => {
    initFileList();
  }
);

const initFileList = () => {
  if (props.defaultFileList.length > props.maxCount) {
    props.hooks.onOverCount && props.hooks.onOverCount();
    throw 'default-file-list超出文件数量限制';
  }

  fileList.value = props.defaultFileList.map((item) => {
    let uuid = createUUID();
    return {
      uuid,
      type: item.type || FileType.IMAGE,
      name: item.name || uuid,
      url: item.url,
      status: UploadStatus.SUCCESS,
      progress: 100
    };
  });
  updateModel();
};

const checkChooseFilesOverCount = (num: number) => {
  return num + fileList.value.length > props.maxCount;
};

const chooseImage = (config: ChooseImageConfig = {}) => {
  if (isOverCount.value) {
    props.hooks.onOverCount && props.hooks.onOverCount();
    throw '超出文件数量限制';
  }

  let computedConfig = {
    ...defaultChooseImageConfig,
    ...props.chooseImageConfig,
    ...config
  };

  uni.chooseImage({
    ...computedConfig,
    success: (res) => {
      let tempFiles: any = res.tempFiles;
      tempFiles = Array.isArray(tempFiles) ? tempFiles : [tempFiles];

      if (checkChooseFilesOverCount(tempFiles.length)) {
        props.hooks.onOverCount && props.hooks.onOverCount();
        const error = new Error('超出文件数量限制');
        error.name = 'OverCountError';
        throw error;
      }

      let maxSize = computedConfig.maxSize;
      let limitFile = tempFiles.find((item: any) => {
        return item.size > maxSize * 1024;
      });
      if (limitFile) {
        props.hooks.onOversize &&
          props.hooks.onOversize({
            type: 'image'
          });
        return;
      }

      let files = tempFiles.map((item: any) => {
        let uuid = createUUID();
        return {
          uuid,
          type: FileType.IMAGE,
          name: (item.name as string) || uuid,
          url: item.path as string,
          status: UploadStatus.LOCAL,
          progress: 0
        };
      });
      fileList.value.push(...files);
      props.hooks.onChooseComplete && props.hooks.onChooseComplete(res);
      if (props.autoUpload) {
        upload();
      }
    },
    fail: (error) => {
      if (error.name === 'OverCountError') {
        throw error.message;
      } else {
        props.hooks.onChooseFail && props.hooks.onChooseFail(error);
      }
    }
  });
};

const chooseVideo = (config: ChooseVideoConfig = {}) => {
  if (isOverCount.value) {
    props.hooks.onOverCount && props.hooks.onOverCount();
    throw '超出文件数量限制';
  }

  let computedConfig = {
    ...defaultChooseVideoConfig,
    ...props.chooseVideoConfig,
    ...config
  };

  uni.chooseVideo({
    ...computedConfig,
    success: (res) => {
      let maxSize = computedConfig.maxSize;
      let isOversize = res.size > maxSize * 1024;
      if (isOversize) {
        props.hooks.onOversize &&
          props.hooks.onOversize({
            type: 'video'
          });
        return;
      }

      let uuid = createUUID();
      let file = {
        uuid,
        type: FileType.VIDEO,
        name: res.name || uuid,
        url: res.tempFilePath,
        status: UploadStatus.LOCAL,
        progress: 0
      };
      fileList.value.push(file);
      props.hooks.onChooseComplete && props.hooks.onChooseComplete(res);
      if (props.autoUpload) {
        upload();
      }
    },
    fail: (error) => {
      props.hooks.onChooseFail && props.hooks.onChooseFail(error);
    }
  });
};

const previewImage = (file: UploadFile) => {
  if (file.type === FileType.IMAGE) {
    uni.previewImage({
      urls: [file.url]
    });
  }
};

const remove = (file: UploadFile) => {
  let index = fileList.value.findIndex((item) => {
    return item.uuid === file.uuid;
  });

  if (index !== -1) {
    let fileStatus = file.status;
    fileList.value.splice(index, 1);
    if (fileStatus === UploadStatus.SUCCESS) {
      updateModel();
    }
  }
};

const clear = () => {
  fileList.value = [];
  updateModel();
};

const updateModel = () => {
  let successFiles = fileList.value.filter((item) => {
    return item.status === UploadStatus.SUCCESS;
  });
  let urls = successFiles.map((item) => {
    return item.url;
  });

  emit('update:modelValue', urls);
};

const upload = async (singleFile: UploadFile | null = null) => {
  let uploadFiles: FileList = [];
  if (singleFile) {
    if (singleFile.status === UploadStatus.LOCAL) {
      uploadFiles = [singleFile];
    }
  } else {
    uploadFiles = fileList.value.filter((item) => {
      return item.status === UploadStatus.LOCAL;
    });
  }

  if (uploadFiles.length === 0) {
    throw '暂无可上传的文件';
  }

  let tasks = uploadFiles.map((file) => {
    return new Promise((resolve, reject) => {
      file.status = UploadStatus.PROGRESS;
      let uploadTask = uni.uploadFile({
        url: props.action,
        fileType: file.type,
        filePath: file.url,
        name: 'file',
        header: props.header,
        formData: props.formData,
        success: (res) => {
          if (res.statusCode !== 200 || !res.data) {
            reject(res);
            return;
          }
          const _res = JSON.parse(res.data);
          let url = props.hooks.onResponse(_res);
          if (url) {
            file.url = url;
            file.status = UploadStatus.SUCCESS;
            file.progress = 100;
            file.response = _res;
            updateModel();
            resolve(res);
          } else {
            file.status = UploadStatus.ERROR;
            file.progress = 0;
            reject(res);
          }
        },
        fail: (error) => {
          file.status = UploadStatus.ERROR;
          file.progress = 0;
          reject(error);
        }
      });
      uploadTask.onProgressUpdate((res) => {
        file.progress = res.progress;
      });
    });
  });
  const uploadRes = await Promise.allSettled(tasks).then((results: any[]) => {
    const res = results.map((item) => {
      return item.status === 'fulfilled' ? JSON.parse(item.value.data) : item.reason;
    });
    props.hooks.onUploaded && props.hooks.onUploaded(res);
    return res;
  });
  return uploadRes;
};

const reUpload = async (singleFile: UploadFile | null = null) => {
  if (singleFile) {
    let file = singleFile;
    if (file.status === UploadStatus.ERROR) {
      file.status = UploadStatus.LOCAL;
      return upload(file);
    } else {
      throw '只有错误状态的文件才能重新上传';
    }
  } else {
    fileList.value.forEach((item) => {
      if (item.status === UploadStatus.ERROR) {
        item.status = UploadStatus.LOCAL;
      }
    });
    return upload();
  }
};

const createUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

initFileList();

defineExpose({
  fileList,
  chooseImage,
  chooseVideo,
  previewImage,
  remove,
  clear,
  upload,
  reUpload
});
</script>

<script lang="ts">
export default {
  name: 'BeUpload'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';
</style>
