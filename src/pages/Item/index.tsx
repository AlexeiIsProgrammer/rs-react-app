import { useLocation, useNavigate, useParams } from 'react-router';
import useGetItem from '../../hooks/useGetItem';
import Spinner from '../../components/Spinner';
import { MAIN_ROUTE } from '../../constants';

import close from '../../assets/close.svg';

const Item = () => {
  const { detailsId: id } = useParams();

  const navigate = useNavigate();
  const { search } = useLocation();

  const { data, isLoading, error } = useGetItem({ id: id || '' });

  const closePanel = () => {
    navigate({ pathname: MAIN_ROUTE, search });
  };

  const content = (() => {
    switch (true) {
      case Boolean(isLoading):
        return (
          <div className="flex justify-center items-center h-40">
            <Spinner />
          </div>
        );
      case Boolean(error):
        return (
          <div
            data-testid="error-message"
            className="p-4 bg-red-100 text-red-700 rounded border border-red-300"
          >
            {error}
          </div>
        );
      case !!data:
        return (
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
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            No character details available
          </div>
        );
    }
  })();

  return (
    <div className="lg:w-1/3 flex-shrink-0 relative">
      <div className="bg-white p-6 rounded-lg shadow-md sticky top-6 overflow-y-auto">
        <button
          title="close"
          onClick={closePanel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-[25px] h-[25px]"
          aria-label="Close panel"
        >
          <img src={close} />
        </button>

        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Character Details
        </h3>

        {content}
      </div>
    </div>
  );
};

export default Item;
