# Picker 选择器

## 基本使用

::: code-group

```html [template]
<be-picker title="标题" v-model:visible="visible" mode="time" v-model:value="time"></be-picker>
```

```ts [script]
import { ref } from 'vue';

const visible = ref(false);
const time = ref('');
```

:::

<ExampleIframe url="/pages/picker/basic" height="400px" maxWidth="375px"></ExampleIframe>

::: tip
`Picker`组件基于 [DataPopup](/components/data-popup) 和 [PickerView](/components/picker-view) 封装，更多示例请参考对应组件。
:::

## API

### Props

| 属性名           | 说明                                                                                                                                                               | 类型                   | 默认值            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ----------------- |
| visible(v-model) | 是否打开弹出层                                                                                                                                                     | boolean                | false             |
| value(v-model)   | 当前选择的时间或地区                                                                                                                                               | `string \| string[]`   | `''`              |
| title            | 标题                                                                                                                                                               | string                 | 请选择            |
| confirmText      | 自定义确定按钮文字                                                                                                                                                 | string                 | 确定              |
| clearText        | 自定义清空按钮文字                                                                                                                                                 | string                 | 清空              |
| maskCloseAble    | 点击遮罩是否关闭弹出层                                                                                                                                             | boolean                | true              |
| theme            | 主题色                                                                                                                                                             | css color              | #4a68cc           |
| mode             | 选择模式                                                                                                                                                           | time \| region         | time              |
| timeFormat       | 时间格式（v-model 值的格式），当`mode=time`时生效。占位符：年`yyyy` 月`MM` 日`dd` 时`hh` 分`mm` 秒`ss`                                                             | string                 | yyyy-MM-dd        |
| timeColumn       | 时间可选度量区间。一个数组，第一项表示最大度量单位，二个项表示最小度量单位，当`mode=time`时生效。单位值：年`year` 月`month` 日`day` 时`hour` 分`minute` 秒`second` | `string[]`             | `['year', 'day']` |
| timeRange        | 时间可选范围。一个对象，例如`{ year: [1990, 2030], hour: [12, 23] }`表示年份范围 1990 ~ 2030，小时范围 12 点 ~ 23 点，字段名同上面单位值                           | object                 | -                 |
| province         | 指定省份，例如`北京市`，当`mode=region`时生效                                                                                                                      | string                 | -                 |
| regionValueType  | 地区值类型，默认中文名，可选地区编码                                                                                                                               | name \| code           | name              |
| layout           | 列布局方式。可选值`row-reverse`，水平从右到左排列                                                                                                                  | default \| row-reverse | default           |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
