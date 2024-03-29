# Checkbox 多选器

## 基本使用

::: code-group

```html [template]
<be-checkbox v-model="model" :options="options">
  <template #default="{ options, isChecked, selectItem }">
    <view class="checkbox1">
      <view
        class="item"
        :class="{ checked: isChecked(item) }"
        v-for="item in options"
        :key="item.value"
        @click="selectItem(item)"
      >
        {{ item.title }}
      </view>
    </view>
  </template>
</be-checkbox>
```

```ts [script]
import { ref } from 'vue';

const model = ref<number[]>([]);
const options = ref([
  { title: '选项1', value: 1 },
  { title: '选项2', value: 2 },
  { title: '选项3', value: 3 }
]);
```

```scss [style scoped]
.checkbox1 {
  width: 100%;
  display: flex;
  align-items: center;

  .item {
    width: 50px;
    height: 50px;
    border-radius: 10rpx;
    background-color: #dddddd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;

    & + .item {
      margin-left: 10px;
    }

    &.checked {
      color: #4a68cc;
      border: 2px solid #4a68cc;
    }
  }
}
```

:::

<ExampleIframe url="/pages/checkbox/basic" height="120px"></ExampleIframe>

## API

### Props

| 属性名              | 说明                    | 类型                      | 默认值 |
| ------------------- | ----------------------- | ------------------------- | ------ |
| modelValue(v-model) | 当前选中项的 value 数组 | `Array<string \| number>` | `[]`   |
| options             | 选项数据                | `Array<CheckboxOption>`   | `[]`   |

### Slots

| 插槽名  | 说明 | slot props                                                                                                                     | 默认值 |
| ------- | ---- | ------------------------------------------------------------------------------------------------------------------------------ | ------ |
| default | 视图 | `{ options: Array<CheckboxOption>, isChecked: (item: CheckboxOption) => boolean, selectItem: (item: CheckboxOption) => void }` | 无     |

### Types

| 类型名         | 值                                                                              | 说明 |
| -------------- | ------------------------------------------------------------------------------- | ---- |
| CheckboxOption | `{ title: string, value: string \| number, disabled?: boolean, desc?: object }` | -    |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
