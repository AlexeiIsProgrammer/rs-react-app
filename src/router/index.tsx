import { createHashRouter, redirect } from 'react-router';
import App from '../app/App';
import Item from '../pages/Item';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';
import About from '../pages/About';
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

const router = createHashRouter(routes);

export default router;
