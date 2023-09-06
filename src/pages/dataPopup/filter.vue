<template>
  <view class="playground popup-basic-page">
    <be-button class="open-btn" hover @click="visible = true">打开弹框</be-button>
    <be-data-popup
      v-model:visible="visible"
      title="筛选"
      theme="#4a68cc"
      @clear="onClear"
      @confirm="onConfirm"
    >
      <view class="data-popup-content">
        <view class="section">
          <view class="section-title">类型1</view>
          <view class="section-content">
            <FilterRadio v-model="filterData.type1" :options="typeOptions"></FilterRadio>
          </view>
        </view>
        <view class="section">
          <view class="section-title">类型2</view>
          <view class="section-content">
            <FilterRadio v-model="filterData.type2" :options="typeOptions"></FilterRadio>
          </view>
        </view>
      </view>
    </be-data-popup>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import FilterRadio from './FilterRadio.vue';

const visible = ref(false);

const filterData = reactive({
  type1: undefined,
  type2: undefined
});

const typeOptions = ref([
  { title: '选项1', value: 1 },
  { title: '选项2', value: 2 },
  { title: '选项3', value: 3 }
]);

const onClear = () => {
  filterData.type1 = undefined;
  filterData.type2 = undefined;
};

const onConfirm = () => {
  console.log('点击确定按钮');
};
</script>

<style lang="scss" scoped>
.popup-basic-page {
  height: 100%;

  .open-btn {
    width: 80px;
    height: 30px;
    border-radius: 8px;
    background-color: #4a68cc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #ffffff;
  }
}

.data-popup-content {
  padding: 0rpx 30rpx 10px;

  .section {
    width: 100%;

    .section-title {
      width: 100%;
      padding: 10px 0px;
    }

    .section-content {
      width: 100%;
    }
  }
}
</style>
