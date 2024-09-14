import { useSelector } from "react-redux";
import { selectSelectedCity } from "../features/user/cities/citiesSelectors";
import { useFeatchCity } from "../features/user/cities/citiesHookes";
import { Loader } from "./";
import { useParams } from "react-router-dom";

const CityCard = () => {
  const { id } = useParams();
  const { isLoading, error } = useFeatchCity(id);
  const city = useSelector(selectSelectedCity);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  if (!city) {
    return (
      <p className="text-center text-gray-500">
        City information not available.
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-6">
      {/* Header with City and Country */}
      <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">{city.cityName}</h2>
          <p className="text-sm mt-1">
            {city.countryName} {city.emoji}
          </p>
        </div>
        <span className="text-sm bg-yellow-500 px-3 py-1 rounded-full">
          Visited {city.visitCount} {city.visitCount > 1 ? "times" : "time"}
        </span>
      </div>

      {/* City Information */}
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="font-medium text-gray-700">Coordinates:</span>
          <span className="ml-2 text-sm text-gray-500">
            {city.positions?.slice(-1)?.[0].lat},{" "}
            {city.positions?.slice(-1)?.[0].lng}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <span className="font-medium text-gray-700">Last Visit:</span>
          <span className="ml-2 text-sm text-gray-500">
            {new Date(city.visitDates?.slice(-1)).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <span className="font-medium text-gray-700">Description:</span>
          <span className="ml-2 text-sm text-gray-500 italic">
            {city.descriptions?.slice(-1)?.[0] || "No description available"}
          </span>
        </div>
      </div>

      {/* Footer with Delete Button */}
      <div className="bg-gray-50 p-4 text-center">
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md">
          Delete City
        </button>
      </div>
    </div>
  );
};

export default CityCard;
