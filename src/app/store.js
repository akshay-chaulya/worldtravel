import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/authSlice";
import feedbackSlice from "../features/ui/feedbackSlice";
import citiesSlice from "../features/user/cities/citiesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    feedback: feedbackSlice,
    cities: citiesSlice,
  },
});
