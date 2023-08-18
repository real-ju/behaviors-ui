# Button 按钮

## 基本使用

::: code-group

```vue [template]
<be-button class="button-1" hover>按钮</be-button>
```

```scss [style scoped]
.button-1 {
  width: 80px;
  height: 30px;
  border-radius: 8px;
  background-color: #4a68cc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #ffffff;
}
```

:::

<ExampleIframe url="/pages/button/basic" height="80px"></ExampleIframe>

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>

## API

### Props

| 属性名                 | 说明                                                           | 类型          | 默认值                                                  |
| ---------------------- | -------------------------------------------------------------- | ------------- | ------------------------------------------------------- |
| rootClass              | [根节点 class](/note#组件如何自定义样式)                       | string        | -                                                       |
| rootStyle              | [根节点 style](/note#组件如何自定义样式)                       | string        | -                                                       |
| hover                  | 默认点击效果                                                   | boolean       | false                                                   |
| hoverClass             | [自定义点击样式](/note#组件如何自定义样式)                     | string        | -                                                       |
| loading                | 按钮加载状态（加载时会添加 data-loading 属性，可用于样式控制） | boolean       | false                                                   |
| hiddenContentInLoading | 加载时隐藏按钮内容                                             | boolean       | false                                                   |
| loadingIcon            | 自定义加载图标                                                 | Icon Props    | `{ fontFamily: 'iconfont', prefix: 'icon-', name: '' }` |
| loadingSize            | 自定义加载图标大小                                             | css font-size | unset                                                   |
| loadingColor           | 自定义加载图标颜色                                             | css color     | unset                                                   |
| disabled               | 按钮禁用状态                                                   | boolean       | false                                                   |
| disabledClass          | [自定义禁用样式](/note#组件如何自定义样式)                     | string        | -                                                       |

### Props extend uni-app button

| 属性名      | 说明                                                           | 默认值 |
| ----------- | -------------------------------------------------------------- | ------ |
| openType    | [属性说明](https://uniapp.dcloud.net.cn/component/button.html) | -      |
| sessionFrom | [属性说明](https://uniapp.dcloud.net.cn/component/button.html) | -      |

### Events extend uni-app button

| 事件名称       | 说明                                                           |
| -------------- | -------------------------------------------------------------- |
| getphonenumber | [事件说明](https://uniapp.dcloud.net.cn/component/button.html) |
| getuserinfo    | [事件说明](https://uniapp.dcloud.net.cn/component/button.html) |
| error          | [事件说明](https://uniapp.dcloud.net.cn/component/button.html) |
| click          | [事件说明](https://uniapp.dcloud.net.cn/component/button.html) |

### Slots

| 插槽名  | 说明           | 默认值 |
| ------- | -------------- | ------ |
| loading | 自定义加载样式 | 有     |
