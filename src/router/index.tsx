import { createBrowserRouter, createRoutesStub } from 'react-router';
import App from '../app/App';
import Item from '../pages/Item';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';
import About from '../pages/About';

const routes = [
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        Component: Main,
        children: [
          {
            path: '/:detailsId',
            Component: Item,
          },
        ],
      },
      {
        path: '/about',
        Component: About,
      },
    ],
    errorElement: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export const Stub = createRoutesStub(routes);

export default router;
