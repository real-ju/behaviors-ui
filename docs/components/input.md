# Input 输入框

## 基本使用

::: code-group

```html [template]
<be-input
  class="input1"
  type="text"
  v-model="content"
  placeholder="请输入"
  placeholder-class="input1-placeholder"
>
</be-input>
```

```ts [script]
import { ref } from 'vue';

const content = ref('');
```

```scss [style scoped]
.input1 {
  background-color: #f2f2f2;
  font-size: 14px;

  .input1-placeholder {
    color: #bbbbbb;
  }
}
```

:::

<ExampleIframe url="/pages/input/basic" height="60px"></ExampleIframe>

## 数字输入框

::: code-group

```html [template]
<be-input
  class="input2"
  type="number"
  v-model="content"
  placeholder="请输入-100 ~ 100的数字，包括小数"
  placeholder-class="input2-placeholder"
  allowNegative
  allowDecimal
  :min="-100"
  :max="100"
>
</be-input>
```

```ts [script]
import { ref } from 'vue';

const content = ref();
```

```scss [style scoped]
.input2 {
  background-color: #f2f2f2;
  font-size: 14px;

  .input2-placeholder {
    color: #bbbbbb;
  }
}
```

:::

<ExampleIframe url="/pages/input/number" height="60px"></ExampleIframe>

## API

### Props

| 属性名              | 说明                                               | 类型             | 默认值    |
| ------------------- | -------------------------------------------------- | ---------------- | --------- |
| rootClass           | [根节点 class](/note#组件如何自定义样式)           | string           | -         |
| rootStyle           | [根节点 style](/note#组件如何自定义样式)           | string           | -         |
| modelValue(v-model) | 输入的值                                           | string \| number | -         |
| type                | 输入框类型                                         | `text \| number` | text      |
| allowNegative       | 是否允许负数（可以输入`-`），当`type=number`时生效 | boolean          | false     |
| allowDecimal        | 是否允许小数，当`type=number`时生效                | boolean          | false     |
| min                 | 数字最小值，当`type=number`时生效                  | number           | -Infinity |
| max                 | 数字最大值，当`type=number`时生效                  | number           | Infinity  |
| pattern             | 自定义正则表达式验证输入值（内部使用 RegExp.test） | `RegExp`         | -         |
| trim                | 移除两端空白字符                                   | boolean          | false     |

### Props extend uni-app input

| 属性名           | 说明                                                          | 默认值 |
| ---------------- | ------------------------------------------------------------- | ------ |
| placeholder      | [属性说明](https://uniapp.dcloud.net.cn/component/input.html) | -      |
| placeholderStyle | [属性说明](https://uniapp.dcloud.net.cn/component/input.html) | -      |
| placeholderClass | [属性说明](https://uniapp.dcloud.net.cn/component/input.html) | -      |
| password         | [属性说明](https://uniapp.dcloud.net.cn/component/input.html) | -      |
| maxlength        | [属性说明](https://uniapp.dcloud.net.cn/component/input.html) | -      |

### Events extend uni-app input

| 事件名称 | 说明                                                          |
| -------- | ------------------------------------------------------------- |
| focus    | [事件说明](https://uniapp.dcloud.net.cn/component/input.html) |
| blur     | [事件说明](https://uniapp.dcloud.net.cn/component/input.html) |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
