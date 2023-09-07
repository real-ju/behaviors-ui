<template>
  <view class="playground lazy-list-basic-page">
    <be-lazy-list v-model="list" @load="loadData" pullDownRefresh>
      <view class="list">
        <view class="item" v-for="item in list" :key="item.id">{{ item.title }}</view>
      </view>
    </be-lazy-list>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const list = ref<any[]>([]);

const loadData = (page: number, onLoadSuccess: Function, onLoadError: Function, first: boolean) => {
  // 模拟加载5页数据
  setTimeout(() => {
    if (page <= 5) {
      onLoadSuccess([
        {
          id: 3 * (page - 1) + 1,
          title: `数据${3 * (page - 1) + 1}`
        },
        {
          id: 3 * (page - 1) + 2,
          title: `数据${3 * (page - 1) + 2}`
        },
        {
          id: 3 * (page - 1) + 3,
          title: `数据${3 * (page - 1) + 3}`
        }
      ]);
    } else {
      onLoadSuccess(); // 或者onLoadSuccess([])
    }
  }, 1000);
};
</script>

<style lang="scss" scoped>
.lazy-list-basic-page {
  height: 100%;
  padding: 0px;

  .list {
    width: 100%;
    padding: 0px 16px;

    .item {
      width: 100%;
      padding: 30px 0px;
      font-size: 15px;

      & + .item {
        border-top: 1px solid #eeeeee;
      }
    }
  }
}
</style>
