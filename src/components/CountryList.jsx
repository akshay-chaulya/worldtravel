import { useSelector } from "react-redux";
import { selectCountries } from "../features/user/cities/citiesSelectors";
import { useFeatchCountries } from "../features/user/cities/citiesHookes";
import { Loader } from "./";

const CountryList = () => {
  const { isLoading } = useFeatchCountries();
  const countries = useSelector(selectCountries);

  if (isLoading) return <Loader />;

  return (
    <ul className="items-list w-full p-1 h-full overflow-y-scroll overflow-x-hidden grid sm:grid-cols-2 content-start gap-4">
      {countries.length === 0 && (
        <div className="text-lg font-semibold text-gray-600  w-full flex">
          <p className="mx-auto">Add your first trip.</p>
        </div>
      )}
      {countries?.length > 0 &&
        countries.map((item) => (
          <li
            key={item.countryName}
            className="flex flex-col items-center relative px-4 py-3 rounded-md overflow-hidden bg-[rgb(107,114,128)] "
          >
            <div className="h-full w-[5px] bg-orange-500 absolute top-0 left-0"></div>
            <span className="text-md font-bold">{item.emoji}</span>
            <h2 className="text-xl font-medium">{item.countryName}</h2>
          </li>
        ))}
    </ul>
  );
};

export default CountryList;
