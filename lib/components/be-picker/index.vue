<template>
  <BeSelect
    :mode="selectMode"
    :visible="visible"
    :update:visible="onVisibleUpdate"
    v-model.value="selectValue"
    :list="selectList"
    :value-name="selectValueName"
    :label-name="selectLabelName"
    ref="selectRef"
    :title="title"
    :clear-text="clearText"
    :confirm-text="confirmText"
    :mask-close-able="maskCloseAble"
    :action-close-able="false"
    @confirm="onConfirm"
    @clear="onClear"
    @change="onChange"
  >
  </BeSelect>
</template>

<script setup lang="ts">
/**
 * picker和picker-view两个组件有大部分逻辑代码是相同的
 * 在维护时需要注意同步
 */
import type { PropType } from 'vue';
import type { Recordable } from '../../types';

import { ref, computed, watch } from 'vue';
import BeSelect from '../be-select/index.vue';
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
  visible: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Number, String, Array],
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
  }
});

const emit = defineEmits(['update:visible', 'update:value']);

const selectValue = ref<any[]>([]);
const selectList = ref<Recordable[]>([]);
const selectRef = ref();
let columnMarks: string[] = [];
let currentDate: Recordable = {};
let legalTimeRange: Recordable = {};

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
  () => props.value,
  () => {
    init();
  }
);

watch(
  () => props.visible,
  (val) => {
    // 每次打开时将selectValue重置为v-model:value绑定的值
    if (val) {
      init();
    }
  }
);

const onVisibleUpdate = (value: boolean) => {
  emit('update:visible', value);
};

const onConfirm = () => {
  if (props.mode === 'time') {
    selectValue.value.forEach((item, index) => {
      let mark = columnMarks[index];
      currentDate[mark] = item;
    });
    let text = formatTime(currentDate, props.timeFormat);
    emit('update:value', text);
  } else if (props.mode === 'region') {
    emit('update:value', selectValue.value);
  }

  close();
};

const onClear = () => {
  if (props.mode === 'time') {
    emit('update:value', '');
  } else if (props.mode === 'region') {
    emit('update:value', []);
  }

  close();
};

const onChange = (selectIndexes: number[], changeIndex: number) => {
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

  selectRef.value.updateSingleColumn(dayIndex, datas);
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

  let marks: string[] = [];

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
    if (props.value) {
      let formatRst: any = parseTime(props.value as string, props.timeFormat);
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
    selectValue.value = props.value as any[];
  }
};

const getColumnDatas = (type: string, year?: number, month?: number) => {
  let datas: Recordable[] = [];
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

const close = () => {
  emit('update:visible', false);
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
</script>

<script lang="ts">
export default {
  name: 'BePicker'
};
</script>

<style lang="scss" scoped>
@import '../../styles/reset.scss';
</style>
