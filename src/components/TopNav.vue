<template>
  <div class="top-nav">
    <a-button type="gradient" round @click="onLoginClicked">登录</a-button>
    <Passport v-model:visible="passportVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Passport from './user/Passport.vue';

const passportVisible = ref(false);

const onLoginClicked = () => {
  passportVisible.value = true;
};
</script>

<style lang="scss" scoped>
.top-nav {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  box-sizing: border-box;
  z-index: 10;
}
</style>