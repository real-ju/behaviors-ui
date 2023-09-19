# Upload 上传

## 场景-多图上传

::: code-group

```html [template]
<be-upload
  v-model="imageList"
  ref="uploaderRef"
  :auto-upload="false"
  :max-count="9"
  :action="action"
  :header="header"
  :hooks="{
    onResponse: onUploadResponse
  }"
>
  <template #default="{ fileList, chooseImage, previewImage, remove }">
    <view class="file-list">
      <view v-if="fileList.length < 9" class="add-btn" @click="chooseImage">+</view>
      <view class="file-item" v-for="file in fileList" :key="file.uuid">
        <view class="remove-btn" @click="remove(file)">×</view>
        <image :src="file.url" mode="scaleToFill" @click="previewImage(file)" />
      </view>
    </view>
  </template>
</be-upload>
<be-button class="upload-btn" hover @click="upload">上传</be-button>
```

```ts [script]
import { ref } from 'vue';

const imageList = ref<string[]>([]);
const uploaderRef = ref();
const action = '/'; // 上传接口地址
const header = {
  Authorization: 'token' // token鉴权
};

const onUploadResponse = (res: any) => {
  return res.data.url; // 上传接口响应中取到图片url
};

const upload = async () => {
  if (uploaderRef.value.fileList.length === 0) {
    console.log('请添加图片');
    return;
  }
  await uploaderRef.value.upload();
};
```

```scss [style scoped]
.file-list {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .add-btn,
  .file-item {
    width: calc((750rpx - 32px - 32px) / 3);
    height: calc((750rpx - 32px - 32px) / 3);
    border-radius: 6px;
    margin-top: 16px;
    margin-right: 16px;
    background-color: #eef1f9;
  }

  .add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: #999999;
    transition: all 0.2s;

    &:active {
      background-color: darken(#eef1f9, 5%);
    }
  }

  .file-item {
    position: relative;

    &:nth-child(3n) {
      margin-right: 0px;
    }

    .remove-btn {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #fa3636;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -8px;
      right: -8px;
      z-index: 1;
    }

    image {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }
}

.upload-btn {
  width: 100%;
  margin-top: 16px;
  height: 36px;
  border-radius: 10px;
  background-color: #4a68cc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
}
```

:::

<ExampleIframe url="/pages/upload/image" height="500px" maxWidth="375px"></ExampleIframe>

## API

### Props

| 属性名              | 说明                                                | 类型                                                   | 默认值                                  |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------ | --------------------------------------- |
| modelValue(v-model) | 当前上传成功的文件 url 列表                         | `string[]`                                             | `[]`                                    |
| defaultFileList     | 默认已上传的文件列表，初始化时会自动更新 v-model 值 | `Array<{ type: FileType, name: string, url: string }>` | `[]`                                    |
| chooseImageConfig   | 选择图片配置                                        | `ChooseImageConfig`                                    | -                                       |
| chooseVideoConfig   | 选择视频配置                                        | `ChooseVideoConfig`                                    | -                                       |
| autoUpload          | 选择文件后是否自动上传                              | boolean                                                | true                                    |
| maxCount            | 可上传文件数量限制                                  | number                                                 | Infinity                                |
| action              | 上传接口地址                                        | string                                                 | -                                       |
| header              | 上传请求头部                                        | object                                                 | -                                       |
| formData            | 上传请求额外参数                                    | `object \| FormDataFactory`                            | -                                       |
| hooks               | 上传钩子函数，必须有 onResponse 钩子函数            | `UploadHooks`                                          | `{ onResponse: (res: any) => res.url }` |

### Slots

| 插槽名  | 说明                               | slot props                                                                              | 默认值 |
| ------- | ---------------------------------- | --------------------------------------------------------------------------------------- | ------ |
| default | 上传视图。props 详细说明参见下方。 | `{ fileList, chooseImage, chooseVideo, previewImage, remove, clear, upload, reUpload }` | 无     |

### Readonly Data

