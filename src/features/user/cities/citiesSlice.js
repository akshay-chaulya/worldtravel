import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapSidebarStatus: false,
  citiesPerPage: 5,
  currentPage: 1,
  totalPages: 2,
  totalCities: 8,
  cities: [],
  countries: [],
  selectedCity: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setMapSidebarStatus: (state, action) => {
      state.mapSidebarStatus = action.payload;
    },
    setCities: (state, action) => {
      const data = action.payload.data;
      state.cities = data.cities.map((city) => {
        return {
          ...city,
          lastPosition: city.positions.slice(-1)[0],
          lastVisitDate: city.visitDates.slice(-1)[0],
          lastDescription: city.descriptions.slice(-1)[0],
        };
      });
      state.totalCities = data.totalCities;
      state.totalPages = data.totalPages;

      // state.cities = action.payload;
    },
    setCitiesPerPage: (state, action) => {
      state.citiesPerPage = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload.data.countries;
    },
    setPageNext: (state) => {
      if (state.totalPages === state.currentPage) return;
      state.currentPage += 1;
    },
    setPagePrev: (state) => {
      if (state.currentPage === 1) return;
      state.currentPage -= 1;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
});

export const {
  setMapSidebarStatus,
  setCities,
  setPageNext,
  setPagePrev,
  setCountries,
  setCitiesPerPage,
  setSelectedCity,
} = citiesSlice.actions;

export default citiesSlice.reducer;
