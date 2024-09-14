import { useDispatch, useSelector } from "react-redux";
import { CityItem, Loader, Paginator } from "./";
import { selectCitiesStates } from "../features/user/cities/citiesSelectors";
import { setPageNext, setPagePrev } from "../features/user/cities/citiesSlice";
import { useFeatchCities } from "../features/user/cities/citiesHookes";
import { useMemo } from "react";

const CitiesList = () => {
  const { citiesPerPage, currentPage, totalCities, cities } =
    useSelector(selectCitiesStates);
  const dispatch = useDispatch();
  const { isLoading } = useFeatchCities();

  const to = useMemo(
    () => (currentPage - 1) * citiesPerPage + 1,
    [currentPage, citiesPerPage]
  );

  const of = useMemo(
    () =>
      currentPage * citiesPerPage < totalCities
        ? currentPage * citiesPerPage
        : totalCities,
    [currentPage, citiesPerPage, totalCities]
  );

  if (isLoading) return <Loader />;

  return (
    <div className="cities-container p-4 h-full w-full relative">
      <ul className="flex flex-col">
        {(!cities || cities.length === 0) && (
          <div className="text-lg font-semibold text-gray-600 self-center">
            Add your first trip.
          </div>
        )}
        {cities?.length > 0 &&
          cities.map((item) => <CityItem key={item._id} citiesData={item} />)}
      </ul>

      {totalCities > citiesPerPage && (
        <Paginator
          to={to}
          of={of}
          totalItem={totalCities}
          onClickPrev={() => dispatch(setPagePrev())}
          onClickNext={() => dispatch(setPageNext())}
          className="mt-6"
        />
      )}
    </div>
  );
};

export default CitiesList;
