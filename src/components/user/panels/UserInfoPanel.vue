<template>
  <div class="user-info">
    <div class="user-info__header">
      <span>用户设置</span>
    </div>
    <div class="user-info__content">
      <a-list-view type="deep" item-height="40px">
        <a-list-view-item label="用户邮箱">{{ userEmail }}</a-list-view-item>
        <a-list-view-item class="list-item--with-button" label="登出"><a-button type="danger" size="small" @click="handleSignOut" round>退出登录</a-button></a-list-view-item>
      </a-list-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useTokenStore } from '@/store/token';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const tokenStore = useTokenStore();

const userEmail = computed(() => userStore?.user?.email);

const handleSignOut = () => {
  userStore.clearUserInfo();
  tokenStore.clearTokens();
};
</script>

<style lang="scss" scoped>
.user-info {
  box-sizing: border-box;
  height: 100%;
  padding: 2px 0;

  &__header {
    font-size: 14px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }

  &__content {
    height: calc(100% - 30px);
    position: relative;
  }

  :deep(.a-list-view) {
    .a-list-view-item {
      padding: 4px 14px;
      box-sizing: border-box;
      border-radius: 20px;

      &__label {
        font-size: 14px;
      }

      &__content {
        font-size: 14px;
      }
    }

    .list-item--with-button {
      padding: 4px 4px 4px 14px;
    }
  }
}
</style>