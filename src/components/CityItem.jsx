import { Link } from "react-router-dom";
import { formatDate } from "../utils";
import { useDispatch } from "react-redux";
import { openConfirmation } from "../features/auth/authSlice";

const CityItem = ({
  citiesData: {
    _id: id,
    cityName,
    emoji,
    lastVisitDate,
    lastPosition: { lat, lng },
  },
}) => {
  const dispatch = useDispatch();

  function handleDeleteCity() {
    dispatch(
      openConfirmation({
        message: "Are you sure you want to delete this city?",
        actionType: "DELETE_CITY",
        additionalData: { cityId: id },
      })
    );
  }

  return (
    <li className="flex w-full items-center gap-4 py-3 ">
      <Link
        className="group gap-2 relative flex items-center justify-between w-full py-3 sm:px-4 px-2 pl-4 bg-gray-700 text-white rounded-lg shadow-lg transition-transform hover:scale-105 hover:bg-gray-600 max-sm:text-[0.9em]"
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <div className="absolute left-0 top-0 bg-blue-500 h-full w-2 rounded-tl-lg rounded-bl-lg"></div>
        {/* <div className="flex items-center gap-4"> */}
        <span className="sm:text-xl">{emoji}</span>
        {/* <div className="flex flex-col"> */}
        <h3 className="text-md text-center sm:text-xl font-semibold group-hover:text-blue-300 transition-colors">
          {cityName.slice(0, 1).toUpperCase() + cityName.slice(1)}
        </h3>
        <time className="text-sm sm:text-base text-center text-gray-300 group-hover:text-gray-200 transition-colors">
          {formatDate(lastVisitDate)}
        </time>
        {/* </div> */}
        {/* </div> */}
      </Link>
      <Link
        onClick={handleDeleteCity}
        to={`delete/${id}`}
        className="bg-red-500 h-8 w-8 text-white text-lg rounded-full flex items-center justify-center transition-transform hover:scale-110 p-0"
      >
        &times;
      </Link>
    </li>
  );
};

export default CityItem;
