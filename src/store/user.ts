import { defineStore } from 'pinia';

import type { UserInfo } from '@/types/user';
import { requestApi } from '@/utils/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as UserInfo | null, // 用户信息初始为空
  }),
  actions: {
    async getUserInfo() {
      try {
        const userInfo: UserInfo = await requestApi<UserInfo>('GET', '/user/info');
        this.user = userInfo;
      } catch (error) {
        console.error('获取用户信息失败:', error);
        this.user = null;
      }
    },
  },
});
