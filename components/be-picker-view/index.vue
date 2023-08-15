<template>
  <BeSelectView
    v-model="selectValue"
    @update:modelValue="onSelectViewInput"
    :mode="selectMode"
    :list="selectList"
    :value-name="selectValueName"
    :label-name="selectLabelName"
    @change="onSelectViewChange"
    ref="selectView"
    :width="width"
    :height="height"
    :indicator-style="indicatorStyle"
    :indicator-class="indicatorClass"
    :mask-style="maskStyle"
    :mask-class="maskClass"
    :layout="layout"
  >
  </BeSelectView>
</template>

<script setup lang="ts">
/**
 * picker和picker-view两个组件有大部分逻辑代码是相同的
 * 在维护时需要注意同步
 */
import type { PropType } from 'vue';

import { ref, computed, nextTick } from 'vue';
import BeSelectView from '../be-select-view/index.vue';
import regionJsonData from '../../assets/region/region.json';

const timeMarkMap = ['second', 'minute', 'hour', 'day', 'month', 'year'];

const timeChineseMap: Recordable = {
  year: '年',
  month: '月',
  day: '日',
  hour: '时',
  minute: '分',
  second: '秒'
};

const basicTimeRange: Recordable = {
  year: [1970, 2030],
  month: [1, 12],
  day: [1, 31],
  hour: [0, 23],
  minute: [0, 59],
  second: [0, 59]
};

const smallMonths = [4, 6, 9, 11];

