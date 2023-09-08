<template>
  <view class="playground upload-image-page">
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
  </view>
</template>

<script setup lang="ts">
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
</script>

<style lang="scss" scoped>
.upload-image-page {
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
}
</style>
