import { Link } from 'react-router';

import notFound from '../../assets/not-found.svg';

const NotFound = () => {
  return (
    <div className="text-center max-w-lg mx-auto overflow-hidden p-8 md:p-12">
      <div className="text-9xl font-bold text-indigo-600 mb-4">404</div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>

      <div className="mb-8 w-48 h-48 mx-auto text-indigo-300">
        <img src={notFound} />
      </div>

      <Link
        to="/"
        className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
