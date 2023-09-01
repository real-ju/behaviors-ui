# DataPopup 数据操作器

## 基本使用

::: code-group

```html [template]
<be-data-popup v-model:visible="visible" title="标题" theme="#4a68cc">
  <view>内容</view>
</be-data-popup>
```

```ts [script]
import { ref } from 'vue';

const visible = ref(false);
```

:::

<ExampleIframe url="/pages/dataPopup/basic" height="400px" maxWidth="375px"></ExampleIframe>

## 场景-列表筛选

::: code-group

```html [template]
<be-data-popup
  v-model:visible="visible"
  title="筛选"
  theme="#4a68cc"
  @clear="onClear"
  @confirm="onConfirm"
>
  <view class="data-popup-content">
    <view class="section">
      <view class="section-title">类型1</view>
      <view class="section-content">
        <FilterRadio v-model="filterData.type1" :options="typeOptions"></FilterRadio>
      </view>
    </view>
    <view class="section">
      <view class="section-title">类型2</view>
      <view class="section-content">
        <FilterRadio v-model="filterData.type2" :options="typeOptions"></FilterRadio>
      </view>
    </view>
  </view>
</be-data-popup>
```

```ts [script]
import { reactive, ref } from 'vue';

const visible = ref(false);

const filterData = reactive({
  type1: undefined,
  type2: undefined
});

const typeOptions = ref([
  { title: '选项1', value: 1 },
  { title: '选项2', value: 2 },
  { title: '选项3', value: 3 }
]);

const onClear = () => {
  filterData.type1 = undefined;
  filterData.type2 = undefined;
};

const onConfirm = () => {
  console.log('点击确定按钮');
};
```

```scss [style scoped]
.data-popup-content {
  padding: 0rpx 30rpx 10px;

  .section {
    width: 100%;

    .section-title {
      width: 100%;
      padding: 10px 0px;
    }

    .section-content {
      width: 100%;
    }
  }
}
```

<ExampleIframe url="/pages/dataPopup/filter" height="400px" maxWidth="375px"></ExampleIframe>

:::

::: info
FilterRadio 组件是基于 [Radio](/components/radio) 封装的单选器，这里不提供代码，只用于演示。
:::

## API

### Props

| 属性名           | 说明                               | 类型       | 默认值  |
| ---------------- | ---------------------------------- | ---------- | ------- |
| visible(v-model) | 是否打开弹出层                     | boolean    | false   |
| height           | 弹出层高度                         | css height | -       |
| title            | 标题                               | string     | -       |
| confirmText      | 自定义确定按钮文字                 | string     | 确定    |
| clearText        | 自定义清空按钮文字                 | string     | 清空    |
| maskCloseAble    | 点击遮罩是否关闭弹出层             | boolean    | true    |
| actionCloseAble  | 点击确定或清空按钮后是否关闭弹出层 | boolean    | true    |
| theme            | 主题色                             | css color  | #4a68cc |

### Events

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| close    | 弹出层关闭   | -        |
| confirm  | 点击确定按钮 | -        |
| clear    | 点击清空按钮 | -        |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
