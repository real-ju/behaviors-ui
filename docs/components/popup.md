# Popup 弹出层

## 基本使用

::: code-group

```html [template]
<be-popup v-model:visible="visible" position="center">
  <view class="popup-content">内容</view>
</be-popup>
```

```ts [script]
import { ref } from 'vue';

const visible = ref(false);
```

```scss [style scoped]
.popup-content {
  width: 200px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

:::

<ExampleIframe url="/pages/popup/basic" height="300px"></ExampleIframe>

## 自定义位置

::: code-group

```html [template]
<be-popup v-model:visible="visible" position="custom" :maskOpacity="0">
  <view class="popup-content" @click.stop>这是一段描述文本。</view>
</be-popup>
```

```ts [script]
import { ref } from 'vue';

const visible = ref(false);
```

```scss [style scoped]
.popup-content {
  position: absolute;
  top: 60px;
  left: 24px;
  padding: 6px 10px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    display: block;
    width: 0px;
    height: 0px;
    border-left: 8px solid rgba(255, 255, 255, 0);
    border-right: 8px solid rgba(255, 255, 255, 0);
    border-top: 10px solid rgba(255, 255, 255, 0);
    border-bottom: 10px solid #ffffff;
    position: absolute;
    top: -20px;
    left: 20px;
  }
}
```

:::

<ExampleIframe url="/pages/popup/custom" height="200px"></ExampleIframe>

::: warning
限制：当`position=custom`时，弹出层内容根节点必须添加 @click.stop 阻止冒泡，否则点击事件会引起弹出层关闭。
:::

## API

### Props

| 属性名             | 说明                                            | 类型                                               | 默认值  |
| ------------------ | ----------------------------------------------- | -------------------------------------------------- | ------- |
| visible(v-model)   | 是否打开弹出层                                  | boolean                                            | false   |
| position           | 弹出层位置                                      | center \| top \| right \| bottom \| left \| custom | center  |
| width              | 弹出层宽度，仅当`position=left\|right`时生效    | css width                                          | -       |
| height             | 弹出层高度，仅当`position=top\|bottom`时生效    | css height                                         | -       |
| backgroundColor    | 弹出层背景色，当`position=center\|custom`时无效 | css background-color                               | #ffffff |
| borderRadius       | 弹出层圆角，当`position=center\|custom`时无效   | css border-radius                                  | 16rpx   |
| maskOpacity        | 弹出层遮罩透明度                                | css opacity                                        | 0.6     |
| maskCloseAble      | 点击遮罩是否关闭弹出层                          | boolean                                            | true    |
| negativeTop        | 居中时往上偏移量，仅当`position=center`时生效   | css top                                            | 5%      |
| animation          | 是否开启动画                                    | boolean                                            | true    |
| animationDuration  | 打开关闭弹框的动画时长(ms)                      | number                                             | 150     |
| screenTopOffset    | 弹出层距离屏幕顶部的偏移量                      | css top                                            | 0px     |
| screenBottomOffset | 弹出层距离屏幕底部的偏移量                      | css bottom                                         | 0px     |

### Events

| 事件名称  | 说明                            | 回调参数 |
| --------- | ------------------------------- | -------- |
| close     | 弹出层关闭                      | -        |
| maskClick | 当`position=custom`时，点击遮罩 | -        |

### Slots

| 插槽名  | 说明       | 默认值 |
| ------- | ---------- | ------ |
| default | 弹出层内容 | 无     |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
