# Image 图片

## 基本使用

::: code-group

```html [template]
<be-image class="image1" src="/static/xxx/xxx.jpg" mode="widthFix"></be-image>
```

```scss [style scoped]
.image1 {
  width: 100%;
}
```

:::

<ExampleIframe url="/pages/image/basic" height="300px"></ExampleIframe>

::: warning
必须给 Image 组件设置宽高，否则无法正常显示。
:::

## API

### Props

| 属性名    | 说明                                     | 类型   | 默认值 |
| --------- | ---------------------------------------- | ------ | ------ |
| rootClass | [根节点 class](/note#组件如何自定义样式) | string | -      |
| rootStyle | [根节点 style](/note#组件如何自定义样式) | string | -      |

### Props extend uni-app image

| 属性名 | 说明                                                          | 默认值      |
| ------ | ------------------------------------------------------------- | ----------- |
| src    | [属性说明](https://uniapp.dcloud.net.cn/component/image.html) | -           |
| mode   | [属性说明](https://uniapp.dcloud.net.cn/component/image.html) | scaleToFill |

### Slots

| 插槽名  | 说明           | slot props | 默认值 |
| ------- | -------------- | ---------- | ------ |
| loading | 自定义加载视图 | -          | 有     |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
