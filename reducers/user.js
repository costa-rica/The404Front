import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    // username: null,
    email: null,
    // role: null,
    // machineName: null,
    password: null,
    currentMachineDisplay: {
      machineName: "Not machine connected yet",
      urlFor404Api: null,
      nginxStoragePathOptions: [],
      // userHomeDir: null,
      // nginxDir: null,
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentMachineDisplay: (state, action) => {
      console.log(`- dans Redux: setCurrentMachineDisplay 🔔`);
      state.value.currentMachineDisplay = action.payload;
    },
    loginUser: (state, action) => {
      console.log(`- dans Redux: loginUser 🔔`);
      state.value.token = action.payload.token;
      // state.value.username = action.payload.username;
      // state.value.role = action.payload.role;
      state.value.email = action.payload.email;
      console.log(`- finished loginUser 🏁`);
    },
    logoutUser: (state) => {
      console.log(`- dans Redux: logoutUser 🔔`);
      state.value.token = null;
      state.value.username = null;
      state.value.role = null;
      state.value.email = null;
      console.log(`- finished logoutUser 🏁`);
    },
  },
});

export const { setCurrentMachineDisplay, loginUser, logoutUser } =
  userSlice.actions;
export default userSlice.reducer;
