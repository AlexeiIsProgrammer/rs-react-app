import type { JSX } from 'react';
import {
  createMemoryRouter,
  createRoutesStub,
  RouterProvider,
} from 'react-router';
import { routes } from '.';

export const Stub = createRoutesStub(routes);

export const StubProvider = ({
  element,
  route,
}: {
  element: JSX.Element;
  route?: string;
}) => {
  const router = createMemoryRouter(
    [
      {
        path: route || '/',
        element,
      },
    ],
    { initialEntries: ['/'] }
  );

  return <RouterProvider router={router} />;
};
