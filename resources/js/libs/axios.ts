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
      try {
        const { data } = await axios.get('/sanctum/csrf-cookie');
        const newToken = (
          document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
        )?.content;

        if (newToken) {
          error.config.headers['X-CSRF-TOKEN'] = newToken;
          return api.request(error.config);
        }
      } catch (refreshError) {
        console.error('Falha ao renovar CSRF token', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
