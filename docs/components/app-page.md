# AppPage 页面

应用的每一个页面。

## 基本使用

::: code-group

```html [template]
<be-app-page showNavbar title="标题" bgColor="#f2f2f2">
  <template #navBar="{ title }">
    <NavBar :title="title"></NavBar>
  </template>
  <view>内容</view>
</be-app-page>
```

:::

<ExampleIframe url="/pages/appPage/basic" height="300px"></ExampleIframe>

::: info
顶部导航栏一般根据产品设计，有不同的样式和功能。所以导航栏组件请自行封装，通过`navBar`slot 传入即可。这里不提供 NavBar 组件代码，只用于演示。
:::

## 沉浸式导航栏

::: code-group

```html{5} [template]
<be-app-page
  showNavbar
  title="标题"
  bgColor="#f2f2f2"
  immersiveNav
  @toggleImmersive="toggleImmersive"
>
  <template #navBar="{ title }">
    <NavBar :title="title" :bgTheme="bgTheme"></NavBar>
  </template>
  <view class="banner">Banner</view>
  <view>文本</view>
  <view>文本</view>
  ...
</be-app-page>
```

```ts [script]
import { ref } from 'vue';

const defaultBgTheme = 'dark';
// 导航栏背景色是暗色还是亮色
const bgTheme = ref('dark');

const toggleImmersive = (isImmersive: boolean) => {
  bgTheme.value = isImmersive ? defaultBgTheme : 'light';
};
```

:::

<ExampleIframe url="/pages/appPage/immersiveNav" height="300px"></ExampleIframe>

## 下拉刷新

::: code-group

```html [template]
<be-app-page showNavbar title="标题" bgColor="#f2f2f2" pullDownRefresh @refreshData="refreshData">
  <template #navBar="{ title }">
    <NavBar :title="title"></NavBar>
  </template>
  <view>文本文本文本文本文本文本文本文本文本文本</view>
</be-app-page>
```

```ts [script]
const refreshData = (finishRefresh: Function) => {
  setTimeout(() => {
    finishRefresh();
  }, 1000);
};
```

:::

<ExampleIframe url="/pages/appPage/refresh" height="300px"></ExampleIframe>

## API

### Props

| 属性名              | 说明                 | 类型                 | 默认值  |
| ------------------- | -------------------- | -------------------- | ------- |
| showNavbar          | 显示导航栏           | boolean              | false   |
| title               | 导航栏标题           | string               | -       |
| navBgColor          | 导航栏背景色         | css background-color | #ffffff |
| immersiveNav        | 是否开启沉浸式导航栏 | boolean              | false   |
| bgColor             | 页面背景色           | css background-color | #ffffff |
| loading             | 页面加载状态         | boolean              | false   |
| loadingIconSize     | 页面加载图标大小     | css font-size        | 50rpx   |
| pullDownRefresh     | 是否开启页面下拉刷新 | boolean              | false   |
| refresherColor      | 下拉刷新器颜色       | css color            | #aaaaaa |
| scrollWithAnimation | 是否开启页面滚动动画 | boolean              | false   |

### Events

| 事件名称        | 说明                                                 | 回调参数                          |
| --------------- | ---------------------------------------------------- | --------------------------------- |
| refreshData     | 下拉刷新数据                                         | `(finishRefresh: Function) => {}` |
| toggleImmersive | 沉浸状态切换时，`isImmersive=true`表示导航栏背景透明 | `(isImmersive: boolean) => {}`    |

### Events extend uni-app scroll-view

| 事件名称      | 说明                                                                |
| ------------- | ------------------------------------------------------------------- |
| scrolltolower | [事件说明](https://uniapp.dcloud.net.cn/component/scroll-view.html) |
| scroll        | [事件说明](https://uniapp.dcloud.net.cn/component/scroll-view.html) |

### Slots

| 插槽名  | 说明                                                                                                                                                             | slot props          | 默认值 |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------ |
| navBar  | 自定义导航栏                                                                                                                                                     | `{ title: string }` | 无     |
| loading | 自定义加载视图，推荐传入 [BeViewLoading](/components/view-loading) 组件                                                                                          | -                   | 有     |
| upLayer | 顶层视图。由于在微信小程序中，`position: fixed`定位的基准元素是最近的`<scroll-view>`而不是视口。如果需要跳出这个限制，比如全局弹出层，请把视图代码放在该插槽中。 | -                   | 无     |
| default | 页面内容                                                                                                                                                         | -                   | 无     |

### Methods

| 方法名        | 说明         | 参数         |
| ------------- | ------------ | ------------ |
| finishRefresh | 结束下拉刷新 | `() => void` |
| backTop       | 返回页面顶部 | `() => void` |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