| 数据名   | 说明     | 类型            |
| -------- | -------- | --------------- |
| fileList | 文件列表 | `Ref<FileList>` |

### Methods

| 方法名       | 说明                                                             | 参数                                                                    |
| ------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| chooseImage  | 选择图片                                                         | `(config?: ChooseImageConfig) => void`                                  |
| chooseVideo  | 选择视频                                                         | `(config?: ChooseVideoConfig) => void`                                  |
| previewImage | 预览图片                                                         | `(file: UploadFile) => void`                                            |
| remove       | 从列表移除文件                                                   | `(file: UploadFile) => void`                                            |
| clear        | 清空文件列表                                                     | `() => void`                                                            |
| upload       | 上传文件。`file`参数不传则上传所有文件。                         | `(file?: UploadFile) => Promise<Array<{ file: UploadFile, result: any }>>` |
| reUpload     | 重新上传失败状态的文件。`file`参数不传则上传所有失败状态的文件。 | `(file?: UploadFile) => Promise<Array<{ file: UploadFile, result: any }>>` |

### Types

| 类型名             | 值                                                                                                                                                                                      | 说明                                                                                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FileType           | `'image' \| 'video'`                                                                                                                                                                    | -                                                                                                                                                               |
| ChooseImageConfig  | `Pick<UniNamespace.ChooseImageOptions, 'count' \| 'sizeType' \| 'sourceType'> & { maxSize?: number }`                                                                                   | `UniNamespace.ChooseImageOptions`：[uni.chooseImage](https://uniapp.dcloud.net.cn/api/media/image.html) 的参数。maxSize：选择图片最大限制（单位 KB），默认 10M  |
| ChooseVideoConfig  | `Pick<UniNamespace.ChooseVideoOptions, 'sourceType' \| 'compressed' \| 'maxDuration' \| 'camera'> & { maxSize?: number }`                                                               | `UniNamespace.ChooseVideoOptions`：[uni.chooseVideo](https://uniapp.dcloud.net.cn/api/media/video.html) 的参数。maxSize：选择视频最大限制（单位 KB），默认 100M |
| UploadHooks        | `{ onResponse: ResponseHook, onUploaded?: UploadedHook, onChooseComplete?: ChooseCompleteHook, onChooseFail?: ChooseFailHook, onOversize?: OversizeHook, onOverCount?: OverCountHook }` | -                                                                                                                                                               |
| ResponseHook       | `(res: any) => string \| null \| undefined`                                                                                                                                             | 上传接口请求成功（状态码 200），每个文件会触发一次。参数`res`为接口返回的数据，函数需返回文件的 url，返回值为空则表示上传失败                                   |
| UploadedHook       | `(results: any[]) => void`                                                                                                                                                              | 全部文件上传完毕（包括失败）                                                                                                                                    |
| ChooseCompleteHook | `(res: any) => void`                                                                                                                                                                    | 文件选择完成                                                                                                                                                    |
| ChooseFailHook     | `(error: any) => void`                                                                                                                                                                  | 文件选择失败                                                                                                                                                    |
| OversizeHook       | `(error: { type: FileType }) => void`                                                                                                                                                   | 文件大小超出限制                                                                                                                                                |
| OverCountHook      | `() => void`                                                                                                                                                                            | 文件数量超出限制                                                                                                                                                |
| FileList           | `Array<UploadFile>`                                                                                                                                                                     | 文件列表                                                                                                                                                        |
| UploadFile         | `{ uuid: string, type: FileType, name: string, url: string, status: UploadStatus, progress: number, response?: any }`                                                                   | 文件对象                                                                                                                                                        |
| UploadStatus       | `'local' \|'progress' \|'success' \|'error'`                                                                                                                                            | 文件状态。`local`本地 `progress`上传中 `success`上传成功 `error`上传失败                                                                                        |
| FormDataFactory    | `(file: UploadFile) => object`                                                                                                                                                          | 获取 formData 的工厂函数                                                                                                                                        |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
