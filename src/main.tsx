import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/index.tsx';
import { RouterProvider } from 'react-router';
import router from './router';
import { Provider } from 'react-redux';
import { setupStore } from './store';
import { ThemeProvider } from './context/ThemeContext/index.tsx';

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
