import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { type JSX, type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { ThemeProvider } from '../context/ThemeContext';
import { type AppStore, type RootState, setupStore } from '.';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
