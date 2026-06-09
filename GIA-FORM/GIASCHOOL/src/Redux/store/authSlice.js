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

    GetData: (state, action) => {
      state.data = action.payload;
    },
    GetBoard: (state, action) => {
      state.Board = action.payload;
    },
    GetChapters: (state, action) => {
      state.Chapters = action.payload;
    },
    GetClasses: (state, action) => {
      state.Classes = action.payload;
    },
    GetSubject: (state, action) => {
      state.Subject = action.payload;
    },
    GetSubSubject: (state, action) => {
      state.SubSubject = action.payload;
    },
    GetTopic: (state, action) => {
      state.Topic = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logout,
  GetData,
  GetChapters,
  GetClasses,
  GetSubject,
  GetSubSubject,
  GetTopic,
  GetBoard,
} = authSlice.actions;
export default authSlice.reducer;
