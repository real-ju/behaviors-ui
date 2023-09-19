# Video 视频

## 基本使用

::: code-group

```html [template]
<be-video
  class="video1"
  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  coverSrc="/static/xxx/xxx.jpg"
>
</be-video>
```

```scss [style scoped]
.video1 {
  width: 100%;
  height: 200px;
}
```

:::

<ExampleIframe url="/pages/video/basic" height="250px" maxWidth="375px"></ExampleIframe>

::: warning
必须给 Video 组件设置宽高，否则无法正常显示。
:::

## API

### Props

| 属性名        | 说明                                     | 类型       | 默认值          |
| ------------- | ---------------------------------------- | ---------- | --------------- |
| rootClass     | [根节点 class](/note#组件如何自定义样式) | string     | -               |
| rootStyle     | [根节点 style](/note#组件如何自定义样式) | string     | -               |
| coverSrc      | 视频封面 URL                             | string     | -               |
| hideCover     | 隐藏视频封面                             | boolean    | false           |
| playBtnSrc    | 播放按钮图标 URL                         | string     | _default value_ |
| playBtnWidth  | 播放按钮宽度                             | css width  | 100rpx          |
| playBtnHeight | 播放按钮高度                             | css height | 100rpx          |

### Props extend uni-app video

| 属性名 | 说明                                                          | 默认值 |
| ------ | ------------------------------------------------------------- | ------ |
| src    | [属性说明](https://uniapp.dcloud.net.cn/component/video.html) | -      |

### Events extend uni-app video

| 事件名称 | 说明                                                          |
| -------- | ------------------------------------------------------------- |
| play     | [事件说明](https://uniapp.dcloud.net.cn/component/video.html) |

### Slots

| 插槽名 | 说明           | slot props | 默认值 |
| ------ | -------------- | ---------- | ------ |
| cover  | 自定义视频封面 | -          | 有     |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
