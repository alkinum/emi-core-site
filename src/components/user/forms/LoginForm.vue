<template>
  <a-form v-model="formData" ref="formRef" :rules="formRules" class="passport-form">
    <div class="passport-form__header">
      <span>登录</span>
    </div>
    <a-form-item prop="username" label="用户名">
      <a-input v-model="formData.username"></a-input>
    </a-form-item>
    <a-form-item prop="password" label="密码">
      <a-input type="password" v-model="formData.password"></a-input>
    </a-form-item>
    <a-form-item prop="t_token" label="验证">
      <div class="turnstile-container">
        <turnstile site-key="0x4AAAAAAANAWk6e4wepjB9g" v-model="formData.t_token" loadingText="验证码加载中..." />
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

import { sha256 } from '@/utils/hash';
import { post } from '@/utils/request';

const DEFAULT_FORM_DATA = {
  username: '',
  password: '',
  t_token: '',
};

const formRef = ref<InstanceType<typeof AForm> | undefined>();

const formData = ref(cloneDeep(DEFAULT_FORM_DATA));

const formRules = ref({
  username: [{
    required: true,
    message: '请输入用户名',
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

const emit = defineEmits(['switchToRegister']);

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
    await post('/user/login', {
      ...formData.value,
      password: await sha256(formData.value.password),
    });
  } catch (error) {
    console.error('Failed to login:', error);
    message.error((error as any).message || '登录失败，请稍后再试');
  } finally {
    buttonLoading.value = false;
  }
};

const handleRegister = () => {
  emit('switchToRegister');
};
</script>
