'use client';

import React, { type ErrorInfo, type ReactNode } from 'react';

import styles from './ErrorBoundary.module.scss';
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
        <div className={styles.errorContainer} data-testid="error-message">
          <h2 className={styles.errorTitle}>Something went wrong</h2>
          <button
            className={styles.retryButton}
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
