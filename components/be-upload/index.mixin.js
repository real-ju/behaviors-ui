const defaultChooseImageConfig = {
  count: 9,
  sizeType: ["original", "compressed"],
  sourceType: ["album", "camera"],
  maxSize: 10240, // 默认10M
};

const defaultChooseVideoConfig = {
  sourceType: ["album", "camera"],
  compressed: true,
  maxDuration: 60,
  camera: "back",
  maxSize: 102400, // 默认100M 安卓APP平台最大限制为180M
};

export default {
  name: "BeUpload",
  props: {
    // 当前上传成功文件url列表（v-model）
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * 默认显示已上传的文件列表
     * -更改后会重新初始化fileList
     * -初始化时会自动更新v-modal值
     */
    defaultFileList: {
      type: Array,
      default: () => {
        /**
         * 数组项规范：
         * type: 'image' | 'video'
         * name: String 文件名
         * url: String 文件url
         */
        return [];
      },
    },
    // 选择图片配置
    chooseImageConfig: {
      type: Object,
      default: () => {
        /**
         * https://uniapp.dcloud.io/api/media/image?id=chooseimage接口包含的参数
         * maxSize: Number 单位KB 选择图片最大大小
         */
        return {};
      },
    },
    // 选择视频配置
    chooseVideoConfig: {
      type: Object,
      default: () => {
        /**
         * https://uniapp.dcloud.io/api/media/video?id=choosevideo接口包含的参数
         * maxSize: Number 单位KB 选择视频最大大小
         */
        return {};
      },
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    maxCount: {
      type: Number,
      default: Infinity,
    },
    action: {
      type: String,
      default: "",
    },
    header: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  computed: {
    // 是否超出文件数量限制
    isOverCount() {
      return this.fileList.length >= this.maxCount;
    },
  },
  watch: {
    defaultFileList(val) {
      this.initFileList();
    },
  },
  created() {
    this.initFileList();
  },
  methods: {
    initFileList() {
      if (this.defaultFileList.length > this.maxCount) {
        this.onOverCount();
        throw "default-file-list超出文件数量限制";
      }

      this.fileList = this.defaultFileList.map((item) => {
        let uuid = createUUID();
        return {
          uuid,
          type: item.type || "image",
          name: item.name || uuid,
          url: item.url,
          status: "success",
          progress: 100,
        };
      });
      this.updateModel();
    },
    checkChooseFilesOverCount(num) {
      return num + this.fileList.length > this.maxCount;
    },
    chooseImage(config = {}) {
      if (this.isOverCount) {
        this.onOverCount();
        throw "超出文件数量限制";
      }

      let computedConfig = {
        ...defaultChooseImageConfig,
        ...this.chooseImageConfig,
        ...config,
      };

      uni.chooseImage({
        ...computedConfig,
        success: (res) => {
          let tempFiles = res.tempFiles;

          if (this.checkChooseFilesOverCount()) {
            this.onOverCount();
            const error = new Error("超出文件数量限制");
            error.name = "OverCountError";
            throw error;
          }

          let maxSize = computedConfig.maxSize;
          let limitFile = tempFiles.find((item) => {
            return item.size > maxSize * 1024;
          });
          if (limitFile) {
            this.onOversize({
              type: "image",
            });
            return;
          }

          let files = tempFiles.map((item) => {
            let uuid = createUUID();
            return {
              uuid,
              type: "image",
              name: item.name || uuid,
              url: item.path,
              status: "local",
              progress: 0,
            };
          });
          this.fileList.push(...files);
          this.onChooseComplete(res);
          if (this.autoUpload) {
            this.upload();
          }
        },
        fail: (error) => {
          if (error.name === "OverCountError") {
            throw error.message;
          } else {
            this.onChooseFail(error);
          }
        },
      });
    },
    chooseVideo(config = {}) {
      if (this.isOverCount) {
        this.onOverCount();
        throw "超出文件数量限制";
      }

      let computedConfig = {
        ...defaultChooseVideoConfig,
        ...this.chooseVideoConfig,
        ...config,
      };

      uni.chooseVideo({
        ...computedConfig,
        success: (res) => {
          let maxSize = computedConfig.maxSize;
          let isOversize = res.size > maxSize * 1024;
          if (isOversize) {
            this.onOversize({
              type: "video",
            });
            return;
          }

          let uuid = createUUID();
          let file = {
            uuid,
            type: "video",
            name: res.name || uuid,
            url: res.tempFilePath,
            status: "local",
            progress: 0,
          };
          this.fileList.push(file);
          this.onChooseComplete(res);
          if (this.autoUpload) {
            this.upload();
          }
        },
        fail: (error) => {
          this.onChooseFail(error);
        },
      });
    },
    previewImage(file) {
      if (file.type === "image") {
        uni.previewImage({
          urls: [file.url],
        });
      }
    },
    remove(file) {
      let index = this.fileList.findIndex((item) => {
        return item.uuid === file.uuid;
      });

      if (index !== -1) {
        let fileStatus = file.status;
        this.fileList.splice(index, 1);
        if (fileStatus === "success") {
          this.updateModel();
        }
      }
    },
    clear() {
      this.fileList = [];
      this.updateModel();
    },
    updateModel() {
      let successFiles = this.fileList.filter((item) => {
        return item.status === "success";
      });
      let urls = successFiles.map((item) => {
        return item.url;
      });

      this.$emit("input", urls);
    },
    upload(singleFile = null) {
      let uploadFiles = [];
      if (singleFile) {
        if (singleFile.status === "local") {
          uploadFiles = [singleFile];
        }
      } else {
        uploadFiles = this.fileList.filter((item) => {
          return item.status === "local";
        });
      }

      if (uploadFiles.length === 0) {
        return;
      }

      let tasks = uploadFiles.map((file) => {
        return new Promise((resolve, reject) => {
          file.status = "progress";
          let uploadTask = uni.uploadFile({
            url: this.action,
            fileType: file.type,
            filePath: file.url,
            name: "file",
            header: this.header,
            formData: this.formData,
            success: (res) => {
              let url = this.onResponse(JSON.parse(res.data));
              if (url) {
                file.url = url;
                file.status = "success";
                file.progress = 100;
                this.updateModel();
                resolve(res);
              } else {
                file.status = "error";
                file.progress = 0;
                reject(res);
              }
            },
            fail: (error) => {
              file.status = "error";
              file.progress = 0;
              reject(error);
            },
          });
          uploadTask.onProgressUpdate((res) => {
            file.progress = res.progress;
          });
        });
      });
      Promise.allSettled(tasks).then((results) => {
        this.onUploaded(results);
      });
    },
    reUpload(singleFile = null) {
      if (singleFile) {
        let file = singleFile;
        if (file.status === "error") {
          file.status = "local";
          this.upload(file);
        }
      } else {
        this.fileList.forEach((item) => {
          if (item.status === "error") {
            item.status = "local";
          }
        });
        this.upload();
      }
    },

    /**
     * 全部文件上传完毕
     */
    onUploaded(results) {},

    /**
     * 文件上传接口调用成功（每个文件触发一次）
     * @param {*} res 从服务器返回的数据
     * @returns 返回值为文件url，没有返回值则表示上传失败
     */
    onResponse(res) {
      return res.url;
    },

    /**
     * 文件选择完成
     * @param {*} res
     */
    onChooseComplete(res) {},

    /**
     * 文件选择失败
     * @param {*} error
     */
    onChooseFail(error) {},

    /**
     * 文件大小超出限制
     * @param {*} error error.type 哪一种文件类型 image | video
     */
    onOversize(error) {},

    /**
     * 文件数量超出限制
     */
    onOverCount() {},
  },
};

function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
