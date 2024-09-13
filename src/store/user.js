import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  access_token: "",
  is_logged_in: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.is_logged_in = true;
    },
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
    logout: (state, action) => {
      state.username = "";
      state.access_token = "";
      state.is_logged_in = false;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout} = userSlice.actions;

export default userSlice.reducer;