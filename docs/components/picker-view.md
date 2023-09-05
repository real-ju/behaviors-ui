# PickerView 内嵌选择器

## 时间选择

::: code-group

```html [template]
<be-picker-view
  mode="time"
  v-model="time"
  timeFormat="yyyy-MM-dd hh:mm"
  :timeColumn="['year', 'minute']"
  :timeRange="{ year: [2022, 2024], hour: [12, 23] }"
  height="200px"
>
</be-picker-view>
```

```ts [script]
import { ref } from 'vue';

const time = ref('2023-08-31 16:00');
```

:::

<ExampleIframe url="/pages/pickerView/time" height="300px"></ExampleIframe>

## 地区选择

::: code-group

```html [template]
<be-picker-view mode="region" v-model="region" height="200px"></be-picker-view>
```

```ts [script]
import { ref } from 'vue';

const region = ref([]);
```

:::

<ExampleIframe url="/pages/pickerView/region" height="300px"></ExampleIframe>

## API

### Props

| 属性名              | 说明                                                                                                                                                               | 类型                   | 默认值            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ----------------- |
| modelValue(v-model) | 当前选择的时间或地区                                                                                                                                               | `string \| string[]`   | `''`              |
| mode                | 选择模式                                                                                                                                                           | time \| region         | time              |
| timeFormat          | 时间格式（v-model 值的格式），当`mode=time`时生效。占位符：年`yyyy` 月`MM` 日`dd` 时`hh` 分`mm` 秒`ss`                                                             | string                 | yyyy-MM-dd        |
| timeColumn          | 时间可选度量区间。一个数组，第一项表示最大度量单位，二个项表示最小度量单位，当`mode=time`时生效。单位值：年`year` 月`month` 日`day` 时`hour` 分`minute` 秒`second` | `string[]`             | `['year', 'day']` |
| timeRange           | 时间可选范围。一个对象，例如`{ year: [1990, 2030], hour: [12, 23] }`表示年份范围 1990 ~ 2030，小时范围 12 点 ~ 23 点，字段名同上面单位值                           | object                 | -                 |
| province            | 指定省份，例如`北京市`，当`mode=region`时生效                                                                                                                      | string                 | -                 |
| regionValueType     | 地区值类型，默认中文名，可选地区编码                                                                                                                               | name \| code           | name              |
| width               | 宽度                                                                                                                                                               | css width              | 100%              |
| height              | 高度                                                                                                                                                               | css height             | 400rpx            |
| layout              | 列布局方式。可选值`row-reverse`，水平从右到左排列                                                                                                                  | default \| row-reverse | default           |

::: info
`v-model`值如果为空，在组件初始化时会为其赋一个默认值（时间模式为当前时间，地区模式为第一个地区选项）
:::

### Props extend uni-app picker-view

| 属性名         | 说明                                                                | 默认值       |
| -------------- | ------------------------------------------------------------------- | ------------ |
| indicatorStyle | [属性说明](https://uniapp.dcloud.net.cn/component/picker-view.html) | height: 40px |
| indicatorClass | [属性说明](https://uniapp.dcloud.net.cn/component/picker-view.html) | -            |
| maskStyle      | [属性说明](https://uniapp.dcloud.net.cn/component/picker-view.html) | -            |
| maskClass      | [属性说明](https://uniapp.dcloud.net.cn/component/picker-view.html) | -            |

### Methods

| 方法名 | 说明           | 参数         |
| ------ | -------------- | ------------ |
| clear  | 清空当前选中值 | `() => void` |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
