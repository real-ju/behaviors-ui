<template>
  <BeDataPopup
    class="be-select"
    :visible="visible"
    @update:visible="onVisibleUpdate"
    height="720rpx"
    :title="title"
    :clear-text="clearText"
    :confirm-text="confirmText"
    :mask-close-able="maskCloseAble"
    :action-close-able="actionCloseAble"
    :theme="theme"
    @confirm="onConfirm"
    @clear="onClear"
  >
    <BeSelectView
      v-model="innerValue"
      :mode="mode"
      :list="list"
      :value-name="valueName"
      :label-name="labelName"
      :child-name="childName"
      @change="onSelectViewChange"
      ref="selectView"
      :layout="layout"
    >
    </BeSelectView>
  </BeDataPopup>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Recordable } from '../../types';

import { ref, watch } from 'vue';
import BeDataPopup from '../be-data-popup/index.vue';
import BeSelectView from '../be-select-view/index.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Number, String, Array],
    default: null
  },
  title: {
    type: String,
    default: '请选择'
  },
  clearText: {
    type: String,
    default: '清空'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  maskCloseAble: {
    type: Boolean,
    default: true
  },
  // 点击确定或清空按钮后关闭弹出层
  actionCloseAble: {
    type: Boolean,
    default: true
  },
  mode: {
    type: String,
    default: 'single' // 可选 cascade 级联选择 multiple 多项选择
  },
  list: {
    type: Array as PropType<Recordable[]>,
    default: () => {
      return [];
    }
  },
  // 自定义list数据的value属性名
  valueName: {
    type: String,
    default: 'value'
  },
  // 自定义list数据的label属性名
  labelName: {
    type: String,
    default: 'label'
  },
  // 自定义list数据的children属性名
  childName: {
    type: String,
    default: 'children'
  },
  layout: {
    type: String,
    default: 'default'
  },
  theme: {
    type: String,
    default: '#2979ff'
  }
});

const emit = defineEmits(['update:value', 'update:visible', 'change', 'clear', 'confirm']);

const innerValue = ref<any>(props.value);
const selectView = ref();

watch(
  () => props.value,
  (val) => {
    innerValue.value = val;
  }
);

watch(
  () => props.visible,
  (val) => {
    // 每次打开时将innerValue重置为v-model:value绑定的值
    if (val) {
      innerValue.value = props.value;
    }
  }
);

const onVisibleUpdate = (value: boolean) => {
  emit('update:visible', value);
};

const onSelectViewChange = (selectIndexes: number[], changeIndex: number) => {
  emit('change', selectIndexes, changeIndex);
};

const onClear = () => {
  selectView.value.clear();

  emit('update:value', innerValue.value);
  emit('clear');

  if (props.actionCloseAble) {
    close();
  }
};

const onConfirm = () => {
  emit('update:value', innerValue.value);
  emit('confirm');

  if (props.actionCloseAble) {
    close();
  }
};

const updateSingleColumn = (index: number, columnDatas: Recordable[]) => {
  selectView.value.updateSingleColumn(index, columnDatas);
};

const close = () => {
  emit('update:visible', false);
};

defineExpose({
  updateSingleColumn
});
</script>

<script lang="ts">
export default {
  name: 'BeSelect'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';
</style>
