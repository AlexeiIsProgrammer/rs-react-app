import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import ErrorBoundary from './components/ErrorBoundary/index.tsx';
import { ThemeProvider } from './context/ThemeContext/index.tsx';
import router from './router';
import { setupStore } from './store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={setupStore()}>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
