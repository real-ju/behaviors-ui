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
`position=custom`时，弹出层内容根节点必须添加.stop 阻止冒泡，否则点击内容会引起弹出层关闭。
:::

## API

### Props

| 属性名     | 说明                                | 类型   | 默认值   |
| ---------- | ----------------------------------- | ------ | -------- |
| fontFamily | 阿里巴巴图标库项目配置的 FontFamily | string | iconfont |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
