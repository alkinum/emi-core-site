<template>
  <div class="top-nav">
    <!-- disable this part because service is not available -->
    <template v-if="false">
      <a-button type="gradient" round @click="onLoginClicked" v-if="!userLogon">登录</a-button>
      <a-button class="top-nav__user" type="secondary" round v-else @click="openUserCenter">{{ displayNickname }}</a-button>
      <Passport v-model:visible="passportVisible" @refresh="onRefreshUserInfo" />
      <UserCenter v-model:visible="userCenterVisible" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';

import Passport from './user/Passport.vue';

import { useTokenStore } from '@/store/token';
import { useUserStore } from '@/store/user';

const tokenStore = useTokenStore();
const userStore = useUserStore();

const passportVisible = ref(false);
const userCenterVisible = ref(false);

const userLogon = computed(() => !!userStore.user);
const displayNickname = computed(() => userStore.user?.nickname || userStore.user?.email);

const onLoginClicked = () => {
  passportVisible.value = true;
};

const onRefreshUserInfo = () => {
  userStore.getUserInfo();
};

const openUserCenter = () => {
  userCenterVisible.value = true;
};

onBeforeMount(async () => {
  await tokenStore.checkTokenState();
  if (tokenStore.accessToken) {
    userStore.getUserInfo();
  }
});
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

  &__user {
    font-size: 13px;
    padding: 3px 18px;
  }
}
</style>