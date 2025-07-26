import { createBrowserRouter } from 'react-router';
import App from '../app/App';
import Item from '../pages/Item';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';
import About from '../pages/About';

const router = createBrowserRouter([
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
]);

export default router;
