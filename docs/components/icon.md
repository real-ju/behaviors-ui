# Icon 图标

字体图标基于阿里巴巴矢量图标库，使用[font-class 引用](https://www.iconfont.cn/help/detail?spm=a313x.help_detail.i1.d8d11a391.13be3a817pVR7H&helptype=code)的方式，建议从项目生成代码文件下载到本地使用。

## 基本使用

::: code-group

```ts [main.ts]
// 全局引入从iconfont.cn下载的CSS
import '/static/xxx/iconfont.css';
```

```html [template]
<be-icon name="plus-circle"></be-icon>
```

:::

<ExampleIframe url="/pages/icon/basic" height="70px"></ExampleIframe>

::: info
本质上就是文本，能够设置文本相关样式。
:::

## API

### Props

| 属性名     | 说明                                    | 类型   | 默认值   |
| ---------- | --------------------------------------- | ------ | -------- |
| fontFamily | 阿里巴巴图标库项目配置的 FontFamily     | string | iconfont |
| prefix     | 阿里巴巴图标库项目配置的 FontClass 前缀 | string | icon-    |
| name       | 阿里巴巴图标库项目配置的 FontClass 名   | string | -        |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
