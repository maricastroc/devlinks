import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

let isRefreshing = false;
let failedRequests: any[] = [];

const processQueue = (error: any, token?: string) => {
  failedRequests.forEach((req) => {
    if (token) {
      req.headers['X-CSRF-TOKEN'] = token;
    }
    req.resolve(api(req));
  });
  failedRequests = [];
};

api.interceptors.request.use((config) => {
  const token = (
    document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
  )?.content;
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 419 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequests.push({ ...originalRequest, resolve });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.get('/sanctum/csrf-cookie', {
          baseURL: '/',
          withCredentials: true
        });

        const newToken = (
          document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
        )?.content;

        if (newToken) {
          processQueue(null, newToken);
          originalRequest.headers['X-CSRF-TOKEN'] = newToken;
          return api(originalRequest);
        } else {
          throw new Error('Novo token CSRF não encontrado');
        }
      } catch (refreshError) {
        console.error('Falha ao renovar CSRF:', refreshError);
        processQueue(refreshError);
        if (import.meta.env.PROD) {
          window.location.reload();
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { api };
