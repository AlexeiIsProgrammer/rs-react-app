import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="text-center max-w-lg mx-auto bg-white overflow-hidden p-8 md:p-12">
      <div className="text-9xl font-bold text-indigo-600 mb-4">404</div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>

      <div className="mb-8">
        <svg
          className="w-48 h-48 mx-auto text-indigo-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
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
