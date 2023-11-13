import { defineStore } from 'pinia';

import { post } from '@/utils/request';

export const useTokenStore = defineStore('token', {
  state: () => ({
    accessToken: window.localStorage.getItem('ak') || '',
    refreshToken: window.localStorage.getItem('rk') || '',
    expiresAt: Number(window.localStorage.getItem('epat')) || 0,
  }),
  actions: {
    setTokens({
      accessToken,
      refreshToken,
      expiresIn = 3600 * 24 * 7,
    }: {
      accessToken: string;
      refreshToken: string;
      expiresIn?: number;
    }) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.expiresAt = Date.now() + expiresIn * 1000;
      window.localStorage.setItem('ak', accessToken);
      window.localStorage.setItem('rk', refreshToken);
      window.localStorage.setItem('epat', `${this.expiresAt}`);
    },
    clearTokens() {
      this.accessToken = '';
      this.refreshToken = '';
      this.expiresAt = 0;
      window.localStorage.removeItem('ak');
      window.localStorage.removeItem('rk');
      window.localStorage.removeItem('epat');
    },
    async refreshTokens() {
      if (!this.refreshToken) {
        return;
      }
      try {
        const res = await post<{
          access_token: string;
          refresh_token: string;
        }>('/user/refresh-token', {
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
        });
        this.setTokens({
          accessToken: res.access_token,
          refreshToken: res.refresh_token,
        });
      } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
      }
    },
    async checkTokenState() {
      if (!this.accessToken) {
        return;
      }
      if (this.expiresAt - Date.now() <= -3600 * 24 * 7 * 1000) {
        // refresh token expired
        this.clearTokens();
        return;
      }
      if (this.expiresAt - Date.now() <= 3600 * 24 * 3 * 1000) {
        return await this.refreshTokens();
      }
    },
  },
});
