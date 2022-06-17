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
      <view
        class="picker-view-item"
        v-for="(item, index2) in column"
        :key="index2"
      >
        {{ item.label }}
      </view>
    </picker-view-column>
  </picker-view>
</template>

<script>
let flatList = [];
let flatItemId = 1;

export default {
  name: "BeSelectView",
  props: {
    value: {
      type: [Number, String, Array],
      default: null,
    },
    mode: {
      type: String,
      default: "single", // 可选 cascade 级联选择 multiple 多项选择
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 自定义list数据的value属性名
    valueName: {
      type: String,
      default: "value",
    },
    // 自定义list数据的label属性名
    labelName: {
      type: String,
      default: "label",
    },
    // 自定义list数据的children属性名
    childName: {
      type: String,
      default: "children",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "400rpx",
    },
    indicatorStyle: {
      type: String,
      default: "height: 40px", // 不支持rpx
    },
    indicatorClass: {
      type: String,
      default: null,
    },
    maskStyle: {
      type: String,
      default: null,
    },
    maskClass: {
      type: String,
      default: null,
    },
    // 布局方式
    layout: {
      type: String,
      default: "default", // 可选row-reverse 水平从右到左
    },
  },
  data() {
    return {
      selectValue: [],
      pickerDatas: [],
      maxLevel: 0, // 级联选择层级
    };
  },
  created() {
    this.init();
  },
  methods: {
    getColumnOrderStyle(index) {
      return this.layout === "row-reverse"
        ? this.pickerDatas.length - index
        : null;
    },
    // 重置v-model为默认值
    clear() {
      if (this.mode === "single") {
        this.$emit("input", null);
      } else if (this.mode === "multiple" || this.mode === "cascade") {
        this.$emit("input", []);
      }
    },
    updateModelValue() {
      let newValue = this.selectValue.map((item, index) => {
        let column = this.pickerDatas[index];
        let data = column && column[item];

        return data ? data.value : null;
      });

      if (newValue.indexOf(null) !== -1) {
        return;
      }

      if (this.mode === "single") {
        newValue = newValue[0];
      }

      this.$emit("input", newValue);
    },
    onPickerChange(event) {
      let newValue = event.detail.value;
      let index = this.selectValue.findIndex((item, index) => {
        return item !== newValue[index];
      });
      if (index !== -1) {
        if (this.mode === "single" || this.mode === "multiple") {
          this.selectValue = newValue;
        } else if (this.mode === "cascade") {
          if (index < this.selectValue.length - 1) {
            newValue.splice(
              index + 1,
              newValue.length - index - 1,
              ...new Array(newValue.length - index - 1).fill(0)
            );
          }
          this.selectValue = newValue;
          this.updatePickerDatas(index);
        }

        this.updateModelValue();
        this.$emit("change", this.selectValue, index);
      }
    },
    initFlatList() {
      flatList = [];
      flatItemId = 1;

      // 构建flatList
      this.resolveDatas();

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
    },
    resolveDatas(datas, parentId = 0, level = 1) {
      if (!datas) {
        datas = this.list;
      }

      datas.forEach((item) => {
        let flatItem = {
          id: flatItemId++,
          value: item[this.valueName],
          label: item[this.labelName],
          parentId,
          level,
        };

        flatList.push(flatItem);

        let children = item[this.childName];

        if (children) {
          this.resolveDatas(children, flatItem.id, level + 1);
        }
      });
    },
    // 级联选择模式
    updatePickerDatas(columnIndex = -1) {
      // index 表示pickerDatas项的序号
      for (let index = 0; index < this.maxLevel; index++) {
        if (index > columnIndex) {
          let column = this.pickerDatas[index];

          let beforeColumn = this.pickerDatas[index - 1];
          let beforeSelectIndex = this.selectValue[index - 1];
          let parentId;
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
            this.pickerDatas.push(datas);
          } else {
            this.pickerDatas.splice(index, 1, datas);
          }
        }
      }
    },
    updateSingleColumn(index, columnDatas) {
      if (this.mode === "multiple") {
        const datas = columnDatas.map((item) => {
          return {
            value: item[this.valueName],
            label: item[this.labelName],
          };
        });
        this.pickerDatas.splice(index, 1, datas);
      }
    },
    /**
     * 由于性能原因，props不会在改变后重新初始化（更新视图），需要自行调用updateView()
     * 比如在网络异步获取v-model绑定值或者动态改变mode、list的场景
     */
    updateView() {
      this.$nextTick(() => {
        this.init();
      });
    },
    init() {
      if (this.list.length === 0) {
        this.selectValue = [];
        this.pickerDatas = [];
        return;
      }

      if (this.mode === "single" || this.mode === "multiple") {
        this.initPickerDatas();
        this.initSelectValue();
      } else if (this.mode === "cascade") {
        this.initFlatList();
        this.maxLevel = flatList[flatList.length - 1].level;
        this.initSelectValue();
        this.initPickerDatas();
      }

      if (
        this.value === null ||
        this.value === "" ||
        (Array.isArray(this.value) && this.value.length === 0)
      ) {
        this.updateModelValue(); // 初始化v-model值
      }
    },
    initPickerDatas() {
      if (this.mode === "single") {
        let column = this.list.map((item) => {
          return {
            value: item[this.valueName],
            label: item[this.labelName],
          };
        });
        this.pickerDatas = [column];
      } else if (this.mode === "multiple") {
        let datas = [];
        this.list.forEach((item) => {
          let column = item.map((data) => {
            return {
              value: data[this.valueName],
              label: data[this.labelName],
            };
          });
          datas.push(column);
        });
        this.pickerDatas = datas;
      } else if (this.mode === "cascade") {
        this.updatePickerDatas();
      }
    },
    initSelectValue() {
      if (this.mode === "single") {
        let index = this.pickerDatas[0].findIndex((item) => {
          return item.value === this.value;
        });
        if (index === -1) {
          index = 0;
        }

        this.selectValue = [index];
      } else if (this.mode === "multiple") {
        let indexes = this.pickerDatas.map((item, index) => {
          let rstIndex = item.findIndex((data) => {
            return data.value === this.value[index];
          });
          if (rstIndex === -1) {
            rstIndex = 0;
          }

          return rstIndex;
        });

        this.selectValue = indexes;
      } else if (this.mode === "cascade") {
        if (this.value === null || this.value.length === 0) {
          this.selectValue = new Array(this.maxLevel).fill(0);
        } else {
          let indexes = [];
          let datas = []; // 所选数据项(临时)
          for (let index = 0; index < this.maxLevel; index++) {
            let value = this.value[index];
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
          if (indexes.length < this.maxLevel) {
            indexes = indexes.concat(
              new Array(this.maxLevel - indexes.length).fill(0)
            );
          }
          this.selectValue = indexes;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.be-select-view {
  .picker-view-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
