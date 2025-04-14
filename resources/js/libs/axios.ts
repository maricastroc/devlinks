import axios from 'axios';

export const api = axios.create({
  baseURL: '/'
});

api.interceptors.request.use((config) => {
  const token = (
    document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
  )?.content;

  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }

  return config;
});
