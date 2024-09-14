import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Loader } from "./";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useReverseGeocoding } from "../hooks";
import { getFlagEmoji } from "../utils";
import { useAddCities } from "../features/user/cities/citiesHookes";
import { useState } from "react";

const AddCitiesForm = () => {
  const [visitDate, setVisitDate] = useState(new Date());
  const navigate = useNavigate();
  const { mutate: addCity } = useAddCities();
  const [searchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  const { data, isLoading } = useReverseGeocoding({ lat, lng });

  const emoji = getFlagEmoji(data?.country_code || "");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());
    const allData = {
      ...obj,
      position: { lat, lng },
      countryName: data.country,
      emoji,
      visitDate,
    };
    addCity(allData);
  }

  if (isLoading) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit}
      className="add_location w-[100%] bg-[rgb(66,72,77)] text-white flex flex-col gap-2 px-6 py-4 rounded-md"
    >
      <label htmlFor="cityName">City name</label>
      <div className="w-full flex items-center bg-[rgb(107,114,128)] rounded-md pr-2">
        <input
          id="cityName"
          name="cityName"
          value={
            data?.city ||
            data?.address_line1 ||
            data?.district ||
            data?.state ||
            ""
          }
          readOnly
        />
        <span className="text-xl font-bold text-gray-400">{emoji}</span>
      </div>

      <label htmlFor="date">When did you go to {data?.city}</label>
      <DatePicker
        className="text-[1.2rem]"
        id="date"
        selected={visitDate}
        onChange={(data) => setVisitDate(data)}
      />

      <label htmlFor="description">
        Description about your trip to {data?.city}
      </label>
      <textarea
        name="description"
        id="description"
        placeholder="Something about your trip!"
      />

      <div className="w-full flex items-center justify-between gap-6 mt-2 ">
        <Button text="Add" className="text-lg block" />
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="block bg-inherit border-gray-500 border hover:bg-transparent text-lg"
          text=" &larr; Back"
        />
      </div>
    </form>
  );
};

export default AddCitiesForm;
