import React, { type ErrorInfo, type ReactNode } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './types';

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="p-4 bg-red-100 text-red-800 border border-red-400 rounded"
          data-testid="error-message"
        >
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => this.setState({ hasError: false })}
            data-testid="retry-button"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
