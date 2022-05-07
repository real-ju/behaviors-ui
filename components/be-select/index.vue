<template>
  <be-data-popup
    class="be-select"
    v-model="showPopup"
    height="720rpx"
    :title="title"
    :clear-text="clearText"
    :confirm-text="confirmText"
    :mask-close-able="maskCloseAble"
    :action-close-able="actionCloseAble"
    @confirm="onConfirm"
    @clear="onClear"
  >
    <be-select-view
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
    </be-select-view>
  </be-data-popup>
</template>

<script>
import BeDataPopup from "../be-data-popup/index.vue";
import BeSelectView from "../be-select-view/index.vue";

export default {
  name: "BeSelect",
  components: {
    BeDataPopup,
    BeSelectView,
  },
  props: {
    value: {
      type: [Number, String, Array],
      default: null,
    },
    title: {
      type: String,
      default: "请选择",
    },
    clearText: {
      type: String,
      default: "清空",
    },
    confirmText: {
      type: String,
      default: "确定",
    },
    maskCloseAble: {
      type: Boolean,
      default: true,
    },
    // 点击确定或清空按钮后关闭弹出层
    actionCloseAble: {
      type: Boolean,
      default: true,
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
    layout: {
      type: String,
      default: "default",
    },
  },
  data() {
    return {
      showPopup: false,
      innerValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.innerValue = val;
    },
  },
  methods: {
    updateView() {
      this.$refs.selectView.updateView();
    },
    onSelectViewChange(selectIndexes, changeIndex) {
      this.$emit("change", selectIndexes, changeIndex);
    },
    onClear() {
      this.$refs.selectView.clear();

      this.$emit("input", this.innerValue);
      this.$emit("clear");

      if (this.actionCloseAble) {
        this.close();
      }
    },
    onConfirm() {
      this.$emit("input", this.innerValue);
      this.$emit("confirm");

      if (this.actionCloseAble) {
        this.close();
      }
    },
    updateSingleColumn(index, columnDatas) {
      this.$refs.selectView.updateSingleColumn(index, columnDatas);
    },
    open() {
      // 每次打开时重置为v-model绑定的值
      this.innerValue = this.value;

      this.$nextTick(() => {
        this.$refs.selectView.init();
        this.showPopup = true;
      });
    },
    close() {
      this.showPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
