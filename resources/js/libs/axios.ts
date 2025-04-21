import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = (
    document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
  )?.content;

  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  } else {
    console.warn('CSRF token não encontrado no meta tag');
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 419) {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { api };
