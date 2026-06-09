import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.userPhone = action.payload;
      state.error = null;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.userPhone = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
