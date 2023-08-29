<template>
  <be-radio
    :modelValue="modelValue"
    :options="options"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template #default="{ options, isChecked, selectItem }">
      <view class="filter-radio">
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
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined
  },
  options: {
    type: Array,
    default: () => {
      return [];
    }
  }
});
</script>

<style lang="scss" scoped>
.filter-radio {
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
</style>
