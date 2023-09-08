# Textarea 文本域

## 基本使用

::: code-group

```html [template]
<be-textarea
  class="textarea1"
  v-model="content"
  placeholder="请输入"
  placeholder-class="textarea1-placeholder"
>
</be-textarea>
```

```ts [script]
import { ref } from 'vue';

const content = ref('');
```

```scss [style scoped]
.textarea1 {
  background-color: #f2f2f2;
  font-size: 14px;

  .textarea1-placeholder {
    color: #bbbbbb;
  }
}
```

:::

<ExampleIframe url="/pages/textarea/basic" height="200px"></ExampleIframe>

## API

### Props

| 属性名              | 说明                                     | 类型   | 默认值 |
| ------------------- | ---------------------------------------- | ------ | ------ |
| rootClass           | [根节点 class](/note#组件如何自定义样式) | string | -      |
| rootStyle           | [根节点 style](/note#组件如何自定义样式) | string | -      |
| modelValue(v-model) | 输入的值                                 | string | -      |

### Props extend uni-app textarea

| 属性名           | 说明                                                             | 默认值 |
| ---------------- | ---------------------------------------------------------------- | ------ |
| placeholder      | [属性说明](https://uniapp.dcloud.net.cn/component/textarea.html) | -      |
| placeholderStyle | [属性说明](https://uniapp.dcloud.net.cn/component/textarea.html) | -      |
| placeholderClass | [属性说明](https://uniapp.dcloud.net.cn/component/textarea.html) | -      |
| disabled         | [属性说明](https://uniapp.dcloud.net.cn/component/textarea.html) | -      |
| maxlength        | [属性说明](https://uniapp.dcloud.net.cn/component/textarea.html) | -      |
| focus            | [属性说明](https://uniapp.dcloud.net.cn/component/textarea.html) | -      |
| autoHeight       | [属性说明](https://uniapp.dcloud.net.cn/component/textarea.html) | -      |
| cursorSpacing    | [属性说明](https://uniapp.dcloud.net.cn/component/textarea.html) | -      |
| confirmType      | [属性说明](https://uniapp.dcloud.net.cn/component/textarea.html) | -      |
| showConfirmBar   | [属性说明](https://uniapp.dcloud.net.cn/component/textarea.html) | -      |
| adjustPosition   | [属性说明](https://uniapp.dcloud.net.cn/component/textarea.html) | -      |

### Events extend uni-app textarea

| 事件名称 | 说明                                                             |
| -------- | ---------------------------------------------------------------- |
| focus    | [事件说明](https://uniapp.dcloud.net.cn/component/textarea.html) |
| blur     | [事件说明](https://uniapp.dcloud.net.cn/component/textarea.html) |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
