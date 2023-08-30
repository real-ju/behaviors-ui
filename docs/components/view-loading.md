# ViewLoading 视图加载中

## 基本使用

::: code-group

```html [template]
<view class="container">
  <be-view-loading></be-view-loading>
</view>
```

```scss [style scoped]
.container {
  width: 100%;
  height: 100px;
  // 需要把容器设置为定位祖先元素
  position: relative;
}
```

:::

<ExampleIframe url="/pages/viewLoading/basic" height="135px"></ExampleIframe>

::: warning
由于 ViewLoading 组件使用了`position: absolute`定位，所以需要把容器设置为定位祖先元素，比如给容器设置`position: relative`。
:::

## API

### Props

| 属性名       | 说明               | 类型                           | 默认值                                                    |
| ------------ | ------------------ | ------------------------------ | --------------------------------------------------------- |
| iconSize     | 加载图标大小       | css font-size                  | 50rpx                                                     |
| loadingIcon  | 自定义加载图标     | [Icon](/components/icon) Props | `{ fontFamily?: 'iconfont', prefix?: 'icon-', name: '' }` |
| iconColor    | 自定义加载图标颜色 | css color                      | #aaaaaa                                                   |
| bgColor      | 背景颜色           | css background-color           | rgba(255, 255, 255, 0)                                    |
| borderRadius | 边框圆角           | css border-radius              | 0rpx                                                      |
| height       | 高度               | css height                     | 100%                                                      |

### Slots

| 插槽名  | 说明           | slot props | 默认值 |
| ------- | -------------- | ---------- | ------ |
| default | 自定义加载样式 | -          | 有     |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
