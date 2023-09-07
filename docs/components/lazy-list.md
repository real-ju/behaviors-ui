# LazyList 懒加载列表

具备下拉刷新功能的分页列表组件。

## 基本使用

::: code-group

```html [template]
<be-lazy-list v-model="list" @load="loadData" pullDownRefresh>
  <view class="list">
    <view class="item" v-for="item in list" :key="item.id">{{ item.title }}</view>
  </view>
</be-lazy-list>
```

```ts [script]
import { ref } from 'vue';

const list = ref<any[]>([]);

const loadData = (page: number, onLoadSuccess: Function, onLoadError: Function, first: boolean) => {
  // 模拟加载5页数据
  setTimeout(() => {
    if (page <= 5) {
      onLoadSuccess([
        {
          id: 3 * (page - 1) + 1,
          title: `数据${3 * (page - 1) + 1}`
        },
        {
          id: 3 * (page - 1) + 2,
          title: `数据${3 * (page - 1) + 2}`
        },
        {
          id: 3 * (page - 1) + 3,
          title: `数据${3 * (page - 1) + 3}`
        }
      ]);
    } else {
      onLoadSuccess(); // 或者onLoadSuccess([])
    }
  }, 1000);
};
```

```scss [style scoped]
.list {
  width: 100%;
  padding: 0px 16px;

  .item {
    width: 100%;
    padding: 30px 0px;

    & + .item {
      border-top: 1px solid #eeeeee;
    }
  }
}
```

:::

<ExampleIframe url="/pages/lazyList/basic" height="400px" maxWidth="375px"></ExampleIframe>

## API

### Props

| 属性名              | 说明                                                                                      | 类型                                      | 默认值                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| modelValue(v-model) | 列表数据                                                                                  | `any[]`                                   | []                                                                   |
| proxy               | 是否开启触底监听代理。开启时，组件容器为`<scroll-view>`，宽高都为`100%`，撑满整个父元素。 | boolean                                   | true                                                                 |
| minHeight           | 非代理模式下组件最小高度（避免高度坍塌）                                                  | css min-height                            | 200rpx                                                               |
| autoLoad            | 初始化时是否自动加载数据                                                                  | boolean                                   | true                                                                 |
| moreIcon            | 加载更多自定义图标，为 false 则不显示                                                     | boolean \| [Icon](/components/icon) Props | true                                                                 |
| moreText            | 加载更多自定义文本                                                                        | object                                    | `{ loadmore: '加载更多', loading: '加载中…', nomore: '没有更多了' }` |
| moreFontSize        | 加载更多自定义字体大小                                                                    | css font-size                             | 26rpx                                                                |
| moreFontColor       | 加载更多自定义字体颜色                                                                    | css color                                 | #999999                                                              |
| showEmptyTip        | 数据为空时，是否显示提示                                                                  | boolean                                   | true                                                                 |
| emptyImageUrl       | 空提示图片 URL                                                                            | string                                    | -                                                                    |
| emptyImageWidth     | 空提示图片宽度（图片使用`widthFix`模式显示）                                              | css width                                 | 200rpx                                                               |
| emptyText           | 空提示文本                                                                                | string                                    | 暂无内容                                                             |
| emptyFontSize       | 空提示字体大小                                                                            | css font-size                             | 26rpx                                                                |
| emptyFontColor      | 空提示字体颜色                                                                            | css color                                 | #aaaaaa                                                              |
| emptyFontTop        | 空提示字体与图片的间距                                                                    | css margin-top                            | 50rpx                                                                |
| pullDownRefresh     | 是否开启列表下拉刷新，当`proxy=true`时生效                                                | boolean                                   | false                                                                |
| refresherColor      | 下拉刷新器主题色                                                                          | css color                                 | #aaaaaa                                                              |

### Events

| 事件名称 | 说明                                                                                                                                                                                                 | 回调参数                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| load     | 加载数据。参数说明：`page`当前页数 `onLoadSuccess`加载成功回调函数，传入当前页数据，传入`[]`或者不传值表示已加载完全部数据 `onLoadError`加载失败回调函数 `first`是否首次加载数据（初始化或者重置后） | `(page: number, onLoadSuccess: (datas?: any[]) => void, onLoadError: () => void, first: boolean) => {}` |

### Slots

| 插槽名  | 说明                                                                                | slot props                                                    | 默认值 |
| ------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------ |
| empty   | 自定义空提示视图                                                                    | -                                                             | 有     |
| more    | 自定义加载更多视图                                                                  | `{ loading: boolean, finished: boolean, loadMore: Function }` | 有     |
| loading | 自定义初始化加载中视图，该插槽会传递给 [ViewLoading](/components/view-loading) 组件 | -                                                             | 有     |
| default | 列表视图                                                                            | -                                                             | 无     |

### Methods

| 方法名   | 说明                                                                         | 参数                       |
| -------- | ---------------------------------------------------------------------------- | -------------------------- |
| loadMore | 加载更多数据                                                                 | `() => void`               |
| reset    | 重置组件状态并加载数据                                                       | `() => void`               |
| refresh  | 触发下拉刷新，参数说明：`clear`下拉后是否立即清空列表数据（重置 v-model 值） | `(clear: boolean) => void` |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
