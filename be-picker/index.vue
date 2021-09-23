<template>
  <be-select
    :mode="selectMode"
    v-model="selectValue"
    :list="selectList"
    :value-name="selectValueName"
    :label-name="selectLabelName"
    ref="select"
    :title="title"
    :clear-text="clearText"
    :confirm-text="confirmText"
    :mask-close-able="maskCloseAble"
    :action-close-able="false"
    @confirm="onConfirm"
    @clear="onClear"
    @change="onChange"
  >
  </be-select>
</template>

<script>
import BeSelect from '../be-select/index.vue';
import regionJsonData from './assets/region.json';

const timeMarkMap = ['second', 'minute', 'hour', 'day', 'month', 'year'];

const timeChineseMap = {
  year: '年',
  month: '月',
  day: '日',
  hour: '时',
  minute: '分',
  second: '秒'
};

const basicTimeRange = {
  year: [1970, 2030],
  month: [1, 12],
  day: [1, 31],
  hour: [0, 23],
  minute: [0, 59],
  second: [0, 59]
};

const smallMonths = [4, 6, 9, 11];

export default {
  name: 'BePicker',
  components: {
    BeSelect
  },
  props: {
    mode: {
      type: String,
      default: 'time' // 默认时间选择 可选region 地区选择
    },
    value: {
      type: [String, Array],
      default: ''
    },
    // 年yyyy 月MM 日dd 时hh 分mm 秒ss
    timeFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    // 时间模式 显示字段区间 数组第一项为最大值 数组第二项为最小值 只有一项表示只有一个字段
    // 可用 'second', 'minute', 'hour', 'day', 'month', 'year'
    timeColumn: {
      type: Array,
      default: () => {
        return ['year', 'day'];
      }
    },
    // 时间模式下 字段显示范围
    timeRange: {
      type: Object,
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
  },
  data() {
    return {
      selectValue: [],
      selectList: [],
      columnMarks: [],
      currentDate: {},
      legalTimeRange: {}
    };
  },
  computed: {
    selectValueName() {
      if (this.mode === 'time') {
        return 'value';
      } else if (this.mode == 'region') {
        return this.regionValueType;
      }
    },
    selectLabelName() {
      if (this.mode === 'time') {
        return 'label';
      } else if (this.mode == 'region') {
        return 'name';
      }
    },
    selectMode() {
      let mode = '';
      if (this.mode === 'time') {
        mode = 'multiple';
      } else if (this.mode == 'region') {
        mode = 'cascade';
      }
      return mode;
    }
  },
  methods: {
    onConfirm() {
      if (this.mode === 'time') {
        this.selectValue.forEach((item, index) => {
          let mark = this.columnMarks[index];
          this.currentDate[mark] = item;
        });
        let text = formatTime(this.currentDate, this.timeFormat);
        this.$emit('input', text);
      } else if (this.mode === 'region') {
        this.$emit('input', this.selectValue);
      }

      this.close();
    },
    onClear() {
      if (this.mode === 'time') {
        this.$emit('input', '');
      } else if (this.mode === 'region') {
        this.$emit('input', []);
      }

      this.close();
    },
    onChange(selectIndexes, changeIndex) {
      if (this.mode === 'time') {
        let mark = this.columnMarks[changeIndex];
        if (mark === 'year') {
          if (this.columnMarks.indexOf('day') !== -1) {
            let monthIndex = this.columnMarks.indexOf('month');
            let month = this.selectValue[monthIndex];
            if (month === 2) {
              this.updateDayColumn(selectIndexes);
            }
          }
        } else if (mark === 'month') {
          let dayIndex = this.columnMarks.indexOf('day');
          if (dayIndex !== -1) {
            this.updateDayColumn(selectIndexes);
          }
        }
      }
    },
    updateDayColumn(currentIndexes) {
      let yearIndex = this.columnMarks.indexOf('year');
      let monthIndex = this.columnMarks.indexOf('month');
      let dayIndex = this.columnMarks.indexOf('day');

      let year =
        yearIndex !== -1
          ? this.selectList[yearIndex][currentIndexes[yearIndex]].value
          : this.currentDate.year;
      let month = this.selectList[monthIndex][currentIndexes[monthIndex]].value;

      let datas = this.getColumnDatas('day', year, month);
      this.selectList[dayIndex] = datas;
      this.$refs.select.updateSingleColumn(dayIndex);
    },
    init() {
      if (this.mode === 'time') {
        this.initLegalTimeRange();
        this.initColumnMarks();
        this.initSelectValue();
        this.initSelectList();
      } else if (this.mode === 'region') {
        this.initSelectList();
        this.initSelectValue();
      }
    },
    initLegalTimeRange() {
      let rangeObj = {};
      for (const key in basicTimeRange) {
        if (Object.hasOwnProperty.call(basicTimeRange, key)) {
          let rstRange;
          let userRange = this.timeRange[key];
          if (userRange) {
            if (userRange.length !== 2) {
              throw 'timeRange属性不合法';
            }

            if (userRange[0] > userRange[1]) {
              throw 'timeRange属性不合法';
            }

            if (key !== 'year') {
              if (
                userRange[0] < basicTimeRange[key][0] ||
                userRange[1] > basicTimeRange[key][1]
              ) {
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

      this.legalTimeRange = rangeObj;
    },
    initColumnMarks() {
      // 验证column合法性
      let columnRange = this.timeColumn;

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

      this.columnMarks = marks;
    },
    initSelectValue() {
      if (this.mode === 'time') {
        let cDate = new Date();
        let dateObj = {
          year: cDate.getFullYear(),
          month: cDate.getMonth() + 1,
          day: cDate.getDate(),
          hour: cDate.getHours(),
          minute: cDate.getMinutes(),
          second: cDate.getSeconds()
        };

        // 融合用户传入值
        if (this.value) {
          let formatRst = parseTime(this.value, this.timeFormat);
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
        let legalTimeRange = this.legalTimeRange;
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

        this.currentDate = dateObj;
        this.selectValue = this.columnMarks.map(item => {
          return dateObj[item];
        });
      } else if (this.mode === 'region') {
        this.selectValue = this.value;
      }
    },
    getColumnDatas(type, year, month) {
      let datas = [];
      let unit = timeChineseMap[type];

      let range = this.legalTimeRange[type];
      let startNum = range[0];
      let endNum = range[1];

      if (type === 'day') {
        if (!year || !month) {
          year = this.currentDate.year;
          month = this.currentDate.month;
        }
        let maxDay = getDaysOfMonth(year, month);
        endNum = Math.min(maxDay, range[1]);
      }

      for (let index = startNum; index <= endNum; index++) {
        datas.push({
          value: index,
          label: index + unit
        });
      }

      return datas;
    },
    initSelectList() {
      if (this.mode === 'time') {
        let list = [];
        this.columnMarks.forEach(item => {
          let datas = this.getColumnDatas(item);
          list.push(datas);
        });

        this.selectList = list;
      } else if (this.mode === 'region') {
        let list;
        let regionRange = this.regionRange;
        if (regionRange) {
          list = regionJsonData.filter(item => {
            return item.name === regionRange;
          });
        } else {
          list = regionJsonData;
        }

        this.selectList = list;
      }
    },
    open() {
      this.init();
      this.$nextTick(() => {
        this.$refs.select.open();
      });
    },
    close() {
      this.$refs.select.close();
    }
  }
};

// 根据年份和月份获取天数
function getDaysOfMonth(year, month) {
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
}

function formatTime(dateObj, rule) {
  const markMap = {
    yyyy: 'year',
    MM: 'month',
    dd: 'day',
    hh: 'hour',
    mm: 'minute',
    ss: 'second'
  };

  let rst = rule.replace(/(yyyy)|(MM)|(dd)|(hh)|(mm)|(ss)/g, match => {
    let mark = markMap[match];
    return mark === 'year'
      ? dateObj[mark]
      : String(dateObj[mark]).padStart(2, '0');
  });

  return rst;
}

function parseTime(value, rule) {
  const markMap = {
    yyyy: 'year',
    MM: 'month',
    dd: 'day',
    hh: 'hour',
    mm: 'minute',
    ss: 'second'
  };

  let matchGroupMarks = [];
  let pattern = rule.replace(/(yyyy)|(MM)|(dd)|(hh)|(mm)|(ss)/g, match => {
    matchGroupMarks.push(match);
    if (match === 'yyyy') {
      return '(\\d{4})';
    } else {
      return '(\\d{2})';
    }
  });
  pattern = '^' + pattern + '$';

  let re = new RegExp(pattern);
  let result = re.exec(value);
  if (result) {
    let date = {
      year: null,
      month: null,
      day: null,
      hour: null,
      minute: null,
      second: null
    };

    result = result.slice(1, matchGroupMarks.length + 1);
    result.forEach((item, index) => {
      let dateMark = markMap[matchGroupMarks[index]];
      date[dateMark] = item;
    });

    return date;
  } else {
    return null;
  }
}
</script>

<style lang="scss" scoped></style>
