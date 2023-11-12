<template>
  <a-float class="passport" v-model:visible="floatVisible" width="580" round>
    <login-form @switchToRegister="switchToRegister" v-if="currentForm === 'login'" />
    <register-form @switchToLogin="switchToLogin" v-else />
  </a-float>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import './turnstile.scss';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:visible']);

const floatVisible = ref(props.visible);
const currentForm = ref<'login' | 'register'>('login');

watch(() => props.visible, (newVal) => {
  floatVisible.value = newVal;
});

watch(() => floatVisible.value, (newVal) => {
  emit('update:visible', newVal);
});

const switchToLogin = () => {
  currentForm.value = 'login';
};

const switchToRegister = () => {
  currentForm.value = 'register';
};
</script>

<style lang="scss">
.passport {
  .a-float__content {
    padding: 24px 28px;
    box-sizing: border-box;
  }
}

.passport-form {
  &__header {
    margin-bottom: 1rem;
  }

  .a-form-item-inner__label {
    span {
      font-size: 14px;
      font-weight: 400;
    }
  }

  &__footer {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 12px;
  }
}
</style>