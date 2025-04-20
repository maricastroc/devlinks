import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { api } from './libs/axios';

library.add(fab, far);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Contador para evitar loops infinitos
let csrfRetryCount = 0;
const MAX_CSRF_RETRIES = 2;

const initializeApp = () => {
  createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
      resolvePageComponent(
        `./Pages/${name}.tsx`,
        import.meta.glob('./Pages/**/*.tsx')
      ),
    setup({ el, App, props }) {
      const root = createRoot(el);

      // Configura o interceptor de resposta
      api.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (
            error.response?.status === 419 &&
            csrfRetryCount < MAX_CSRF_RETRIES
          ) {
            csrfRetryCount++;

            try {
              // Tenta obter novo token CSRF
              await api.get('/sanctum/csrf-cookie');

              // Repete a requisição original com novo token
              const newToken = (
                document.querySelector(
                  'meta[name="csrf-token"]'
                ) as HTMLMetaElement
              )?.content;
              if (newToken) {
                error.config.headers['X-CSRF-TOKEN'] = newToken;
                return api.request(error.config);
              }
            } catch (refreshError) {
              console.error('Failed to refresh CSRF token:', refreshError);
            }

            // Se chegou aqui, a renovação falhou - recarrega a página
            if (csrfRetryCount >= MAX_CSRF_RETRIES) {
              console.log('Max CSRF retries reached - reloading page');
              window.location.reload();
            }
          }
          return Promise.reject(error);
        }
      );

      root.render(
        <>
          <ThemeProvider>
            <App {...props} />
            <Toaster
              toastOptions={{
                style: {
                  backgroundColor: '#161D2F',
                  color: '#fff'
                }
              }}
            />
          </ThemeProvider>
        </>
      );
    },
    progress: {
      color: '#4B5563'
    }
  });
};

// Verificação inicial do CSRF token
const checkInitialCSRF = async () => {
  try {
    // Se não tem token, tenta obter um
    if (
      !(document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
        ?.content
    ) {
      await api.get('/sanctum/csrf-cookie');
    }

    initializeApp();
  } catch (error) {
    console.error('Initial CSRF check failed:', error);
    window.location.reload();
  }
};

// Inicia o processo
checkInitialCSRF();
