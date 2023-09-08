<template>
  <view class="playground form-login-page">
    <be-form ref="formRef" v-model:model="model" :rules="rules">
      <template #default="{ validateField }">
        <view class="login-form">
          <be-form-item prop="username" required>
            <template #default="{ required, error }">
              <view class="form-item" :class="{ required }">
                <view class="label">用户名</view>
                <view class="content">
                  <be-input
                    class="input"
                    v-model="model.username"
                    @input="validateField('username')"
                  >
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
  </view>
</template>

<script setup lang="ts">
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
</script>

<style lang="scss" scoped>
.form-login-page {
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
      font-size: 14px;
      color: #ffffff;
    }
  }
}
</style>
