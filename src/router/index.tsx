import {
  createBrowserRouter,
  createMemoryRouter,
  createRoutesStub,
  redirect,
  RouterProvider,
} from 'react-router';
import App from '../app/App';
import Item from '../pages/Item';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';
import About from '../pages/About';
import type { JSX } from 'react';
import { MAIN_ROUTE } from '../constants';

export const routes = [
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        loader: () => redirect(MAIN_ROUTE),
        Component: () => null,
      },
      {
        path: 'main',
        Component: Main,
        children: [
          {
            path: ':detailsId',
            Component: Item,
          },
        ],
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '/rs-react-app' });

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

export default router;
