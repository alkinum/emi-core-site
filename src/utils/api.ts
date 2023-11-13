import { get, post } from './request';

import { useTokenStore } from '@/store/token';

export const requestApi = <T = unknown>(
  method: string,
  path: string,
  data?: unknown,
  requestInit?: RequestInit,
) => {
  const tokenStore = useTokenStore();
  const formattedMethod = method.toLowerCase();
  if (formattedMethod === 'post') {
    return post<T>(path, data, {
      ...requestInit,
      headers: {
        ...requestInit?.headers,
        Authorization: `Bearer ${tokenStore.accessToken}`,
      },
    });
  } else {
    return get<T>(path, {
      ...requestInit,
      headers: {
        ...requestInit?.headers,
        Authorization: `Bearer ${tokenStore.accessToken}`,
      },
    });
  }
};
