# GestureView 手势视图

能够监听手势的`view`组件。

## 基本使用

::: code-group

```html [template]
<be-gesture-view
  class="gesture-area"
  preventScroll
  @slideLeft="slideLeft"
  @slideRight="slideRight"
  @slideTop="slideTop"
  @slideBottom="slideBottom"
>
  {{ tip }}
</be-gesture-view>
```

```ts [script]
import { ref } from 'vue';

const tip = ref('请滑动');

const slideLeft = () => {
  tip.value = '你向左滑动了';
};

const slideRight = () => {
  tip.value = '你向右滑动了';
};

const slideTop = () => {
  tip.value = '你向上滑动了';
};

const slideBottom = () => {
  tip.value = '你向下滑动了';
};
```

```scss [style scoped]
.gesture-area {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

:::

<ExampleIframe url="/pages/gestureView/basic" height="250px"></ExampleIframe>

## API

### Props

| 属性名        | 说明                                     | 类型    | 默认值 |
| ------------- | ---------------------------------------- | ------- | ------ |
| rootClass     | [根节点 class](/note#组件如何自定义样式) | string  | -      |
| rootStyle     | [根节点 style](/note#组件如何自定义样式) | string  | -      |
| triggerLevel  | 滑动多少距离(px)触发手势                 | number  | 50     |
| preventScroll | 阻止页面滚动                             | boolean | false  |

### Events

| 事件名称    | 说明                                   | 回调参数 |
| ----------- | -------------------------------------- | -------- |
| slideLeft   | 向左滑动                               | -        |
| slideRight  | 向右滑动                               | -        |
| slideTop    | 向上滑动，当`preventScroll=true`时生效 | -        |
| slideBottom | 向下滑动，当`preventScroll=true`时生效 | -        |

### Slots

| 插槽名  | 说明     | slot props | 默认值 |
| ------- | -------- | ---------- | ------ |
| default | 视图内容 | -          | 无     |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
