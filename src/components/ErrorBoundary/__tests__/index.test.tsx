import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ErrorBoundary from '../index';
import App from '../../../app/App';

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

describe('ErrorBoundary Component', () => {
  it('catches and handles JavaScript errors in child components', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });

  it('displays fallback UI when error occurs', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { container } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(within(container).getByTestId('retry-button')).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });

  it('logs error to console', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('error button triggers retry and hides fallback UI', async () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    const triggerButton = screen.getByTestId('trigger-button');
    fireEvent.click(triggerButton);
    const retryButton = screen.getByTestId('retry-button');
    fireEvent.click(retryButton);

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});
