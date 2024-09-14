import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  confirmationMessage: "",
  confimationActionType: null, // or yes, no
  confimationAdditionalData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    openConfirmation: (state, action) => {
      state.confirmationMessage = action.payload?.message;
      state.confimationActionType = action.payload?.actionType;
      state.confimationAdditionalData = action.payload?.additionalData || null;
    },
    closeConfirmation: (state) => {
      state.confirmationMessage = "";
      state.confimationCalback = null;
    },
  },
});

export const { logout, setUser, openConfirmation, closeConfirmation } =
  authSlice.actions;

export default authSlice.reducer;
