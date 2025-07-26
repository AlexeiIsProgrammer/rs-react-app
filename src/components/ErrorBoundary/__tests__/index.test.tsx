import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ErrorBoundary from '../index';

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

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('retry-button')).toBeInTheDocument();
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
});
