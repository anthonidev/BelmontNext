import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStoreLocal, setStoreLocal } from "../../utils/helpers/helpStore";
import { AuthState, User } from "../../utils/types/interfaces";

const initialState: AuthState = {
  access: getStoreLocal("access"),
  refresh: getStoreLocal("refresh"),
  isAuthenticated: null,
  user: {
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    get_full_name: "",
    get_short_name: "",
  },
  loading: false,
  redirectConfirmed: false,
};

export const authSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    login_ok: (state: AuthState, action: PayloadAction<AuthState>) => {
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
    fail_clear: (state: AuthState) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null;
    },
    on_loading: (state: AuthState) => {
      state.loading = true;
    },
    off_loading: (state: AuthState) => {
      state.loading = false;
    },
    loaded_user: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    fail_user: (state: AuthState) => {
      state.user = null;
    },
    authenticated_ok: (state: AuthState) => {
      state.isAuthenticated = true;
    },
    redirectConfirmed: (state: AuthState) => {
      state.redirectConfirmed = true;
    },

    refresh_ok: (state: AuthState, action: PayloadAction<AuthState>) => {
      setStoreLocal(
        "access",
        action.payload.access ? action.payload.access : ""
      );
      state.access = getStoreLocal("access");
    },
  },
});

export const {
  login_ok,
  fail_clear,
  on_loading,
  off_loading,
  loaded_user,
  fail_user,
  authenticated_ok,
  refresh_ok,
  redirectConfirmed,
} = authSlice.actions;

export default authSlice.reducer;
