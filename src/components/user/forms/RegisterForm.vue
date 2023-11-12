<template>
  <a-form v-model="formData" ref="formRef" :rules="formRules" class="passport-form">
    <div class="passport-form__header">
      <span>注册</span>
    </div>
    <a-form-item prop="email" label="电子邮箱">
      <a-input v-model="formData.email"></a-input>
    </a-form-item>
    <a-form-item prop="password" label="密码">
      <a-input type="password" v-model="formData.password"></a-input>
    </a-form-item>
    <a-form-item prop="confirmPassword" label="确认密码">
      <a-input type="password" v-model="formData.confirmPassword"></a-input>
    </a-form-item>
    <a-form-item prop="t_token" label="验证">
      <div class="turnstile-container">
        <turnstile ref="turnstileRef" site-key="0x4AAAAAAANAWk6e4wepjB9g" v-model="formData.t_token" loadingText="验证码加载中..." />
      </div>
    </a-form-item>
    <a-form-item label=" ">
      <a-button @click="onRegisterClicked" :loading="buttonLoading" round type="gradient-reverse">提交</a-button>
    </a-form-item>
    <div class="passport-form__footer">
      <a-clickable-text @click="handleLogin">已有帐号？点我登录</a-clickable-text>
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
  confirmPassword: '',
  email: '',
  t_token: '',
};

const formRef = ref<InstanceType<typeof AForm> | undefined>();

const formData = ref(cloneDeep(DEFAULT_FORM_DATA));
const turnstileRef = ref<InstanceType<typeof Turnstile> | undefined>();

const formRules = ref({
  password: [{
    required: true,
    message: '请输入密码',
  }, {
    validator: (rule: any, value: string, callback: (reason?: string) => void) => {
      if (value !== formData.value.password) {
        return callback('两次输入密码不一致');
      }
      if (value.length <= 6) {
        return callback('密码至少需要6位数');
      }
      if (!/^[a-zA-Z0-9!@#_$%^&*]+$/.test(value)) {
        return callback('密码只能包含字母、数字和特殊字符：!@#_$%^&*');
      }
      callback();
    },
  }],
  confirmPassword: [{
    required: true,
    message: '请再次输入密码',
  }, {
    validator: (rule: any, value: string, callback: (reason?: string) => void) => {
      if (value !== formData.value.password) {
        return callback('两次输入密码不一致');
      }
      callback();
    },
  }],
  email: [{
    required: true,
    message: '请输入电子邮箱',
  }, {
    pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    message: '请输入正确的电子邮箱',
  }],
  t_token: [{
    required: true,
    message: '验证码校验未通过，请稍后再试',
  }],
});

const emit = defineEmits(['switchToLogin']);

const buttonLoading = ref(false);

const onRegisterClicked = async () => {
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
    await post('/user/register', {
      ...formData.value,
      password: await sha256(formData.value.password),
      confirmPassword: await sha256(formData.value.confirmPassword),
    });
    message.success('注册成功');
    emit('switchToLogin');
  } catch (error) {
    console.error('Failed to register:', error);
    message.error((error as any).message || '注册失败，请稍后再试');
    turnstileRef.value?.reset();
  } finally {
    buttonLoading.value = false;
  }
};

const handleLogin = () => {
  emit('switchToLogin');
};
</script>
