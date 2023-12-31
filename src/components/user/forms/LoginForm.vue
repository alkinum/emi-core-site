<template>
  <a-form v-model="formData" ref="formRef" :rules="formRules" class="passport-form">
    <div class="passport-form__header">
      <span>登录</span>
    </div>
    <a-form-item prop="email" label="邮箱">
      <a-input v-model="formData.email"></a-input>
    </a-form-item>
    <a-form-item prop="password" label="密码">
      <a-input type="password" v-model="formData.password"></a-input>
    </a-form-item>
    <a-form-item prop="t_token" label="验证">
      <div class="turnstile-container">
        <turnstile ref="turnstileRef" site-key="0x4AAAAAAANAWk6e4wepjB9g" v-model="formData.t_token" loadingText="验证码加载中..." />
      </div>
    </a-form-item>
    <a-form-item label=" ">
      <a-button @click="onLoginClicked" :loading="buttonLoading" round type="gradient-reverse">登录</a-button>
    </a-form-item>
    <div class="passport-form__footer">
      <a-clickable-text @click="handleRegister">没有帐号？点我注册</a-clickable-text>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import { Form as AForm, message } from '@any-design/anyui';
import Turnstile from '@any-design/turnstile';
import { cloneDeep } from 'lodash-es';
import { ref } from 'vue';

import { useTokenStore } from '@/store/token';
import { sha256 } from '@/utils/hash';
import { post } from '@/utils/request';

const DEFAULT_FORM_DATA = {
  email: '',
  password: '',
  t_token: '',
};

const formRef = ref<InstanceType<typeof AForm> | undefined>();
const turnstileRef = ref<InstanceType<typeof Turnstile> | undefined>();

const formData = ref(cloneDeep(DEFAULT_FORM_DATA));

const formRules = ref({
  email: [{
    required: true,
    message: '请输入邮箱',
  }, {
    pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    message: '请输入正确的电子邮箱',
  }],
  password: [{
    required: true,
    message: '请输入密码',
  }],
  t_token: [{
    required: true,
    message: '验证码校验未通过，请稍后再试',
  }],
});

const emit = defineEmits(['switchToRegister', 'success']);

const buttonLoading = ref(false);

const onLoginClicked = async () => {
  if (!formRef.value) {
    message.error('获取表单内容失败，请重试');
    return;
  }
  // validate
  if (!await formRef.value.validate()) {
    return;
  }
  // request backend
  buttonLoading.value = true;
  try {
    const { access_token: accessToken, refresh_token: refreshToken } = await post<{ access_token: string, refresh_token: string }>('/user/login', {
      ...formData.value,
      password: await sha256(formData.value.password),
    });
    const tokenStore = useTokenStore();
    tokenStore.setTokens({
      accessToken,
      refreshToken,
    });
    message.success('登录成功');
    emit('success');
  } catch (error) {
    console.error('Failed to login:', error);
    message.error((error as any).message || '登录失败，请稍后再试');
    turnstileRef.value?.reset();
  } finally {
    buttonLoading.value = false;
  }
};

const handleRegister = () => {
  emit('switchToRegister');
};
</script>
