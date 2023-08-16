<template>
  <picker-view
    :value="selectValue"
    class="be-select-view"
    :style="{ width: width, height: height }"
    :indicator-style="indicatorStyle"
    :indicator-class="indicatorClass"
    :mask-style="maskStyle"
    :mask-class="maskClass"
    @change="onPickerChange"
  >
    <picker-view-column
      v-for="(column, index1) in pickerDatas"
      :key="index1"
      :style="{ order: getColumnOrderStyle(index1) }"
    >
      <view class="picker-view-item" v-for="(item, index2) in column" :key="index2">
        {{ item.label }}
      </view>
    </picker-view-column>
  </picker-view>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Recordable } from '../../types';

import { ref, watch, nextTick } from 'vue';

let flatList: Recordable[] = [];
let flatItemId = 1;

const props = defineProps({
  modelValue: {
    type: [Number, String, Array],
    default: null
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
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '400rpx'
  },
  indicatorStyle: {
    type: String,
    default: 'height: 40px' // 不支持rpx
  },
  indicatorClass: {
    type: String,
    default: null
  },
  maskStyle: {
    type: String,
    default: null
  },
  maskClass: {
    type: String,
    default: null
  },
  // 布局方式
  layout: {
    type: String,
    default: 'default' // 可选row-reverse 水平从右到左
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const selectValue = ref<any[]>([]);
const pickerDatas = ref<any[]>([]);
let maxLevel = 0; // 级联选择层级
let updateViewLock = false;

watch(
  () => props.modelValue,
  () => {
    if (!updateViewLock) {
      updateView();
    }
  }
);

watch(
  [
    () => props.mode,
    () => props.list,
    () => props.valueName,
    () => props.labelName,
    () => props.childName
  ],
  () => {
    updateView();
  }
);

// 从内部通过emit改变modelValue时，上锁，避免watch到其变化执行不必要的更新
const lockUpdateView = () => {
  updateViewLock = true;
  setTimeout(() => {
    updateViewLock = false;
  }, 100);
};

const getColumnOrderStyle = (index: number) => {
  return props.layout === 'row-reverse' ? pickerDatas.value.length - index : null;
};

// 重置v-model为默认值
const clear = () => {
  if (props.mode === 'single') {
    emit('update:modelValue', null);
  } else if (props.mode === 'multiple' || props.mode === 'cascade') {
    emit('update:modelValue', []);
  }
};

const updateModelValue = () => {
  let newValue = selectValue.value.map((item, index) => {
    let column = pickerDatas.value[index];
    let data = column && column[item];

    return data ? data.value : null;
  });

  if (newValue.indexOf(null) !== -1) {
    return;
  }

  if (props.mode === 'single') {
    newValue = newValue[0];
  }

  lockUpdateView();
  emit('update:modelValue', newValue);
};

const onPickerChange = (event: any) => {
  let newValue = event.detail.value;
  let index = selectValue.value.findIndex((item, index) => {
    return item !== newValue[index];
  });
  if (index !== -1) {
    if (props.mode === 'single' || props.mode === 'multiple') {
      selectValue.value = newValue;
    } else if (props.mode === 'cascade') {
      if (index < selectValue.value.length - 1) {
        newValue.splice(
          index + 1,
          newValue.length - index - 1,
          ...new Array(newValue.length - index - 1).fill(0)
        );
      }
      selectValue.value = newValue;
      updatePickerDatas(index);
    }

    updateModelValue();
    emit('change', selectValue.value, index);
  }
};

const initFlatList = () => {
  flatList = [];
  flatItemId = 1;

  // 构建flatList
  resolveDatas();

  // 根据level排序
  flatList.sort((a, b) => {
    if (a.level < b.level) {
      return -1;
    }
    if (a.level > b.level) {
      return 1;
    }
    return 0;
  });
};

const resolveDatas = (datas?: Recordable[], parentId = 0, level = 1) => {
  if (!datas) {
    datas = props.list;
  }

  datas.forEach((item) => {
    let flatItem = {
      id: flatItemId++,
      value: item[props.valueName],
      label: item[props.labelName],
      parentId,
      level
    };

    flatList.push(flatItem);

    let children = item[props.childName];

    if (children) {
      resolveDatas(children, flatItem.id, level + 1);
    }
  });
};

// 级联选择模式
const updatePickerDatas = (columnIndex = -1) => {
  // index 表示pickerDatas项的序号
  for (let index = 0; index < maxLevel; index++) {
    if (index > columnIndex) {
      let column = pickerDatas.value[index];

      let beforeColumn = pickerDatas.value[index - 1];
      let beforeSelectIndex = selectValue.value[index - 1];
      let parentId: number;
      if (index === 0) {
        parentId = 0;
      } else {
        let beforeData = beforeColumn[beforeSelectIndex];
        if (!beforeData) {
          break;
        }
        parentId = beforeData.id;
      }

      let datas = flatList.filter((item) => {
        return item.parentId === parentId;
      });

      if (!column) {
        pickerDatas.value.push(datas);
      } else {
        pickerDatas.value.splice(index, 1, datas);
      }
    }
  }
};

const updateSingleColumn = (index: number, columnDatas: Recordable[]) => {
  if (props.mode === 'multiple') {
    const datas = columnDatas.map((item) => {
      return {
        value: item[props.valueName],
        label: item[props.labelName]
      };
    });
    pickerDatas.value.splice(index, 1, datas);
  }
};

/**
 * 某些props在改变后需要重新初始化（更新视图）
 * 比如在网络异步获取v-model绑定值或者动态改变mode、list的场景
 */
const updateView = () => {
  nextTick(() => {
    init();
  });
};

const init = () => {
  if (props.list.length === 0) {
    selectValue.value = [];
    pickerDatas.value = [];
    return;
  }

  if (props.mode === 'single' || props.mode === 'multiple') {
    initPickerDatas();
    initSelectValue();
  } else if (props.mode === 'cascade') {
    initFlatList();
    maxLevel = flatList[flatList.length - 1].level;
    initSelectValue();
    initPickerDatas();
  }
};

const initPickerDatas = () => {
  if (props.mode === 'single') {
    let column = props.list.map((item) => {
      return {
        value: item[props.valueName],
        label: item[props.labelName]
      };
    });
    pickerDatas.value = [column];
  } else if (props.mode === 'multiple') {
    let datas: any[] = [];
    props.list.forEach((item) => {
      let column = item.map((data: Recordable) => {
        return {
          value: data[props.valueName],
          label: data[props.labelName]
        };
      });
      datas.push(column);
    });
    pickerDatas.value = datas;
  } else if (props.mode === 'cascade') {
    updatePickerDatas();
  }
};

const initSelectValue = () => {
  if (props.mode === 'single') {
    let index = pickerDatas.value[0].findIndex((item: Recordable) => {
      return item.value === props.modelValue;
    });
    if (index === -1) {
      index = 0;
    }

    selectValue.value = [index];
  } else if (props.mode === 'multiple') {
    let indexes = pickerDatas.value.map((item, index) => {
      let rstIndex = item.findIndex((data: Recordable) => {
        return data.value === (props.modelValue as Recordable[])[index];
      });
      if (rstIndex === -1) {
        rstIndex = 0;
      }

      return rstIndex;
    });

    selectValue.value = indexes;
  } else if (props.mode === 'cascade') {
    if (props.modelValue === null || (props.modelValue as Recordable[]).length === 0) {
      selectValue.value = new Array(maxLevel).fill(0);
    } else {
      let indexes: number[] = [];
      let datas: Recordable[] = []; // 所选数据项(临时)
      for (let index = 0; index < maxLevel; index++) {
        let value = (props.modelValue as Recordable[])[index];
        if (value === undefined) {
          break;
        } else {
          let level = index + 1;
          let parentId = 0;
          if (level > 1) {
            parentId = datas[index - 1].id;
          }
          let list = flatList.filter((data) => {
            return data.parentId === parentId;
          });
          let rstIndex = list.findIndex((data) => {
            return data.value === value;
          });
          if (rstIndex === -1) {
            break;
          }

          indexes.push(rstIndex);
          datas.push(list[rstIndex]);
        }
      }
      if (indexes.length < maxLevel) {
        indexes = indexes.concat(new Array(maxLevel - indexes.length).fill(0));
      }
      selectValue.value = indexes;
    }
  }
  updateModelValue();
};

init();

defineExpose({
  updateSingleColumn,
  clear
});
</script>

<script lang="ts">
export default {
  name: 'BeSelectView'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';

.be-select-view {
  .picker-view-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
