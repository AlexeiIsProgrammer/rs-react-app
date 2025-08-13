import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type ErrorProps = {
  error: FetchBaseQueryError | SerializedError | undefined;
};
