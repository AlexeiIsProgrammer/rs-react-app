'use client';

import React from 'react';
import { Provider } from 'react-redux';

import ErrorBoundary from '#components/ErrorBoundary';
import { ThemeProvider } from '#context/ThemeContext';
import { setupStore } from '#store/index';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={setupStore()}>
      <ThemeProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default Layout;
