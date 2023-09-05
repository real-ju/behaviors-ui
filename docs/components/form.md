# Form 表单

## 场景-登录

::: code-group

```html [template]
<be-form ref="formRef" v-model:model="model" :rules="rules">
  <template #default="{ validateField }">
    <view class="login-form">
      <be-form-item prop="username" required>
        <template #default="{ required, error }">
          <view class="form-item" :class="{ required }">
            <view class="label">用户名</view>
            <view class="content">
              <be-input class="input" v-model="model.username" @input="validateField('username')">
              </be-input>
            </view>
            <view v-if="error" class="error-msg">{{ error.message }}</view>
          </view>
        </template>
      </be-form-item>
      <be-form-item prop="password" required>
        <template #default="{ required, error }">
          <view class="form-item" :class="{ required }">
            <view class="label">密码</view>
            <view class="content">
              <be-input
                class="input"
                v-model="model.password"
                password
                :maxlength="6"
                @input="validateField('password')"
              >
              </be-input>
            </view>
            <view v-if="error" class="error-msg">{{ error.message }}</view>
          </view>
        </template>
      </be-form-item>
      <be-button class="login-btn" hover @click="login">登录</be-button>
    </view>
  </template>
</be-form>
```

```ts [script]
import { ref } from 'vue';

const formRef = ref();

const model = ref({
  username: '',
  password: ''
});

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [
    { required: true, message: '请输入密码' },
    { rule: /^\d{6}$/, message: '密码为6位数字' }
  ]
};

const login = () => {
  formRef.value.validate().then(() => {
    console.log('校验通过');
  });
};
```

```scss [style scoped]
.login-form {
  width: 100%;

  .form-item {
    width: 100%;
    padding: 10px 24px;
    background-color: #f2f2f2;
    border-radius: 10px;
    border: 1px solid #f2f2f2;

    .label {
      font-size: 14px;
      position: relative;
    }

    .content {
      width: 100%;
      margin-top: 6px;
      padding: 6px 10px;
      border-radius: 6px;
      background-color: #ffffff;

      .input {
        font-size: 14px;
      }
    }

    .error-msg {
      width: 100%;
      margin-top: 6px;
      font-size: 12px;
      color: #fa3636;
    }

    & + .form-item {
      margin-top: 10px;
    }

    &.required {
      .label::before {
        content: '*';
        display: block;
        position: absolute;
        top: 2px;
        left: -10px;
        color: #fa3636;
        font-weight: bold;
      }
    }
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
    height: 36px;
    border-radius: 10px;
    background-color: #4a68cc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #ffffff;
  }
}
```

:::

<ExampleIframe url="/pages/form/login" height="300px"></ExampleIframe>

::: info
示例中使用了 [Input](/components/input)、[Button](/components/button) 组件。
:::

## API

### Form Props

| 属性名         | 说明                                                         | 类型   | 默认值 |
| -------------- | ------------------------------------------------------------ | ------ | ------ |
| model(v-model) | 表单数据对象                                                 | object | -      |
| rules          | 表单验证规则。表单验证使用了`tiny-validator`库，文档开发中。 | object | -      |

### Form Slots

| 插槽名  | 说明                             | slot props                                 | 默认值 |
| ------- | -------------------------------- | ------------------------------------------ | ------ |
| default | 表单视图，里面使用`FormItem`组件 | `{ validateField, validate, resetFields }` | 无     |

### Form Methods

| 方法名        | 说明                                                                  | 参数                        |
| ------------- | --------------------------------------------------------------------- | --------------------------- |
| validateField | 验证单个字段，返回一个 Promise，then 表示验证通过，catch 表示验证失败 | `(prop: string) => Promise` |
| validate      | 验证所有字段，返回一个 Promise，then 表示验证通过，catch 表示验证失败 | `() => Promise`             |
| resetFields   | 重置所有字段                                                          | `() => void`                |

### FormItem Props

| 属性名   | 说明              | 类型    | 默认值 |
| -------- | ----------------- | ------- | ------ |
| prop     | 表单域 model 字段 | string  | -      |
| required | 是否必填字段      | boolean | false  |

### FormItem Slots

| 插槽名  | 说明       | slot props                                                                 | 默认值 |
| ------- | ---------- | -------------------------------------------------------------------------- | ------ |
| default | 表单域视图 | `{ required: boolean, error: { field: string, message: string } \| null }` | 无     |

<script setup lang="ts">
import ExampleIframe from "../src/ExampleIframe.vue";
</script>
