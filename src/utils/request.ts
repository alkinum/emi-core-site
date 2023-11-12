const BASE_URL = 'https://emi-io.alkinum.io';
const REQUEST_TIMEOUT = 10 * 1000;

export async function httpRequset<T = unknown>(url: string, options?: RequestInit) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      controller.abort();
      reject(new Error('请求超时了哦~'));
    }, REQUEST_TIMEOUT),
  );
  const controller = new AbortController();
  const { signal } = controller;

  try {
    const response = (await Promise.race([
      fetch(url, { ...options, signal }),
      timeoutPromise,
    ])) as Response;
    const res = (await response.json()) as { code: number; msg?: string; data: T };
    if (res.code !== 0) {
      throw new Error(res.msg || 'Unknown error occurred');
    }
    return res.data;
  } catch (error) {
    console.error('Fetch error:', (error as any).message);
    throw error;
  }
}

export async function get<T = unknown>(path: string, requestInit?: RequestInit) {
  const url = `${BASE_URL}${path}`;
  return httpRequset<T>(url, requestInit);
}

export async function post<T = unknown>(path: string, data: unknown, requestInit?: RequestInit) {
  const url = `${BASE_URL}${path}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...requestInit,
  };
  return httpRequset<T>(url, options);
}
