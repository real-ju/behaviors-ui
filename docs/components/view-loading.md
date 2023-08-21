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

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