const props = defineProps({
  mode: {
    type: String,
    default: 'time' // 默认时间选择 可选region 地区选择
  },
  modelValue: {
    type: [String, Array],
    default: ''
  },
  timeFormat: {
    type: String,
    default: 'yyyy-MM-dd' // 年yyyy 月MM 日dd 时hh 分mm 秒ss
  },
  /**
   * 时间模式 显示字段区间 数组第一项为最大值 数组第二项为最小值 只有一项表示只有一个字段
   * 可用 'second', 'minute', 'hour', 'day', 'month', 'year'
   */
  timeColumn: {
    type: Array as PropType<string[]>,
    default: () => {
      return ['year', 'day'];
    }
  },
  // 时间模式下 字段显示范围
  timeRange: {
    type: Object as PropType<Recordable>,
    default: () => {
      /**
       * 比如
       * {
       *  year: [1990, 2030]
       * }
       * 显示年份为1990-2030
       */
      return {};
    }
  },
  // 地区模式 指定默认省范围 如'北京市' 为空则表示不限制范围
  regionRange: {
    type: String,
    default: null
  },
  // 地区模式 v-modal绑定值类型 默认地区中文名 可选code 地区码
  regionValueType: {
    type: String,
    default: 'name'
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

const emit = defineEmits(['update:modelValue']);

const selectValue = ref<any[]>([]);
const selectList = ref<Recordable[]>([]);
const selectView = ref();
let columnMarks: string[] = [];
let currentDate: Recordable = {};
let legalTimeRange: Recordable = {};
let updateViewLock = false;

const selectValueName = computed(() => {
  if (props.mode === 'time') {
    return 'value';
  } else if (props.mode == 'region') {
    return props.regionValueType;
  } else {
    return 'value';
  }
});

const selectLabelName = computed(() => {
  if (props.mode === 'time') {
    return 'label';
  } else if (props.mode == 'region') {
    return 'name';
  } else {
    return 'label';
  }
});

const selectMode = computed(() => {
  let mode = '';
  if (props.mode === 'time') {
    mode = 'multiple';
  } else if (props.mode == 'region') {
    mode = 'cascade';
  }
  return mode;
});

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
    () => props.timeFormat,
    () => props.timeColumn,
    () => props.timeRange,
    () => props.regionRange,
    () => props.regionValueType
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

/**
 * 某些props在改变后需要重新初始化（更新视图）
 * 比如在网络异步获取v-model绑定值或者动态改变mode的场景
 */
const updateView = () => {
  init();
};

const onSelectViewInput = (value: any[]) => {
  if (props.mode === 'time') {
    value.forEach((item, index) => {
      let mark = columnMarks[index];
      currentDate[mark] = item;
    });
    let text = formatTime(currentDate, props.timeFormat);
    lockUpdateView();
    emit('update:modelValue', text);
  } else if (props.mode === 'region') {
    lockUpdateView();
    emit('update:modelValue', value);
  }
};

// 重置v-model为默认值
const clear = () => {
  if (props.mode === 'time') {
    emit('update:modelValue', '');
  } else if (props.mode === 'region') {
    emit('update:modelValue', []);
  }
};

const onSelectViewChange = (selectIndexes: number[], changeIndex: number) => {
  if (props.mode === 'time') {
    let mark = columnMarks[changeIndex];
    if (mark === 'year') {
      if (columnMarks.indexOf('day') !== -1) {
        let monthIndex = columnMarks.indexOf('month');
        let month = selectValue.value[monthIndex];
        if (month === 2) {
          updateDayColumn(selectIndexes);
        }
      }
    } else if (mark === 'month') {
      let dayIndex = columnMarks.indexOf('day');
      if (dayIndex !== -1) {
        updateDayColumn(selectIndexes);
      }
    }
  }
};

const updateDayColumn = (currentIndexes: number[]) => {
  let yearIndex = columnMarks.indexOf('year');
  let monthIndex = columnMarks.indexOf('month');
  let dayIndex = columnMarks.indexOf('day');

  let year =
    yearIndex !== -1
      ? selectList.value[yearIndex][currentIndexes[yearIndex]].value
      : currentDate.year;
  let month = selectList.value[monthIndex][currentIndexes[monthIndex]].value;

  let datas = getColumnDatas('day', year, month);

  selectView.value.updateSingleColumn(dayIndex, datas);
};

const init = () => {
  if (props.mode === 'time') {
    initLegalTimeRange();
    initColumnMarks();
    initSelectValue();
    initSelectList();
  } else if (props.mode === 'region') {
    initSelectList();
    initSelectValue();
  }
};

const initLegalTimeRange = () => {
  let rangeObj: Recordable = {};
  for (const key in basicTimeRange) {
    if (Object.hasOwnProperty.call(basicTimeRange, key)) {
      let rstRange;
      let userRange = props.timeRange[key];
      if (userRange) {
        if (userRange.length !== 2) {
          throw 'timeRange属性不合法';
        }

        if (userRange[0] > userRange[1]) {
          throw 'timeRange属性不合法';
        }

        if (key !== 'year') {
          if (userRange[0] < basicTimeRange[key][0] || userRange[1] > basicTimeRange[key][1]) {
            throw 'timeRange属性不合法';
          }
        }

        rstRange = userRange;
      } else {
        rstRange = basicTimeRange[key];
      }

      rangeObj[key] = rstRange;
    }
  }

  legalTimeRange = rangeObj;
};

const initColumnMarks = () => {
  // 验证column合法性
  let columnRange = props.timeColumn;

  if (columnRange.length === 0 || columnRange.length > 2) {
    throw 'column属性不合法';
  }
  if (columnRange.length === 1) {
    columnRange.push(columnRange[0]);
  }

  let startIndex = timeMarkMap.indexOf(columnRange[1]);
  let endIndex = timeMarkMap.indexOf(columnRange[0]);

  if (startIndex === -1 || endIndex === -1) {
    throw 'column属性不合法';
  }

  if (startIndex > endIndex) {
    throw 'column属性不合法';
  }

  let marks = [];

  for (let index = endIndex; index >= startIndex; index--) {
    marks.push(timeMarkMap[index]);
  }

  columnMarks = marks;
};

const initSelectValue = () => {
  if (props.mode === 'time') {
    let cDate = new Date();
    let dateObj: Recordable = {
      year: cDate.getFullYear(),
      month: cDate.getMonth() + 1,
      day: cDate.getDate(),
      hour: cDate.getHours(),
      minute: cDate.getMinutes(),
      second: cDate.getSeconds()
    };

    // 融合用户传入值
    if (props.modelValue) {
      let formatRst: any = parseTime(props.modelValue as string, props.timeFormat);
      if (formatRst === null) {
        throw '时间格式不合法';
      }

      for (const key in formatRst) {
        if (Object.hasOwnProperty.call(formatRst, key)) {
          const value = formatRst[key];
          if (value) {
            dateObj[key] = parseInt(value);
          }
        }
      }
    }

    // 验证时间合法性
    for (const key in dateObj) {
      if (Object.hasOwnProperty.call(dateObj, key)) {
        let minNum = legalTimeRange[key][0];
        let maxNum = legalTimeRange[key][1];
        if (dateObj[key] < minNum) {
          dateObj[key] = minNum;
        }
        if (dateObj[key] > maxNum) {
          dateObj[key] = maxNum;
        }
      }
    }

    // 校正日期值
    let maxDay = getDaysOfMonth(dateObj.year, dateObj.month);
    if (dateObj.day > maxDay) {
      dateObj.day = maxDay;
    }

    currentDate = dateObj;
    selectValue.value = columnMarks.map((item) => {
      return dateObj[item];
    });
  } else if (props.mode === 'region') {
    selectValue.value = props.modelValue as any[];
  }
};

const getColumnDatas = (type: string, year?: number, month?: number) => {
  let datas = [];
  let unit = timeChineseMap[type];

  let range = legalTimeRange[type];
  let startNum = range[0];
  let endNum = range[1];

  if (type === 'day') {
    if (!year || !month) {
      year = currentDate.year;
      month = currentDate.month;
    }
    let maxDay = getDaysOfMonth(year!, month!);
    endNum = Math.min(maxDay, range[1]);
  }

  for (let index = startNum; index <= endNum; index++) {
    datas.push({
      value: index,
      label: index + unit
    });
  }

  return datas;
};

const initSelectList = () => {
  if (props.mode === 'time') {
    let list: any[] = [];
    columnMarks.forEach((item) => {
      let datas = getColumnDatas(item);
      list.push(datas);
    });

    selectList.value = list;
  } else if (props.mode === 'region') {
    let list;
    let regionRange = props.regionRange;
    if (regionRange) {
      list = regionJsonData.filter((item) => {
        return item.name === regionRange;
      });
    } else {
      list = regionJsonData;
    }

    selectList.value = list;
  }
};

// 根据年份和月份获取天数
const getDaysOfMonth = (year: number, month: number) => {
  let day = 0;
  if (smallMonths.indexOf(month) !== -1) {
    day = 30;
  } else if (month === 2) {
    day = 28;
    let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    if (isLeapYear) {
      day = 29;
    }
  } else {
    day = 31;
  }

  return day;
};

const formatTime = (dateObj: Recordable, rule: string) => {
  const markMap: Recordable = {
    yyyy: 'year',
    MM: 'month',
    dd: 'day',
    hh: 'hour',
    mm: 'minute',
    ss: 'second'
  };

  let rst = rule.replace(/(yyyy)|(MM)|(dd)|(hh)|(mm)|(ss)/g, (match) => {
    let mark = markMap[match];
    return mark === 'year' ? dateObj[mark] : String(dateObj[mark]).padStart(2, '0');
  });

  return rst;
};

const parseTime = (value: string, rule: string) => {
  const markMap: Recordable = {
    yyyy: 'year',
    MM: 'month',
    dd: 'day',
    hh: 'hour',
    mm: 'minute',
    ss: 'second'
  };

  let matchGroupMarks: string[] = [];
  let pattern = rule.replace(/(yyyy)|(MM)|(dd)|(hh)|(mm)|(ss)/g, (match) => {
    matchGroupMarks.push(match);
    if (match === 'yyyy') {
      return '(\\d{4})';
    } else {
      return '(\\d{2})';
    }
  });
  pattern = '^' + pattern + '$';

  let re = new RegExp(pattern);
  let result: any = re.exec(value);
  if (result) {
    let date: Recordable = {
      year: null,
      month: null,
      day: null,
      hour: null,
      minute: null,
      second: null
    };

    result = result.slice(1, matchGroupMarks.length + 1);
    result.forEach((item: any, index: number) => {
      let dateMark = markMap[matchGroupMarks[index]];
      date[dateMark] = item;
    });

    return date;
  } else {
    return null;
  }
};

init();

defineExpose({
  clear
});
</script>

<script lang="ts">
export default {
  name: 'BePickerView'
};
</script>

<style lang="scss" scoped></style>
