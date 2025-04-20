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
import { api } from './libs/axios'; // Importe sua instância do Axios

library.add(fab, far);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Função para verificar e garantir o CSRF token
const ensureCsrfToken = async () => {
  const getToken = () =>
    (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
      ?.content;

  // Tentativa inicial
  if (getToken()) return true;

  // Se não encontrado, tenta obter um novo
  try {
    await api.get('/sanctum/csrf-cookie');
    return !!getToken();
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    return false;
  }
};

// Verificação antes de criar a app
ensureCsrfToken()
  .then((hasToken) => {
    if (!hasToken) {
      console.warn('CSRF token not available - reloading page');
      window.location.reload();
      return;
    }

    createInertiaApp({
      title: (title) => `${title} - ${appName}`,
      resolve: (name) =>
        resolvePageComponent(
          `./Pages/${name}.tsx`,
          import.meta.glob('./Pages/**/*.tsx')
        ),
      setup({ el, App, props }) {
        const root = createRoot(el);

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
  })
  .catch((error) => {
    console.error('CSRF verification failed:', error);
    window.location.reload();
  });
