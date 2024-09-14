import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: null,
  type: null, // error, success, info
  apiStatus: true,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setErrorNotification: (state, action) => {
      // Stop loading after a response (whether success or error)
      state.isLoading = false;

      // If the API goes down (network error)
      if (action.payload.code === "ERR_NETWORK") {
        state.apiStatus = false;
        state.message = "Network error. Please check your connection.";
      } else {
        // Safely extract the serializable parts of the error
        state.message =
          action.payload.message ||
          "An error occurred. Please try again later.";
      }
      state.type = "error";
    },

    setSuccessNotification: (state, action) => {
      // Stop loading after a successful response
      state.isLoading = false;
      // set success message
      const data = action.payload;
      state.message = data?.message;
      state.type = "success";
    },
    setInfoMessage: (state, action) => {
      // Stop loading after a successful response
      state.isLoading = false;
      // set success messageconst data = action.payload;
      const data = action.payload;
      state.message = data?.message;
      state.type = "info";
    },
    clearNotification: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const {
  setLoading,
  setErrorNotification,
  setSuccessNotification,
  clearNotification,
  setInfoMessage,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
