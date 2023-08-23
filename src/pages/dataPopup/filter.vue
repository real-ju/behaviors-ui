<template>
  <view class="playground popup-basic-page">
    <view class="playground-content">
      <be-button class="open-btn" hover @click="visible = true">打开弹框</be-button>
      <be-data-popup v-model:visible="visible" title="筛选" theme="#4a68cc">
        <view class="data-popup-content">
          <view class="section">
            <view class="section-title">类型1</view>
            <view class="section-content">
              <be-radio v-model="filterData.type1" :options="typeOptions">
                <template #default="{ options, isChecked, selectItem }">
                  <view class="radio">
                    <view
                      class="item"
                      :class="{ checked: isChecked(item) }"
                      v-for="item in options"
                      :key="item.value"
                      @click="selectItem(item)"
                    >
                      {{ item.title }}
                    </view>
                  </view>
                </template>
              </be-radio>
            </view>
          </view>
          <view class="section">
            <view class="section-title">类型2</view>
            <view class="section-content">
              <be-radio v-model="filterData.type2" :options="typeOptions">
                <template #default="{ options, isChecked, selectItem }">
                  <view class="radio">
                    <view
                      class="item"
                      :class="{ checked: isChecked(item) }"
                      v-for="item in options"
                      :key="item.value"
                      @click="selectItem(item)"
                    >
                      {{ item.title }}
                    </view>
                  </view>
                </template>
              </be-radio>
            </view>
          </view>
        </view>
      </be-data-popup>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const visible = ref(false);

const filterData = reactive({
  type1: null,
  type2: null
});

const typeOptions = ref([
  { title: '选项1', value: 1 },
  { title: '选项2', value: 2 },
  { title: '选项3', value: 3 }
]);
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

      .radio {
        width: 100%;
        display: flex;
        align-items: center;

        .item {
          width: 100px;
          height: 50px;
          border-radius: 10rpx;
          background-color: #dddddd;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;

          & + .item {
            margin-left: 10px;
          }

          &.checked {
            color: #4a68cc;
            border: 2px solid #4a68cc;
          }
        }
      }
    }
  }
}
</style>
