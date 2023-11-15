import { defineStore } from 'pinia';

import type { ApiKeyItem, UserInfo } from '@/types/user';
import { requestApi } from '@/utils/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as UserInfo | null, // 用户信息初始为空
    apiKeyList: [] as ApiKeyItem[],
  }),
  actions: {
    async getUserInfo() {
      try {
        this.user = await requestApi<UserInfo>('GET', '/user/info');
      } catch (error) {
        console.error('Fetch user info failed:', error);
        this.user = null;
      }
    },
    clearUserInfo() {
      this.user = null;
      this.apiKeyList = [];
    },
    async getApiKeyList() {
      try {
        this.apiKeyList = await requestApi<ApiKeyItem[]>('GET', '/api-key/list');
      } catch (error) {
        console.error('Fetch api key list failed:', error);
        throw error;
      }
    },
  },
});
