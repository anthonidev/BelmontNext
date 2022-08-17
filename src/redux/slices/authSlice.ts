import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAuthenticated,
  getStoreLocal,
  setStoreLocal,
} from "../../utils/helpers/helpStore";
import { AuthState, User } from "../../utils/types/interfaces";

const initialState: AuthState = {
  access: getStoreLocal("access"),
  refresh: getStoreLocal("refresh"),
  isAuthenticated: getAuthenticated("access"),
  user: {
    id: 0,
    email: "",
  },
  loading: false,
  redirectConfirmed: false,
};

export const authSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    loginOk: (state: AuthState, action: PayloadAction<AuthState>) => {
      setStoreLocal(
        "access",
        action.payload.access ? action.payload.access : ""
      );
      setStoreLocal(
        "refresh",
        action.payload.refresh ? action.payload.refresh : ""
      );
      state.isAuthenticated = true;
      state.access = getStoreLocal("access");
      state.refresh = getStoreLocal("refresh");
    },
    failClear: (state: AuthState) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null;
    },
    loadingOn: (state: AuthState) => {
      state.loading = true;
    },
    loadingOff: (state: AuthState) => {
      state.loading = false;
    },
    loadedUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    userFail: (state: AuthState) => {
      state.user = null;
    },
    authenticatedOk: (state: AuthState) => {
      state.isAuthenticated = true;
    },
    redirectConfirmed: (state: AuthState) => {
      state.redirectConfirmed = true;
    },

    refreshOk: (state: AuthState, action: PayloadAction<AuthState>) => {
      setStoreLocal(
        "access",
        action.payload.access ? action.payload.access : ""
      );
      state.access = getStoreLocal("access");
    },
  },
});

export const {
  loginOk,
  failClear,
  loadingOn,
  loadingOff,
  loadedUser,
  userFail,
  authenticatedOk,
  refreshOk,
  redirectConfirmed,
} = authSlice.actions;

export default authSlice.reducer;
