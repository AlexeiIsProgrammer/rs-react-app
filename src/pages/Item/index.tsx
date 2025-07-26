import { useNavigate, useParams } from 'react-router';
import useGetItem from '../../hooks/useGetItem';
import Spinner from '../../components/Spinner';

const Item = () => {
  const { detailsId: id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, error } = useGetItem({ id: id || '' });

  const closePanel = () => {
    navigate('/');
  };

  return (
    <div className="lg:w-1/3 flex-shrink-0 relative">
      <div className="bg-white p-6 rounded-lg shadow-md sticky top-6 overflow-y-auto">
        <button
          title="close"
          onClick={closePanel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close panel"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Character Details
        </h3>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner />
          </div>
        ) : error ? (
          <div
            data-testid="error-message"
            className="p-4 bg-red-100 text-red-700 rounded border border-red-300"
          >
            {error}
          </div>
        ) : data ? (
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-bold text-gray-900">{data.name}</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Birth Year</p>
                <p className="font-medium">{data.birth_year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{data.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Height</p>
                <p className="font-medium">{data.height} cm</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mass</p>
                <p className="font-medium">{data.mass} kg</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No character details available
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
