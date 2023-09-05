# SelectView 内嵌选择器

## 单选

::: code-group

```html [template]
<be-select-view mode="single" v-model="selectValue" :list="selectList" height="200px">
</be-select-view>
```

```ts [script]
import { ref } from 'vue';

const selectValue = ref<number>();
const selectList = ref([
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]);
```

:::

<ExampleIframe url="/pages/selectView/single" height="300px"></ExampleIframe>

## 多选

::: code-group

```html [template]
<be-select-view mode="multiple" v-model="selectValue" :list="selectList" height="200px">
</be-select-view>
```

```ts [script]
import { ref } from 'vue';

const selectValue = ref<number[]>([]);
const selectList = ref([
  [
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ],
  [
    { label: '选项4', value: 4 },
    { label: '选项5', value: 5 },
    { label: '选项6', value: 6 }
  ]
]);
```

:::

<ExampleIframe url="/pages/selectView/multiple" height="300px"></ExampleIframe>

## 级联选择

::: code-group

```html [template]
<be-select-view mode="cascade" v-model="selectValue" :list="selectList" height="200px">
</be-select-view>
```

```ts [script]
import { ref } from 'vue';

const selectValue = ref<number[]>([]);
const selectList = ref([
  {
    label: '选项1',
    value: 100,
    children: [
      {
        label: '选项1-1',
        value: 110,
        children: [
          {
            label: '选项1-1-1',
            value: 111
          },
          {
            label: '选项1-1-2',
            value: 112
          }
        ]
      },
      {
        label: '选项1-2',
        value: 120,
        children: [
          {
            label: '选项1-2-1',
            value: 121
          },
          {
            label: '选项1-2-2',
            value: 122
          }
        ]
      }
    ]
  },
  {
    label: '选项2',
    value: 200,
    children: [
      {
        label: '选项2-1',
        value: 210,
        children: [
          {
            label: '选项2-1-1',
            value: 211
          }
        ]
      }
    ]
  }
]);
```

:::

<ExampleIframe url="/pages/selectView/cascade" height="300px"></ExampleIframe>

## API

### Props

| 属性名              | 说明                                              | 类型                                          | 默认值    |
| ------------------- | ------------------------------------------------- | --------------------------------------------- | --------- |
| modelValue(v-model) | 当前选中值（数组）                                | `string \| number \| Array<string \| number>` | undefined |
| list                | 列数据                                            | `见示例`                                      | -         |
| mode                | 选择模式                                          | single \| multiple \| cascade                 | single    |
| valueName           | 自定义列数据的`value`字段名                       | string                                        | value     |
| labelName           | 自定义列数据的`label`字段名                       | string                                        | label     |
| childName           | 自定义列数据的`children`字段名                    | string                                        | children  |
| width               | 宽度                                              | css width                                     | 100%      |
| height              | 高度                                              | css height                                    | 400rpx    |
| layout              | 列布局方式。可选值`row-reverse`，水平从右到左排列 | default \| row-reverse                        | default   |

::: info
`v-model`值如果为空，在组件初始化时会为其赋一个默认值（第一个选项）
:::

### Props extend uni-app picker-view

| 属性名         | 说明                                                                | 默认值       |
| -------------- | ------------------------------------------------------------------- | ------------ |
| indicatorStyle | [属性说明](https://uniapp.dcloud.net.cn/component/picker-view.html) | height: 40px |
| indicatorClass | [属性说明](https://uniapp.dcloud.net.cn/component/picker-view.html) | -            |
| maskStyle      | [属性说明](https://uniapp.dcloud.net.cn/component/picker-view.html) | -            |
| maskClass      | [属性说明](https://uniapp.dcloud.net.cn/component/picker-view.html) | -            |

### Events

| 事件名称 | 说明                                                                             | 回调参数                                 |
| -------- | -------------------------------------------------------------------------------- | ---------------------------------------- |
| change   | 当滚动选择时触发，回调函数第一个参数为`picker-view`的`value`，第二个参数为第几列 | `(value: number[], index: number) => {}` |

### Methods

| 方法名 | 说明           | 参数         |
| ------ | -------------- | ------------ |
| clear  | 清空当前选中值 | `() => void` |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
