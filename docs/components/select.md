# Select 选择器

## 基本使用

::: code-group

```html [template]
<be-select
  title="标题"
  v-model:visible="visible"
  mode="single"
  v-model:value="selectValue"
  :list="selectList"
>
</be-select>
```

```ts [script]
import { ref } from 'vue';

const visible = ref(false);
const selectValue = ref<number>();
const selectList = ref([
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]);
```

:::

<ExampleIframe url="/pages/select/basic" height="400px" maxWidth="375px"></ExampleIframe>

::: tip
`Select`组件基于 [DataPopup](/components/data-popup) 和 [SelectView](/components/select-view) 封装，更多示例请参考对应组件。
:::

## API

### Props

| 属性名           | 说明                                              | 类型                                          | 默认值    |
| ---------------- | ------------------------------------------------- | --------------------------------------------- | --------- |
| visible(v-model) | 是否打开弹出层                                    | boolean                                       | false     |
| value(v-model)   | 当前选中值（数组）                                | `string \| number \| Array<string \| number>` | undefined |
| title            | 标题                                              | string                                        | 请选择    |
| confirmText      | 自定义确定按钮文字                                | string                                        | 确定      |
| clearText        | 自定义清空按钮文字                                | string                                        | 清空      |
| maskCloseAble    | 点击遮罩是否关闭弹出层                            | boolean                                       | true      |
| actionCloseAble  | 点击确定或清空按钮后是否关闭弹出层                | boolean                                       | true      |
| theme            | 主题色                                            | css color                                     | #4a68cc   |
| list             | 列数据                                            | 见 [SelectView](/components/select-view) 示例 | -         |
| mode             | 选择模式                                          | single \| multiple \| cascade                 | single    |
| valueName        | 自定义列数据的`value`字段名                       | string                                        | value     |
| labelName        | 自定义列数据的`label`字段名                       | string                                        | label     |
| childName        | 自定义列数据的`children`字段名                    | string                                        | children  |
| layout           | 列布局方式。可选值`row-reverse`，水平从右到左排列 | default \| row-reverse                        | default   |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
