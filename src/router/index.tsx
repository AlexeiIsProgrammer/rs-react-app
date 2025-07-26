import { createBrowserRouter } from 'react-router';
import App from '../app/App';
import Item from '../pages/Item';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/:detailsId',
        Component: Item,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
