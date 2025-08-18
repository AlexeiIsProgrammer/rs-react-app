'use client';

import { Provider } from 'react-redux';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { ThemeProvider } from 'src/context/ThemeContext';
import { setupStore } from 'src/store';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={setupStore()}>
      <ThemeProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
