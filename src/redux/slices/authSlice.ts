import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: authState = {
  username: undefined,
  email: undefined,
  name: undefined,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupOk: (state: authState, action: PayloadAction<authState>) => {
      console.log(action);

      state.username = action.payload.username;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    signupFail: (state: authState, action: PayloadAction<string>) => {
      state.username = undefined;
      state.email = undefined;
      state.name = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { signupOk, signupFail } = authSlice.actions;

export default authSlice.reducer;

export interface authState {
  username: string | undefined;
  email: string | undefined;
  name: string | undefined;
  isAuthenticated: boolean;
}
