import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.currentuser = action.payload;
    },
    signOut: (state, action) => {
      state.currentuser = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
