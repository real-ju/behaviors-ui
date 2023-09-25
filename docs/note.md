# 注意事项

## 组件如何自定义样式

### Attributes 透传机制

- H5

在 H5 中与 vue 表现一致，可直接在组件上写 class 和 style，默认会透传给组件根节点。

- 微信小程序

在微信小程序中，默认情况下，组件编译后会在根节点外套一层标签（类似于 CustomElement），直接在组件上写 class 和 style 不会透传到根节点。

本组件库已开启 [virtualHost](https://uniapp.dcloud.net.cn/tutorial/vue-api.html#%E5%85%B6%E4%BB%96%E9%85%8D%E7%BD%AE)，还需要在`manifest.json`中开启 [mergeVirtualHostAttributes](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-weixin)(uni-app 3.5.1+) 使 Attributes 正常透传。

uni-app 3.5.1 以下版本不支持透传，可以使用自定义样式类`root-class`和`root-style`：

```html
<be-button root-class="my-button" root-style="color: red">按钮</be-button>
```

### 自定义样式类

通过组件的样式相关 Props 传入自定义样式类，比如部分组件的`rootClass`，按钮组件的`hoverClass`等，然后在`<style>`中定义 css 规则即可。

- 在`<style scoped>`中需使用`:deep`css 穿透：

```scss
:deep {
  .custom-class {
    // css rules
  }
}
```

- 如果 css 写在第一层（没有嵌套），可能会出现部分样式不生效，这是因为组件内部 class 的优先级比较高，需要在类选择器后面添加`.be.deep`后缀提高优先级：

```scss
<style>
.custom-class.be.deep {
  // css rules
}
</style>
```

::: warning
请谨慎使用`!important`，除非你确保这条 css 规则优先级永远最高。
:::

### 小程序样式隔离

在自定义组件中使用 BehaviorsUI 组件时，需开启`styleIsolation: 'shared'`选项。

```ts [script]
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared'
  }
};
</script>
```
